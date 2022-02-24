import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list, editItem, deleteItem }) => {
  return (
    <div className="grocery-list">
      {list.map((li) => {
        const { id, title } = li;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
