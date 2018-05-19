import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'home',
    path: 'home'
  },
  {
    name: '会员管理',
    icon: 'user',
    path: 'users/list'
  },
  {
    name: '兴趣频道管理',
    icon: 'appstore',
    path: 'channel/list'
  },
  {
    name: '财务报表',
    icon: 'profile',
    path: 'blank1',
    children: [
      {
        name: '收费记录',
        path: 'blank2',
      },
      {
        name: '押金流水',
        path: 'blank3'
      },
      {
        name: '充值记录',
        path: 'blank4'
      },
      {
        name: '提现记录',
        path: 'blank5'
      }
    ]
  },
  {
    name: '编辑管理',
    icon: 'edit',
    path: 'blank6'
  },
  {
    name: '数据统计',
    icon: 'pie-chart',
    path: 'blank7'
  },
  {
    name: '客服系统',
    icon: 'customerservice',
    path: 'blank8'
  },
  {
    name: '系统设置',
    icon: 'setting',
    path: 'blank9',
    authority: 'admin',
    children: [
      {
        name: '角色管理',
        path: 'blank10',
      },
      {
        name: '资源管理',
        path: 'blank11',
      },
      {
        name: '日志管理',
        path: 'blank12',
      },
      {
        name: '排序管理',
        path: 'blank13',
      },
      {
        name: '评价管理',
        path: 'blank14',
      }
    ]
  }
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
