import request from '@/utils/request'

/**
 * 获取组织架构的数据
 * @returns 
 */
export function getDeptsApi(){
    return request({
        url:'/company/department',
    })
}

/**
 * 删除部门
 * @param {*} id 
 * @returns 
 */
export function delDeptsApi(id) {
    return request({
        url: '/company/department/'+ id,
        method: 'DELETE'
    })
}

/**
 * 
 * @param {object} data 
 * code 部门编码,同级部门不可重复
 * introduce 介绍
 * manager 负责人名称
 * name 部门名称
 * pid 父级部门ID
 * @returns promise
 */
export function addDeptsApi(data) {
    return request({
        url: '/company/department',
        method: 'POST',
        data
    })
}

/**
 * 根据id获取部门详情
 * @param {string} id 
 * @returns 
 */
export function getDeptByIdApi(id) {
    return request({
        url: '/company/department/'+id,
    })
}

/**
 * 根据id修改部门
 * @param {*} data 
 * @returns 
 */
export function editDeptByIdApi(data) {
    return request({
        url: '/company/department/'+data.id,
        method: 'PUT',
        data,
    })
}