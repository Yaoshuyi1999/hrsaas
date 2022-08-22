import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {} params 
 * @returns 
 */
export function getRolesApi(params){
    return request({
        url:'/sys/role',
        params,
    })
}

/**
 * 新增角色
 * @param {*} params 
 * @returns 
 */
export function addRolesApi(data){
    return request({
        url:'/sys/role',
        method:'POST',
        data,
    })
}

/**
 * 删除角色
 * @param {*} params 
 * @returns 
 */
 export function removeRolesApi(id){
    return request({
        url:'/sys/role/'+id,
        method:'DELETE',
    })
}

/**
 * 根据id获取角色详情
 * @param {*} id 
 * @returns 
 */
export function getRolesInfo(id){
    return request({
        url:'/sys/role/'+id,
    })
}

/**
 * 给角色分配权限
 * @param {*} data 
 * @returns 
 */
export function assignPerm(data) {
    return request({
      url: '/sys/role/assignPrem',
      method: 'put',
      data
    })
  }