import request from '../utils/request';
// roles
export async function roles(param) {
  return request(`api/system/roles`, {
    method: 'GET',
    ...param,
  });
}

// roles
export async function addRole(param) {
  return request(`api/system/roles`, {
    method: 'POST',
    body: param,
  });
}

// roles
export async function updateRole(roleId, param) {
  return request(`api/system/roles/${roleId}`, {
    method: 'POST',
    body: param,
  });
}

// create menu
export async function addMenu(param) {
  return request(`api/system/menus`, {
    method: 'POST',
    body: param,
  });
}

export async function getMenu(param) {
  return request(`api/system/menus`, {
    method: 'GET',
    ...param,
  });
}

export async function updateMenu(param, id) {
  return request(`api/system/menus/${id}`, {
    method: 'POST',
    body: param,
  });
}

export async function deleteMenu(id) {
  return request(`api/system/menus/${id}`, {
    method: 'DELETE',
  });
}

export async function source(param) {
  return request(`api/system/source`, {
    method: 'GET',
    ...param,
  });
}

export async function getSortRules(param) {
  return request(`api/system/sort_rules`, {
    method: 'GET',
    ...param,
  });
}

/**
 * 评价
 * @param {*} param
 */
export async function dictionaries(param) {
  return request(`/api/system/dictionaries`, {
    method: 'GET',
    ...param,
  });
}

/**
 * 提交评价
 * @param {*} param
 */
export async function saveDictionaries(param, id) {
  return request(`/api/system/dictionaries/${id}`, {
    method: 'POST',
    body: param,
  });
}
