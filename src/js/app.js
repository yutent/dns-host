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
    curr: '', //当前选中的域名
    domains: [],
    records: [],
    permissionShow: false
  },
  mounted() {
    // this.$refs.preview.show()
    this.check()
  },
  watch: {},
  methods: {
    addRecord() {
      if (this.curr) {
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
          if (!this.curr) {
            this.toggleDomain(val)
          }
          this.save()
        })
        .catch(Anot.noop)
    },
    toggleDomain(name) {
      this.curr = name
      this.records = dict[name]
      tmp_records = Object.create(null)
      for (let it of this.records) {
        if (tmp_records[it.record]) {
          tmp_records[it.record].push(it)
        } else {
          tmp_records[it.record] = [it]
        }
      }
      setTimeout(() => {
        this.$refs.records.scrollTop = 0
      }, 50)
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
      if (this.curr) {
        dict[this.curr] = this.records.$model
        ipcRenderer.send('dns-host', { type: 'set', data: dict })
        layer.toast('保存成功', 'success')
      }
    }
  }
})
