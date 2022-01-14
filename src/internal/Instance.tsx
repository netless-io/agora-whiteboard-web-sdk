import type { Mutable } from "type-fest";
import type { WindowManager } from "@netless/window-manager";
import type { Room, SceneDefinition, WhiteWebSdk } from "white-web-sdk";
import type { JoinRoom, ManagerConfig, SdkConfig } from "./mount-whiteboard";
import type { i18n } from "i18next";

import { createContext, render } from "preact";
import { useContext } from "preact/hooks";
import { BuiltinApps } from "@netless/window-manager";

import { Root } from "../components/Root";
import { mountWhiteboard } from "./mount-whiteboard";
import { noop } from "./helpers";

export interface AcceptParams {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
  readonly i18n: i18n;
}

export interface InsertMediaParams {
  title: string;
  src: string;
}

export interface InsertDocsStatic {
  readonly fileType: "pdf" | "ppt";
  readonly scenePath: string;
  readonly scenes: SceneDefinition[];
  readonly title?: string;
}

export interface InsertDocsDynamic {
  readonly fileType: "pptx";
  readonly scenePath: string;
  readonly taskId: string;
  readonly title?: string;
  readonly url?: string;
  readonly scenes?: SceneDefinition[];
}

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

export type Language = "zh-CN" | "en-US";

export interface Layout {
  Toolbar?: boolean;
  PageControl?: boolean;
  RedoUndo?: boolean;
  ZoomControl?: boolean;
}

export interface WhiteboardAppConfig {
  readonly sdkConfig: SdkConfig;
  readonly joinRoom: JoinRoom;
  readonly managerConfig?: Omit<ManagerConfig, "container">;
  readonly layout?: Layout;
  readonly toolbar?: {
    apps?: {
      enable?: boolean;
      content?: string;
      onClick?: () => void;
    };
  };
  readonly language?: Language;
}

export interface Essentials {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
  readonly i18n: i18n;
}

export class Instance {
  static readonly Context = createContext<Instance | null>(null);

  config: Mutable<WhiteboardAppConfig>;

  sdk: WhiteWebSdk | null = null;
  room: Room | null = null;
  manager: WindowManager | null = null;
  i18n: i18n | null = null;

  ready = false;
  resolveReady!: () => void;
  readyPromise!: Promise<void>;

  refreshReadyPromise() {
    this.readyPromise = new Promise<void>(resolve => {
      this.resolveReady = () => {
        this.resolveReady = noop;
        this.ready = true;
        resolve();
      };
    });
  }

  constructor(config: WhiteboardAppConfig) {
    this.config = { ...config };
    this.refreshReadyPromise();
    this.initialize();
  }

  async initialize() {
    const essentials = await mountWhiteboard(
      this.config.sdkConfig,
      this.config.joinRoom,
      this.config.managerConfig || {},
      this.config.language || "en-US"
    );
    this.accept(essentials);
    this.resolveReady();
  }

  target: HTMLElement | null = null;
  collector: HTMLElement | null = null;

  bindElement(target: HTMLElement | null) {
    if (this.target && this.target !== target) {
      render(null, this.target);
    }
    this.target = target;
    this.forceUpdate();
  }

  bindCollector(collector: HTMLElement | null) {
    this.collector = collector;
    if (this.manager && collector) {
      this.manager.bindCollectorContainer(collector);
    }
  }

  updateLayout(layout: Layout | undefined) {
    this.config.layout = layout;
    this.forceUpdate();
  }

  async forceUpdate() {
    await this.readyPromise;
    if (this.target) {
      render(<Root instance={this} />, this.target);
    }
  }

  accept({ sdk, room, manager, i18n }: AcceptParams) {
    this.sdk = sdk;
    this.room = room;
    this.manager = manager;
    this.i18n = i18n;
    this.forceUpdate();
  }

  async dispose() {
    if (this.room) {
      await this.unmount();
    }
    if (this.target) {
      render(null, this.target);
      this.sdk = this.room = this.manager = this.target = null;
    }
  }

  async mount(node: HTMLElement) {
    await this.readyPromise;
    if (!this.manager) {
      throw new Error(`[WhiteboardApp] mounted, but not found window manager`);
    }
    this.manager.bindContainer(node);
    if (this.collector) {
      this.manager.bindCollectorContainer(this.collector);
    }
  }

  async unmount() {
    if (this.manager) {
      this.manager.destroy();
      this.manager = null;
    }
    if (this.room) {
      try {
        await this.room.disconnect();
      } catch {
        // ignore any error on disconnecting
      }
      this.room = null;
    }
    this.refreshReadyPromise();
  }

  insertDocs(params: InsertDocsParams) {
    if (!this.manager) {
      throw new Error(`[WhiteboardApp] cannot insert doc before mounted`);
    }
    switch (params.fileType) {
      case "pdf":
      case "ppt":
        return this.manager.addApp({
          kind: "DocsViewer",
          options: {
            scenePath: params.scenePath,
            title: params.title,
            scenes: params.scenes,
          },
        });
      case "pptx":
        return this.manager.addApp({
          kind: "Slide",
          options: {
            scenePath: params.scenePath,
            title: params.title,
            scenes: params.scenes,
          },
          attributes: {
            taskId: params.taskId,
            url: params.url,
          },
        });
    }
  }

  insertCodeEditor() {
    if (!this.manager) {
      throw new Error(`[WhiteboardApp] cannot insert app before mounted`);
    }
    return this.manager.addApp({
      kind: "Monaco",
      options: { title: "Code Editor" },
    });
  }

  insertGeoGebra() {
    if (!this.manager) {
      throw new Error(`[WhiteboardApp] cannot insert app before mounted`);
    }
    return this.manager.addApp({
      kind: "GeoGebra",
      options: { title: "GeoGebra" },
    });
  }

  insertCountdown() {
    if (!this.manager) {
      throw new Error(`[WhiteboardApp] cannot insert app before mounted`);
    }
    return this.manager.addApp({
      kind: "Countdown",
      options: { title: "Countdown" },
    });
  }

  insertMedia({ title, src }: InsertMediaParams) {
    if (!this.manager) {
      throw new Error(`[WhiteboardApp] cannot insert app before mounted`);
    }
    return this.manager.addApp({
      kind: BuiltinApps.MediaPlayer,
      options: { title },
      attributes: { src },
    });
  }

  async changeLanguage(language: Language) {
    try {
      await this.i18n?.changeLanguage(language);
    } finally {
      await this.forceUpdate();
    }
  }
}

export function useInstance() {
  return useContext(Instance.Context);
}
