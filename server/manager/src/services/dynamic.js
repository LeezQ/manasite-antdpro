import request from '../utils/request';

/**
 * 获取置换列表
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export async function getExchangeList(param){
    return request('/api/channels',{
      method:'POST',
      body:param
    })
}
