import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Popconfirm,
  Badge,
  message,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import * as XLSX from "xlsx";

const { Title, Text } = Typography;

const RsvpEntries = () => {
  const [rsvpEntries, setRsvpEntries] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch RSVP entries
  const fetchRsvpEntries = async () => {
    try {
      const snapshot = await getDocs(collection(db, "rsvpEntries"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRsvpEntries(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch RSVP entries");
    }
  };

  useEffect(() => {
    fetchRsvpEntries();
  }, []);

  // Delete RSVP entry
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvpEntries", id));
      message.success("RSVP entry deleted!");
      fetchRsvpEntries();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete RSVP entry");
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rsvpEntries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP Entries");
    XLSX.writeFile(workbook, "RSVP_Entries.xlsx");
  };

  // Columns
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => (a.fullName || "").toString().localeCompare((b.fullName || "").toString()),
      render: (text) => <Text strong>{text || "-"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "-",
    },
    {
      title: "Attending",
      dataIndex: "attending",
      key: "attending",
      render: (att) =>
        att === "yes" ? <Badge status="success" text="Yes" /> : <Badge status="error" text="No" />,
      filters: [
        { text: "Yes", value: "yes" },
        { text: "No", value: "no" },
      ],
      onFilter: (value, record) => record.attending === value,
    },
    {
      title: "Meal",
      dataIndex: "meal",
      key: "meal",
      render: (text) => text || "-",
    },
    {
      title: "Hotel Stay",
      dataIndex: "stay",
      key: "stay",
      render: (text) => text || "-",
    },
    {
      title: "Nights",
      dataIndex: "nights",
      key: "nights",
      render: (nights) => (Array.isArray(nights) ? nights.join(", ") : nights || "-"),
    },
    {
      title: "Dietary Restrictions",
      dataIndex: "dietary",
      key: "dietary",
      render: (text) => text || "-",
    },
    {
      title: "Plus One",
      dataIndex: "plusOne",
      key: "plusOne",
      render: (text) => text || "-",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (msg) => <Text ellipsis={{ tooltip: msg }}>{msg || "-"}</Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure delete this entry?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  // Filtered entries safely
  const filteredEntries = rsvpEntries.filter((entry) =>
    ((entry.fullName || "").toString().toLowerCase() || "").includes((search || "").toString().toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>RSVP Entries</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<DownloadOutlined />} onClick={exportToExcel}>
            Export Excel
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredEntries}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        bordered
        style={{ background: "#fff", borderRadius: 8, padding: 10 }}
      />
    </div>
  );
};

export default RsvpEntries;
