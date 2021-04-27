import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useApiRequest } from "../../hooks/apiRequest";
import style from "./day.module.css";
import OneSpendRow from "./RowForSpends/OneSpendRow";
import TotalAmountRow from "./RowForSpends/TotalAmountRow";

const DaySpendings = (props) => {
  const { token } = useContext(AuthContext);
  const { request } = useApiRequest();
  const [updateSpend, setUpdateSpend] = useState({});
  const [editModeSpend, setEditModeSpend] = useState(false);

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

  const delSpend = useCallback(
    async (spend) => {
      console.log("работал delSpend");
      try {
        const deleteSpend = await request(`api/create/delete?id=${spend._id}`, "DELETE", null, {
          authorization: `Beaer ${token}`,
        });
        console.log("успешно удалено: ", deleteSpend);

        const newListSpends = props.spends.filter((s) => s.category != spend.category);

        props.setSpends(newListSpends);
      } catch (e) {
        console.log("ошибка при удалении: ", e);
      }
    },
    [props.spends]
  );

  const editSpend = useCallback(
    async (updateSpend) => {
      console.log("работал editSpend передаем ", updateSpend);
      try {
        const editSpend = await request(
          "api/create/edit",
          "PUT",
          {
            category: updateSpend.category,
            amount: updateSpend.amount,
            date: props.date,
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
  // const updateSpendCategoryHandler = (e) => {
  //   setUpdateSpend({ ...updateSpend, category: e.tagret.value });
  // };

  const updateSpendAmountHandler = (e) => {
    setUpdateSpend({ ...updateSpend, amount: e.target.value });
  };

  const setUpdateCategoryhadler = (spend) => {
    if (spend.amount != updateSpend.amount) {
      editSpend(updateSpend);
      const newSpends = props.spends.map((s) =>
        s.category === updateSpend.category ? { ...s, amount: +updateSpend.amount } : s
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
    <div id={style.spending_table}>
      <div className="row">
        <div className="grid-example col s4  light-green lighten-3">
          <strong>
            <span className="flow-text">Category</span>
          </strong>
        </div>
        <div className="grid-example col s4  light-green lighten-3">
          <strong>
            <span className="flow-text">Amount</span>
          </strong>
        </div>
      </div>

      {props.spends.map((s) => {
        return (
          <OneSpendRow
            spend={s}
            updateSpend={updateSpend}
            editModeSpend={editModeSpend}
            setEditModeSpend={setEditModeSpend}
            updateSpendAmountHandler={updateSpendAmountHandler}
            delSpend={delSpend}
            setUpdateCategoryhadler={setUpdateCategoryhadler}
            editSpendHandler={editSpendHandler}
          />
        );
      })}
      <TotalAmountRow spends={props.spends} />
    </div>
  );
};

export default DaySpendings;
