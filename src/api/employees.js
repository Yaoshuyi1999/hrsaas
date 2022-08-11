import request from '@/utils/request'

/**
 * 获取员工列表
 * @returns 
 */
export function getEmployeesApi() {
    return request({
        url: '/sys/user/simple'
    })
}

export function getEmployeesInfoApi(params) {
    return request({
        url: '/sys/user',
        params
    })
}