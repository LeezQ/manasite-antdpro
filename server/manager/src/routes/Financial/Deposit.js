import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;
@Form.create()
@connect(({ financial, loading }) => ({
    financial,
    loading: loading.models.financial,
}))

export default class Deposit extends PureComponent {
  state={
    freeze:0,
  }

  componentDidMount() {
      this.loadList();
      this.loadSum();
  }

  loadList(){
      const {dispatch} = this.props;
      dispatch({
        type: 'financial/deposits',
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

  handleFreezeChange=(e)=>{
    this.setState({freeze:e.target.value})
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
              <FormItem label="置换单号">
                {getFieldDecorator('no')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="流水日期">
                {getFieldDecorator('date')(
                  <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
            )}
              </FormItem>
            </Col>
            <Col md={8} sm={24} >
              <Radio.Group value={this.state.freeze} onChange={this.handleFreezeChange}>
                <Radio.Button value={0}>不限</Radio.Button>
                <Radio.Button value={1}>冻结</Radio.Button>
                <Radio.Button value={2}>解冻</Radio.Button>
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
        console.log(this.props)
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
              title: '类型',
              dataIndex: 'type',
              render:text=>{
                  var _types=['','冻结押金','押金解冻','支付引荐费','置换赔偿','充值余额','充值押金','提现'];
                  if(text >= _types.length)
                    return "未知";
                  return _types[text];
              }
            },
            {
              title: '金额',
              dataIndex: 'fee',
            },
            {
              title: '收费时间',
              dataIndex: 'create_at',
              render:text=>{
                  return moment(text).format("YYYY-MM-DD HH:mm:ss")
              }
            }
        ];
        const content=(
          <div className={styles.pageHeaderContent}>
            <Row>
              <Col xs={24} sm={6} >
                <div className={styles.textSecondary}>当前押金总额</div>
                <div className={styles.heading}>{stat.deposit} 元</div>
              </Col>
              <Col xs={24} sm={12} >
                <div className={styles.textSecondary}>手续费总收入</div>
                <div className={styles.heading}>{stat.service_charge} 元</div>
              </Col>
            </Row>
          </div>
        )
        return (
          <PageHeaderLayout title="押金流水" content={content} >
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <StandardTable
                  loading={loading}
                  data={data}
                  columns={columns}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </Card>
          </PageHeaderLayout>

        )
    }
}
