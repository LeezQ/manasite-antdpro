import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker,Tabs,Badge,Pagination} from 'antd';

import CardItem from './CardItem';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Search from './Search';

import styles from './index.less';

const FormItem=Form.Item
const TabPane = Tabs.TabPane;

@Form.create()
@connect(({ dynamic, loading }) => ({
    dynamic,
    loading: loading.models.dynamic,
}))

export default class Activity extends PureComponent {

    state = {
        type:"activity",
        activity_state: "process",
    }

    componentDidMount() {
        this.loadList();
    }

    loadList(){
        const {dispatch} = this.props;
        dispatch({
          type: 'dynamic/fetchActivity',
          payload:{
            ...this.state
          }
        });
    }

    onTabChange=(value)=>{
        this.setState({activity_state: value},() => {
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
        let {activity_state} = this.state;
        switch(activity_state){
            case "process":
                return {
                    firstData:<p>{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")} <span style={{float:"right",color:"#1890ff"}}>已参加：100人</span></p>,
                }
            case "ended":
                return {
                    firstData:<p>{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
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
                    firstData:null,
                    secondData:null
                }
        }
    }

    render() {
        const { dynamic:{data},loading, form } = this.props;
        const { getFieldDecorator } = form;
        const {list,pagination={}} = data.list;

        const tabList=[
          {
              key: 'process',
              tab: '进行中',
              count:0
          },
          {
              key: 'ended',
              tab: '已结束',
              count:0
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
                <Tabs defaultActiveKey={this.state.activity_state} onChange={this.onTabChange}>
                    {
                        tabList.map(item=>
                            <TabPane tab={<span>{item.tab}<Badge className={styles.badge} count={item.count} /></span>} key={item.key}>
                                  {
                                      this.state.activity_state==item.key &&
                                      <Row>
                                          <div className={styles.tableListForm}>
                                            <Search onSearch={this.onSearch}/>
                                          </div>
                                          {
                                              list && list.map(record=>
                                                  <Col md={6} sm={24} key={record.id} >
                                                    <CardItem
                                                        title={record.title || "活动"}
                                                        cover={record.avatar}
                                                        link = {`/dynamic/acprofile/${record.id}`}
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
