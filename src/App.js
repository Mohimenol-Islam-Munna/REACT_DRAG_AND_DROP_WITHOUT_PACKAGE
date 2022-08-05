import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [selectParent, setSelectParent] = useState("");
  const [countTodo, setcountTodo] = useState(5);

  const [mainToDoState, setMainToDoState] = useState({
    serverSide: [],
    clientSide: [],
  });

  const [progressToDoState, setProgressToDoState] = useState({
    serverSide: [],
    clientSide: [],
  });

  const [finalToDoState, setFinalToDoState] = useState({
    serverSide: [],
    clientSide: [],
  });

  // add to do handler
  const addToDoHandler = (e) => {
    e.preventDefault();

    setcountTodo((prev) => prev + 1);

    setMainToDoState((prev) => {
      return {
        ...mainToDoState,
        clientSide: [
          ...mainToDoState.clientSide,
          { id: countTodo + 1, title: inputText },
        ],
        serverSide: [
          ...mainToDoState.serverSide,
          { id: countTodo + 1, title: inputText },
        ],
      };
    });

    // clear input filed
    setInputText("");
  };

  // drag start
  const dragStartHandler = (e) => {
    e.target.style.opacity = "0.5";
    e.target.style.backgroundColor = "green";

    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";

    e.dataTransfer.setData("text/html", e.target.id);

    // select parent container
    setSelectParent(e.target.parentElement.id);
  };

  // drop handler
  const dropHandler = (e, num) => {
    e.stopPropagation();

    let data = e.dataTransfer.getData("text/html");

    e.target.appendChild(document.getElementById(data));

    let dragedItem;

    // select data comes from where
    if (selectParent == "c1") {
      dragedItem = mainToDoState.clientSide.find((item) => item.id == data);
    } else if (selectParent == "c2") {
      dragedItem = progressToDoState.clientSide.find((item) => item.id == data);
    } else {
      dragedItem = finalToDoState.clientSide.find((item) => item.id == data);
    }

    if (e.target.id == "c1" && selectParent != e.target.id) {
      console.log("in drop dragedItem 1 ::", dragedItem);

      setMainToDoState((prev) => {
        return { ...prev, clientSide: [...prev.clientSide, dragedItem] };
      });
    } else if (e.target.id == "c2" && selectParent != e.target.id) {
      console.log("in drop dragedItem 2 ::", dragedItem);

      setProgressToDoState((prev) => {
        return { ...prev, clientSide: [...prev.clientSide, dragedItem] };
      });
    } else {
      setFinalToDoState((prev) => {
        return { ...prev, clientSide: [...prev.clientSide, dragedItem] };
      });
    }

    // remove item from list when drag start
    if (selectParent == "c1" && selectParent != e.target.id) {
      let othersItem = mainToDoState.clientSide.filter(
        (item) => item.id != data
      );

      setMainToDoState((prev) => {
        return { ...prev, clientSide: othersItem };
      });
    } else if (selectParent == "c2" && selectParent != e.target.id) {
      let othersItem = progressToDoState.clientSide.filter(
        (item) => item.id != data
      );

      setProgressToDoState((prev) => {
        return { ...prev, clientSide: othersItem };
      });
    } else {
      let othersItem = finalToDoState.clientSide.filter(
        (item) => item.id != data
      );

      setFinalToDoState((prev) => {
        return { ...prev, clientSide: othersItem };
      });
    }

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

  useEffect(() => {
    setMainToDoState((prev) => {
      return {
        ...mainToDoState,
        serverSide: [
          { id: 1, title: "item 1" },
          { id: 2, title: "item 2" },
          { id: 3, title: "item 3" },
          { id: 4, title: "item 4" },
          { id: 5, title: "item 5" },
        ],
        clientSide: [
          { id: 1, title: "item 1" },
          { id: 2, title: "item 2" },
          { id: 3, title: "item 3" },
          { id: 4, title: "item 4" },
          { id: 5, title: "item 5" },
        ],
      };
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "gray",
      }}
    >
      <h2>React Drag and Drop</h2>

      <div style={{ width: "60%", margin: "auto", padding: "20px" }}>
        <input
          type="text"
          style={{ padding: "10px" }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <input
          style={{ padding: "10px" }}
          type="submit"
          value="Submit"
          onClick={(e) => addToDoHandler(e)}
        />
      </div>

      <div className="container">
        <div className="child_container">
          <ul
            id="c1"
            onDrop={(e) => dropHandler(e, 1)}
            onDragOver={(e) => dragOverHandler(e)}
          >
            {mainToDoState.serverSide.map((item) => (
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
            id="c2"
            onDrop={(e) => dropHandler(e, 2)}
            onDragOver={(e) => dragOverHandler(e)}
          ></ul>
        </div>
        <div className="child_container">
          <ul
            id="c3"
            onDrop={(e) => dropHandler(e, 2)}
            onDragOver={(e) => dragOverHandler(e)}
          ></ul>
        </div>
      </div>
    </div>
  );
}

export default App;
