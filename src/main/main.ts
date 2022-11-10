/* eslint global-require: off, no-console: off, promise/always-return: off */

import { app, BrowserView, BrowserWindow, ipcMain, shell } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import path from "path";
import MenuBuilder from "./menu";
import Services from "./services";
import { installExtensions, resizeView, resolveHtmlPath } from "./util";

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
    icon: getAssetPath("icon.png"),
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
  // eslint-disable-next-line no-new
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

ipcMain.on("addService", (e, key) => {
  const url = Services.find((s) => s.key === key)?.url;
  if (url) {
    const view = new BrowserView();
    mainWindow?.addBrowserView(view);
    resizeView(view, mainWindow, isShowView);
    view.setBackgroundColor("#fff");
    view.webContents.loadURL(url);
  }
});

ipcMain.on("visibleService", (e, isShow) => {
  mainWindow?.getBrowserViews().forEach((view) => {
    resizeView(view, mainWindow, isShow);
  });
  isShowView = isShow;
});
