import "./App.css";
import { Row, Col, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

function Checklist() {
  const [list, setList] = useState([]);
  const [newChecklist, setNewChecklist] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await axios.get("http://18.139.50.74:8080/checklist", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response && response.data) {
      setList(response.data.data);
    } else {
      console.log("error");
    }
  };

  const addChecklist = async () => {
    try {
      let response = await axios.post(
        "http://18.139.50.74:8080/checklist",
        {
          name: newChecklist,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response && response.data) {
        getData();
        setNewChecklist("");
      } else {
        alert("eror");
      }
    } catch (e) {
      alert("eror");
    }
  };

  return (
    <div className="App">
      <div className="container mx-auto">
        {list.map((item) => {
          return <ChecklistItem data={item} getData={getData} />;
        })}
        <Card>
          <Input
            placeholder="Input checklist baru"
            onChange={(e) => setNewChecklist(e.target.value)}
            value={newChecklist}
          ></Input>
          <Button
            onClick={() => {
              addChecklist();
            }}
          >
            Tambah
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Checklist;
