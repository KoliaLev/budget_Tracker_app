// import { useState } from "react";
import Calendar from "react-calendar";
import { useSpends } from "../../context/SpendContext";
import "./calendar.style.css";

const MyCalendar = () => {
  // const [date, setDate] = useState(new Date());
  const { date, setDate } = useSpends();
  // console.log("дата из провайдера ", date);
  return <Calendar onChange={setDate} value={date} />;
};

export default MyCalendar;
