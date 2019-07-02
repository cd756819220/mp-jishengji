import PlanData from '../data/planData'
import socketManager from './socketManager'
import msgData from '@/data/msgData'
export default class gameApi {
  static sendEnterData() {
    socketManager.sendMsg({}, msgData.GAME_ENTER.msgId, (res) => {
      // console.log('receiveMsg: ', res)
      PlanData.initData(res.list)
    })
  }

  static sendAddPlan(newPlan, callFun) {
    socketManager.sendMsg(newPlan, msgData.ADD_PLAN.msgId, (res) => {
      if (callFun) {
        callFun(res)
      }
    })
  }
}
