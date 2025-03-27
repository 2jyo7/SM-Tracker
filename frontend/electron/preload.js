const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  fetchStatus: async () => {
    const response = await fetch("http://localhost:4200/api/records"); // Replace with your Express API
    return response.json();
  },
});
