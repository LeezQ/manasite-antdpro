import request from '../utils/request';

/**
 * 获取置换列表
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export async function getExchangeList(param){
    return request('/api/discover/channel',{
      method:'GET',
      ...param
    })
}

/**
 * 获取置换详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export async function getExchangeProfile(id){
    return request(`/api/exchanges/${id}`,{
      method:'GET',
    })
}

/**
 * 获取活动列表
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export async function getActivityList(param){
    return request('/api/discover/channel',{
      method:'GET',
      ...param
    })
}

/**
 * 获取活动详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export async function getActivityProfile(id){
    return request(`/api/activities/${id}`,{
      method:'GET',
    })
}

/**
 * 获取分享列表
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export async function getShareList(param){
    return request('/api/discover/channel',{
      method:'GET',
      ...param
    })
}

/**
 * 获取分享详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export async function getShareProfile(id){
    return request(`/api/shares/${id}`,{
      method:'GET',
    })
}

/**
 * 获取评价列表
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
export async function getComments(type){
    return request(`/api/comments/${type}/61`,{
      method:'GET',
    })
}
