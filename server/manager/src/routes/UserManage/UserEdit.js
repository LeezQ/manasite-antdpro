import React, { PureComponent } from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import { Card,Form,Input,Row,Col,Button,Avatar,Radio,Select,Icon,Checkbox,notification,Popover} from 'antd'; 
import styles from './index.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'; 
import { formItemLayout,detailItemLayout,addressItemLayout,companyItemLayout,
  notDefaultAddressItemLayout, 
  formItemLayoutWithOutLabel} from './layout' 
import {AddAddress} from 'components/UserEdit'
import FooterToolbar from 'components/FooterToolbar';
import * as userservice from '../../services/user'
import * as channelservice from '../../services/channel'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const gridStyle = {
    width: '50%', 
    height:'500px',
    textAlign: 'center',
  }; 
@connect(({user, loading}) => ({
  user,
  loading: loading.models.user,
}))

class UserEdit extends PureComponent{  
  constructor(props){
    super(props)
    this.state={ 
      visible:false,
      userInfo:{},
      channels:[],
    }
  } 
    componentWillMount(){
      this.initData()
    }    
    initData=()=>{
      const {location}=this.props  
        const channels=[]
        userservice.getUserInfo(location.user_id)
        .then((response)=>{ 
          if(response===undefined){
            notification.warning({
              message:'系统异常，请联系管理员',
              description:'未检索到用户数据',
            })
          }else if(response.status!=='ok'){
            notification.warning({
              message:'系统异常，请联系管理员',
              description:response.message,
            })
          }else{     
            this.setState({userInfo:response.data })
          } 
        })
        channelservice.getChannelList()
        .then((response)=>{  
          if(response.status==='ok'){  
            response.data.forEach((item)=>{
              channels.push(item.name)
            })
            this.setState({channels})
          }
        })
    }
    addAddress = () => {  
      this.setState({visible:true})
    } 
    handleCreateAddress = () => {
      const form = this.addressformRef.props.form;
      form.validateFields((err, values) => { 
        if (err) {
          return;
        } 
        const {userInfo}=this.state 
        form.resetFields(); 
        const newsAddress=`${values.add_eciev_name}|${values.add_recive_address}|${values.add_recive_phone}`  
        userInfo.address.push({id:new Date().getTime(),address:newsAddress,isprimary:false})  
        this.setState({ visible: false,userInfo});
      });
    }
    handleCancleAddress=()=>{
      this.setState({visible:false})
    }
    saveAddressFormRef = (formRef) => {
      this.addressformRef = formRef;
    }
    handleSubmit= (e) => {
      e.preventDefault();
      const {form,dispatch,location}=this.props
      const {validateFieldsAndScroll} =form;   
      validateFieldsAndScroll((error, values) => { 
        if (!error) { 
          if (!error) {
            console.log('Received values of form: ', values);
          }
          values.id=location.user_id
          dispatch({
            type: 'user/submitUserForm',
            payload:values,
          });
        }
      });
    }; 
    render(){    
      const{form,loading}=this.props
      const{userInfo,channels}=this.state 
      const { getFieldDecorator } = form;  
      /* 后面可以改善成独立的地址接口，这样地址的信息维护起来回更容易些 */
      const formItems = userInfo.hasOwnProperty('address')? userInfo.address.map((k, index) => {   
        const defaultAddress=k.isprimary?null:(<a onClick={()=>{const resestDefatul=[];userInfo.address.forEach((item)=>{if(item.id===k.id){resestDefatul.push({id:item.id,address:item.address,isprimary:true})} else {resestDefatul.push({id:item.id,address:item.address,isprimary:false})};this.setState({userInfo:{address:resestDefatul}}) }) }}>设为默认</a>)
          return (
            <FormItem key={k.id} {...notDefaultAddressItemLayout} label={k.isprimary?'默认收货地址':`收货地址[${index}]`} >
              <Row gutter={10}>
                <Col span={20}>
                  {getFieldDecorator(`recive[${index}]`, { 
                                initialValue:k.address,
                            })(
                              <Input  />
                            )}   
                </Col>  
                <a onClick={()=>{const newsAddress=[];userInfo.address.forEach((item)=>{if(item.id!==k.id){newsAddress.push({id:item.id,address:item.address,isprimary:item.isprimary})}});this.setState({userInfo:{address:newsAddress}}) }}  >删除</a>    
                {defaultAddress} 
              </Row>
            </FormItem>  
        ) 
      }):null;
      const educationItems=userInfo.hasOwnProperty('education')?userInfo.education.map((item,index)=>{ 
        switch(item.type){
          case 1:
          return( 
            <Col span={8}> 
              <FormItem {...detailItemLayout} label="小学">
                {getFieldDecorator('school', { 
                initialValue:item.school,
              })(
                <Input  />
              )} 
              </FormItem>    
            </Col>
          )
          case 2:
          return(
            <Col span={8}> 
              <FormItem {...detailItemLayout} label="中学">
                {getFieldDecorator('school', { 
                initialValue:item.school,
              })(
                <Input  />
              )} 
              </FormItem>    
            </Col>
)
          case 3:
          return(
            <Col span={8}> 
              <FormItem {...detailItemLayout} label="高中">
                {getFieldDecorator('school', { 
                initialValue:item.school,
              })(
                <Input  />
              )} 
              </FormItem>    
            </Col>
)
          case 4:
          return(
            <Col span={8}> 
              <FormItem {...detailItemLayout} label="大学">
                {getFieldDecorator('school', { 
                initialValue:item.school,
              })(
                <Input  />
              )} 
              </FormItem>    
            </Col>
)
          default:
          return(
            <Col span={8}> 
              <FormItem {...detailItemLayout} label="其它">
                {getFieldDecorator('school', { 
              initialValue:item.school,
            })(
              <Input  />
            )} 
              </FormItem>    
            </Col>
)
          
        }
      }):null
      return(
        <PageHeaderLayout
          title="修改会员信息"  
        > 
          <Form onSubmit={this.handleSubmit}>
            <Card title="会员信息" className={styles.card} bordered={false}> 
              <Row>
                <Col lg={15} > 
                  <FormItem {...formItemLayout} label="芥摩号">  
                    <Row> 
                      {userInfo.uid}
                    </Row>    
                    <Row lg={1} md={24} sm={24} xs={24} offset={1}>
                      <a onClick={this.handleChangPaw}> 修改密码</a>
                    </Row>
                  </FormItem>   
                </Col>
                <Col lg={1} md={24} sm={24} xs={24} offset={4}>   
                  <div className={styles.avatar}>
                    {getFieldDecorator('avatar', {  
                  })( 
                    <Avatar
                      shape="square"
                      size="large"
                      src={userInfo.avatar}
                    />
                  )}  
                    
                  </div> 
                </Col>
              </Row> 
              <FormItem {...detailItemLayout} label="昵称">
                {getFieldDecorator('nickname', { 
                    initialValue:userInfo.nickname,
                    rules: [{ required: true, message: '昵称不能为空' }],
                  })( 
                    <Input />
                  )}  
              </FormItem>    
              <FormItem {...detailItemLayout} label="手机号">
                {getFieldDecorator('mobile', { 
                    initialValue:userInfo.mobile,
                    rules: [{ required: true, message: '手机号不能为空' }],
                  })(
                    <Input  />
                  )} 
              </FormItem>   
              <FormItem {...detailItemLayout} label="性别">
                {getFieldDecorator('gender', { 
                    initialValue:userInfo.gender, 
                  })(
                    <RadioGroup >
                      <Radio value='male'>男</Radio>
                      <Radio value='female'>女</Radio> 
                    </RadioGroup>
                  )} 
              </FormItem>   
              <FormItem {...detailItemLayout} label="姓名">
                {getFieldDecorator('name', { 
                    initialValue:userInfo.name,
                    rules: [{ required: true, message: '姓名不能为空' }],
                  })(
                    <Input  />
                  )} 
              </FormItem>   
              <FormItem {...detailItemLayout} label="身份证号">
                {getFieldDecorator('cardid', { 
                    initialValue:userInfo.cardid,
                    rules: [{ required: true, message: '身份证号不能为空' }],
                  })(
                    <Input  />
                  )} 
              </FormItem>   
              <Col offset={0} span={6}>
                <FormItem {...companyItemLayout} label="职业">
                  {getFieldDecorator('career_1', { 
                    initialValue:0,
                  })(
                    <Select  style={{ width: '100%' }}> 
                      <Option value={0}>会计</Option>
                      <Option value={1}>软件工程师</Option>
                      <Option value={2}>系统架构师</Option>
                    </Select>
                  )} 
                </FormItem> 
              </Col>
              <Col offset={0} span={6}>
                <FormItem {...companyItemLayout} label="公司">
                  {getFieldDecorator('company', { 
                    initialValue:userInfo.company,
                  })( 
                    <Input />
                  )} 
                </FormItem> 
                
              </Col> 
            </Card>  
            <Card title="所读学校" className={styles.card} bordered={false}> 
              {educationItems} 
            </Card>  
            <Card title="地址信息" className={styles.card} bordered={false}> 
              <FormItem {...addressItemLayout} label="所在位置" > 
                {getFieldDecorator('geolocation', { 
                      initialValue:userInfo.geolocation,
                  })(
                    <Input  />
                  )}
              </FormItem>  
              {formItems}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.addAddress} style={{ width: '60%' }}>
                  <Icon type="plus" /> 新增地址
                </Button> 
              </FormItem>
              
            </Card>      
            <Card title="兴趣频道" className={styles.card} bordered={false}> 
              <FormItem> 
                <FormItem {...formItemLayoutWithOutLabel}  > 
                  {getFieldDecorator('channels', { 
                      initialValue:userInfo.channels,
                  })( 
                    <CheckboxGroup options={channels}  /> 
                  )}
                </FormItem> 
              </FormItem>
            </Card> 
          </Form>
          <AddAddress  
            visible={this.state.visible}
            onCreate={this.handleCreateAddress} 
            onCancel={this.handleCancleAddress}
            wrappedComponentRef={this.saveAddressFormRef}
          />
          <FooterToolbar style={{ width: this.state.width }}>  
            <Button onClick={() => this.props.dispatch(routerRedux.push({pathname: '/users/list'}))} type="primary"  >
            返回
            </Button> 
            <Button type="primary"  htmlType="submit" onClick={this.handleSubmit}  loading={loading}>
            保存
            </Button>
          </FooterToolbar>
        </PageHeaderLayout>
        )
    }
}

export default Form.create()(UserEdit);  