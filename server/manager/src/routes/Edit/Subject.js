import React, { Component} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,DatePicker,Button,Input,Radio} from 'antd';

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
    render() {
        const { edit:{data},loading, form } = this.props;
        console.log(this.props);
        const { getFieldDecorator } = form;
        const columns=[
            {
                title: '专题ID',
                dataIndex: '',
            },
            {
                title: '专题页名称',
                dataIndex: '',
            },
            {
                title: '编辑者',
                dataIndex: '',
            },
            {
                title: '最后编辑时间',
                dataIndex: '',
            },
            {
                title: '操作',
                dataIndex: '',
            },
        ]
        return (
          <Card bordered={false}>
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
