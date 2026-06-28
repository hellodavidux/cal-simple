/**
 * Remotion CLI entry point.
 *
 * CSS note: Remotion's bundler uses Webpack. Tailwind v4 ships a Vite plugin
 * (no Webpack support). We import a pre-compiled CSS snapshot instead.
 *
 * Before running `npm run remotion:render` for the first time, generate it:
 *   npm run build:remotion-css
 *
 * The file is gitignored. Re-generate whenever Tailwind utilities change.
 */
import "./tailwind.css";
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
