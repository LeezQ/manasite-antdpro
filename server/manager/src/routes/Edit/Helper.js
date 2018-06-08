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

export default class Helper extends Component{
    
    componentDidMount() {
        this.fetchMore();
      }
    fetchMore = () => {
     
    };
    handleTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
      }
    render() {  
        const { edit:{data},loading, form } = this.props; 
        const { getFieldDecorator } = form;
        const columns=[
            {
                title: '序号',
                dataIndex: '',
            },
            {
                title: '常见问题',
                dataIndex: '',
            },
            {
                title: '答案',
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

