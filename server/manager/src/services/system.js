import request from '../utils/request';
// roles
export async function roles(param){
    return request(`api/system/roles`,{
      method:'GET',
      ...param,
    })
}

export async function getMenu(param){
  return request(`api/system/menus`,{
    method:'GET',
    ...param,
  })
}

