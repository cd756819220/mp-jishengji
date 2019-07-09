import wepy from 'wepy'
export default class UserData {
  static _token = null
  static _wxLoginData = null

  static getToken() {
    this._token = this._token || wepy.getStorageSync('token')
    return this._token
  }

  static setToken(token) {
    this._token = token
    console.log('setToken: ', token)
    wepy.setStorageSync('token', token)
  }

  static setWxLoginData(wxLoginData) {
    this._wxLoginData = wxLoginData
  }

  static getWxLoginData() {
    return this._wxLoginData
  }
}
