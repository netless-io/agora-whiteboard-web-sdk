# @netless/fastboard

[Docs](./docs/en/) | [Sandbox](https://codesandbox.io/s/vanilla-fastboard-example-trns09?file=/src/index.ts) | [中文](./README-zh.md)

A starter library for making whiteboard web app, based on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk), [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager) and [netless-app](https://github.com/netless-io/netless-app).

<img src="https://user-images.githubusercontent.com/8097890/165052277-f0bc1fba-c261-44a8-8219-cd7832ee3091.jpg" align="center">

Starting with version 0.3.22, fastboard integrates the [@netless/appliance-plugin](./docs/en/appliance-plugin.md) plug-in to provide better performance and richer teaching AIDS features

Starting with version 0.3.22, fastboard added a fully packaged file, '@netless/fastboard/full' or '@netless/fastboard-react/full', to resolve internal and external dependency conflicts.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Customization](#customization)
- [Use performance](#performance)

## Install

#### Subcontracting mode
<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/window-manager white-web-sdk @netless/appliance-plugin
</pre>

> **Note：** The `@netless/appliance-plugin` needs to be installed only when [Use performance](#performance) is enabled.

#### Full package mode
<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/appliance-plugin
</pre>

> **Note:** Full package reference, then `@netless/window-manager`, `white-web-sdk` can not be installed. The `@netless/appliance-plugin` needs to be installed only when [Use performance](#performance) is enabled.
>
> `@netless/window-manager`, `white-web-sdk`, `@netless/appliance-plugin` is peerDependency, if you're not sure what peerDependency means, You can read [Why Use peerDependency?](./docs/en/peer-dependency.md)

## Usage

### Vanilla JavaScript

```js
// Full package
import { createFastboard, createUI } from "@netless/fastboard/full";
// Subcontracting package
import { createFastboard, createUI } from "@netless/fastboard";

async function main() {
  const fastboard = await createFastboard({
    // [1]
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "eu"
    },
    // [2]
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
      // (optional)
      userPayload: {
        nickName: "foo",
      },
    },
    // [3] (optional)
    managerConfig: {
      cursor: true,
      // (Optional), turn on the appliance-plugin starting at 0.3.22
      supportAppliancePlugin: true,
    },
    // [4] (optional)
    netlessApps: [],
    // [5] (Optional), turn on the appliance-plugin starting at 0.3.22
    enableAppliancePlugin: {
      ...
    },
  });

  const container = createContainer();

  const ui = createUI(fastboard, container);

  // .....

  // destroy Fastboard UI
  ui.destroy();

  // .....

  // destroy Fastboard (disconnect from the whiteboard room)
  fastboard.destroy();
}

function createContainer() {
  const container = document.createElement("div");
  // Must give it a visible size
  Object.assign(container.style, {
    height: "400px",
    border: "1px solid",
    background: "#f1f2f3",
  });
  document.body.appendChild(container);
  return container;
}

main().catch(console.error);
```

<samp>[1]</samp> Read more about the SDK config at [Construct WhiteWebSDK object](https://developer.netless.link/javascript-en/home/construct-white-web-sdk)\
<samp>[2]</samp> Read more about join room config at [Construct Room and Player objects](https://developer.netless.link/javascript-en/home/construct-room-and-player)\
<samp>[3]</samp> Read more about WindowManager config at [WindowManager.mount()](https://github.com/netless-io/window-manager/blob/master/docs/api.md#mount)

### React

Install `@netless/fastboard-react`, use the `<Fastboard />` component.

#### Subcontracting package

<pre class="language-bash">
npm add <b>@netless/fastboard-react</b> @netless/window-manager white-web-sdk react react-dom @netless/appliance-plugin
</pre>

> **Note:** The `@netless/appliance-plugin` needs to be installed only when [Use performance](#performance) is enabled.


#### Full package

<pre class="language-bash">
npm add <b>@netless/fastboard-react</b> react react-dom @netless/appliance-plugin
</pre>

> **Note:** Full package reference, then `@netless/window-manager`, `white-web-sdk` can not be installed. The `@netless/appliance-plugin` needs to be installed only when [Use performance](#performance) is enabled.
>
> `@netless/window-manager`, `white-web-sdk`, `@netless/appliance-plugin` is peerDependency, if you're not sure what peerDependency means, You can read [Why Use peerDependency?](./docs/zh/peer-dependency.md)

```jsx
// Full package
import { useFastboard, Fastboard } from "@netless/fastboard-react/full";
// Subcontracting package
import { useFastboard, Fastboard } from "@netless/fastboard-react";

import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "eu"
    },
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
    managerConfig: {
      cursor: true,
      // (Optional), turn on the appliance-plugin starting at 0.3.22
      supportAppliancePlugin: true,
    },
    // (Optional), turn on the appliance-plugin starting at 0.3.22
    enableAppliancePlugin: {
      ...
    },
  }));

  // Container must have a visible size
  return (
    <div
      style={{
        height: "400px",
        border: "1px solid",
        background: "#f1f2f3",
      }}
    >
      <Fastboard app={fastboard} />
    </div>
  );
}

createRoot(document.getElementById("app")).render(<App />);
```

### Whiteboard Functions

#### Insert Picture

```js
await fastboard.insertImage(fileUrl);
```

The `fileUrl` is the url to load the image file, like "src" in `<img src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Redo & Undo

```js
fastboard.undo();
fastboard.redo();
```

#### Move Camera

```js
fastboard.moveCamera({ centerX: 0, centerY: 0, scale: 1 });
fastboard.moveCameraToContain({ originX: -300, originY: -200, width: 600, height: 400 });
```

#### Set Tool

```js
fastboard.setAppliance("pencil");
fastboard.setAppliance("shape", "triangle");
fastboard.setStrokeWidth(2);
fastboard.setStrokeColor([r, g, b]);
```

### Netless Apps

To develop your own app, see [Write you a Netless App](./docs/en/app.md).

#### Register & Insert Apps

Except for built-in apps in Fastboard, you can also insert your own apps. To do that,
You have to register app at each client before entering room (`createFastboard`):

```js
import { register } from "@netless/fastboard";
import MyApp from "my-app";

register({ kind: MyApp.kind, src: MyApp });
```

Or you can set `netlessApps` in `createFastboard` config:

```js
createFastboard({
  ..., // other config
  netlessApps: [MyApp],
});
```

Then add app into the room via:

```js
fastboard.manager.addApp({ kind: MyApp.kind });
```

[Read more about Netless Apps.](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

#### Insert PDF, PPT and PPTX

```js
// insert PDF/PPT/PPTX to the main whiteboard
const appId = await fastboard.insertDocs("filename.pptx", conversionResponse);
```

The `conversionResponse` is the result of [this api](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress).

> **Note**: If you're using the new [projector](https://developer.netless.link/server-zh/home/server-projector) api, there's another way:
>
> ```js
> const appId1 = await fastboard.insertDocs({
>   fileType: "pdf",
>   scenePath: `/pdf/${response.uuid}`,
>   scenes: [
>     { name: "1", ppt: { width: 714, height: 1010, src: images[1].url } },
>     { name: "2", ppt: { width: 714, height: 1010, src: images[2].url } },
>   ],
>   title: "filename.pdf",
> });
>
> const appId2 = await fastboard.insertDocs({
>   fileType: "pptx",
>   scenePath: `/pptx/${response.uuid}`,
>   taskId: response.uuid,
>   title: "filename.pptx",
>   // "https://convertcdn.netless.link/dynamicConvert" by default
>   url: response.prefix,
> });
> ```

#### Listen PDF/PPTX Page Change Event

> **Note:** This feature requires the following versions of dependencies:
>
> - `@netless/app-slide` &ge; 0.2.50
> - `@netless/window-manager` &ge; 0.4.66

```js
// For static documents i.e. PDF files
const dispose = fastboard.manager.onAppEvent("DocsViewer", event => {
  if (event.type === "pageStateChange") console.log(event.value);
});
// For dynamic documents i.e. PPTX files
const dispose = fastboard.manager.onAppEvent("Slide", console.log);

onExitRoom(() => dispose());
```

The `event` above will be like:

```json
{
  "kind": "Slide",
  "appId": "Slide-aa1840ba",
  "type": "pageStateChange",
  "value": {
    "index": 0,
    "length": 12
  }
}
```

The `dispose` above is a function to stop listening.

#### Control the PDF/PPTX Apps

```js
import { dispatchDocsEvent } from "@netless/fastboard";

dispatchDocsEvent(fastboard, "nextPage"); // prevPage, nextStep, prevStep
dispatchDocsEvent(fastboard, "jumpToPage", { page: 2 });
```

By default it will dispatch event to the focused PDF/PPTX app, you can also specify the appId:

```js
dispatchDocsEvent(fastboard, "nextPage", { appId });
```

#### Set PPTX Render Options

```js
import { register, SlideApp, addSlideHooks } from "@netless/fastboard";

register({
  kind: SlideApp.kind,
  src: SlideApp,
  appOptions: {
    // ... your slide options here
    // Note: import type {SlideOptions} to get type hints
  },
  addHooks: addSlideHooks,
});
```

[Read more about these options.](https://developer.netless.link/faq-zh/home/slide-render-options)

#### Insert Video & Audio

```js
const appId = await fastboard.insertMedia("filename.mp3", fileUrl);
```

The `fileUrl` is the url to load the media file, like "src" in `<video src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Insert [@netless/app-monaco](https://github.com/netless-io/netless-app/tree/master/packages/app-monaco)

```js
const appId = await fastboard.manager.addApp({
  kind: "Monaco",
  options: { title: "Code Editor" },
});
```

#### Insert [@netless/app-countdown](https://github.com/netless-io/netless-app/tree/master/packages/app-countdown)

```js
const appId = await fastboard.manager.addApp({
  kind: "Countdown",
  options: { title: "Countdown" },
});
```

#### Insert [@netless/app-geogebra](https://github.com/netless-io/netless-app/tree/master/packages/app-geogebra)

> [!NOTE]
> GeoGebra is licensed under GPLv3 and is free only in non-commercial use.
> If you want to use it in commercially, please refer to their license first:
> https://www.geogebra.org/license

```js
const appId = await fastboard.manager.addApp({
  kind: "GeoGebra",
  options: { title: "GeoGebra" },
});
```

#### Insert [@netless/app-plyr](https://github.com/netless-io/netless-app/tree/master/packages/app-plyr)

```js
const appId = await fastboard.manager.addApp({
  kind: "Plyr",
  options: { title: "YouTube" },
  attributes: {
    src: "https://www.youtube.com/embed/bTqVqk7FSmY",
    provider: "youtube",
  },
});
```

#### Insert [@netless/app-embedded-page](https://github.com/netless-io/netless-app/tree/master/packages/app-embedded-page)

```js
const appId = await fastboard.manager.addApp({
  kind: "EmbeddedPage",
  options: { title: "Google Docs" },
  attributes: {
    src: "https://docs.google.com/document/d/1bd4SRb5BmTUjPGrFxU2V7KI2g_mQ-HQUBxKTxsEn5e4/edit?usp=sharing",
  },
});
```

> **Note:** EmbeddedPage uses [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) to display external web resources, you'd better not embedding 2 more nested iframes (i.e. webpage>iframe1>iframe2) in the same page.

More apps goto [netless-app](#https://github.com/netless-io/netless-app).

To develop your own app, see [Write you a Netless App](./docs/en/app.md).

## performance

Through ` enableAppliancePlugin ` and ` managerConfig. SupportAppliancePlugin ` configuration items open appliance-plugins plugin. In order to enhance performance and provide [new whiteboard features](https://github.com/netless-io/fastboard/blob/main/docs/en/appliance-plugin.md#new-features), or refer to the [appliance-plugin](./docs/en/appliance-plugin.md) document for more information.
> **Note:** To enable the use of the performance optimized version, you need to install `@netless/appliance-plugin`.

```jsx
// Import the product directly by raw-loader
import fullWorkerString from '@netless/appliance-plugin/dist/fullWorker.js?raw';
import subWorkerString from '@netless/appliance-plugin/dist/subWorker.js?raw';
const fullWorkerBlob = new Blob([fullWorkerString], {type: 'text/javascript'});
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], {type: 'text/javascript'});
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

// Import the CDN. A CDN is imported and needs to be deployed on its own CDN server, which must comply with the same-origin policy.
const subWorkerUrl = "https://cdn.jsdelivr.net/npm/@netless/appliance-plugin@latest/dist/subWorker.js";
const fullWorkerUrl = "https://cdn.jsdelivr.net/npm/@netless/appliance-plugin@latest/dist/fullWorker.js";

function App() {
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      ...
    },
    joinRoom: {
      ...
    },
    managerConfig: {
      // (Optional), turn on the appliance-plugin
      supportAppliancePlugin: true,
    },
    //  use appliance-plugin
    enableAppliancePlugin: {
        cdn: {
            fullWorkerUrl,
            subWorkerUrl,
        }
    },
  }));
  ....
}
```
**Note:**
- First, you must ensure that the appliance plugin configuration is enabled on all three ends of Android \ios\web. Notes drawn after appliance-plugin is enabled will not be displayed on the unoccupied whiteboard.
- After the appliance plugin is turned on, the old contents drawn on the previous whiteboard are displayed, but cannot be manipulated and upgraded into new notes. So in order not to affect the experience, please use on a whiteboard without any historical data. Similarly, when the plugin is closed, the newly drawn content will be lost.
- only the browser for web apis [offscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas#browser_compatibility) Full support, in order to experience more performance and rich teaching AIDS functional experience.

## Customization

Fastboard isn't that customizable due to its <q>fast</q> design goal.
But we do have some lightweight configuration for easy changes.

```jsx
// vanilla js
const ui = createUI(fastboard, container);
ui.update({ config: { ...ui_config } });

// react
<Fastboard app={fastboard} config={{ ...ui_config }} />;
```

The `ui_config` looks like:

```js
{
  toolbar: {
    enable: true,
    placement: 'left',
    items: ['pencil', 'eraser'],
    apps: { enable: true },
  },
  redo_undo: { enable: true },
  zoom_control: { enable: true },
  page_control: { enable: true },
}
```

For example, you can hide the zoom control component with:

```jsx
// vanilla js
ui.update({ config: { zoom_control: { enable: false } } });
// react
<Fastboard app={fastboard} config={{ zoom_control: { enable: false } }} />;
```

Or change the items on toolbar with:

> Available items:\
> `clicker`, `selector`, `pencil`, `text`, `shapes`, `eraser`, `clear`, `hand`, `laserPointer`.

```jsx
const toolbar_items = ["pencil", "eraser"];
// vanilla js
ui.update({ config: { toolbar: { items: toolbar_items } } });
// react
<Fastboard app={fastboard} config={{ toolbar: { items: toolbar_items } }} />;
```

You can also write your own component with the same <q>source of truth</q> as Fastboard UI.
Just disable those components and refer to [Write Your Own UI (for Fastboard)](./docs/en/ui.md) & [How do I customize Your own UI (for Fastboard)](./docs/en/customizeUI.md).

## Replay Mode

Fastboard has a similar usage to replay a whiteboard.

```jsx
const player = await replayFastboard(...)
const ui = createReplayUI(player, container);

const player = useReplayFastboard(() => ({...}))
return <ReplayFastboard player={player} />
```

The `player` instance is similar to a native video player that has methods like `play()` `stop()` `seek()` `pause()` etc.
To sync the progress of the whiteboard player with other players (like a video player), see [@netless/sync-player](https://github.com/netless-io/sync-player).

## Error Handling

You will get callbacks when:

- Cannot connect to server at the very beginning
- Connecting status changed (to `reconnecting` or `disconnected`)
- Kicked from room (when the room is banned from the backend)

Note that Fastboard will reconnect automatically internally, you only have to do things below to ensure the user experience.

To properly handle these cases, please refer to this piece of code:

```js
try {
  fastboard = await createFastboard({
    sdkConfig: {
      onWhiteSetupFailed(error) {
        console.error("Failed to find the whiteboard server", error);
      },
    },
    joinRoom: {
      callbacks: {
        onPhaseChanged(phase) {
          if (phase === "reconnecting") console.log("Whiteboard connection lost, reconnecting...");
        },
        onDisconnectWithError(error) {
          console.error("Failed to connect to whiteboard server");
        },
        onKickedWithReason(reason) {
          console.log("You're kicked by", reason);
          // Properly close this room
          leaveRoom();
        },
      },
    },
    managerConfig: {
      cursor: true,
      // (Optional), turn on the appliance-plugin starting at 0.3.22
      supportAppliancePlugin: true,
    },
    // (Optional), turn on the appliance-plugin starting at 0.3.22
    enableAppliancePlugin: {
      ...
    },
  });
} catch (error) {
  console.error("Failed to join whiteboard room", error);
}
```

The React way should be similar.

## License

MIT @ [netless](https://github.com/netless-io)
