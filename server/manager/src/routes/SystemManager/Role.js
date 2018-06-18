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
  export default class User extends PureComponent { 
    constructor(props){
      super(props)
      this.state={}
      this.columns=[
        {
          title: '角色名称',
          dataIndex: 'rolename',
        },
        {
            title: '上级角色',
            dataIndex: '',
          },
        {
            title: '角色属性',
            dataIndex: 'name',
        }, 
        {
            title: '操作',
            dataIndex:'id',
            render: (text,record) => { 
              return (
                <div> 
                  <a onClick={() => this.edit(record.key)}>编辑</a>
                </div>
              );
            },
          },
    ] 
    }

    edit(key){

    }

    render(){

      return(
        <PageHeaderLayout title="角色管理">
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