import React from "react";
import { useCountdown } from "useCountdown";

const CountdownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountdown(targetDate);

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter minutes={minutes} seconds={seconds} />;
  }
};
