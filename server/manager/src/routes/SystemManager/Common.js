import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Tabs, Button, Table } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Common.less';
import { dictionaries } from '../../services/system';

const TabPane = Tabs.TabPane;

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class Source extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    dictionaries({ type: 'feedback' }).then(data => {
      console.log(data);
      if (data.status === 'ok') {
        // this.setState({ sourceData: data.data.list });
      }
    });
  }

  render() {
    const dataSource = [
      {
        key: '1',
        name: '对方的回复速度',
        age: '双方',
        address: '1. 回复速度很快',
      },
      {
        key: '2',
        name: '对方的态度',
        age: '双方',
        address: '1. 回复速度很快',
      },
      {
        key: '3',
        name: '对方的信任感',
        age: '双方',
        address: '1. 回复速度很快',
      },
    ];

    const columns = [
      {
        title: '评价标题',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '评价方',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '排位：评价选项',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
      <PageHeaderLayout title="评价管理">
        <Card>
          <Tabs
            tabBarExtraContent={
              <Button type="primary" href="#/system/common?isEdit=true" target="_blank">
                修改评价
              </Button>
            }
          >
            <TabPane tab="置换-确认收货" key="1">
              <Table dataSource={dataSource} columns={columns} />
            </TabPane>
            <TabPane tab="..." key="2">
              Content of tab 2
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
