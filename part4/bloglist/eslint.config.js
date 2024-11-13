// eslint-disable-next-line n/no-unpublished-import -- Won't be published
import eslintConfigESLint from "eslint-config-eslint";
// eslint-disable-next-line n/no-unpublished-import -- Won't be published
import eslintConfigESLintFormatting from "eslint-config-eslint/formatting";

export default [
    {
        ignores: ["**/dist/*"]
    },
    ...eslintConfigESLint,
    eslintConfigESLintFormatting
];
