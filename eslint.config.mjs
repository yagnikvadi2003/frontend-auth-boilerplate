export default [
  {
    env: {
      browser: true,
      node: true,
      es2021: true,
      commonjs: false
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    overrides: [
      // override "simple-import-sort" config
      // https://dev.to/julioxavierr/sorting-your-imports-with-eslint-3ped
      {
        files: ['*.js', '*.ts', '*.tsx'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                // Packages. `react` related packages come first.
                ['^react', '@reduxjs', '^(@mui)(/.*|$)'], //, '^@?\\w'
                // Packages.
                // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                ['^\\w'],
                // Anything not matched in another group.
                ['^'],
                // Relative imports.
                // Anything that starts with a dot.
                ['^\\.'],
                // Style imports.
                ['^.+\\.s?css$']
              ]
            }
          ]
        }
      }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      project: "./tsconfig.json"
    },
    plugins: ["prettier", "react", "react-hooks", "@typescript-eslint"],
    rules: [
      
    ],
    settings: {
      react: {
        version: "18.x"
      },
      typescript: {
        version: "5.x"
      },
      node: {
        version: "20.x"
      },
      pnpm: {
        version: "9.x"
      }
    },
    ignorePatterns: ["node_modules", "build", "dist", "public"]
  },
];