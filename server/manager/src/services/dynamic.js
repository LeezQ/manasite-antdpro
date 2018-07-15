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

export async function getActivityList(param){
    return request('/api/discover/channel',{
      method:'GET',
      ...param
    })
}

export async function getShareList(param){
    return request('/api/discover/channel',{
      method:'GET',
      ...param
    })
}
