import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.style.css";

const MyCalendar = (props) => {
  // const [date, setDate] = useState(new Date());

  return <Calendar onChange={props.setDate} value={props.date} />;
};

export default MyCalendar;
