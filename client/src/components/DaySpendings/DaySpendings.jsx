import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { SpendContext } from "../../context/SpendContext";
import { useApiRequest } from "../../hooks/apiRequest";

const DaySpendings = (props) => {
  const { token } = useContext(AuthContext);
  const { request, loading, error, clearError } = useApiRequest();
  const [updateSpend, setUpdateSpend] = useState({});
  const [editModeSpend, setEditModeSpend] = useState(false);
  // const [spends, setSpends] = useState([]);

  useEffect(async () => {
    getSpendings();
  }, [props.date]);

  const getSpendings = useCallback(async () => {
    try {
      let date = props.date;
      date.setHours(12);
      date = date.toISOString().slice(0, 10);
      const fetchedSpends = await request(`api/create/get?date=${date}`, "GET", null, {
        authorization: `Beaer ${token}`,
      });

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

  const editSpend = useCallback(
    async (updateSpend) => {
      console.log("работал editSpend передаем ", updateSpend);
      try {
        let date = props.date;
        date.setHours(12);
        date = date.toISOString().slice(0, 10);
        debugger;
        const editSpend = await request(
          "api/create/edit",
          "PUT",
          {
            category: updateSpend.category,
            amount: updateSpend.amount,
            date: date,
          },
          { authorization: `mykola ${token}` }
        );
        console.log("успешно обновлено: ", editSpend);
      } catch (e) {
        console.log("ошибка при апдейте: ", e);
      }
    },
    [props.date]
  );

  //  для обработчиков апдейта одной траты
  const updateSpendCategoryHandler = (e) => {
    setUpdateSpend({ ...updateSpend, category: e.tagret.value });
  };

  const updateSpendAmountHandler = (e) => {
    setUpdateSpend({ ...updateSpend, amount: e.target.value });
  };

  const setUpdateCategoryhadler = (spend) => {
    if (spend.amount != updateSpend.amount) {
      editSpend(updateSpend);
      const newSpends = props.spends.map((s) =>
        s.category === updateSpend.category ? { ...s, amount: updateSpend.amount } : s
      );
      props.setSpends(newSpends);
    }
    setEditModeSpend(false);
  };

  const editSpendHandler = (spend) => {
    setUpdateSpend({ category: spend.category, amount: spend.amount });
    setEditModeSpend(true);
  };

  return (
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
              <td>
                {" "}
                {editModeSpend && s.category === updateSpend.category ? (
                  <input
                    autoFocus={true}
                    onFocus={(e) => e.target.select()}
                    onChange={updateSpendAmountHandler}
                    value={updateSpend.amount}
                    type="text"
                  />
                ) : (
                  s.amount
                )}
              </td>
              <td>
                {/* <div className="row"> */}

                {editModeSpend && s.category === updateSpend.category ? (
                  <>
                    <button onClick={() => setUpdateCategoryhadler(s)}>Save</button>
                    <button onClick={() => setEditModeSpend(false)}>Cancel</button>
                  </>
                ) : (
                  <button
                    className="waves-effect waves-light  col s4 "
                    onClick={() => {
                      console.log(s);
                      editSpendHandler(s);
                    }}>
                    edit
                  </button>
                )}
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
  );
};

// const DaySpendingsContainer = connect(
//   (state) => ({
//     spends: state.daySpending.spends,
//   }),
//   { setSpends }
// )(DaySpendings);

export default DaySpendings;
