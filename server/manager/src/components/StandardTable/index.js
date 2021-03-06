import React, {PureComponent, Fragment} from 'react';
import {Table, Alert} from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({...column, total: 0});
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const {columns} = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      needTotalList,
    };
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

  render() {
    const {needTotalList} = this.state;
    const {data: {list, pagination}, loading, columns, rowKey, rowClassName} = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={rowKey}
          rowClassName={rowClassName}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
