import "./App.css";
import { Row, Col, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async () => {
    try {
      let response = await axios.post("http://18.139.50.74:8080/login", {
        password: password,
        username: username,
      });
      if (response && response.data) {
        localStorage.setItem("token", response.data.data.token);
        history.push("/checklist");
      } else {
        alert("eror");
      }
    } catch (e) {
      alert("eror");
    }
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <Row>
        <Col md={6} lg={6}>
          Login
        </Col>
      </Row>
      <Row>
        <Col md={6} lg={6}>
          <Input
            placeholder="Input Username"
            prefix={<UserOutlined />}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} lg={6}>
          <Input
            type="password"
            placeholder="Input password"
            prefix={<LockOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
}

export default Login;
