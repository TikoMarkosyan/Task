module.exports = {
  root: true,
  plugins: ["import", "unused-imports"],
  extends: ["@react-native", "plugin:react/recommended"],
  rules: {
    quotes: [2, "double"],
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "ignore" },
    ],
    "sort-imports": [
      "error",
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    // this is for sorting imports
    "import/order": [
      "error",
      {
        groups: [
          ["external", "builtin"],
          "internal",
          ["sibling", "parent"],
          "index",
        ],
        pathGroups: [
          {
            pattern: "@(react|react-native)",
            group: "external",
            position: "before",
          },
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal", "react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-undef": "error",
    "no-console": "warn",
    "no-debugger": "warn",
    "no-unused-vars": "off",
    "prettier/prettier": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "warn",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  env: {
    jest: true,
  },
  ignorePatterns: ["external/"],
};
