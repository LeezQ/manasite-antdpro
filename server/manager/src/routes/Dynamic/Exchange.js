import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker,Tabs,Badge} from 'antd';

import CardTable from 'components/CardTable';
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
      type: 'financial/present',
    });
  }

  onTabChange=(value)=>{
      this.setState({tabpage:value})
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
              key: 'waiting',
              tab: '待置换',
          },
          {
              key: 'exchange',
              tab: '交换中',
          },
          {
              key: 'question',
              tab: '有异议',
          },
          {
              key: 'finished',
              tab: '已完成',
          },
          {
              key: 'deleted',
              tab: '已删除',
          },
        ]

        return (
          <PageHeaderLayout title="置换管理">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <Tabs defaultActiveKey={this.state.tabpage} onChange={this.onTabChange}>
                    {
                        tabList.map(item=>
                            <TabPane tab={item.tab} key={item.key}>
                                  {
                                      this.state.tabpage==item.key &&
                                      <div>
                                          <div className={styles.tableListForm}>{this.renderForm()}</div>
                                          <CardTable
                                            loading={loading}
                                            data={_data}
                                            onChange={this.handleStandardTableChange}
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
