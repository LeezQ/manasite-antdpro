import React, { PureComponent, Fragment } from 'react';
import { Table, Alert,Card,Row,Col,Pagination} from 'antd';
import styles from './index.less';
const { Meta } = Card;

class CardTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

  onShowSizeChange= (current, pageSize)=> {
    console.log(current, pageSize);
  }

  render() {
    const { needTotalList } = this.state;
    const { data: {list,pagination },loading, columns, rowKey } = this.props;

    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
    };

    return (
        <div  className={styles.cardTable}>
          <Row>
            {
                list && list.map(item=>
                  <Col md={6} sm={24} key={item.id} >
                    <Card
                      hoverable
                      className={styles.cardList}
                      cover={<img alt="example" style={{height:150}} src={item.cover} />}
                    >
                      <div>
                          <h3 className={styles.title}>{item.title}<a href="javascript:void(0)" className={styles.deleteButton}>删除</a></h3>
                          <p className={styles.bottomPrompt}><span>{item.createdAt}</span><span className={styles.right}>收到申请：{item.applyCount}</span></p>
                      </div>
                    </Card>
                  </Col>

                )
            }
          </Row>
          <div className={styles.pagination}>
              <span>共 100 条记录 第 1 / 10 页</span>
              <span className={styles.right}><Pagination {...paginationProps} onShowSizeChange={this.onShowSizeChange} defaultCurrent={1} total={100} /></span>
          </div>
        </div>
    );
  }
}

export default CardTable;
