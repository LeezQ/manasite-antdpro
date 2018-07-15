import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))

@Form.create()
export default class Log extends PureComponent {
  constructor(props){
    super(props)
    this.state={}
    this.columns=[
      {
        title: '操作项',
        dataIndex: 'action',
      },
      {
        title: '相关模块',
        dataIndex: 'module',
      },
      {
        title: '管理员账号',
        dataIndex: 'account',
      },
      {
        title: 'IP',
        dataIndex: 'ip',
      },
      {
        title: '关联会员',
        dataIndex: 'member',
      },
      {
        title: '操作时间',
        dataIndex: 'time',
      }
    ]
  }
  componentDidMount() {
  }
  
  edit(key){
  
  }
  
  render(){
    
    return(
    <PageHeaderLayout title="日志管理">
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
    )
  }
}