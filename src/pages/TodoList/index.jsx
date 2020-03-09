import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Form, Modal, Input, Switch, DatePicker } from 'antd';

const formLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const TodoForm = Form.create()(({ form, todo, onOk, onCancel }) => {
  const { validateFields, getFieldDecorator } = form;

  const handleSave = () => {
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal title="Todo" onOk={handleSave} onCancel={handleCancel} visible destroyOnClose>
      <Form {...formLayout}>
        <Form.Item label="Name">
          {getFieldDecorator('name', { initialValue: todo.name, rules: [{ required: true }] })(
            <Input />,
          )}
        </Form.Item>
        <Form.Item label="Date">{getFieldDecorator('date')(<DatePicker />)}</Form.Item>
        <Form.Item label="Done?">
          {getFieldDecorator('done', { initialValue: todo.done })(<Switch />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Done', dataIndex: 'done', key: 'done', render: val => (val ? 'Yes' : 'No') },
];

const TodoList = ({ todos, isLoadingTodos }) => {
  const dispatch = useDispatch();
  const [todoOnEdition, setTodoOnEdition] = useState(null);

  useEffect(() => {
    dispatch({ type: 'todo/fetch' });
  }, []);

  const handleAdd = () => {
    setTodoOnEdition({});
  };

  const handleSave = todo => {
    console.log(todo);
    setTodoOnEdition(null);
  };

  const handleCancel = () => {
    setTodoOnEdition(null);
  };

  return (
    <PageHeaderWrapper
      extra={
        <Button onClick={handleAdd} type="primary">
          New todo
        </Button>
      }
    >
      <Card loading={isLoadingTodos}>
        <Table dataSource={todos} columns={columns} />
      </Card>

      {todoOnEdition && <TodoForm todo={todoOnEdition} onOk={handleSave} onCancel={handleCancel} />}
    </PageHeaderWrapper>
  );
};

export default connect(({ todo, loading }) => ({
  todos: todo.todos,
  isLoadingTodos: loading.effects['todo/fetch'],
}))(TodoList);
