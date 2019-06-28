import wepy from 'wepy'
import PlanData from '../data/planData'
import gameApi from './gameApi'

export default class SocketManager {
  static _isConnect = false
  static _seqId = 0;
  static _sendMsgMap = {}

  static createSeqId() {
    return this._seqId++
  }

  static async connect() {
    this._isConnect = false
    this._sendMsgMap = {}
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
      // this.sendMsg({name: 'east'})
      // this._initAllData()
      gameApi.sendEnterData()
      console.log('gameApi', gameApi.hehe)
    })

    wepy.onSocketMessage(res => {
      console.log('收到服务器内容：' + res.data)
      if (this._sendMsgMap.seqId === res.seqId) {
        this._sendMsgMap.callFun(res)
        delete this._sendMsgMap.seqId
      }
      // this.sendMsg({name: 'east' + Math.floor(Math.random() * 100000)})
    })
  }

  static _initAllData() {
    PlanData.initData()
  }

  static sendMsg(msg, msgId, callFun = null) {
    if (!this._isConnect) return
    msg.seqId = this.createSeqId()
    msg.msgId = msgId
    this._sendMsgMap[msg.seqId] = {seqId: msg.seqId, callFun: callFun}
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

module.exports = SocketManager
