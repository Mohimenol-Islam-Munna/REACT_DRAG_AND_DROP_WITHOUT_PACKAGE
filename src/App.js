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

  // console.log("firstState : ", firstState);
  console.log("secondtState : ", secondtState);

  // drag start
  const dragStartHandler = (e) => {
    e.target.style.opacity = "0.5";
    e.target.style.backgroundColor = "green";

    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";

    if (e.target.parentElement.id == "ul-2") {
      let removeItem = secondtState.filter((item) => item.id != e.target.id);

      console.log("removeItem :", removeItem);

      setSecondState((prev) => {
        return [...prev.filter((item) => item.id != e.target.id)];
      });
    }

    e.dataTransfer.setData("text/html", e.target.id);
  };

  // drop handler
  const dropHandler = (e, num) => {
    e.stopPropagation();

    let data = e.dataTransfer.getData("text/html");

    let dragedItem = firstState.find((item) => item.id == data);

    let findItem2 = secondtState.find((item) => item.id == data);

    if ((num = 2 && !findItem2)) {
      // setSecondState((prev) => {
      //   return [...prev, dragedItem];
      // });
    }

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
    e.target.style.border = "2px dotted salmon";
  };

  // drag leave
  const dragLeaveHandler = (e) => {
    e.target.style.border = "2px solid salmon";
  };

  // drag end
  const dragEndHandler = (e) => {
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
            id="ul-1"
            onDrop={(e) => dropHandler(e, 1)}
            onDragOver={(e) => dragOverHandler(e)}
          >
            {firstState.map((item) => (
              <li
                id={item.id}
                key={item.id}
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
            id="ul-2"
            onDrop={(e) => dropHandler(e, 2)}
            onDragOver={(e) => dragOverHandler(e)}
          ></ul>
        </div>
      </div>
    </div>
  );
}

export default App;
