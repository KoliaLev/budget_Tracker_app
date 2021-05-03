import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSpends } from "../../context/SpendContext";
import { useApiRequest } from "../../hooks/apiRequest";
import style from "./day.module.css";
import OneSpendRow from "./RowForSpends/OneSpendRow";
import TotalAmountRow from "./RowForSpends/TotalAmountRow";

const DaySpendings = () => {
  const { date, spends, setSpends, getSpendings, editSpend, delSpend } = useSpends();
  const [updateSpend, setUpdateSpend] = useState({});
  const [editModeSpend, setEditModeSpend] = useState(false);

  useEffect(async () => {
    getSpendings();
  }, [date]);

  const updateSpendAmountHandler = (e) => {
    setUpdateSpend({ ...updateSpend, amount: e.target.value });
  };

  const setUpdateCategoryhadler = (spend) => {
    if (spend.amount != updateSpend.amount) {
      editSpend(updateSpend);
      const newSpends = spends.map((s) =>
        s.category === updateSpend.category ? { ...s, amount: +updateSpend.amount } : s
      );
      setSpends(newSpends);
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

      {spends.map((s) => {
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
      <TotalAmountRow spends={spends} />
    </div>
  );
};

export default DaySpendings;
