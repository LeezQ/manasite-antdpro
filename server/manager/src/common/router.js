import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/home': {
      component: dynamicWrapper(app, [], () => import('../routes/Home')),
    },
    '/users/list': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/UserManage/UserList')),
    },
    '/users/detailform': {
      component: dynamicWrapper(app, ['user', 'discover'], () =>
        import('../routes/UserManage/UserDetail')
      ),
    },
    '/users/editform': {
      component: dynamicWrapper(app, ['user', 'discover'], () =>
        import('../routes/UserManage/UserEdit')
      ),
    },
    '/users/followdata': {
      component: dynamicWrapper(app, ['user', 'follow'], () =>
        import('../routes/UserManage/ContactData')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/channel/list': {
      component: dynamicWrapper(app, ['channel'], () =>
        import('../routes/ChannelManage/ChannelList')
      ),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/blank*': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/Blank')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    // 财务报表
    '/financial/chargerecord': {
      component: dynamicWrapper(app, ['financial', 'user'], () =>
        import('../routes/Financial/ChargeRecord')
      ),
    },
    '/financial/deposit': {
      component: dynamicWrapper(app, ['financial', 'user'], () =>
        import('../routes/Financial/Deposit')
      ),
    },
    '/financial/presentrecord': {
      component: dynamicWrapper(app, ['financial', 'user'], () =>
        import('../routes/Financial/PresentRecord')
      ),
    },
    '/financial/rechargerecord': {
      component: dynamicWrapper(app, ['financial', 'user'], () =>
        import('../routes/Financial/RechargeRecord')
      ),
    },
    // 编辑管理
    '/edit': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/Edit/Edit')),
    },
    '/edit/subject': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/Edit/Subject')),
    },
    '/edit/help': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/Edit/Helper')),
    },
    '/edit/content/:type': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/Edit/EditForm')),
    },
    // 活动管理-置换管理
    '/dynamic/exchange': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () =>
        import('../routes/Dynamic/Exchange')
      ),
    },
    '/dynamic/activity': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () =>
        import('../routes/Dynamic/Activity')
      ),
    },
    '/dynamic/share': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () => import('../routes/Dynamic/Share')),
    },
    '/dynamic/comment': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () =>
        import('../routes/Dynamic/Comment')
      ),
    },
    '/dynamic/exprofile/:id': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () =>
        import('../routes/Dynamic/ExchangeProfile')
      ),
    },
    '/dynamic/acprofile/:id': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () =>
        import('../routes/Dynamic/ActivityProfile')
      ),
    },
    '/dynamic/shprofile/:id': {
      component: dynamicWrapper(app, ['dynamic', 'user'], () =>
        import('../routes/Dynamic/ShareProfile')
      ),
    },
    // 系统管理
    '/system/user': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/SystemManager/User')),
    },
    '/system/role': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/SystemManager/Role')),
    },
    '/system/common': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/SystemManager/Common')),
    },
    '/system/log': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/SystemManager/Log')),
    },
    '/system/sort': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/SystemManager/Sort')),
    },
    '/system/source': {
      component: dynamicWrapper(app, ['edit'], () => import('../routes/SystemManager/Source')),
    },
  };

  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }

    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };

    routerData[path] = router;
  });

  return routerData;
};
