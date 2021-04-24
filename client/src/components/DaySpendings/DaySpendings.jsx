import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { SpendContext } from "../../context/SpendContext";
import { useApiRequest } from "../../hooks/apiRequest";

const DaySpendings = (props) => {
  const { token } = useContext(AuthContext);
  const { request, loading, error, clearError } = useApiRequest();
  // const [spends, setSpends] = useState([]);

  const getSpendings = useCallback(async () => {
    try {
      const fetchedSpends = await request("api/create/get", "GET", null, {
        authorization: `Beaer ${token}`,
      });

      console.log("траты ", fetchedSpends);
      props.setSpends(fetchedSpends);
    } catch (e) {}
  }, [token, request]);

  useEffect(async () => {
    getSpendings();
  }, [getSpendings]);

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amout</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {props.spends.map((s) => {
          return (
            <tr>
              <td>{s.category}</td>
              <td>{s.amount}</td>
              <td>
                <button>edit</button>
              </td>
              <td>
                <button>delete</button>
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
                console.log(a);
                return a + b.amount;
              }, 0)}
            </strong>
          </td>
          {/* <td></td>
          <td></td> */}
        </tr>
      </tbody>
    </table>
  );
};

// const DaySpendingsContainer = connect(
//   (state) => ({
//     spends: state.daySpending.spends,
//   }),
//   { setSpends }
// )(DaySpendings);

export default DaySpendings;
