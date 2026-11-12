import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: [".native-map-build/**", "scripts/native-map/**", ".native-reminders-build/**", "scripts/native-reminders/**", "public/desktop-tour/**", ".next-dev/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
