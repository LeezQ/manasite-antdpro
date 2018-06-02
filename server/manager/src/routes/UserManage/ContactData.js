import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Card, Button,Row,List } from 'antd';

import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout'; 
import styles from './ContactData.less';
import * as followservice from '../../services/user'




@connect(({ follow, loading }) => ({
    follow,
    loading: loading.models.follow,
}))

export default class ContactData extends PureComponent {
    state={
        loading:false,
        list:[
            {
                user_id:1,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:2,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:3,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:4,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:5,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:6,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:7,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:8,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:9,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
            {
                user_id:10,
                uid:'JAM85516108',
                nickname:'芥子85516108',
                avatar:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                mobile:'1654728121',location:'北京-海淀',name:'张三'},
        ],
        pagination:{ 
            total:10,
            pageSize:9,
        }, 
    }
    componentWillMount() {   
        const param={ 
            pageSize:9,
            currentPage:1,
        }
        this.initData(param) 
    }
    initData=(param)=>{
        this.setState({loading:true})
        const {location}=this.props    
        switch(location.type){
            case 'friends':
            followservice.userFriendsData({user_id:location.user_id,...param})
            .then((response)=>{  
                if(response!==undefined&&response.data.code===200){ 
                    this.setState({ 
                        pagination:{
                            total:10, 
                            current:param.currentPage,
                            pageSize:param.pageSize,
                        },
                    }) 
                }
            }) 
            break;
            case 'follow':
            followservice.userFollowData({user_id:location.user_id,...param})
            .then((response)=>{  
                if(response!==undefined&&response.data.code===200){ 
                    this.setState({ 
                        pagination:{
                            total:10, 
                            current:param.currentPage,
                            pageSize:param.pageSize,
                        },
                    }) 
                }
            }) 
            break;
            default:
            break;
        }
        
        this.setState({loading:false})
    }

    handleListPageChange=(page)=>{   
        const{pagination}=this.state
        const param={
          currentPage:page,
          pageSize:pagination.pageSize,
        }  
        this.initData(param)
    }

    render() { 
        const {location}=this.props 
        const {list,loading}=this.state  
        const action = (
          <Fragment> 
            <Button type="primary" onClick={() => this.props.dispatch(routerRedux.push({pathname: '/users/detailform',user_id:location.user_id,operationkey:'userdata'}))}>返回</Button>
          </Fragment>
            );
            
    const cardList=list?(
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
        dataSource={list}
        pagination={{
            onChange:(page)=>this.handleListPageChange(page), 
            ...this.state.pagination,
          }}
        renderItem={item =>
          item ? (
            <List.Item key={item.user_id}>
              <Card hoverable className={styles.card} actions={[null,<a href='#'>查看档案</a>]}>
                <Card.Meta
                  avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                  title={<a href="#">{item.uid}|{item.nickname}</a>}
                  description={
                    <Ellipsis className={styles.item} lines={3}>
                      <Row> {item.mobile}</Row>
                      <Row>{item.location}</Row>
                      <Row>{item.name}</Row>
                    </Ellipsis>
                  }
                />
              </Card>
            </List.Item>
          ):null
        }
      /> 
  ) : null;   
        return (
          <PageHeaderLayout title={location.title+location.num} action={action} >
            <div className={styles.cardList} >
              {cardList}
            </div>
          </PageHeaderLayout>
        )
    
    }
}