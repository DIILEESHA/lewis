// AdminDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import RsvpEntries from "./RsvpEntries";
import {
  Layout,
  Menu,
  Typography,
  Badge,
  Card,
  Space,
  Button,
  Popconfirm,
  Input,
  Modal,
  Form,
  Row,
  Col,
  Divider,
  Tooltip,
  message,
  Drawer,
} from "antd";
import {
  UserAddOutlined,
  DeleteOutlined,
  CopyOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [guests, setGuests] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [sitePwdModalVisible, setSitePwdModalVisible] = useState(false);
  const [sitePassword, setSitePassword] = useState("");
  const [activePage, setActivePage] = useState("dashboard");

  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();
  const [sitePwdForm] = Form.useForm();
  const qrRef = useRef({});

  // Admin Login
  const handleLogin = () => {
    if (password === "jl2026!") {
      setIsLoggedIn(true);
      fetchGuests();
      fetchSitePassword();
    } else {
      message.error("Incorrect password");
    }
  };

  // Fetch Guests
  const fetchGuests = async () => {
    const snapshot = await getDocs(collection(db, "guests"));
    const guestList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGuests(guestList);
  };

  // Add Guest
  const handleAddGuest = async (values) => {
    try {
      const cleanedName = values.name.trim().toLowerCase().replace(/\s+/g, "");
      const existing = guests.find((g) => g.link === `/${cleanedName}`);
      if (existing)
        return message.error("Guest with this name already exists!");
      const guestLink = `/${cleanedName}`;
      await addDoc(collection(db, "guests"), {
        name: values.name,
        password: values.password,
        link: guestLink,
      });
      message.success("Guest added successfully!");
      fetchGuests();
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to add guest");
    }
  };

  // Update Guest Password
  const handleUpdatePassword = async (guestId, newPassword) => {
    try {
      await updateDoc(doc(db, "guests", guestId), { password: newPassword });
      message.success("Password updated!");
      fetchGuests();
    } catch (err) {
      console.error(err);
      message.error("Failed to update password");
    }
  };

  // Delete Guest
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "guests", id));
      message.success("Guest deleted successfully!");
      fetchGuests();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete guest");
    }
  };

  // Download QR Code
  const downloadQRCode = (guestId) => {
    const canvasWrapper = qrRef.current[guestId];
    if (!canvasWrapper) return message.error("QR code not found");
    const canvas = canvasWrapper.querySelector("canvas");
    if (!canvas) return message.error("QR canvas not found");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR-${guestId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Copy guest link
  const copyLink = (link) => {
    navigator.clipboard.writeText(`${window.location.origin}${link}`);
    message.success("Copied!");
  };

  // Preview guest link
  const previewLink = (link) => {
    window.open(`${window.location.origin}${link}`, "_blank");
  };

  // Open Password Modal for guest
  const openPwdModal = (guest) => {
    setSelectedGuest(guest);
    pwdForm.setFieldsValue({ password: guest.password });
    setPwdModalVisible(true);
  };

  // Submit new password from modal
  const handlePwdSubmit = async () => {
    const newPwd = pwdForm.getFieldValue("password");
    await handleUpdatePassword(selectedGuest.id, newPwd);
    setPwdModalVisible(false);
  };

  // Site Password Management
  const fetchSitePassword = async () => {
    try {
      const snapshot = await getDocs(collection(db, "sitePassword"));
      if (!snapshot.empty) {
        const pwd = snapshot.docs[0].data().password;
        setSitePassword(pwd);
        sitePwdForm.setFieldsValue({ password: pwd });
      }
    } catch (err) {
      console.error("Failed to fetch site password", err);
    }
  };

  const handleUpdateSitePassword = async () => {
    const newPwd = sitePwdForm.getFieldValue("password");
    try {
      const snapshot = await getDocs(collection(db, "sitePassword"));
      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await updateDoc(doc(db, "sitePassword", docId), { password: newPwd });
      } else {
        await addDoc(collection(db, "sitePassword"), { password: newPwd });
      }
      setSitePassword(newPwd);
      message.success("Public site password updated!");
      setSitePwdModalVisible(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to update site password");
    }
  };

  const filteredGuests = guests.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          padding: 20,
          backgroundColor: "#f0f2f5",
        }}
      >
        <Title level={2}>Admin Login</Title>
        <Input.Password
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: 300, marginBottom: 20, maxWidth: "90vw" }}
        />
        <Button type="primary" size="large" onClick={handleLogin}>
          Login
        </Button>
      </div>
    );
  }

  const menuItems = [
    { key: "addGuest", label: "Add Guest", icon: <PlusOutlined /> },
    {
      key: "changeSitePwd",
      label: "Change Public Site Password",
      icon: <UserAddOutlined />,
    },
    { key: "rsvp", label: "RSVP Entries", icon: <UserAddOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        style={{ position: "fixed", height: "100vh", zIndex: 1000 }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {collapsed ? "AD" : "Admin Dashboard"}
        </div>
     <Menu
  theme="light"
  mode="inline"
  selectedKeys={[activePage]}
  onClick={({ key }) => {
    if (key === "addGuest") setIsModalOpen(true);
    if (key === "changeSitePwd") setSitePwdModalVisible(true);
    if (key === "rsvp") setActivePage("rsvp");
  }}
  items={menuItems}
/>

      </Sider>

      <Layout
        style={{ marginLeft: collapsed ? 0 : 200, transition: "all 0.2s" }}
      >
        <Header
          style={{
            backgroundColor: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="text"
            onClick={() => setMobileDrawer(true)}
            icon={<MenuUnfoldOutlined />}
          />
          <Title
            level={4}
            style={{ margin: "8px 0", flexGrow: 1, minWidth: 150 }}
          >
            {activePage === "dashboard" ? "Guests Management" : "RSVP Entries"}
          </Title>
          {activePage === "dashboard" && (
            <Badge
              count={guests.length}
              color="#52c41a"
              style={{ fontSize: 16, marginBottom: 8 }}
            >
              <Text strong>Active Guests</Text>
            </Badge>
          )}
        </Header>

        <Content style={{ margin: "20px", overflowX: "hidden" }}>
          {activePage === "dashboard" && (
            <>
              {/* Guest Management Content */}
              <Row gutter={[12, 12]} justify="space-between">
                <Col xs={24} sm={16} md={12}>
                  <Input.Search
                    placeholder="Search guests..."
                    allowClear
                    size="large"
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={24} sm={8} md={4}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    style={{ width: "100%" }}
                  >
                    Add Guest
                  </Button>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[16, 16]}>
                {filteredGuests.map((guest) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={guest.id}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: 12,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                        width: "100%",
                      }}
                      title={guest.name}
                    >
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}
                      >
                        <Text
                          ellipsis={{
                            tooltip: `${window.location.origin}${guest.link}`,
                          }}
                        >
                          {window.location.origin}
                          {guest.link}
                        </Text>

                        <Space wrap>
                          <Tooltip title="Copy Link">
                            <Button
                              size="small"
                              icon={<CopyOutlined />}
                              onClick={() => copyLink(guest.link)}
                            />
                          </Tooltip>
                          <Tooltip title="Preview Link">
                            <Button
                              size="small"
                              icon={<EyeOutlined />}
                              onClick={() => previewLink(guest.link)}
                            />
                          </Tooltip>
                          <Tooltip title="Download QR Code">
                            <Button
                              size="small"
                              type="primary"
                              icon={<DownloadOutlined />}
                              onClick={() => downloadQRCode(guest.id)}
                            />
                          </Tooltip>
                          <Tooltip title="Delete Guest">
                            <Popconfirm
                              title="Are you sure delete this guest?"
                              onConfirm={() => handleDelete(guest.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                              />
                            </Popconfirm>
                          </Tooltip>
                        </Space>

                        <div
                          ref={(el) => (qrRef.current[guest.id] = el)}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 10,
                          }}
                        >
                          <QRCodeCanvas
                            value={`${window.location.origin}${guest.link}`}
                            size={120}
                          />
                        </div>

                        <Button
                          type="primary"
                          block
                          onClick={() => openPwdModal(guest)}
                        >
                          Change Password
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {activePage === "rsvp" && <RsvpEntries />}

          {/* Modals remain unchanged */}
          {/* Add Guest Modal */}
          <Modal
            title="Add Guest"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            centered
          >
            <Form form={form} layout="vertical" onFinish={handleAddGuest}>
              <Form.Item
                label="Guest Name"
                name="name"
                rules={[{ required: true, message: "Enter guest name" }]}
              >
                <Input placeholder="Enter guest name" />
              </Form.Item>
              <Form.Item
                label="Guest Password"
                name="password"
                rules={[{ required: true, message: "Enter password" }]}
              >
                <Input.Password placeholder="Enter guest password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<PlusOutlined />}
                >
                  Add Guest
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Change Guest Password Modal */}
          <Modal
            title={`Change Password for ${selectedGuest?.name}`}
            open={pwdModalVisible}
            onCancel={() => setPwdModalVisible(false)}
            onOk={handlePwdSubmit}
            centered
          >
            <Form form={pwdForm} layout="vertical">
              <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: "Enter new password" }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
            </Form>
          </Modal>

          {/* Public Site Password Modal */}
          <Modal
            title="Change Public Site Password"
            open={sitePwdModalVisible}
            onCancel={() => setSitePwdModalVisible(false)}
            onOk={handleUpdateSitePassword}
            centered
          >
            <Form form={sitePwdForm} layout="vertical">
              <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: "Enter new password" }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
            </Form>
          </Modal>

          <Drawer
            title="Admin Menu"
            placement="left"
            onClose={() => setMobileDrawer(false)}
            open={mobileDrawer}
            bodyStyle={{ padding: 0 }}
          >
            <Menu mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
