import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker,Tabs,Badge,Pagination,Icon} from 'antd';

import StandardTable from 'components/StandardTable';
import CardItem from './CardItem';
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
    const {dispatch} = this.props;
    dispatch({
      type: 'financial/present',
    });
  }

  onTabChange=(value)=>{
      this.setState({tabpage:value})
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

    renderPrompt(){
        let {tabpage} = this.state;
        switch(tabpage){
            case "public":
                return {
                    firstData:<p>2018-01-01 00:00:00 <span style={{float:"right",color:"#1890ff"}}>已参加：100人</span></p>,
                }
            case "deleted":
                return {
                    firstData:"",
                    secondData:
                        <p>
                            <span>于2018-3-19 20:50:10 被投诉删除</span>
                            <span style={{display:"block",color:"#1890ff"}}>查看投诉记录</span>
                        </p>
                }
            default:
                return {
                    firstData:null,
                    secondData:null
                }
        }
    }

    render() {
        const { dynamic:{data},loading, form } = this.props;
        const {selectedRowKeys} = this.state;
        const { getFieldDecorator } = form;
        const columns=[
            {
              title: '评论内容',
              dataIndex: 'comment',
            },
            {
              title: '评论方',
              dataIndex: 'topic_id',
            },
            {
              title: '评论置换',
              dataIndex: 'charge_fee',
            },
            {
              title: '评论时间',
              dataIndex: 'create_at',
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

        const list =[];
        for(let i =0;i<10;i++){
            list.push({
                id:i,
                cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531500848047&di=1d4389597aaadaf4a049b254663dfee3&imgtype=0&src=http%3A%2F%2Fuploads.oh100.com%2Fallimg%2F1710%2F129-1G011154315334.jpg",
                title:'JAM0000008   小瓜子',
                createdAt:'2018-10-10 00:00:00',
                applyCount:12
            })
        }
        //临时数据
        const _data={
            list:list,
            pagination:{}
        }
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
                                          data={data}
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
