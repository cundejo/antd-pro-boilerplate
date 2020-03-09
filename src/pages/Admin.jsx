import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Icon, Typography } from 'antd';
import React from 'react';

export default () => (
  <PageHeaderWrapper content="Description of the Admin page">
    <Card>
      <Typography.Title
        level={2}
        style={{
          textAlign: 'center',
        }}
      >
        <Icon type="smile" theme="twoTone" /> Ant Design Pro{' '}
        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> You
      </Typography.Title>

      <p>This page is only visible if you access as admin</p>
    </Card>
  </PageHeaderWrapper>
);
