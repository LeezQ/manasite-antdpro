import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,Tabs,Badge,Pagination} from 'antd';

import CardItem from './CardItem';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Search from './Search';

import styles from './index.less';

const TabPane = Tabs.TabPane;

@Form.create()
@connect(({ dynamic, loading }) => ({
    dynamic,
    loading: loading.models.dynamic,
}))

export default class Exchange extends PureComponent {

    state = {
      type:"exchange",
      status: "waiting",
      uid:"-1",
    }

    componentDidMount() {
        this.loadList();
    }

    loadList(){
        const {dispatch} = this.props;
        dispatch({
          type: 'dynamic/fetchExchange',
          payload:{
            ...this.state
          }
        });
    }

    onTabChange=(value)=>{
        this.setState({status:value})
    }

    onShowSizeChange=(current, pageSize)=>{
        console.log(current, pageSize);
    }

    onSearch = (condition) => {
        this.setState({
            ...condition
        },()=>{
            console.log(this.state);
            this.loadList();
        })
    }

    onDelete=(id)=>{

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
                <Tabs defaultActiveKey={this.state.status} onChange={this.onTabChange}>
                    {
                        tabList.map(item=>
                            <TabPane tab={<span>{item.tab}<Badge className={styles.badge} count={item.count} /></span>} key={item.key}>
                                  {
                                      this.state.status==item.key &&
                                      <Row>
                                          <div className={styles.tableListForm}>
                                              <Search onSearch={this.onSearch}/>
                                          </div>
                                          {
                                              list && list.map(record=>
                                                  <Col md={6} sm={24} key={record.id} >
                                                    <CardItem
                                                        title={record.title || "未知标题"}
                                                        cover={record.media.length>0 && record.media[0].url}
                                                        link = {`/dynamic/exprofile/${record.id}`}
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
