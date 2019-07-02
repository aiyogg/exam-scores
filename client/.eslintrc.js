const path = require('path')

module.exports = {
  "root": true,
  "extends": [
    "airbnb",
    "plugin:react/recommended",
    "prettier",
    "plugin:jest/recommended"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jasmine": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "plugins": ["react", "babel", "jest"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "alias": {"@": path.resolve(__dirname, 'src')},
            "extensions": [".js",".jsx"]
          }
        },
      },
    }
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".md"] }],
    "react/destructuring-assignment": [1, "always", { "ignoreClassFields": true }],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "prefer-destructuring": "off",
    "react/prefer-stateless-function": "warn",
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off"
  }
}
