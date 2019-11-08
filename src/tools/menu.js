/**
 * 菜单项
 * @author yutent<yutent@doui.cc>
 * @date 2019/01/21 20:34:04
 */

'use strict'

const { Menu } = require('electron')

module.exports = function(win) {
  let menuList = Menu.buildFromTemplate([
    {
      label: '伪域名解析',
      submenu: [
        { role: 'about', label: '关于 伪域名解析' },
        { type: 'separator' },
        { role: 'quit', label: '退出' }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤消重做' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
        { role: 'selectall', label: '全选' }
      ]
    },
    {
      label: '显示',
      submenu: [
        { label: '伪域名解析' },
        {
          type: 'separator'
        },
        { label: '伪域名解析' }
      ]
    },
    {
      label: '窗口',
      submenu: [
        {
          role: 'minimize',
          label: '最小化',
          click() {
            win.minimize()
          }
        }
      ]
    },
    {
      role: 'help',
      label: '帮助',
      submenu: [
        {
          label: '官网',
          click() {}
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menuList)
}
