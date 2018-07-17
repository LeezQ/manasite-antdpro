import React from 'react';
import {Form,Card,Row,Col,Radio,Input,Button,DatePicker,Tabs,Badge,Pagination} from 'antd';

const FormItem=Form.Item

@Form.create()
export default class Search extends React.Component{
    constructor(){
        super(...arguments);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err)
                return;

            let _keyword={};

            if(values["uid"])
                _keyword['uid'] = values["uid"];

            if(values["nickname"])
                _keyword['nickname'] = values["nickname"];

            if(values["create_at"])
                _keyword['create_at'] = values['create_at'].format('YYYY-MM-DD');

            if(values["create_at"])
                _keyword['title'] = values["title"];

            if(this.props.onSearch)
                this.props.onSearch(_keyword);
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={9} sm={24} >
                <FormItem label="芥摩号">
                  {getFieldDecorator('uid')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={9} sm={24} >
                <FormItem label="昵称">
                  {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}>
                <FormItem label="发布日期">
                  {getFieldDecorator('create_at')(
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
                    <Button type="primary" htmlType="submit">查询</Button>
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
}
