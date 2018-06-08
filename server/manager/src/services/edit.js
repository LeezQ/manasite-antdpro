import request from '../utils/request';
// subject
export async function subjectData(param){
    return request(`api/contents`,{
      method:'GET',
      ...param,
    })
}

// help
export async function helpData(param){
    return request(`api/contents`,{
      method:'GET',
      ...param,
    })
}