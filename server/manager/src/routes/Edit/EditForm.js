import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import {Form, Button,Modal,Input,Select ,Icon,Checkbox} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import Ueditor from '../../components/Ueditor';

const FormItem = Form.Item;

@Form.create()
@connect(({ edit, loading }) => ({
    edit,
  loading: loading.models.edit,
}))

export default class EditForm extends Component {
    state = {
      type:'',
      isShow:false,
      editorHtml: '',
      editorText: '',
    }

    componentDidMount(){
      if (this.props.visible) {
          var editor = new Editor(ReactDOM.findDOMNode(this._div));
          editor.customConfig.onchange = (html) => {
              this.setState({
                editorHtml: html,
                editorText: editor.txt.text()
              })

              this.props.form.setFieldsValue({
                'desc': html
              });
          }
          editor.create();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          type: nextProps.type,
          isShow:nextProps.isShow
        });
    }

    handleCancel = (e) => {
      this.setState({
        isShow: false,
      });
    }

     render(){
       const { getFieldDecorator } = this.props.form;
       const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };

        return (
            <Modal
              title="添加专题"
              visible={this.state.isShow}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                    {...formItemLayout}
                    label="标题"
                  >
                    {getFieldDecorator('title', {
                      rules: [{
                        required: true, message: '请输入标题',
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="内容"
                    >
                      {getFieldDecorator('content', {
                        rules: [ {
                          required: true, message: 'Please input your E-mail!',
                        }],
                      })(
                        <Input.TextArea />
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                      >
                        {getFieldDecorator('type', {
                          rules: [{
                            required: true, message: '请选择类型',
                          }],
                        })(
                          <Select
                            placeholder="请选择类型"
                            value={this.state.type}
                            onChange={this.handleSelectChange}
                          >
                            <Option value="help">帮助</Option>
                            <Option value="special">专题</Option>
                          </Select>
                        )}
                      </FormItem>
                      <FormItem
                          {...formItemLayout}
                          label="分类"
                        >
                          {getFieldDecorator('category', {
                            rules: [{
                              required: true, message: '请输入分类信息',
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="关键字"
                          >
                            {getFieldDecorator('key', {
                              rules: [{
                                required: true, message: '请输入分类信息',
                              }],
                            })(
                              <Input />
                            )}
                          </FormItem>
              </Form>

            </Modal>
        )
    }
}
