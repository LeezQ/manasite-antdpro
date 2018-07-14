import React, { PureComponent, Fragment } from 'react';
import {Card} from 'antd';
import styles from './index.less';

class CardItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {title,cover,depict,operator,extendData,onDelete} = this.props;

    return (
        <div className={styles.card}>
            <header>
                <img className={styles.cover} src={cover}/>
                {depict && <p className={styles.depict}>{depict}</p>}
            </header>
            <div className={styles.content}>
                <h3>{title} { onDelete && <a href="javascript:void(0)" onClick={onDelete}>删除</a>}</h3>
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
