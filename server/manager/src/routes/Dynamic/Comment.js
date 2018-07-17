import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker,Tabs,Badge,Pagination,Icon} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem=Form.Item
const TabPane = Tabs.TabPane;

@Form.create()
@connect(({ dynamic, loading }) => ({
    dynamic,
    loading: loading.models.dynamic,
}))

export default class Share extends PureComponent {

  state={
    tabpage: "exchange",
    selectedRowKeys: []
  }

  componentDidMount() {
      this.loadComments();
  }

  loadComments(){
      const {dispatch} = this.props;
      dispatch({
        type: 'dynamic/fetchComments',
        payload:{
          type: this.state.tabpage
        }
      });
  }

  onTabChange=(value)=>{
      this.setState({tabpage:value},()=>{
          this.loadComments();
      })
  }

  onShowSizeChange=(current, pageSize)=>{
      console.log(current, pageSize);
  }

    renderForm() {
      const { getFieldDecorator } = this.props.form;
      return(
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={9} sm={24} >
              <FormItem label="评论关键字">
                {getFieldDecorator('keyword')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24} >
              <div style={{ overflow: 'hidden' }}>
                <span style={{ float: 'left', marginBottom: 24 }}>
                  <Button type="primary" htmlType="submit">
                查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
                  </Button>
                </span>
              </div>
            </Col>
          </Row>
        </Form>
      )
    }

    render() {
        const { dynamic:{data},loading, form } = this.props;
        const {selectedRowKeys} = this.state;
        const { getFieldDecorator } = form;
        const columns=[
            {
              title: '评论内容',
              dataIndex: 'title',
            },
            {
              title: '评论方',
              dataIndex: 'creator',
            },
            {
              title: '评论置换',
              dataIndex: 'charge_fee',
            },
            {
              title: '评论时间',
              dataIndex: 'createdAt',
            },
            {
              title: '操作',
              dataIndex: '',
              render:()=>{
                  return <a href="javascript:void(0)">删除</a>
              }
            },
        ]

        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };

        const tabList=[
          {
              key: 'exchange',
              tab: '置换评论',
              count:10
          },
          {
              key: 'activity',
              tab: '活动评论',
              count:0
          },
          {
              key: 'share',
              tab: '分享评论',
              count:0
          },
        ]

        return (
          <PageHeaderLayout title="评论管理">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <Tabs defaultActiveKey={this.state.tabpage} onChange={this.onTabChange}>
                    {
                        tabList.map(item=>
                            <TabPane tab={<span>{item.tab}<Badge className={styles.badge} count={item.count} /></span>} key={item.key}>
                                  {
                                      this.state.tabpage==item.key &&
                                      <div>
                                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                                        <div>
                                            <span className={styles.checkIcon}><Icon type="check-circle-o" /> 全选</span>
                                            <Button type="primary">批量删除</Button>
                                        </div>
                                        <StandardTable
                                          rowSelection={rowSelection}
                                          loading={loading}
                                          data={data.list}
                                          columns={columns}
                                          onChange={this.handleTableChange}
                                        />
                                      </div>
                                  }
                            </TabPane>
                        )
                    }
                </Tabs>
              </div>
            </Card>
          </PageHeaderLayout>
        )
    }
}
