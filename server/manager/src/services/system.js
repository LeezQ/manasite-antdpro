import request from '../utils/request';
// roles
export async function roles(param){
    return request(`api/system/roles`,{
      method:'GET',
      ...param,
    })
} 