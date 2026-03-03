module.exports = {
    root: true,
    env: {
        browser: true,
        es2023: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // 👈 integrates Prettier with ESLint
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/react-in-jsx-scope': 'off', // Vite + React 17+
        'prettier/prettier': 'error',
    },
};
