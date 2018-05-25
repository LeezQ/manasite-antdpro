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
  Modal,
  Icon,
  Avatar,
} from 'antd';   
import styles from './index.less'
import StandardFormRow from 'components/StandardFormRow'; 
import * as discoverService from '../../../services/user'

const { Meta } = Card;    
const confirm = Modal.confirm;
export default class UserPubic extends Component {   
  
  state={  
    /*
    list 目前是测试数据，如果接口有数据的话，直接把list编程，list:[] 即可。
    然后 把下面的方法中涉及到  this.setState({list:response.data.list}) 还原就OK
    */
    list: [
      {
        "type": "share",
        "title": "瓜地人家居黑白革命史",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "link": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "id": 12345,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 10,
          "records": [
            {
              "nickname": "amy",
              "uid": 12345,
              "comment": "很好很好",
              "create_at": "2018/3/31 12:01:01",
            },
            {
              "nickname": "amy",
              "uid": 12345,
              "comment": "很好很好",
              "create_at": "2018/3/31 12:01:01",
            },
          ],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
          "家居时间",
          "兴趣频道",
        ],
      },
      {
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12345,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12345,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12346,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12347,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12348,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12349,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12350,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12351,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12352,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12353,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12354,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12355,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },{
        "type": "share",
        "title": "心爱的球拍要割舍",
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "content": {
          "state": "deposited",
          "wanted": 5,
        },
        "id": 12356,
        "like": 10,
        "forward": 5,
        "comments": {
          "count": 0,
          "records": [],
        },
        "userinfo": {
          "nickname": "amy",
          "uid": 12345,
          "avatar": "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        },
        "channels": [
          "家居",
        ],
      },
    ], 
    pagination:{ 
    }, 
    loading: false,
    exchange:'exchange',
    isSuccessRecord:false,
  }

  componentWillMount(){   
    const{location}=this.props 
    const param={currentPage:1,pageSize:8,user_id:location.user_id,type:'exchange'}
    this.initDiscoverData(param)
  } 
  handleListPageChange=(page)=>{  
    const{location}=this.props 
    const{exchange,pagination}=this.state
    const param={
      currentPage:page,
      pageSize:pagination.pageSize,
      user_id:location.user_id,
      type:exchange,
    } 
    this.initDiscoverData(param)
  }
  handleChange=(e)=>{ 
    const{location}=this.props  
    const param={
      currentPage:1,
      pageSize:8,
      user_id:location.user_id,
      type:e.target.value,
    }  
    this.initDiscoverData(param)
  }
  initDiscoverData=(param)=>{
    console.log('-------',param)
    this.setState({loading:true})
    discoverService.getDiscover(param)
    .then((response)=>{
      console.log('---query----data',response.data.list)
      if(response===undefined){
        notification.warning({
          message:'系统异常，请联系管理员',
          description:'未检索到数据',
        })
      }else if(response.status!=='ok'){
        notification.warning({
          message:'系统异常，请联系管理员',
          description:response.message,
        })
      }else{ 
        this.setState({ 
          loading:false,
          // list:response.data.list,
          exchange:param.type,
          pagination:{  
            current:param.currentPage,
            pageSize:param.pageSize,
            total:10,
            // total:response.data.total,
          }})
      } 
    })
  } 
  handleScanRecord=()=>{ 
    const{isSuccessRecord}=this.state
    if(isSuccessRecord){
       
    this.setState({isSuccessRecord:false})
    }else{
      this.setState({isSuccessRecord:true})
    }
  }
  render(){   
    const {list,exchange,isSuccessRecord}=this.state   
    const cardList=list?(
      <List
        rowKey="id"
        loading={this.state.loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        pagination={{
          onChange:(page)=>this.handleListPageChange(page), 
          ...this.state.pagination,
        }}
        renderItem={item => (
          <List.Item key={item.id}>
            <Row gutter={16}>
              <Col>
                <Icon type="share-alt" /> 
                <Icon type="heart-o" />
              </Col> 
            </Row>
            <Row>
              <Card 
                style={{width:300}} 
                cover={item.cover?<img height={300}  src={item.cover} />:<img height={300} src='http://47.95.250.201:3000/public/uploads/1526128657516.jpg' />}
              >
                <Row> 
                  <Col span={18} offset={0}>
                    {item.title}
                  </Col>
                  <Col span={4} offset={2}> 
                    <Icon
                      type='delete'
                      onClick={()=>{
                    console.log(item.id)
                     confirm({
                      title: '确定要删除？',
                      okText: '确定', 
                      cancelText: '取消',
                    });
                  }}
                    />
                  </Col>
                </Row>
                <Row> 
                  this is summary but have not data 
                </Row>
                <Row>
              2018-05-01 16:43
                </Row>
              </Card>
            </Row>
          </List.Item>
      )}
      />
  ) : null;   
    return( 
      <div>  
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <Radio.Group onChange={this.handleChange}>
                    <Radio.Button value="exchange">置换</Radio.Button>
                    <Radio.Button value="activity">活动</Radio.Button>
                    <Radio.Button value="share">分享</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24} offset={8} >
                  { exchange==='exchange'?<Button onClick={this.handleScanRecord} type="dashed">{isSuccessRecord?'返回':'查看成交交换记录'}</Button>:null}
                </Col>
              </Row>
            </StandardFormRow> 
          </Form>
        </Card>
        <br />
        <div className={styles.cardList}>{cardList}</div>
      </div>
    )
  }
}