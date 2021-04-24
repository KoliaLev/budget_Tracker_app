import "materialize-css";
import { useState } from "react";
import MyCalendar from "../components/calendar/Calendar";
import DaySpendings from "../components/DaySpendings/DaySpendings";
import NavBar from "../components/NavBar/Navbar";
import SpendInputs from "../components/SpendInputs/SpendInputs";

// import DaySpendingsContainer from "../components/DaySpendings/DaySpendings";

export const CreatePage = () => {
  const [spends, setSpends] = useState([]);

  return (
    // <SpendContext.Provider value={{ getSpendings, countUpdate }}>
    <div className="container ">
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        <div className="grid-example col s12 m6 ">
          <MyCalendar />
        </div>
        <div className="grid-example col s12 m6 light-green lighten-4 li">
          <SpendInputs spends={spends} setSpends={setSpends} />
        </div>
      </div>
      <div className="row">
        <div className="grid-example col s12 grey lighten-4">
          <DaySpendings spends={spends} setSpends={setSpends} />
        </div>
      </div>
    </div>
    //{" "}
    // </SpendContext.Provider>
  );
};
