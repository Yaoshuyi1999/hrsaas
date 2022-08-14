import request from '@/utils/request'

/**
 * 获取员工列表(简单)
 * @returns 
 */
export function getEmployeesApi() {
    return request({
        url: '/sys/user/simple'
    })
}

/**
 * 获取员工列表
 * @param {*} params 
 * @returns 
 */
export function getEmployeesInfoApi(params) {
    return request({
        url: '/sys/user',
        params
    })
}

/**
 * 删除员工
 * @param {*} id 
 * @returns 
 */
export function delEmployee(id) {
    return request({
      url: `/sys/user/${id}`,
      method: 'delete'
    })
}

  /**
   * 新增员工的接口
   * @param {*} data 
   * @returns 
   */
export function addEmployees(data) {
    return request({
      method: 'post',
      url: '/sys/user',
      data
    })
  }

/**
 * 批量导入员工
 * @param {*} data 
 * @returns 
 */
  export function importEmployees(data) {
    return request({
      method: 'post',
      url: '/sys/user/batch',
      data
    })
  }
