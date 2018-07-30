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

export async function addData(param){
    return request(`api/contents`,{
      method:'POST',
      body:param
    })
}

/**
 * 删除内容
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export async function deleteContent(param){
  return request(`/api/contents/${param.id}`,{
    method:'delete',
  })
}
