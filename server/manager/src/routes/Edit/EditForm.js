import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import {Form, Button,Modal,Input,Select ,Icon,message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
// import Ueditor from '../../components/Ueditor';
import styles from './index.less';

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

    componentWillMount(){
        this.setState({
            type:this.props.match.params.type
        })
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

    handleChange=(key,value)=>{
        this.setState({
          [key]:value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.title){
            return message.warning("请输入标题");
        }

        if(!this.state.content){
            return message.warning("请输入内容");
        }

        if(!this.state.category){
            return message.warning("请输入分类");
        }

        if(!this.state.key){
            return message.warning("请输入关键字");
        }

        const {dispatch} = this.props;
        dispatch({
          type: 'edit/add',
          payload:{
            ...this.state
          },
          callback:()=>{
              this.props.dispatch(routerRedux.push(`/edit/${this.state.type=="help"?"help":"subject"}`));
          }
        });
    }

    handleCancel=()=>{
        this.props.dispatch(routerRedux.push(`/edit/${this.state.type=="help"?"help":"subject"}`));
    }

     render(){
       const { getFieldDecorator } = this.props.form;
       const {isShow} = this.props;
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
          <div className={styles.edit_form}>
              <header  className={styles.edit_header}>信息编辑</header>
            <Form >
                  <FormItem
                    {...formItemLayout}
                    label="标题"
                  >
                    <Input placeholder="请输入标题" onChange={(v)=>this.handleChange('title',v.target.value)}/>
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="类型"
                    >
                      <Select
                        placeholder="请选择类型"
                        value={this.state.type+""}
                        onChange={(v)=>this.handleChange('type',v)}
                      >
                        <Select.Option value="help">帮助</Select.Option>
                        <Select.Option value="special">专题</Select.Option>
                      </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分类"
                      >
                        <Input placeholder="请输入分类" onChange={(v)=>this.handleChange('category',v.target.value)}/>
                      </FormItem>
                      <FormItem
                          {...formItemLayout}
                          label="关键字"
                        >
                          <Input placeholder="请输入关键字" onChange={(v)=>this.handleChange('key',v.target.value)}/>
                        </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="内容"
                    >
                        <Input.TextArea placeholder="请输入内容" rows={5} onChange={(v)=>this.handleChange('content',v.target.value)}/>
                    </FormItem>
            </Form>
            <div className={styles.button_wrap}>
                <Button style={{marginRight:30}} onClick={this.handleCancel}>返回</Button>
                <Button type='primary' style={{marginBottom:10}}  onClick={this.handleSubmit}>确认提交</Button>
            </div>

          </div>

        )
    }
}
