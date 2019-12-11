/**
 *
 * @author yutent<yutent@doui.cc>
 * @date 2019/09/16 20:51:19
 */

const { app, BrowserWindow, protocol, Menu } = require('electron')
const path = require('path')
const fs = require('iofs')
require('./tools/init')
const createMenu = require('./tools/menu')
const log = console.log
const MIME_TYPES = {
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.htm': 'text/plain',
  '.css': 'text/css',
  '.jpg': 'image/jpg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/ico'
}

const ROOT = __dirname

/* ----------------------------------------------------- */
app.commandLine.appendSwitch('--lang', 'zh-CN')
app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required')

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

/* ----------------------------------------------------- */

//  初始化应用
app.once('ready', () => {
  // 注册协议
  protocol.registerBufferProtocol('app', (req, cb) => {
    let file = req.url.replace(/^app:\/\/local\//, '')
    let ext = path.extname(req.url)
    let buff = fs.cat(path.resolve(ROOT, file))
    cb({ data: buff, mimeType: MIME_TYPES[ext] })
  })

  Menu.setApplicationMenu(null)

  // 创建浏览器窗口
  let win = new BrowserWindow({
    title: '伪域名解析',
    width: 1000,
    height: 640,
    resizable: false,
    maximizable: false,
    icon: path.resolve(ROOT, './images/app.png'),
    webPreferences: {
      webSecurity: false,
      experimentalFeatures: true,
      nodeIntegration: true
    }
  })

  win.on('closed', () => {
    app.exit()
    win = null
  })

  win.openDevTools()

  // 然后加载应用的 index.html
  win.loadURL('app://local/index.html')

  if (process.platform === 'darwin') {
    createMenu(win)
  }
})
