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

Anot({
  $id: 'app',
  state: {
    filter: '',
    curr: '', //当前选中的域名
    domains: [],
    records: [
      {
        record: '',
        value: '',
        enabled: true,
        remark: ''
      }
    ],
    permissionShow: false
  },
  mounted() {
    // this.$refs.preview.show()
    this.check()
  },
  methods: {
    addRecord() {
      log('---')
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
          if (!this.curr) {
            this.toggleDomain(val)
          }
        })
        .catch(Anot.noop)
    },
    toggleDomain(name) {
      this.curr = name
    },
    check() {
      var check = ipcRenderer.sendSync('dns-host', { type: 'check' })

      if (check) {
      } else {
        this.permissionShow = true
      }
    },
    save() {}
  }
})
