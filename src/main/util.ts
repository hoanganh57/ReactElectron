/* eslint import/prefer-default-export: off, global-require: off, no-console: off */
import { URL } from "url";
import path from "path";
import { BrowserView, Session } from "electron";

export const AppReturn = (status: number, data: unknown | null) => {
  let messageReturn = "";
  if (status === 200) messageReturn = "Success";
  if (status === 500) messageReturn = "Error";
  const result = {
    status,
    message: messageReturn,
    data,
  };
  return result;
};

export const resolveHtmlPath = (htmlFileName: string) => {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
};

export const resizeView = (
  view: Electron.BrowserView,
  mainWindow: Electron.BrowserWindow | null,
  isShowView: boolean
) => {
  const bound = mainWindow?.getBounds();
  let bounds = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  if (isShowView)
    bounds = {
      x: 41,
      y: 0,
      width: (bound?.width || 0) - 56,
      height: (bound?.height || 0) - 39,
    };
  view.setBounds(bounds);
};

export const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.error);
};

export const createBrowserView = (
  url: string,
  session: Session,
  mainWindow: Electron.BrowserWindow | null,
  isShowView: boolean
) => {
  const view = new BrowserView({
    webPreferences: {
      session,
    },
  });
  resizeView(view, mainWindow, isShowView);
  view.setBackgroundColor("#fff");
  view.webContents.loadURL(url);
  return view;
};
