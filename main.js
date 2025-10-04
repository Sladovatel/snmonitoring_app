const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const {autoUpdater} = require('electron-updater')()
const log = require('electron-log')


let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: "src/img/logo.png",
    webPreferences: {
      preload: path.join(__dirname, 'process_app/preload.js')
    }
  })

  win.loadFile('src/index.html')
}


app.on('ready', () => {
  createWindow()

  autoUpdater.checkForUpdatesAndNotofy()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

autoUpdater.on("update-avalible",()=>{
    log.info("update-avalible")
})
autoUpdater.on("cheking-for-update",()=>{
    log.info("cheking-for-update")
})
autoUpdater.on("download-progress",()=>{
    log.info("download-progress")
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})