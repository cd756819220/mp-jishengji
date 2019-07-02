import { formatDate } from '@/utils/util'
export default class PlanData {
  static _planList = []

  static initData(data) {
    this._planList = data
    this._planList.forEach(plan => {
      plan.hours = (plan.hours / 3600).toFixed(2)
      plan.create_time = formatDate(new Date(plan.create_time))
    })
    // this._planList = [
    //   {
    //     id: 1,
    //     image: '/images/reading.png',
    //     title: '阅读',
    //     remark: '书籍并不是没有生命的东西，它包藏着一种生命的潜力，与作者同样地活跃。不仅如此，它还像一个宝瓶，把作者生机勃勃的智慧中最纯净的精华保存起来。',
    //     create_time: '2018年2月24日',
    //     times: 0,
    //     hours: '5.22'
    //   },
    //   {
    //     id: 2,
    //     image: '/images/reading.png',
    //     title: '运动',
    //     remark: '一定要每天运动三十分钟',
    //     create_time: '2018年2月24日',
    //     times: 2,
    //     hours: '2.22'
    //   },
    //   {
    //     id: 3,
    //     image: '/images/reading.png',
    //     title: '吹牛',
    //     remark: '每天吹牛三十分钟',
    //     create_time: '2019年6月24日',
    //     times: 2,
    //     hours: '2.22'
    //   }
    // ]
  }

  static getPlanList() {
    return this._planList
  }

  static getPlanDataById(id) {
    for (let index = 0; index < this._planList.length; index++) {
      if (this._planList[index].id === id) {
        return this._planList[index]
      }
    }
    console.error('[ERROR] getPlanDataById id is not exist!', id)
    return null
  }

  static addPlan(data) {
    this._planList.push(data)
  }
}
