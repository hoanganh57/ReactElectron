import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  addService: (key: string) => {
    ipcRenderer.send("addService", key);
  },
  visibleService: (isShowView: boolean) => {
    ipcRenderer.send("visibleService", isShowView);
  },
});
