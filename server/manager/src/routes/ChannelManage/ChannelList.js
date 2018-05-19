import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Radio,
  Tag
} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ChannelList.less';

const FormItem = Form.Item;

@connect(({channel, loading}) => ({
    channel,
    loading: loading.models.user,
  }))

@Form.create()
export default class ChannelList extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
    };
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
          type: 'channle/fetch',
        });
      }
    confirmDeleteChanel=(id)=>{
        const {selectedRows} = this.state; 
        if (!(id || selectedRows))
        return;
        confirm({
            title: '温馨提示',
            content: '你确定要删除',
            okText: '确定',
            cancelText: '取消',
            onOk: ()=> {
              this.props.dispatch({
                type: 'channel/delete',
                payload: {
                  id: id 
                },
                callback: () => {
                  this.setState({
                    selectedRows: [],
                  });
      
                  this.props.dispatch({
                    type: 'channel/fetch',
                    payload: {},
                  });
                },
              });
            }
          });

    } 
    handleSearch = e => {
        e.preventDefault();
    
        const {dispatch, form} = this.props;
    
        form.validateFields((err, fieldsValue) => {
          if (err) return;
    
          const values = {
            ...fieldsValue,
            updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
          };
    
          this.setState({
            formValues: values,
          });
    
          dispatch({
            type: 'channel/fetch',
            payload: values,
          });
        });
      };
    handleFormReset = () => {
        const {form, dispatch} = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'channel/fetch',
            payload: {},
        });
    };
    handleAddChannel=()=>{ 
        this.setState({modalVisible:true})
    }
    handleAddChannel=()=>{

    }
    handleStandardTableChange = (pagination, filtersArg, sorter) => { 
        const {dispatch} = this.props;
        const {formValues} = this.state;
    
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj = {...obj};
          newObj[key] = getValue(filtersArg[key]);
          return newObj;
        }, {});
    
        const params = {
          page: pagination.current,
          pageSize: pagination.pageSize,
          ...formValues,
          ...filters,
        };
        if (sorter.field) {
          params.sorter = `${sorter.field}_${sorter.order}`;
        }
    
        dispatch({
          type: 'channel/fetch',
          payload: params,
        });
      };
    renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{md: 8, lg: 24, xl: 48}}>
              <Col md={8} sm={24}>
                <FormItem label="兴趣名称">
                  {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
                </FormItem>
              </Col> 
              <Col md={8} sm={24}> 
                <span style={{float: 'right', marginBottom: 24}}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                    重置
                  </Button>
                </span>
              </Col>
              <Col>
                <Button type="primary" onClick={this.handleAddChannel}>
                    增加兴趣
                </Button>
              </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="primary" onClick={this.handleAddChannel}>
                        保存排序
                    </Button>
                </Col>
            </Row>
          </Form>
        );
      }
    render() {
        const {loading} = this.props;
        const {selectedRows, modalVisible} = this.state; 
        const data={list:[]}
    
        const columns = [
          { 
            title: '',
            dataIndex: 'order',
            render(val) {
            return (<Input color="#108ee9">{val}</Input>)
            },
          },
          { 
            title: '兴趣名称',
            dataIndex: 'name',
          },
          { 
            title: '别名-显示处',
            dataIndex: 'displayName',
          },
          { 
            title: '内容数量',
            dataIndex: 'topics',
          },
          { 
            title: '操作',
            dataIndex:'id',
            render: (val) => (
              <Fragment>
                <Divider type="vertical"/>
                <a onClick={() => this.confirmDeleteChanel(val, false)}>删除</a>
                <Divider type="vertical"/>
                <a onClick={()=>this.props.dispatch(routerRedux.push({pathname: '/channel/detailform', query: {id:val}}))}>编辑</a>
              </Fragment>
            ),
          },
        ];
    
        return (
          <PageHeaderLayout title="兴趣频道管理">
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
        );
      }
}

