import wepy from 'wepy'

export default class SocketManager {
  static _isConnect = false
  static _seqId = 1;
  static _sendMsgMap = {}

  static createSeqId() {
    return this._seqId++
  }

  static async connect(connectFun) {
    this._isConnect = false
    this.connectFun = connectFun
    this._sendMsgMap = {}
    wepy.connectSocket({
      url: 'ws://207.246.87.65:3001', // 'ws://localhost:3001'
      header: {
        'origin': '',
        'content-type': 'application/json'
      },
      method: 'GET'
    }).then((res) => {
      // console.log('then', res)
      // connectFun && connectFun()//这里可能比链接成功回调函数先调，也可能后调
      return res
    }).catch(err => {
      console.error('[ERROR] err: ', err)
      wepy.showModal({
        title: '提示',
        content: '连接失败，请请试！',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F'
      }).then((res) => {
        if (res.success) {
          this.connect()
        }
      })
    })

    wepy.onSocketClose(res => {
      this._isConnect = false
      console.error('WebSocket 已关闭！')
    })

    wepy.onSocketError(res => {
      this._isConnect = false
      console.error('WebSocket连接打开失败，请检查！')
    })

    wepy.onSocketOpen(res => {
      this._isConnect = true
      console.log('WebSocket连接已打开！')
      this.connectFun()
    })

    wepy.onSocketMessage(res => {
      let data = JSON.parse(res.data)
      console.log('收到服务器内容：', data)
      // console.log('this._sendMsgMap', this._sendMsgMap)
      let sendData = this._sendMsgMap[data.seqId]
      if (sendData) {
        sendData.callFun(data)
        delete this._sendMsgMap[data.seqId]
      } else {
        console.error('[ERROR] data is not send receive! ', data)
      }
      // this.sendMsg({name: 'east' + Math.floor(Math.random() * 100000)})
    })
  }

  static sendMsg(msg, msgId, callFun = null) {
    if (!this._isConnect) return
    msg.seqId = this.createSeqId()
    msg.msgId = msgId
    // console.log('sendMsg: ', msg)
    this._sendMsgMap[msg.seqId] = {seqId: msg.seqId, callFun: callFun}
    wepy.sendSocketMessage({
      data: JSON.stringify(msg) // 需要发送的内容
    }).then(res => {
      console.log('sendSocketMessage ok: ', res)
    }).catch(err => {
      console.log('sendSocketMessage err: ', err)
    })
  }
}
