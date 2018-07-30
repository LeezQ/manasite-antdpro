import React, { Component} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,DatePicker,Button,Input,Radio,Popconfirm} from 'antd';
import {Link} from 'react-router-dom';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.less';

const FormItem = Form.Item;


@Form.create()
@connect(({ edit, loading }) => ({
    edit,
  loading: loading.models.edit,
}))

export default class Edit extends Component{
    state = {
        type:"special"
    }

    componentDidMount() {
        this.fetchMore();
    }

    fetchMore = () => {
        const {dispatch} = this.props;
        dispatch({
          type: 'edit/subject',
          payload:{
            ...this.state
          }
        });
    };
    handleTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
    }

    handleDelete=(id)=>{
        const {dispatch} = this.props;
        dispatch({
          type: 'edit/delete',
          payload:{
            id:id,
          },
          callback: () => {
              this.fetchMore();
          }
        });
    }

    render() {
        const { edit:{data},loading, form } = this.props;
        const { getFieldDecorator } = form;
        const columns=[
            {
                title: '专题ID',
                dataIndex: 'id',
            },
            {
                title: '专题页名称',
                dataIndex: 'title',
            },
            {
                title: '编辑者',
                dataIndex: 'nickname',
            },
            {
                title: '最后编辑时间',
                dataIndex: 'create_at',
                render:(text)=>{
                    return moment(text).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: '操作',
                dataIndex: '',
                render: (text, record) => {
                    return (
                      <Popconfirm title="是否删除当前专题记录?" onConfirm={() => this.handleDelete(record.id)}>
                        <a href="javascript:void(0);">删除</a>
                      </Popconfirm>
                    );
                  }
            }
        ]
        return (
          <Card bordered={false}>
            <Link to="/edit/content/special">
                <Button type='primary' style={{marginBottom:10}}>增加专题</Button>
            </Link>
            <div className={styles.tableList}>
              <StandardTable
                loading={loading}
                data={data}
                columns={columns}
                onChange={this.handleTableChange}
              />
            </div>
          </Card>
        )
    }

}
