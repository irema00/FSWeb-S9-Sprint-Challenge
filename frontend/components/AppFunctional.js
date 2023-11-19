import React from "react";
import { useState } from "react";
import axios from "axios";

const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [indexB, setIndexB] = useState(initialIndex);

  function getXY(indexB) {
    const X = (indexB % 3) + 1;
    const Y = parseInt(indexB / 3) + 1;
    return [X, Y];
  }

  function getXYMesaj() {
    const cords = getXY(indexB);
    return `Koordinatlar (${cords[0]}, ${cords[1]})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndexB(initialIndex);
  }

  function sonrakiIndex(yon) {
    if (yon === "left" && indexB % 3 !== 0) {
      return indexB - 1;
    }
    if (yon === "up" && indexB >= 3) {
      return indexB - 3;
    }
    if (yon === "right" && indexB % 3 !== 2) {
      return indexB + 1;
    }
    if (yon === "down" && indexB <= 5) {
      return indexB + 3;
    }
    return indexB;
  }

  function ilerle(evt) {
    const yon = evt.target.id;
    const yeniIndexB = sonrakiIndex(yon);
    if (yeniIndexB !== indexB) {
      setSteps(steps + 1);
      setIndexB(yeniIndexB);
    } else {
      let hataMesaji = "";

      if (yon === "right") {
        hataMesaji = "Sağa gidemezsiniz";
      } else if (yon === "down") {
        hataMesaji = "Aşağıya gidemezsiniz";
      } else if (yon === "left") {
        hataMesaji = "Sola gidemezsiniz";
      } else if (yon === "up") {
        hataMesaji = "Yukarıya gidemezsiniz";
      }

      setMessage(hataMesaji);
    }
  }
  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const [x, y] = getXY(indexB);
    axios
      .post("http://localhost:9000/api/result", {
        x,
        y,
        steps: steps,
        email: email,
      })
      .then((res) => {
        console.log("POST success:", res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log("POST error", err);
        setMessage(err.response.data.message);
      });
    setEmail("");
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === indexB ? " active" : ""}`}>
            {idx === indexB ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 testid="message" id="message">
          {message}
        </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
