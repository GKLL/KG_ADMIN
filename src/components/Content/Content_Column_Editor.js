import React from 'react';
import {Link} from 'react-router'
import {Form, Row, Col, Input, Button} from 'antd';
const Content_Column_Editor = (props) => {
  return (
    <div>
      <p>同级栏目排序越小越靠前</p>
      <Button type="primary" size = 'large'>删除</Button>
    </div>
  );
};

Content_Column_Editor.propTypes = {
};

export default Content_Column_Editor;