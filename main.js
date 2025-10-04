const { app, BrowserWindow } = require('electron')
const path = require('node:path')

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

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})