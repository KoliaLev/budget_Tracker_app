import "materialize-css";

import MyCalendar from "../components/calendar/Calendar";
import DaySpendings from "../components/DaySpendings/DaySpendings";
import NavBar from "../components/NavBar/Navbar";
import SpendInputs from "../components/SpendInputs/SpendInputs";
// import Calendar from "../components/calendar/calendar";

export const CreatePage = () => {
  return (
    <div className="container ">
      <div class="row">
        <NavBar />
      </div>
      <div class="row">
        <div class="grid-example col s12 m6 ">
          <MyCalendar />
        </div>
        <div class="grid-example col s12 m6 green">
          form
          <SpendInputs />
        </div>
        <div class="grid-example col s12 grey">
          result
          <DaySpendings />
        </div>
      </div>
    </div>
  );
};
