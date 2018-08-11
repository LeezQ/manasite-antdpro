import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem=Form.Item

@Form.create()
@connect(({ financial, loading }) => ({
    financial,
    loading: loading.models.financial,
}))

export default class PresentRecord extends PureComponent {

  state={
    presentType:0,
  }

  componentDidMount() {
      this.loadList();
      this.loadSum();
  }

  loadList(){
      const {dispatch} = this.props;
      dispatch({
        type: 'financial/present',
        payload:{
            user_id:"-1",
            ...this.state
        }
      });
  }

  loadSum(){
      const {dispatch} = this.props;
      dispatch({
        type: 'financial/statSum',
        payload:{
            user_id: -1
        }
      });
  }

  handlePresentTypeChange=(e)=>{
    this.setState({presentType:e.target.value})
  }

  handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if(err)
              return;

          let _keyword={};

          if(values["uid"])
              _keyword['uid'] = values["uid"];

          if(values["no"])
              _keyword['no'] = values["no"];

          if(values["date"])
              _keyword['date'] = values['date'].format('YYYY-MM-DD');

          this.setState({
              ...this.state,
              ..._keyword
          },()=>{
              this.loadList();
          })
      });
  }

    renderForm() {
      const { getFieldDecorator } = this.props.form;
      return(
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} >
              <FormItem label="芥摩号">
                {getFieldDecorator('uid')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24} >
              <FormItem label="流水号">
                {getFieldDecorator('no')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="提现日期">
                {getFieldDecorator('date')(
                  <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
            )}
              </FormItem>
            </Col>
            <Col md={8} sm={24} >
              <Radio.Group value={this.state.presentType} onChange={this.handlePresentTypeChange}>
                <Radio.Button value={0}>不限</Radio.Button>
                <Radio.Button value={1}>微信</Radio.Button>
                <Radio.Button value={2}>支付宝</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
            查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
              </Button>
            </span>
          </div>
        </Form>
      )
    }

    render() {
        const { financial:{data,stat={}},loading, form } = this.props;
        const { getFieldDecorator } = form;
        const columns=[
          {
            title: '流水号',
            dataIndex: 'trade_sn',
          },
          {
            title: '芥摩号',
            dataIndex: 'user_id',
          },
          {
            title: '用户名',
            dataIndex: 'nickname',
          },
          {
            title: '提现方式',
            dataIndex: '',
            render:(text,record)=>{
                var _types=['','支付宝','微信','App内购','其他'];
                if(record.charge.pay_by>=_types.length)
                  return "未知";
                return _types[record.charge.pay_by];
            }
          },
          {
            title: '提现金额(元)',
            dataIndex: 'fee',
          },
          {
            title: '支付账号',
            dataIndex: '',
            ender:(text,record)=>{
                return record.charge.pay_account;
            }
          },
          {
            title: '提现时间',
            dataIndex: 'create_at',
            render:text=>{
                return moment(text).format("YYYY-MM-DD HH:mm:ss")
            }
          },
      ]
        const content=(
          <div className={styles.pageHeaderContent}>
            <Row>
              <Col xs={24} sm={6} >
                <div className={styles.textSecondary}>提现总额</div>
                <div className={styles.heading}>{stat.withdraw} 元</div>
              </Col>
              <Col xs={24} sm={6} >
                <div className={styles.textSecondary}>当前冻结金额</div>
                <div className={styles.heading}>{stat.freezed} 元</div>
              </Col>
              <Col xs={24} sm={6} >
                <div className={styles.textSecondary}>当前会员可用金额</div>
                <div className={styles.heading}>{stat.available} 元</div>
              </Col>
              <Col xs={24} sm={6} >
                <div className={styles.textSecondary}>账户总额</div>
                <div className={styles.heading}>{stat.total} 元</div>
              </Col>
            </Row>
          </div>
        )
        return (
          <PageHeaderLayout title="提现记录" content={content}>
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <StandardTable
                  loading={loading}
                  data={data}
                  columns={columns}
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </Card>
          </PageHeaderLayout>

        )
    }
}
