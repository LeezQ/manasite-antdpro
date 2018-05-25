import React, { Component } from 'react';     
import { connect } from 'dva'; 
import {  
  Row, 
  Col,  
  Card, 
  List, 
  Radio,
  Button, 
  Form,
  notification,
} from 'antd';   
import styles from './index.less'
import Ellipsis from 'components/Ellipsis';
import StandardFormRow from 'components/StandardFormRow'; 
import * as discoverService from '../../../services/user'

const { Meta } = Card;    

export default class Follow extends Component {   
  
  state={
    list:{
      data:[{
          id:1,
          avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          title:'JAM000008'},
          {
            id:2,
            avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title:'JAM000009'},
        {
                id:3,
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                title:'JAM000010'},
        ],
      pagination:{},
    },
  }

  componentWillMount(){   
  }   
  render(){   
    const {list}=this.state  
    const cardList=list.data?(
      <List
        rowKey="id"
        loading={this.props.loading}
        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
        dataSource={list.data}
        pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 6,
          }}
        renderItem={item =>
          item ? (
            <List.Item key={item.id}>
              <Card hoverable className={styles.card} actions={[null,<a>查看档案</a>]}>
                <Card.Meta
                  avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                  title={<a href="#">{item.title}</a>}
                  description={
                    <Ellipsis className={styles.item} lines={3}>
                      <Row>15555555555</Row>
                      <Row>北京-西城区</Row>
                      <Row>真实姓名：李丹丹</Row>
                    </Ellipsis>
                  }
                />
              </Card>
            </List.Item>
          ):null
        }
      /> 
  ) : null;   
    return( 
      <div>  
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                   关注人数 <h1>13340</h1>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24} offset={8}  >
                  <a href="#">返回</a>
                </Col>
              </Row>
            </StandardFormRow> 
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    )
  }
}