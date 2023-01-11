import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import "../Manager.scss";
import { addUser, getAllUsers, deleteUser } from "../../../config/apiService";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      ></Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const User = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = async(key) => {
    let res = await deleteUser(key?._id)
    if (res && res.status === 200) {
      toast.success(res?.message);
      handleData();
    } else {
      toast.error("Delete thất bại");
    }
  };
  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {
    let res = await getAllUsers();
    if (res && res.status === 200) {
      setDataSource(res?.data);
    }
  };
  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: "40%",
    },
    {
      title: "role",
      dataIndex: "role",
      width: "10%",
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <a style={{ marginRight: "10px" }}>Edit</a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      //   row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const onFinish = async (values) => {
    let res = await addUser(values);
    if (res && res.status === 200) {
      showModal();
      toast.success(res?.message);
      handleData()
    } else {
      toast.error(res?.message);
    }
  };
  return (
    <div>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add new
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        footer={""}
        open={isModalOpen}
        title="Reason for revert:"
        onCancel={showModal}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please type your reason!",
              },
            ]}
          >
            <Input placeholder="Email" rows={4} />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please type your reason!",
              },
            ]}
          >
            <Input placeholder="Name" rows={4} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please type your reason!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" rows={4} />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please type your reason!",
              },
            ]}
          >
            <Input placeholder="Role" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={showModal}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default User;
