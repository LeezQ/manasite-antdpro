import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class Subject extends Component {
    state={
      tabKey:'subject',
    }

    handleTabChange = key => {
        const { dispatch, match } = this.props;
        switch (key) {
          case 'subject':
            this.setState({tabKey:'subject'})
            dispatch(routerRedux.push(`${match.url}/subject`));
            break;
          case 'help':
            this.setState({tabKey:'help'})
            dispatch(routerRedux.push(`${match.url}/help`));
            break;
          default:
            break;
        }
    };

    render(){
        const tabList = [
        {
            key: 'subject',
            tab: '专题页',
        },
        {
            key: 'help',
            tab: '帮助中心',
        },
        ];
        const mainSearch = (
          <div style={{ textAlign: 'right' }} >

            {this.state.tabKey==='subject'?<Button type='primary'>增加专题</Button>:<Button type='primary'>增加帮助</Button>}
          </div>
        );
        const { match, routerData, location } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
          <PageHeaderLayout
            title="编辑管理"
            content={mainSearch}
            tabList={tabList}
            tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
            onTabChange={this.handleTabChange}
          >
            <Switch>
              {routes.map(item => (
                <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
            </Switch>
          </PageHeaderLayout>
        )
    }
}
