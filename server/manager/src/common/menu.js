import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'home',
    path: 'home',
  },
  {
    name: '会员管理',
    icon: 'user',
    path: 'users/list',
  },
  {
    name: '兴趣频道管理',
    icon: 'appstore',
    path: 'channel/list',
  },
  {
    name: '财务报表',
    icon: 'profile',
    path: 'financial',
    children: [
      {
        name: '收费记录',
        path: 'chargerecord',
      },
      {
        name: '押金流水',
        path: 'deposit',
      },
      {
        name: '充值记录',
        path: 'presentrecord',
      },
      {
        name: '提现记录',
        path: 'rechargerecord',
      },
    ],
  },
  {
    name: '客服系统',
    icon: 'customerservice',
    path: 'blank8',
  },
  {
    name: '编辑管理',
    icon: 'edit',
    path: '/edit/subject',
  },
  {
    name: '数据统计',
    icon: 'pie-chart',
    path: 'blank7',
  },
  {
    name: '动态管理',
    icon: 'customerservice',
    path: 'blank8',
    children: [
      {
        name: '置换管理',
        path: 'exchange',
      },
      {
        name: '活动管理',
        path: 'activity',
      },
      {
        name: '分享管理',
        path: 'share',
      },
      {
        name: '评论管理',
        path: 'comment',
      },
    ],
  },
  {
    name: '系统设置',
    icon: 'setting',
    path: 'system',
    authority: 'admin',
    children: [
      {
        name: '用户管理',
        path: 'user',
      },
      {
        name: '角色管理',
        path: 'role',
      },
      {
        name: '资源管理',
        path: 'source',
      },
      {
        name: '日志管理',
        path: 'log',
      },
      {
        name: '排序管理',
        path: 'sort',
      },
      {
        name: '评价管理',
        path: 'common',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
