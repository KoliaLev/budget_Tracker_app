import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.style.css";

const MyCalendar = () => {
  const [value, changeVlue] = useState(new Date());

  return <Calendar onChange={changeVlue} value={value} />;
};

export default MyCalendar;
