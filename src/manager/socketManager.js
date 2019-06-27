import wepy from 'wepy'

export default class SocketManager {
  static isConnect = false

  static async connect() {
    this.isConnect = false
    wepy.connectSocket({
      url: 'ws://localhost:3001',
      header: {
        'origin': '',
        'content-type': 'application/json'
      },
      method: 'GET',
      success () {
        console.log('connect连接成功')
      },
      fail () {
        console.log('connect fail')
      }
    }).then((res) => {
      console.log('then', res)
      return res
    }).catch(err => {
      console.log('err', err)
    })

    wepy.onSocketClose(res => {
      this.isConnect = false
      console.log('WebSocket 已关闭！')
    })

    wepy.onSocketError(res => {
      this.isConnect = false
      console.log('WebSocket连接打开失败，请检查！')
    })

    wepy.onSocketOpen(res => {
      this.isConnect = true
      console.log('WebSocket连接已打开！')
      this.sendMsg({name: 'east'})
    })

    wepy.onSocketMessage(res => {
      console.log('收到服务器内容：' + res.data)
      this.sendMsg({name: 'east' + Math.random() * 100000})
    })
  }

  static sendMsg(msg) {
    if (!this.isConnect) return
    wepy.sendSocketMessage({
      data: JSON.stringify(msg), // 需要发送的内容
      success: res => {
        console.log('send success')
      },
      fail: () => {
        console.log('send fail')
      },
      complete: () => {
        console.log('send complete')
      }
    }).then(res => {
      console.log('sendSocketMessage ok: ', res)
    }).catch(err => {
      console.log('sendSocketMessage err: ', err)
    })
  }
}
