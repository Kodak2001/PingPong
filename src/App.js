import { useState, useEffect } from "react";
import "./App.css";

function Paddle({ x, y }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: "black",
        width: "10px",
        height: "40px",
      }}
    ></div>
  );
}

function Field({ style }) {
  let tl = {
    borderLeft: "solid 1px gray",
    borderTop: "solid 1px gray",
    borderRight: "1px dotted gray",
  };
  let tr = {
    borderRight: "solid 1px gray",
    borderTop: "solid 1px gray",
  };
  let bl = {
    borderLeft: "solid 1px gray",
    borderBottom: "solid 1px gray",
    borderRight: "1px dotted gray",
  };
  let br = {
    borderRight: "solid 1px gray",
    borderBottom: "solid 1px gray",
  };
  return (
    <div>
      <table style={style}>
        <tr>
          <td style={tl}></td>
          <td style={tr}></td>
        </tr>
        <tr>
          <td style={{ borderRight: "dotted 1px gray" }}></td>
          <td></td>
        </tr>
        <tr>
          <td style={{ borderRight: "dotted 1px gray" }}></td>
          <td></td>
        </tr>
        <tr>
          <td style={bl}></td>
          <td style={br}></td>
        </tr>
      </table>
    </div>
  );
}

function Ball({ position }) {
  let { x, y, vx, vy } = position;
  return (
    <div
      style={{
        left: x,
        top: y,
        backgroundColor: "black",
        width: "10px",
        height: "10px",
        borderRadius: "25px",
        position: "absolute",
      }}
    ></div>
  );
}

export default function App() {
  let [leftY, setLeftY] = useState({ y: 110 });
  let [rightY, setRightY] = useState({ y: 110 });
  let [ball, setBall] = useState({ x: 200, y: 100, vx: 0, vy: 0 });
  let [wynik, setWynik] = useState({ left: 0, right: 0 });
  let [time, setTime] = useState({ m: 0, s: 0 });

  useEffect(() => {
    let klawisz = (e) => {
      //65 - a
      //68 - d
      //37 - <
      //39 - >
      if (e.keyCode === 68 && leftY.y < 210) {
        leftY.y = leftY.y + 10;
        setLeftY({ ...leftY });
      }
      if (e.keyCode === 65 && leftY.y > 10) {
        leftY.y = leftY.y - 10;
        setLeftY({ ...leftY });
      }
      if (e.keyCode === 37 && rightY.y < 210) {
        rightY.y = rightY.y + 10;
        setRightY({ ...rightY });
      }
      if (e.keyCode === 39 && rightY.y > 10) {
        rightY.y = rightY.y - 10;
        setRightY({ ...rightY });
      }
    };

    document.addEventListener("keydown", klawisz, false);
    // 400 x 240

    return () => {};
  }, []);

  let changeTime = () => {
    setTimeout(changeTime(), 1000);
    if (time.s === 60) {
      setTime({ ...time, m: time.m + 1, s: 0 });
    } else {
      setTime({ ...time, s: time.s + 1 });
    }
  };

  let resetBall = () => {
    ball.x = 200;
    ball.y = 100;
    ball.vx = -ball.vx;
  };

  let cmdStop = () => {
    ball.x = ball.x;
    ball.y = ball.y;
    ball.vx = 0;
    ball.vy = 0;
  };

  let cmdStart = () => {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vx = 10;
    ball.vy = 10;
  };

  let cmdRestart = () => {
    setWynik({ ...wynik, right: 0, left: 0 });
    ball.x = 200;
    ball.y = 125;
    ball.vx = 0;
    ball.vy = 0;
  };

  let aktualizuj = () => {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x <= 2 && ball.y >= 60 && ball.y <= 180) {
      setWynik({ ...wynik, right: wynik.right + 1 });
      resetBall();
    }
    if (ball.x > 396 && ball.y > 60 && ball.y < 180) {
      setWynik({ ...wynik, left: wynik.left + 1 });
      resetBall();
    }
    if (ball.x <= 10 && leftY.y < ball.y && leftY.y + 40 >= ball.y) {
      ball.x -= ball.vx;
      ball.vx = -ball.vx;
    }
    if (ball.x >= 390 && rightY.y < ball.y && rightY.y + 40 >= ball.y) {
      ball.x -= ball.vx;
      ball.vx = -ball.vx;
    }
    if (ball.y > 240) {
      ball.y -= ball.vy;
      ball.vy = -ball.vy;
    }
    if (ball.y < 0) {
      ball.y -= ball.vy;
      ball.vy = -ball.vy;
    }
    if (ball.x > 400) {
      ball.x -= ball.vx;
      ball.vx = -ball.vx;
    }
    if (ball.x < 0) {
      ball.x -= ball.vx;
      ball.vx = -ball.vx;
    }
    setBall({ ...ball });
  };

  setTimeout(aktualizuj, 30);
  return (
    <div className="App">
      <h1>Ping Pong</h1>
      <div>
        <button onClick={cmdStart}>Start</button>
        <button onClick={cmdStop}>Stop</button>
        <button onClick={cmdRestart}>Restart</button>
      </div>
      <div style={{ textAlign: "center" }}>
        {time.m}:{time.s}
      </div>
      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          position: "relative",
          height: "260px",
        }}
      >
        <Field style={{ position: "absolute" }} />
        <Paddle x={10} y={leftY.y} />
        <Paddle x={390} y={rightY.y} />
        <Ball position={ball} />
      </div>
      <div style={{ textAlign: "center" }}>
        {wynik.left} : {wynik.right}
      </div>
    </div>
  );
}
