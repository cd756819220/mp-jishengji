import PlanData from '../data/planData'
import socketManager from './socketManager'
import msgData from '@/data/msgData'
import userData from '@/data/userData'
export default class gameApi {
  static sendGetToken(code, callFun) {
    console.log('sendGetToken send!')
    socketManager.sendMsg({code: code}, msgData.GET_TOKEN.msgId, (res) => {
      console.log('sendGetToken res: ', res)
      userData.setToken(res.token)
      callFun && callFun(res)
    })
  }

  static sendEnterData(callFun) {
    socketManager.sendMsg({token: userData.getToken()}, msgData.LOGIN.msgId, (res) => {
      // console.log('receiveMsg: ', res)
      PlanData.initData(res.list)
      callFun && callFun(res)
    })
  }

  static sendAddPlan(newPlan, callFun) {
    socketManager.sendMsg(newPlan, msgData.ADD_PLAN.msgId, (res) => {
      if (callFun) {
        callFun && callFun(res)
      }
    })
  }

  static sendDeletePlan(planId, callFun) {
    socketManager.sendMsg({id: planId}, msgData.DEL_PLAN.msgId, (res) => {
      callFun && callFun(res)
    })
  }
}
