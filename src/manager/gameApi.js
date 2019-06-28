export default class gameApi {
  static hehe = 9999
  static sendEnterData() {
    let socketManager = require('./socketManager')
    console.log('test sendEnterData', socketManager)
    // socketManager.sendMsg({

    // }, 999, (res) => {
    //   console.log(res)
    // })
  }
}
