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

export async function getMenu(param) {
  return request(`api/system/menus`, {
    method: 'GET',
    ...param,
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
