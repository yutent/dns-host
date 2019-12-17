/**
 * {sonist app}
 * @author yutent<yutent@doui.cc>
 * @date 2018/12/16 17:15:57
 */

import '/lib/anot.js'
import '/lib/form/button.js'
import '/lib/form/input.js'
import '/lib/form/switch.js'
import layer from '/lib/layer/index.js'
import { clickOutside } from '/lib/utils.js'

const log = console.log

const { remote, ipcRenderer } = require('electron')

const WIN = remote.getCurrentWindow()

const $doc = Anot(document)

var dict = {}
var tmp_records = {}

Anot({
  $id: 'app',
  state: {
    filter: '',
    activeDomain: '', //当前选中的域名
    editDomain: '', // 当前临时要编辑的域名, 即右键菜单选择到的
    domains: [],
    records: [],
    permissionShow: false
  },
  mounted() {
    // this.$refs.context.show()
    this.check()
    clickOutside(this.$refs.context, ev => {
      this.$refs.context.close()
    })
  },
  watch: {},
  methods: {
    addRecord() {
      if (this.activeDomain) {
        this.records.unshift({
          record: '',
          value: '',
          enabled: true,
          remark: ''
        })
        this.$refs.records.scrollTop = 0
      } else {
        layer.toast('请先选择域名')
      }
    },
    addDomain() {
      layer
        .prompt('请输入根域名', function(val, done) {
          if (/^[\w.]+\.[a-z]+$/.test(val)) {
            done()
          } else {
            layer.toast('域名格式错误', 'error')
          }
        })
        .then(val => {
          this.domains.push(val)
          dict[val] = []
          if (!this.activeDomain) {
            this.toggleDomain(val)
          }
          this.save()
        })
        .catch(Anot.noop)
    },
    toggleDomain(name) {
      this.activeDomain = name
      this.records = dict[name].sort((a, b) => a.record.localeCompare(b.record))
      tmp_records = Object.create(null)
      for (let it of this.records) {
        if (tmp_records[it.record]) {
          tmp_records[it.record].push(it)
        } else {
          tmp_records[it.record] = [it]
        }
      }
      document.title = `伪域名解析   ${name} `
      setTimeout(() => {
        this.$refs.records.scrollTop = 0
      }, 50)
    },
    showMenu(ev) {
      this.$refs.context.close()
      var { pageX, pageY } = ev
      if (pageY + 70 > 600) {
        pageY -= 70
      }

      var elem = ev.target

      if (elem.tagName !== 'LI') {
        elem = elem.parentNode
      }
      this.editDomain = elem.dataset.name
      Anot.nextTick(_ => {
        this.$refs.context.moveTo({ left: pageX + 'px', top: pageY + 'px' })
        this.$refs.context.show()
      })
    },
    confirmAction(ev) {
      this.$refs.context.close()
      if (ev.target.tagName === 'LI') {
        var act = ev.target.dataset.act

        if (act === 'del') {
          layer
            .confirm(`是否要删除域名「${this.editDomain}」?`, (val, done) => {
              if (dict[this.editDomain].length > 0) {
                return layer.toast(
                  '该域名下有主机记录, 请先删除主机记录后再删除域名',
                  'error'
                )
              }
              done()
            })
            .then(res => {
              delete dict[this.editDomain]
              this.domains.remove(this.editDomain)
              this.activeDomain = ''
              this.editDomain = ''
              this.records.clear()
              this.save()
              this.toggleDomain(this.domains[0])
            })
            .catch(Anot.noop)
        } else if (act === 'edit') {
          layer
            .prompt(`请输入新的名字「${this.editDomain}」`, (val, done) => {
              if (val && val !== this.editDomain) {
                if (/^[\w.]+\.[a-z]+$/.test(val)) {
                  done()
                } else {
                  layer.toast('域名格式错误', 'error')
                }
              }
            })
            .then(val => {
              var idx = this.domains.indexOf(this.editDomain)
              this.domains.set(idx, val)
              dict[val] = dict[this.editDomain]
              delete dict[this.editDomain]
              this.activeDomain = ''
              this.editDomain = ''
              this.save()
              this.toggleDomain(val)
            })
            .catch(Anot.noop)
        }
      }
    },
    check() {
      var check = ipcRenderer.sendSync('dns-host', { type: 'check' })

      if (check) {
        dict = ipcRenderer.sendSync('dns-host', { type: 'history' })

        var tmp = []
        for (var k in dict) {
          if (k) {
            tmp.push(k)
          } else {
            delete dict[k]
          }
        }
        this.domains = tmp
      } else {
        this.permissionShow = true
      }
    },
    updateCacheDict(item) {
      clearTimeout(this.timer)
      this.timer = setTimeout(_ => {
        tmp_records = Object.create(null)
        for (let it of this.records) {
          if (tmp_records[it.record]) {
            tmp_records[it.record].push(it)
          } else {
            tmp_records[it.record] = [it]
          }
        }
      }, 1000)
    },
    clone(item) {
      var params = { ...item }
      params.enabled = false

      this.records.unshift(params)
      this.$refs.records.scrollTop = 0
    },
    // 同一个记录, 允许一条被激活
    recordChanges(item) {
      if (item.enabled) {
        if (tmp_records[item.record].length > 1) {
          for (let it of tmp_records[item.record]) {
            if (it.value !== item.value) {
              it.enabled = false
            }
          }
        }
      }
    },
    save() {
      if (this.activeDomain) {
        dict[this.activeDomain] = this.records.$model
      }
      ipcRenderer.send('dns-host', { type: 'set', data: dict })
      layer.toast('保存成功', 'success')
    }
  }
})
