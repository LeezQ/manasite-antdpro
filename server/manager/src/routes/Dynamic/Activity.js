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

export default class Activity extends PureComponent {

  state={
    tabpage: "process"
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
            case "process":
                return {
                    firstData:<p>2018-01-01 00:00:00 <span style={{float:"right",color:"#1890ff"}}>已参加：100人</span></p>,
                }
            case "ended":
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
                    firstData:null,
                    secondData:null
                }
        }
    }

    render() {
        const { dynamic:{data},loading, form } = this.props;
        const { getFieldDecorator } = form;

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
              key: 'process',
              tab: '进行中',
              count:0
          },
          {
              key: 'ended',
              tab: '已结束',
              count:10
          },
          {
              key: 'deleted',
              tab: '已删除',
              count:0
          },
        ]

        return (
          <PageHeaderLayout title="活动管理">
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
                                              list && list.map(item=>
                                                  <Col md={6} sm={24} key={item.id} >
                                                    <CardItem
                                                        title={item.title}
                                                        cover={item.cover}
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
                                              <span>共 400 条记录 第 1 / 80 页</span>
                                              <Pagination style={{float:"right"}} showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
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
