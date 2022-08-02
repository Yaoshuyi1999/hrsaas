import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data password mobile 
 * @return promise
 */
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data,
    })
}
/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
    return request({
        url: '/sys/profile',
        method: 'POST',
    })
}

export function getUserDetail(id) {
    return request({
        url: `/sys/user/${id}`,
    })
}