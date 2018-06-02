import React, { Component } from 'react';  
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import {   
  Card,   
} from 'antd';   
import styles from './index.less' 
import numeral from 'numeral';

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
export default class UserData extends Component{ 
    render(){
        const {stats,location} = this.props;  
        const CardContact = () => (
          <div className={styles.cardInfo}>
            <div>
              <p>关注人数</p>
              <p><a onClick={()=>this.props.dispatch(routerRedux.push({pathname: '/users/followdata',user_id:location.user_id,type:'friends',num:stats.friends,title:'关注人数'}))}>{stats.hasOwnProperty('friends')?numeral(stats.friends).format('0,0'):0}</a></p>
            </div>  
            <div>
              <p>被关注人数</p>
              <p><a onClick={()=>this.props.dispatch(routerRedux.push({pathname: '/users/followdata',user_id:location.user_id,type:'follow',num:stats.follower,title:'被关注人数'}))}>{stats.hasOwnProperty('follower')?numeral(stats.follower).format('0,0'):0}</a></p>
            </div>
            <div>
              <p>特殊关注人</p>
              <p><a onClick={()=>this.props.dispatch(routerRedux.push({pathname: '/users/followdata',user_id:location.user_id,type:'special',num:stats.friends_specail,title:'特殊关注人'}))}>{stats.hasOwnProperty('friends_specail')?numeral(stats.friends_specail).format('0,0'):0}</a></p>
            </div>
            <div>
              <p>收到的赞</p>
              <p><a>{stats.hasOwnProperty('liked')?numeral(stats.liked).format('0,0'):0}</a></p>
            </div>
            <div>
              <p>被转发量</p>
              <p><a>{stats.hasOwnProperty('forwarded')?numeral(stats.forwarded).format('0,0'):0}</a></p>
            </div>
          </div>
          );
          const CardPbulicOne = () => (
            <div className={styles.cardInfo}>
              <div>
                <p>发布的置换</p>
                <p><a href='#'>{stats.hasOwnProperty('exchg_pub_all')?numeral(stats.exchg_pub_all).format('0,0'):0}</a></p>
              </div>  
              <div>
                <p>发起的置换已成功</p>
                <p><a href='#'>{stats.hasOwnProperty('exchg_pub_suc')?numeral(stats.exchg_pub_suc).format('0,0'):0}</a></p>
              </div>
              <div>
                <p>参与的置换已成功</p>
                <p><a href='#'>{stats.hasOwnProperty('exchg_attend_suc')?numeral(stats.exchg_attend_suc).format('0,0'):0}</a></p>
              </div> 
            </div> 
            );
          const CardPbulicTwo = () => (
            <div className={styles.cardInfo}>
              <div>
                <p>发布的活动</p>
                <p><a>{stats.hasOwnProperty('activity_pub')?numeral(stats.activity_pub).format('0,0'):0}</a></p>
              </div>  
              <div>
                <p>参加的活动</p>
                <p><a>{stats.hasOwnProperty('activity_attend')?numeral(stats.activity_attend).format('0,0'):0}</a></p>
              </div> 
            </div> 
            );
          const CardPbulicThird = () => (
            <div className={styles.cardInfo}>
              <div>
                <p>发布的分享</p>
                <p><a >{stats.hasOwnProperty('share_pub')?numeral(stats.share_pub).format('0,0'):0}</a></p>
              </div>  
              <div>
                <p>收藏数量</p>
                <p><a>{stats.hasOwnProperty('favorite')?numeral(stats.favorite).format('0,0'):0}</a></p>
              </div> 
            </div> 
                );
        return(  
          <div className={styles.filterCardList}> 
            <Card title="社交数据"   bordered={false}>
              <div className={styles.cardItemContent}  >
                <CardContact /> 
              </div> 
            </Card> 
            <Card title="发布数据" className={styles.card}  bordered={false}>
              <div className={styles.cardItemContent}  >
                <CardPbulicOne /> 
              </div> 
              <div className={styles.cardItemContent}  >
                <CardPbulicTwo /> 
              </div> 
              <div className={styles.cardItemContent}  >
                <CardPbulicThird /> 
              </div> 
            </Card>
          </div>
        )
    }
}