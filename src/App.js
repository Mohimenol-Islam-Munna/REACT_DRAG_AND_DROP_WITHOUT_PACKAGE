import React, { useState } from "react";
import "./App.css";

function App() {
  const [firstState, setFirstState] = useState([
    { id: 1, title: "item 1" },
    { id: 2, title: "item 2" },
    { id: 3, title: "item 3" },
    { id: 4, title: "item 4" },
    { id: 5, title: "item 5" },
  ]);

  const [secondtState, setSecondState] = useState([]);


  // console.log("firstState : ", firstState)

  // drag start
  const dragStartHandler = (e) => {
    console.log("drag start handler event ", e);
    e.target.style.opacity = "0.5";
    e.target.style.backgroundColor = "green";

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.id);
  };

  // drop handler
  const dropHandler = (e) => {
    console.log("drop handler event ", e);
    e.stopPropagation();

    const data = e.dataTransfer.getData("text/html");

    e.target.appendChild(document.getElementById(data));

    return false;
  };

  // drag over
  const dragOverHandler = (e) => {
    e.preventDefault();
    return false;
  };

  // drag enter
  const dragEnterHandler = (e) => {
    console.log("drag start handler event ", e);
    e.target.style.border = "2px dotted salmon";
  };

  // drag leave
  const dragLeaveHandler = (e) => {
    e.target.style.border = "2px solid salmon";
  };

  // drag end
  const dragEndHandler = (e) => {
    console.log("drag start handler event ", e);
    e.target.style.opacity = "1";
    e.target.style.backgroundColor = "blueviolet";
  };

  return (
    <div
      style={{
        backgroundColor: "gray",
      }}
    >
      <h2>React Drag and Drop</h2>

      <div className="container">
        <div className="child_container">
          <ul
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
          >
            {firstState.map((item) => (
              <li
                id={item.id}
                draggable="true"
                onDragStart={(e) => dragStartHandler(e)}
                onDragEnter={(e) => dragEnterHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="child_container">
          <ul
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
          ></ul>
        </div>
      </div>
    </div>
  );
}

export default App;
