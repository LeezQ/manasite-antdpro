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
      exchange_state: "waiting",
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
        this.setState({exchange_state:value},()=>{
            this.loadList();
        })
    }

    onShowSizeChange=(current, pageSize)=>{
        console.log(current, pageSize);
    }

    onSearch = (condition) => {
        this.setState({
            ...condition
        },()=>{
            this.loadList();
        })
    }

    onDelete=(id)=>{
        const {dispatch} = this.props;
        dispatch({
          type: 'dynamic/delete',
          payload:{
            id:id,
            reason:1
          },
          callback:()=>{
              this.loadList();
          }
        });
    }

    renderPrompt(record){
        let {exchange_state} = this.state;
        switch(exchange_state){
            case "exchange":
                return {
                    firstData:<p>{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>,
                    secondData: <p>小瓜子：已发货</p>
                }
            case "question":
                return {
                    firstData:<p>{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>,
                    secondData:
                        <p>小瓜子：
                            <span style={{color:"red"}}>存在异议</span>
                            <span style={{float:"right",color:"#1890ff"}}>查看证据</span>
                        </p>
                }
            case "finished":
                return {
                    firstData:<p>{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>,
                };
            case "deleted":
                return {
                    firstData:"",
                    secondData:
                        <p>
                            <span>于{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")} 被投诉删除</span>
                            <span style={{display:"block",color:"#1890ff"}}>查看投诉记录</span>
                        </p>
                }
            default:
                return {
                    firstData:<p>{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}
                                  <span style={{float:"right"}}>收到申请：{record.stat.wanted??0}</span>
                              </p>,
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
                <Tabs defaultActiveKey={this.state.exchange_state} onChange={this.onTabChange}>
                    {
                        tabList.map(item=>
                            <TabPane tab={<span>{item.tab}<Badge className={styles.badge} count={item.count} /></span>} key={item.key}>
                                  {
                                      this.state.exchange_state==item.key &&
                                      <Row>
                                          <div className={styles.tableListForm}>
                                              <Search onSearch={this.onSearch}/>
                                          </div>
                                          {
                                              list && list.map(record=>
                                                  <Col md={6} sm={24} key={record.id} >
                                                    <CardItem
                                                        title={record.title || "置换宝贝"}
                                                        cover={record.avatar}
                                                        link = {`/dynamic/exprofile/${record.id}`}
                                                        nickName={record.nickname}
                                                        onDelete={this.state.tabpage!="deleted"?()=>this.onDelete(record.id):null}
                                                        extendData={
                                                            this.renderPrompt(record)
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
