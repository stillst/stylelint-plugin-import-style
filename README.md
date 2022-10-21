# stylelint-plugin-import-style
A custom stylelint rule to catch usage of `@import` statement files beginning with chosen characters or ends with filename extensions.

## Usage

Add `"stylelint-plugin-import-style"` to your stylelint config `plugins` array, then add `at-rule-import-path` to your rules, set to your preferred options.

As follows:

```js
{
    "plugins": [
        "stylelint-plugin-import-style"
    ],
    "rules": {
        "plugin-import-style/import-style": true,
    }
};
```

Or:

```js
{
    "plugins": [
        "stylelint-plugin-import-style"
    ],
    "rules": {
        "plugin-import-style/import-style": [true, {
            disallowExtension: true,
            disallowStartSymbols: '~'
        }]
    }
};
```
