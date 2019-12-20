import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => (color.id === colorToEdit.id ? res.data : color))
        );
        setEditing(false);
      })
      .catch(error => console.log("PUT failed", error));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log(err));
  };
  const handleColor = e => {
    setAddColor({ ...addColor, color: e.target.value });
  };
  const handlehex = e => {
    setAddColor({ ...addColor, code: { hex: e.target.value } });
  };
  const addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", addColor)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <div className="button-row">
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "black",
            padding: "3px 10px"
          }}
          to="/login"
        >
          Login
        </Link>
      </div>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addFriend}>
        <legend>add color</legend>
        <label>
          color name:
          <input onChange={handleColor} value={addColor.color} />
        </label>
        <label>
          hex code:
          <input onChange={handlehex} value={addColor.code.hex} />
        </label>
        <div className="button-row">
          <button type="submit">Add Color</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
