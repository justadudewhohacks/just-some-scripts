import { app, BrowserWindow } from 'electron'
import * as url from 'url'
import './ipc'

let mainWindow: Electron.BrowserWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
  })

  const protocol = 'http:' // 'file:'
  const pathname = 'localhost:3000' // path.join(__dirname, './index.html')
  mainWindow.loadURL(url.format({
    pathname,
    protocol,
    slashes: true,
  }))

  mainWindow.webContents.openDevTools()
  mainWindow.setResizable(true)
}

app.on('ready', () => {
  createWindow()
  process.env.REACT_DEVTOOLS_PATH
    ? BrowserWindow.addDevToolsExtension(process.env.REACT_DEVTOOLS_PATH as string)
    : console.log('failed to load react dev tools process.env.REACT_DEVTOOLS_PATH:', process.env.REACT_DEVTOOLS_PATH)
  process.env.REDUX_DEVTOOLS_PATH
    ? BrowserWindow.addDevToolsExtension(process.env.REDUX_DEVTOOLS_PATH as string)
    : console.log('failed to load redux dev tools process.env.REDUX_DEVTOOLS_PATH:', process.env.REDUX_DEVTOOLS_PATH)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})