import React, { Component } from 'react';  
import { 
  Row,
  Col, 
  Card, 
  Badge, 
  Avatar, 
} from 'antd';  
import DescriptionList from 'components/DescriptionList';
import styles from './index.less'


const { Description } = DescriptionList;   

class UserInfo extends Component{     
    render(){
        const {currentUser} = this.props; 
        let contactInfo=[]
        if(currentUser.hasOwnProperty('contactInfo')){ 
            contactInfo=currentUser.contactInfo
        } 
        return( 
          <div>
            <Card title="基本信息" className={styles.card} style={{ marginBottom: 24 }} bordered={false}>
              <Row>
                <Col span="12">
                  <DescriptionList col="2">
                    <Description term="芥摩号">{currentUser.uid}</Description>
                    <Description style={{display: 'flex'}}>
                      <Col lg={1} md={24} sm={24} xs={24} offset={4}>   
                        <div className={styles.avatar}>
                          <Avatar
                            shape="square"
                            size="large"
                            src={currentUser.avatar}
                          />
                        </div> 
                      </Col> 
                    </Description>
                  </DescriptionList>
                  <DescriptionList col="1">
                    <Description term="昵称">{currentUser.nickname}</Description>
                    <Description term="手机号">{currentUser.mobile}</Description>
                    <Description term="性别">{currentUser.gender}</Description>
                    <Description term="姓名">{currentUser.name}</Description>
                    <Description term="身份证号">{currentUser.idcardno}</Description>
                    <Description term="职业">{currentUser.jobs ? currentUser.jobs.join(', ') : ''}</Description>
                    <Description term="公司">{currentUser.companies ? currentUser.companies.join(', ') : ''}</Description>
                  </DescriptionList>
                </Col>
                <Col span="11" offset={1}>
                  <Row><span style={{fontWeight: 'bold'}}>三方平台账号</span></Row>
                  <DescriptionList col="1" style={{marginLeft: 20, marginTop: 20}}>
                    <Description term="微信ID">{contactInfo[1] ? contactInfo[1].account : ''}</Description>
                    <Description term="微信昵称">{contactInfo[1] ? contactInfo[1].nickname : ''}</Description>
                    <Description term="微博账号">{contactInfo[2] ? contactInfo[1].account : ''}</Description>
                    <Description term="微博昵称">{contactInfo[2] ? contactInfo[1].nickname : ''}</Description>
                    <Description term="QQ">{contactInfo[3] ? contactInfo[3].account : ''}</Description>
                    <Description term="QQ昵称">{contactInfo[3] ? contactInfo[3].nickname : ''}</Description>
                  </DescriptionList>
                </Col>
              </Row>
            </Card>
            <Card title="地址信息" style={{ marginBottom: 24 }} className={styles.card} bordered={false}>
              <DescriptionList col="1">
                <Description term="所在位置" />
                <Description term="默认收货地址" />
                <Description term="收货地址1" />
                <Description term="收货地址2" />
              </DescriptionList> 
            </Card>
            <Card title="兴趣频道" className={styles.card} bordered={false}>
              <Badge count="脱口秀" style={{ backgroundColor: '#52c41a', marginRight: 10 }} />
              <Badge count="幽默" style={{ backgroundColor: '#52c41a', marginRight: 10 }} />
              <Badge count="街头艺人" style={{ backgroundColor: '#52c41a', marginRight: 10 }} />
            </Card>   
          </div>        
        )
    }
}

export default UserInfo