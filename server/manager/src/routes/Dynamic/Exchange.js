import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker,Tabs,Badge,Pagination} from 'antd';

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

export default class Exchange extends PureComponent {

  state={
    tabpage: "waiting"
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dynamic/fetchExchange',
      payload:{
        type:"exchange"
      }
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
              <FormItem label="芥摩号">
                {getFieldDecorator('no')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={9} sm={24} >
              <FormItem label="昵称">
                {getFieldDecorator('nickName')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}>
              <FormItem label="发布日期">
                {getFieldDecorator('date')(
                  <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
            )}
              </FormItem>
            </Col>
            <Col md={9} sm={24} >
              <FormItem label="标题">
                {getFieldDecorator('title')(<Input placeholder="请输入" />)}
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
            case "exchange":
                return {
                    firstData:<p>2018-01-01 00:00:00</p>,
                    secondData: <p>小瓜子：已发货</p>
                }
            case "question":
                return {
                    firstData:<p>2018-01-01 00:00:00</p>,
                    secondData:
                        <p>小瓜子：
                            <span style={{color:"red"}}>存在异议</span>
                            <span style={{float:"right",color:"#1890ff"}}>查看证据</span>
                        </p>
                }
            case "finished":
                return {
                    firstData:<p>2018-01-01 00:00:00</p>
                };
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
                    firstData:<p>2018-01-01 00:00:00 <span style={{float:"right"}}>收到申请：10</span></p>,
                    secondData:""
                }
        }
    }

    render() {
        const { dynamic:{data},loading, form } = this.props;
        const { getFieldDecorator } = form;
        const {list,pagination={}} = data.list;

        const tabList=[
          {
              key: 'waiting',
              tab: '待置换',
              count:0
          },
          {
              key: 'exchange',
              tab: '交换中',
              count:0
          },
          {
              key: 'question',
              tab: '有异议',
              count:0
          },
          {
              key: 'finished',
              tab: '已完成',
              count:0
          },
          {
              key: 'deleted',
              tab: '已删除',
              count:0
          },
        ]

        return (
          <PageHeaderLayout title="置换管理">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <Tabs defaultActiveKey={this.state.tabpage} onChange={this.onTabChange}>
                    {
                        tabList.map(item=>
                            <TabPane tab={<span>{item.tab}<Badge className={styles.badge} count={item.count} /></span>} key={item.key}>
                                  {
                                      this.state.tabpage==item.key &&
                                      <Row>
                                          <div className={styles.tableListForm}>{this.renderForm()}</div>
                                          {
                                              list && list.map(record=>
                                                  <Col md={6} sm={24} key={record.id} >
                                                    <CardItem
                                                        title={record.title || "未知标题"}
                                                        cover={record.media.length>0 && record.media[0].url}
                                                        depict="心爱的球拍割舍，希望能有新主人也会善待它"
                                                        onDelete={this.state.tabpage!="deleted"?()=>{}:null}
                                                        extendData={
                                                            this.renderPrompt()
                                                        }
                                                      />
                                                  </Col>
                                              )
                                          }
                                          <Col md={24} sm={24} style={{marginTop:10}} >
                                              <span>共 {pagination.total} 条记录</span>
                                              <Pagination
                                                style={{float:"right"}}
                                                showSizeChanger
                                                onShowSizeChange={this.onShowSizeChange}
                                                defaultCurrent={pagination.current}
                                                total={pagination.current} />
                                          </Col>
                                      </Row>
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
