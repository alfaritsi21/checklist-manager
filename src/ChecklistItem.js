import "./App.css";
import { Row, Col, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";

function ChecklistItem({ data, getData }) {
  const [show, setShow] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const deleteChecklist = async () => {
    await axios.delete(`http://18.139.50.74:8080/checklist/${data.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getData();
  };

  const deleteChecklistItem = async (id) => {
    await axios.delete(`http://18.139.50.74:8080/item/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getData();
  };

  const renameChecklistItem = async (id) => {
    try {
      let response = await axios.put(
        `http://18.139.50.74:8080/item/${id}`,
        {
          itemName: newChecklistItem,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response && response.data) {
        getData();
        setNewChecklistItem("");
      } else {
        alert("eror");
      }
    } catch (e) {
      alert("eror");
    }
  };

  const addChecklistItem = async () => {
    try {
      let response = await axios.post(
        "http://18.139.50.74:8080/item",
        {
          checklistId: data.id,
          itemName: newChecklistItem,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response && response.data) {
        getData();
        setNewChecklistItem("");
      } else {
        alert("eror");
      }
    } catch (e) {
      alert("eror");
    }
  };

  return (
    <Card>
      {data.name}
      <br />
      <Button onClick={() => setShow(!show)}>Show Children</Button>
      <Button onClick={() => deleteChecklist()}>Delete checklist</Button>
      {show &&
        data.items &&
        data.items.map((item) => {
          return (
            <Card key={item.id}>
              {item.name}
              <br />
              <Button onClick={() => renameChecklistItem(item.id)}>
                Rename item
              </Button>
              <Button onClick={() => deleteChecklistItem(item.id)}>
                Delete item
              </Button>
            </Card>
          );
        })}
      {show && (
        <Card>
          <Input
            placeholder="Input baru / rename item"
            onChange={(e) => setNewChecklistItem(e.target.value)}
            value={newChecklistItem}
          ></Input>
          <Button
            onClick={() => {
              addChecklistItem();
            }}
          >
            Tambah
          </Button>
          <p>
            <i>
              *note: untuk rename item, silakan input nama item baru dan klik
              button rename di item yang ingin direname
            </i>
          </p>
        </Card>
      )}
    </Card>
  );
}

export default ChecklistItem;
