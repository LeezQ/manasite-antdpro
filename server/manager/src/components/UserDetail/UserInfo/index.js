import React, { Component } from 'react';
import { Card,Form,Upload,Input,Row,Col,Button,Avatar,Radio,Select,Icon,Checkbox,Modal } from 'antd';
import StandardFormRow from 'components/StandardFormRow';
import styles from './index.less';
import {checkBoxItemLayout,formItemLayout,detailItemLayout,addressItemLayout,tailFormItemLayout,
  notDefaultAddressItemLayout,
  newAddressLayout,
  formItemLayoutWithOutLabel} from './layout'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const gridStyle = {
    width: '50%', 
    height:'500px',
    textAlign: 'center',
  };
let uuid = 0;
class UserInfo extends Component{
    state={  
      visible:false
    }
    handleChangPaw=()=>{ 
    }
    deleteAddress=()=>{

    }
    setDefaultAddress=()=>{

    }
    addAddress = () => {  
      this.setState({visible:true})
    } 
    okAddress = (e) => {  
      console.log('form info',e.getContainer)
      this.setState({visible:false})
    } 
    cancleAddress = () => {  
      this.setState({visible:false})
    } 
    render(){   
        const {fileList,visible } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const plainOptions = ['时尚家居', '摄影', '绘画','互联网','旅行','户外','美术','电影','运动'];
        const formItems = keys.map((k, index) => {
            return (
              <FormItem {...notDefaultAddressItemLayout} label={`收货地址[$k]`} >
              <Row gutter={10}>
                        <Col span={20}>
                              {getFieldDecorator(`recive[$k]`, { 
                                  initialValue:' 李丹丹  15555555555  天津天津市和平区大悦城2楼201'
                              })(
                              <Input disabled />
                              )}   
                          </Col>  
                          <a onClick={this.deleteAddress}>删除</a>  
                          <a onClick={this.setDefaultAddress}>设为默认</a>  
              </Row>
              </FormItem> 
          )});
        return(
         <Form>
            <Card.Grid style={gridStyle}> 
              <Row>
                <Col lg={15} > 
                    <FormItem {...formItemLayout} label="芥摩号">  
                    <Col lg={16} offset={1}> 
                    {getFieldDecorator('uid', { 
                        initialValue:'JAM000000002'
                        })(
                        <Input disabled />
                        )}
                    </Col>    
                    <Col lg={8}>
                    <a onClick={this.handleChangPaw}> 修改密码</a>
                    </Col>
                    </FormItem>   
                </Col>
                <Col lg={1} md={24} sm={24} xs={24} offset={4}>   
                <div className={styles.avatar}>
                    <Avatar
                        shape="square"
                        size="large"
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </div> 
                </Col>
                </Row> 
                <FormItem {...detailItemLayout} label="昵称">
                  {getFieldDecorator('nickname', { 
                      initialValue:'芥子54728936'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem>    
                <FormItem {...detailItemLayout} label="手机号">
                  {getFieldDecorator('mobile', { 
                      initialValue:'15555482397'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem>   
                  <FormItem {...checkBoxItemLayout} label="性别">
                  {getFieldDecorator('sex', { 
                      initialValue:0
                    })(
                        <RadioGroup disabled>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio> 
                      </RadioGroup>
                    )} 
                  </FormItem>   
                  <FormItem {...detailItemLayout} label="姓名">
                  {getFieldDecorator('name', { 
                      initialValue:''
                    })(
                      <Input disabled />
                    )} 
                  </FormItem>   
                  <FormItem {...detailItemLayout} label="身份证号">
                  {getFieldDecorator('cardid', { 
                      initialValue:''
                    })(
                      <Input disabled />
                    )} 
                  </FormItem>   
            </Card.Grid>
            <Card.Grid style={gridStyle}>    
            <Row>
                <Col lg={5} > 
                    <h2>三方平台账号</h2>
                </Col>
            </Row> 
            <FormItem {...detailItemLayout} label="微信ID">
                  {getFieldDecorator('wechart', { 
                      initialValue:'jdhsksld'
                    })( 
                      <Input disabled />
                    )} 
                  </FormItem>    
                <FormItem {...detailItemLayout} label="微信昵称">
                  {getFieldDecorator('weboname', { 
                      initialValue:'第三帝国'
                    })( 
                        <Input disabled />
                    )} 
                  </FormItem>   
                  <FormItem {...detailItemLayout} label="微博账号">
                  {getFieldDecorator('webocount', { 
                      initialValue:'55555555@qq.com'
                    })( 
                        <Input disabled />
                    )} 
                  </FormItem>   
                  <FormItem {...detailItemLayout} label="微博昵称">
                  {getFieldDecorator('name', { 
                      initialValue:'大嘎达是'
                    })(
                        <Input disabled />
                    )} 
                  </FormItem>   
                  <FormItem {...detailItemLayout} label="QQ">
                  {getFieldDecorator('QQ', { 
                      initialValue:'555555555'
                    })( 
                     <Input disabled />
                    )} 
                  </FormItem>   
                  <FormItem {...detailItemLayout} label="QQ昵称">
                  {getFieldDecorator('qqname', { 
                      initialValue:'得高高的'
                    })( 
                    <Input disabled />
                    )} 
                  </FormItem>   
            </Card.Grid> 
            <Card.Grid style={{width:'100%'}}> 
            <Col span={12}>
                  <FormItem {...detailItemLayout} label="职业">
                  {getFieldDecorator('career_1', { 
                      initialValue:0
                    })(
                      <Select disabled style={{ width: '100%' }}> 
                        <Option value={0}>会计</Option>
                        <Option value={1}>软件工程师</Option>
                        <Option value={2}>系统架构师</Option>
                      </Select>
                    )} 
                  </FormItem> 
                  <FormItem {...detailItemLayout} label="职业">
                  {getFieldDecorator('career_2', { 
                      initialValue:1
                    })(
                      <Select disabled style={{ width: '100%' }}> 
                        <Option value={0}>会计</Option>
                        <Option value={1}>软件工程师</Option>
                        <Option value={2}>系统架构师</Option>
                      </Select>
                    )} 
                  </FormItem> 
                 
            </Col>
            <Col span={12}> 
                   <FormItem {...detailItemLayout} label="公司">
                  {getFieldDecorator('coompany_1', { 
                      initialValue:1
                    })(
                      <Select disabled style={{ width: '100%' }}> 
                        <Option value={0}>天津是会计事务所</Option>
                        <Option value={1}>北京是会计事务所</Option>
                        <Option value={2}>上海是会计事务所</Option>
                      </Select>
                    )} 
                  </FormItem> 
                  <FormItem {...detailItemLayout} label="公司">
                  {getFieldDecorator('coompany_2', { 
                      initialValue:1
                    })(
                      <Select disabled style={{ width: '100%' }}> 
                        <Option value={0}>天津是会计事务所</Option>
                        <Option value={1}>北京某互联网金融</Option>
                        <Option value={2}>上海是会计事务所</Option>
                      </Select>
                    )} 
                  </FormItem> 
            </Col>
            </Card.Grid>
            <Card.Grid style={{width:'100%'}}>
                <Row>
                    <Col lg={5} > 
                        <h2>所读学校</h2>
                    </Col>
                </Row>
                <Col span={8}> 
                <FormItem {...detailItemLayout} label="小学">
                  {getFieldDecorator('primary_school', { 
                      initialValue:'北京附属小学'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem>    
                </Col>
                <Col span={8}>  
                  <FormItem {...detailItemLayout} label="中学">
                  {getFieldDecorator('secondary_school', { 
                      initialValue:'北京附属中学'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem> 
                </Col>
                <Col span={8}>  
                  <FormItem {...detailItemLayout} label="大学">
                  {getFieldDecorator('university', { 
                      initialValue:'北京师范大学'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem> 
                </Col>
                <Col span={8}>  
                  <FormItem {...detailItemLayout} label="海外留学">
                  {getFieldDecorator('oversea', { 
                      initialValue:'北京师范大学'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem> 
                </Col>
                <Col span={8}>  
                  <FormItem {...detailItemLayout} label="其它">
                  {getFieldDecorator('others', { 
                      initialValue:'--'
                    })(
                      <Input disabled />
                    )} 
                  </FormItem> 
                </Col>
            </Card.Grid>  
            <Card.Grid style={{width:'100%'}}>
                <Row>
                    <Col lg={5} > 
                        <h2>地址信息</h2>
                    </Col>
                </Row>
                <FormItem {...addressItemLayout} label="所在位置" > 
                    {getFieldDecorator('localtion', { 
                        initialValue:' 天津天津市和平区大悦城2楼'
                    })(
                        <Input disabled />
                    )}
                </FormItem> 
                <FormItem {...addressItemLayout} label="默认收货地址" > 
                    {getFieldDecorator('recive_default', { 
                        initialValue:' 天津天津市和平区大悦城2楼'
                    })(
                        <Input disabled />
                    )}
                </FormItem> 
                <FormItem {...notDefaultAddressItemLayout} label="收货地址2" >
                  <Row gutter={10}>
                            <Col span={20}>
                                  {getFieldDecorator('recive_2', { 
                                      initialValue:' 李丹丹  15555555555  天津天津市和平区大悦城2楼201'
                                  })(
                                  <Input disabled />
                                  )}   
                              </Col>  
                              <a onClick={this.deleteAddress}>删除</a>  
                              <a onClick={this.setDefaultAddress}>设为默认</a>  
                        </Row>
                  </FormItem> 
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.addAddress} style={{ width: '60%' }}>
                    <Icon type="plus" /> 新增地址
                </Button> 
                </FormItem>
                <Modal
                    title="新增地址"
                    visible={this.state.visible}
                    onOk={this.okAddress}
                    onCancel={this.cancleAddress}
                    destroyOnClose={true}
                    okText="确定"
                    cancelText="取消"
                  >  
                      <FormItem {...newAddressLayout} label="收件人" > 
                        {getFieldDecorator('add_eciev_name', { 
                          rules: [{
                            required: true, message: '请输入收件人',
                          }]
                        })(
                            <Input />
                        )}
                    </FormItem> 
                    <FormItem {...newAddressLayout} label="联系电话" > 
                        {getFieldDecorator('add_recive_phone', {  
                          rules: [{
                            required: true, message: '请输入联系电话',
                          }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...newAddressLayout} label="详细地址" > 
                        {getFieldDecorator('add_recive_address', {  
                          rules: [{
                            required: true, message: '请输入详细地址',
                          }]
                        })(
                            <Input />
                        )}
                    </FormItem>  
                </Modal>  
            </Card.Grid>      
            <Card.Grid style={{width:'100%'}}>
                <Row>
                    <Col lg={5} > 
                        <h2>兴趣频道</h2>
                    </Col>
                </Row>
                <FormItem> 
                <FormItem {...formItemLayoutWithOutLabel}  > 
                    {getFieldDecorator('channels', { 
                        initialValue:['互联网','运动']
                    })( 
                      <CheckboxGroup options={plainOptions}  /> 
                    )}
                </FormItem> 
                </FormItem>
            </Card.Grid> 
            </Form>
        
        )
    }
}
 
export default Form.create()(UserInfo); 