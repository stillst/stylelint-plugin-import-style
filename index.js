'use strict';

const stylelint = require('stylelint');

const pluginName = 'disallow-import-style';
const ruleName = `plugin-${ pluginName }/${ pluginName }`;
const messages = stylelint.utils.ruleMessages(ruleName, {
    rejectedFirstSymbol: 'Forbidden start symbols in import statements',
    rejectedExtension: 'Avoid file extensions in import statements',
    invalidOptions: 'Invalid options'
});
const ruleFunction = (enabled, options = {}) => (root, result) => {

    const hasOptions = Object.getOwnPropertyNames(options).length > 0;
    const validOptions = stylelint.utils.validateOptions(
        result,
        ruleName,
        {
            actual: enabled,
            possible: [true, false]
        },
        {
            actual: options,
            possible: {
                disallowExtension: [true, false],
                disallowStartSymbols: (option => typeof option === 'string'),
            },
            optional: true
        }
    );

    if (!validOptions) {

        console.log(messages.invalidOptions);
    }

    const checkForImportStatement = (atRule) => {
        if (atRule.name !== 'import' || !enabled) {

            return;
        }

        const importPath = atRule.params.replace(/'|"/g, '');

        if ((!hasOptions || options.disallowStartSymbols)
            && isStartSymbolsForbidden(importPath, options.disallowStartSymbols || '~')) {

            stylelint.utils.report({
                ruleName,
                result,
                node: atRule,
                message: messages.rejectedFirstSymbol
            });
        }

        if ((!hasOptions || (options.disallowExtension)) && importPath.includes('.')) {

            stylelint.utils.report({
                ruleName,
                result,
                node: atRule,
                message: messages.rejectedExtension
            });
        }
    };

    root.walkAtRules(checkForImportStatement);
}

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
module.exports.ruleName = ruleName;
module.exports.messages = messages;

function isStartSymbolsForbidden(importPath, startSymbols) {

    return (Array.isArray(startSymbols) && startSymbols.some(startSymbol => importPath.startsWith(startSymbol)))
        || importPath.startsWith(startSymbols);
}
