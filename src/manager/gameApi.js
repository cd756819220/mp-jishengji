import PlanData from '../data/planData'

export default class gameApi {
  static hehe = 9999
  static sendEnterData() {
    let socketManager = require('./socketManager')
    console.log('test sendEnterData', socketManager.sendMsg)
    socketManager.sendMsg({

    }, 999, (res) => {
      // console.log('receiveMsg: ', res)
      PlanData.initData(res.list)
    })
    console.log('sendEnterData completed')
  }
}
