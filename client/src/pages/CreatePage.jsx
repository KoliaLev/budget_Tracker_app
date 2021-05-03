import "materialize-css";

import MyCalendar from "../components/calendar/Calendar";
import DaySpendings from "../components/DaySpendings/DaySpendings";
import NavBar from "../components/NavBar/Navbar";
import SpendInputs from "../components/SpendInputs/SpendInputs";
import { SpendProvider } from "../context/SpendContext";

// import DaySpendingsContainer from "../components/DaySpendings/DaySpendings";

export const CreatePage = () => {
  return (
    <SpendProvider>
      <div className="container ">
        <div className="row">
          <NavBar />
        </div>
        <div className="row">
          <div className="grid-example col s12 m6 ">
            <div className="row">
              <MyCalendar />
            </div>
          </div>
          <div className="grid-example col s12 m6 light-green lighten-4 li">
            <SpendInputs />
          </div>
        </div>
        <div className="row">
          <div className="grid-example col s12 grey lighten-5">
            <DaySpendings />
          </div>
        </div>
      </div>
    </SpendProvider>
  );
};
