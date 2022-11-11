/* eslint global-require: off, no-console: off, promise/always-return: off, no-new: off */

import { app, BrowserWindow, ipcMain, session, shell } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import MenuBuilder from "./menu";
import Services from "./services";
import {
  AppReturn,
  createBrowserView,
  installExtensions,
  resizeView,
  resolveHtmlPath,
} from "./util";

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let isShowView = true;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
  require("electron-debug")();
}

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: getAssetPath("logo.ico"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((data) => {
    shell.openExternal(data.url);
    return { action: "deny" };
  });

  mainWindow?.on("resize", () => {
    mainWindow?.getBrowserViews().forEach((view) => {
      resizeView(view, mainWindow, isShowView);
    });
  });

  // Remove this if your app does not use auto updates
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

/**
 * Add ipc listeners...
 */

ipcMain.handle("addService", (_, key) => {
  const url = Services.find((s) => s.key === key)?.url;
  if (url) {
    const keySession = `${key}${uuidv4()}`;
    const viewSession = session.fromPartition(keySession, {
      cache: true,
    });
    const view = createBrowserView(url, viewSession, mainWindow, isShowView);
    mainWindow?.addBrowserView(view);
    return AppReturn(200, keySession);
  }
  return AppReturn(500, "Not found service");
});

ipcMain.on("visibleService", (_, isShow) => {
  mainWindow?.getBrowserViews().forEach((view) => {
    resizeView(view, mainWindow, isShow);
  });
  isShowView = isShow;
});
