import "./style.scss";

export * from "@netless/fastboard-core";
export { stockedApps } from "@netless/fastboard-ui";
export type {
  Theme,
  Language,
  GenericIcon,
  AppInToolbar,
  AppsInToolbar,
  FastboardUIConfig,
} from "@netless/fastboard-ui";
export * from "./components/RedoUndo";
export * from "./components/ZoomControl";
export * from "./components/PageControl";
export * from "./components/Toolbar";
export * from "./components/Fastboard";
export * from "./behaviors";
export * from "./create";
export * from "./replay";
export { useFastboard, useReplayFastboard } from "./hooks";

// Caution about Export Namespace (Star)
// esbuild can not handle nested `export *`, i.e. given two files:
//
// foo: export * from './bar'
// bar: export * from 'baz' (external: baz)
//
// the result of bundling foo will be broken.
// `export * from external-module` works and only works at the entry points.
// ref: https://github.com/evanw/esbuild/issues/1737
