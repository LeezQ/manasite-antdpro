import React, { PureComponent,Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {Form,Card,Row,Col,DatePicker,Button,Input,Radio} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';
 
const FormItem = Form.Item;

@Form.create()
@connect(({ financial, loading }) => ({
    financial,
    loading: loading.models.financial,
}))

export default class ChargeRecord extends PureComponent {  

  state={
    price:0,
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'financial/charges',
    });
  }

  handlePriceChange = (e) => {
    this.setState({ price: e.target.value });
  }
  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
  }
  

  renderForm() {
      const { getFieldDecorator } = this.props.form;
      return(
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} >
              <FormItem label="芥摩号">
                {getFieldDecorator('no')(<Input placeholder="请输入" />)}
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
              <FormItem label="收费日期">
                {getFieldDecorator('date')(
                  <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
            )}
              </FormItem>
            </Col>
            <Col md={8} sm={24} >
              <Radio.Group value={this.state.price} onChange={this.handlePriceChange}>
                <Radio.Button value={0}>不限</Radio.Button>
                <Radio.Button value={1}>中价区</Radio.Button>
                <Radio.Button value={2}>高价区</Radio.Button>
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
      const { financial:{data},loading, form } = this.props; 
      const { getFieldDecorator } = form;
      const columns=[
          {
            title: '芥摩号',
            dataIndex: 'user_id',
          },
          {
            title: '置换单号',
            dataIndex: 'topic_id',
          },
          {
            title: '收取费用(元)',
            dataIndex: 'charge_fee',
          },
          {
            title: '置换类型',
            dataIndex: 'exchange_price',
            render:val=>val===1?'中价区':'高价区',
          },
          {
            title: '收费时间',
            dataIndex: 'create_at',
          },
          {
            title: '操作',
            dataIndex: '',
          },
      ]
      const content=(
        <div className={styles.pageHeaderContent}> 
          <Row>
            <Col xs={24} sm={6} >
              <div className={styles.textSecondary}>订单金额</div>
              <div className={styles.heading}>124,543.10元</div>
            </Col>
            <Col xs={24} sm={12} >
              <div className={styles.textSecondary}>手续费总收入</div>
              <div className={styles.heading}>124,543.10元</div>
            </Col>
          </Row> 
        </div>
      )
      return (
        <PageHeaderLayout title="收费记录"  content={content} >
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div> 
              <StandardTable 
                loading={loading}
                data={data}
                columns={columns}  
                onChange={this.handleTableChange}
              />
            </div>
          </Card>
        </PageHeaderLayout>

      )
  }
}