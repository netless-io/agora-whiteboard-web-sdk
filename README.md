# @netless/fastboard

A whiteboard starter, based on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk).

## Install

```bash
npm add @netless/fastboard
```

## Usage

```js
import { createWhiteboardApp } from "@netless/fastboard";

let app = createWhiteboardApp({
  target: document.getElementById("whiteboard"),
  sdkConfig: {
    appIdentifier: "whiteboard-appid",
  },
  joinRoom: {
    uid: "unique_id_for_each_client",
    uuid: "room-uuid",
    roomToken: "NETLESSROOM_...",
  },
});
```

## Develop

```bash
pnpm i
# upgrade dependencies
pnpm up -Li
```

## License

MIT @ [netless](https://github.com/netless-io)
