import request from "../request/request"

export function getUserInfo () {
  return request({
    url: 'user/current',
    method: 'GET'
  })
}