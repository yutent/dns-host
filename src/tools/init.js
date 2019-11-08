/**
 * 配置/DB通讯
 * @author yutent<yutent@doui.cc>
 * @date 2019/01/26 18:11:26
 */

'use strict'

const { app, ipcMain } = require('electron')
const fs = require('iofs')
const path = require('path')

const HOST_FILE = path.resolve(app.getPath('userData'), 'host.cache')

if (!fs.exists(HOST_FILE)) {
  fs.echo('{}', HOST_FILE)
}

/* ********** 修复环境变量 start *********** */
let PATH_SET = new Set()
process.env.PATH.split(':').forEach(_ => {
  PATH_SET.add(_)
})
PATH_SET.add('/usr/local/bin')
PATH_SET.add('/usr/local/sbin')

process.env.PATH = Array.from(PATH_SET).join(':')
PATH_SET = null

/* ********** 修复环境变量 end *********** */

var timer = null

ipcMain.on('dns-host', (ev, conn) => {
  switch (conn.type) {
    // 获取指定目录下的文件和目录
    case 'get':
      var cache = fs.cat(HOST_FILE)
      ev.returnValue = JSON.parse(cache)
      break
    // 设置应用配置
    case 'set':
      clearTimeout(timer)
      timer = setTimeout(() => {
        fs.echo(JSON.stringify(conn.data), HOST_FILE)
      }, 2000)
      break

    case 'check':
      try {
        var stat = fs.echo('', '/etc/hosts', true)
        ev.returnValue = true
      } catch (e) {
        ev.returnValue = false
      }
      break

    case 'history':
      var cache = fs.cat('/etc/hosts').toString()
      var records = cache.split(/[\n\r]+/)
      var list = []
      var dict = {}
      var tmp = {}
      records.forEach(str => {
        str = str.trim()
        if (/^(#*?)\s*(\d+\.\d+\.\d+\.\d+)\s+(.*)/.test(str)) {
          list.push({
            ip: RegExp.$2,
            domains: RegExp.$3,
            enabled: !RegExp.$1
          })
        }
      })
      records = null
      list.forEach(it => {})
  }
})
