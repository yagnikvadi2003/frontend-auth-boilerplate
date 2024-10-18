// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  experimentalTernaries: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: true,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  parser: "typescript",
  proseWrap: "always",
  htmlWhitespaceSensitivity: "strict",
  endOfLine: "crlf",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: true,
  overrides: [
    {
      files: "*.scss",
      options: {
        parser: "scss",  // Use SCSS parser for .scss files
      },
    },
    {
      files: "*.css",
      options: {
        parser: "css",  // Use SCSS parser for .css files
      },
    },
  ],
};

export default config;