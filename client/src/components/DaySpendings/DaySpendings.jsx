import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useApiRequest } from "../../hooks/apiRequest";

const DaySpendings = () => {
  const { token } = useContext(AuthContext);
  const { request, loading, error, clearError } = useApiRequest();
  const [spends, setSpends] = useState([]);

  const getSpendings = useCallback(async () => {
    try {
      const fetchedSpends = await request("api/create/get", "GET", null, {
        authorization: `Beaer ${token}`,
      });
      console.log("траты ", fetchedSpends);
      setSpends(fetchedSpends);
    } catch (e) {}
  }, [token, request]);
  console.log("траты state ", spends);
  useEffect(() => {
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
        {spends.map((s) => {
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
              {spends.reduce((a, b) => {
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

export default DaySpendings;
