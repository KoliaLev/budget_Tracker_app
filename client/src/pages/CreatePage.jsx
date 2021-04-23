import "materialize-css";
import MyCalendar from "../components/calendar/Calendar";
import DaySpendings from "../components/DaySpendings/DaySpendings";
import NavBar from "../components/NavBar/Navbar";
import SpendInputs from "../components/SpendInputs/SpendInputs";
// import Calendar from "../components/calendar/calendar";

export const CreatePage = () => {
  return (
    <div className="container ">
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        <div className="grid-example col s12 m6 ">
          <MyCalendar />
        </div>
        <div className="grid-example col s12 m6 light-green lighten-4 li">
          <SpendInputs />
        </div>
      </div>
      <div className="row">
        <div className="grid-example col s12 grey lighten-4">
          <DaySpendings />
        </div>
      </div>
    </div>
  );
};
