import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Table } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

import { getSortRules } from '../../services/system';

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class Sort extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.columns = [
      {
        title: '模块',
        dataIndex: 'module',
      },
      {
        title: '排序规则',
        dataIndex: 'rule',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.edit(record.key)}>编辑</a>
            </div>
          );
        },
      },
    ];
  }
  componentDidMount() {
    getSortRules().then(data => {
      this.setState({
        data: data.data.list,
      });
    });
  }

  edit(key) {}

  render() {
    return (
      <PageHeaderLayout title="排序管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              bordered
              dataSource={this.state.data}
              columns={this.columns}
              rowClassName="editable-row"
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
