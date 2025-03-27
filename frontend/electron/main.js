const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Secure communication
      nodeIntegration: false, // Keep security in mind
      contextIsolation: true,
    },
  });

  const startUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000" // Dev mode: Use Next.js dev server
      : "http://localhost:3000"; // Production mode: Should load Next.js built version

  mainWindow
    .loadURL(startUrl)
    .catch((err) => console.error("Failed to load:", err));

  mainWindow.on("closed", () => (mainWindow = null));
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
