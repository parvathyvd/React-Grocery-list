import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getItemFromLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  }
  return [];
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState(getItemFromLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const onButtonClick = () => {
    if (!inputValue) {
      // Alert add something
      setAlert({ show: true, msg: "Please add an input", type: "warning" });
    } else if (inputValue && isEditing) {
      //Edit the item with id and change the list of title to the inputed value and setList
      const editThis = list.map((li, index) => {
        if (li.id === editId) {
          return { ...list, title: inputValue };
        }
        return li;
      });
      setList(editThis);
      setInputValue("");
      setIsEditing(false);
      setAlert({ show: true, msg: "Edited the item", type: "warning" });
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: inputValue,
      };
      setList([...list, newItem]);
      //Alert added the item
      setAlert({ show: true, msg: "Added the item", type: "success" });
      setInputValue("");
    }
  };

  const removeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const onEditHandler = (id) => {
    console.log("edit", id);
    setIsEditing(true);
    setEditId(id);
    const editItem = list.find((li) => li.id === id);
    setInputValue(editItem.title);
  };

  const onDeleteHandler = (id) => {
    console.log("delete", id);
    let filteredItem = list.filter((li) => li.id != id);
    setList([...filteredItem]);
    setAlert({ show: true, msg: "Deleted the item", type: "danger" });
  };

  return (
    <section className="section-center">
      <h2 className="text-center">grocery bud</h2>
      {alert.show && (
        <Alert alert={alert} removeAlert={removeAlert} list={list} />
      )}
      <div className="form-control">
        <input
          type="text"
          className="grocery"
          placeholder="Typer your item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn" onClick={onButtonClick}>
          {isEditing ? "Edit" : "Add"}
        </button>
      </div>
      <div className="mt-2">
        <List
          list={list}
          editItem={onEditHandler}
          deleteItem={onDeleteHandler}
        />
      </div>
    </section>
  );
}

export default App;
