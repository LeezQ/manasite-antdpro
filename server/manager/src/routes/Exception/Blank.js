import React from 'react';
import { Link } from 'dva/router';
import Exception from 'components/Exception';

export default () => (
  <Exception type="blank" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
