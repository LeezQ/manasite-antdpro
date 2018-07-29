import React, { PureComponent, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Card,Popconfirm,Icon} from 'antd';
import styles from './index.less';

class CardItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {title,cover,link="/",nickName,operator,extendData,onDelete,sourceUrl} = this.props;

    return (
        <div className={styles.card}>
            <header>
                <Link to={link}>
                  <img className={styles.cover} src={cover}/>
                </Link>
                {
                  sourceUrl && <a href={sourceUrl}><Icon type="fork" className={styles.leftTopIcon} /></a>
                }
                {title && <p className={styles.depict}>{title}</p>}
            </header>
            <div className={styles.content}>
                <h3><Link style ={{color:"#333333"}} to={link}>{nickName}</Link>
                    { onDelete &&
                      <Popconfirm
                          title="你确定要删除么？"
                          okText="确定" cancelText="取消"
                          onConfirm={()=> onDelete()}
                          >
                          <a className={styles.deleteLink} href="javascript:void(0)">删除</a>
                      </Popconfirm>
                    }</h3>
                {operator && <p>{operator}</p>}
                {
                    extendData.firstData && <div>{extendData.firstData}</div>
                }
                {
                    extendData.secondData && <div>{extendData.secondData}</div>
                }
            </div>
        </div>
    );
  }
}

export default CardItem;
