const pluginName = 'disallow-import-style';
const ruleName = `plugin-${ pluginName }/${ pluginName }`;
const startSymbolWarning = 'Forbidden start symbols in import statements (plugin-disallow-import-style/disallow-import-style)';
const fileExtensionWarning = 'Avoid file extensions in import statements (plugin-disallow-import-style/disallow-import-style)'

module.exports = {
    [ruleName]: [
        {
            source: '@import \'src/styles/mixins\'',
            warnings: 0
        },
        {
            source: '@import \'~src/styles/mixins\'',
            warnings: [startSymbolWarning]
        },
        {
            source: '@import \'src/styles/mixins/flex.css\'',
            warnings: [fileExtensionWarning]
        },
        {
            source: '@import \'-src/styles/mixins/grid.css\'',
            args: [
                true,
                {
                    disallowStartSymbols: '-',
                    disallowExtension: true,
                }
            ],
            warnings: [startSymbolWarning, fileExtensionWarning]
        },
    ]
}