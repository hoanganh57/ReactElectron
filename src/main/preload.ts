import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  sendMessage: (message: string) => {
    console.log(message);
    ipcRenderer.send("sendMessage", message);
  },
  createService: (url: string) => {
    console.log(url);
    ipcRenderer.send("createService", url);
  },
});
