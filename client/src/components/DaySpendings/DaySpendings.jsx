import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { SpendContext } from "../../context/SpendContext";
import { useApiRequest } from "../../hooks/apiRequest";
import { CSSTransitionGroup } from "react-transition-group";

const DaySpendings = (props) => {
  const { token } = useContext(AuthContext);
  const { request, loading, error, clearError } = useApiRequest();
  // const [spends, setSpends] = useState([]);
  let date = props.date;
  date.setHours(12);

  const getSpendings = useCallback(async () => {
    try {
      const fetchedSpends = await request(
        `api/create/get?date=${date.toISOString()}`,
        "GET",
        null,
        {
          authorization: `Beaer ${token}`,
        }
      );

      console.log("получены траты ", fetchedSpends);
      props.setSpends(fetchedSpends);
    } catch (e) {}
  }, [token, request, props.date]);

  const delSpend = useCallback(async (spend) => {
    console.log("работал delSpend");
    try {
      const deleteSpend = await request(`api/create/delete?id=${spend._id}`, "DELETE", null, {
        authorization: `Beaer ${token}`,
      });
      console.log("успешно удалено: ", deleteSpend);
      const newListSpends = props.spends.filter((s) => s.category != spend.category);
      debugger;
      props.setSpends(newListSpends);
    } catch (e) {
      console.log("ошибка при удалении: ", e);
    }
  }, []);

  useEffect(async () => {
    getSpendings();
  }, [props.date]);

  return (
    <CSSTransitionGroup transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <table style={{ transition: "all 1s ease-out" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amout</th>
            <th>{props.date.toLocaleDateString()}</th>
          </tr>
        </thead>

        <tbody>
          {props.spends.map((s) => {
            return (
              <tr key={s.category}>
                <td>{s.category}</td>
                <td>{s.amount}</td>
                <td>
                  {/* <div className="row"> */}
                  <button
                    className="waves-effect waves-light  col s4 "
                    onClick={() => {
                      console.log(s);
                    }}>
                    edit
                  </button>
                  <button
                    className="waves-effect waves-light col s4 offset-s1"
                    onClick={() => {
                      delSpend(s);
                    }}>
                    delete
                  </button>
                  {/* </div> */}
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>
                {props.spends.reduce((a, b) => {
                  return a + b.amount;
                }, 0)}
              </strong>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </CSSTransitionGroup>
  );
};

// const DaySpendingsContainer = connect(
//   (state) => ({
//     spends: state.daySpending.spends,
//   }),
//   { setSpends }
// )(DaySpendings);

export default DaySpendings;
