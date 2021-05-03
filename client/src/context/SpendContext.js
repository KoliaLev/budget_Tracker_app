import React, { useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { useApiRequest } from "../hooks/apiRequest";
import { AuthContext } from "./AuthContext";

const SpendContext = React.createContext();

export const useSpends = () => useContext(SpendContext);

export const SpendProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { request } = useApiRequest();

  const [spends, setSpends] = useState([]);
  const [date, setDate] = useState(new Date());
  console.log(date);

  const getSpendings = useCallback(async () => {
    try {
      let dateReqwest = date;
      dateReqwest.setHours(12);
      dateReqwest = dateReqwest.toISOString().slice(0, 10);
      const fetchedSpends = await request(`api/create/get?date=${dateReqwest}`, "GET", null, {
        authorization: `Beaer ${token}`,
      });

      console.log("получены траты ", fetchedSpends);
      setSpends(fetchedSpends);
    } catch (e) {}
  }, [token, request, date]);

  const delSpend = useCallback(
    async (spend) => {
      console.log("работал delSpend");
      try {
        const deleteSpend = await request(`api/create/delete?id=${spend._id}`, "DELETE", null, {
          authorization: `Beaer ${token}`,
        });
        console.log("успешно удалено: ", deleteSpend);

        const newListSpends = spends.filter((s) => s.category != spend.category);

        setSpends(newListSpends);
      } catch (e) {
        console.log("ошибка при удалении: ", e);
      }
    },
    [spends]
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
            date: date,
          },
          { authorization: `mykola ${token}` }
        );
        console.log("успешно обновлено: ", editSpend);
      } catch (e) {
        console.log("ошибка при апдейте: ", e);
      }
    },
    [date]
  );

  return (
    <SpendContext.Provider
      value={{ spends, setSpends, date, setDate, getSpendings, editSpend, delSpend }}>
      {children}
    </SpendContext.Provider>
  );
};

// export const SpendContext1 = createContext({
//   spends: [],
//   countUpdate: { count: 1 },
//   getSpendings: () => {},
// });
