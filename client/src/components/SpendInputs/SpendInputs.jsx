import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SpendContext } from "../../context/SpendContext";
import { useApiRequest } from "../../hooks/apiRequest";
import { setSpends } from "../../redux/spending-reduser";

const SpendInputs = (props) => {
  const s = useContext(SpendContext); // берем с контекста счетчик обновления
  const auth = useContext(AuthContext);
  const { request, loading, error, clearError } = useApiRequest();
  const [form, setForm] = useState({
    category: "",
    amount: "",
  });
  const onChangeHadler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSpendHandler = async () => {
    if (form.amount && form.category) {
      let date = props.date;
      date.setHours(12);
      date = date.toISOString().slice(0, 10);
      try {
        const data = await request(
          "api/create/add",
          "POST",
          {
            category: form.category,
            amount: form.amount,
            date: date,
          },
          { authorization: `mykola ${auth.token}` }
        );
        console.log(data);
        if (data.statusCode === 1) {
          console.log(props.spends);

          const newSpends = props.spends.some((spend) => spend.category === data.spend.category)
            ? props.spends.map((spend) => {
                if (spend.category === data.spend.category) {
                  return { ...spend, amount: data.spend.amount };
                } else {
                  return { ...spend };
                }
              })
            : [...props.spends, data.spend];

          props.setSpends(newSpends);
        }
      } catch (e) {}
    }
  };
  return (
    <div>
      <div className="input-field">
        <input
          id="category"
          type="text"
          className="validate"
          // placeholder="Введите email"
          name="category"
          onChange={onChangeHadler}
          value={form.category}
        />
        <label htmlFor="category">category</label>
      </div>
      <div className="input-field">
        <input
          id="amount"
          type="number"
          className="validate"
          // placeholder="Введите email"
          name="amount"
          onChange={onChangeHadler}
          value={form.amount}
        />
        <label htmlFor="amount">amount</label>
      </div>
      <button
        className="waves-effect waves-light btn col s4 offset-s1"
        onClick={addSpendHandler}
        // disabled={loading}
      >
        Add
      </button>
    </div>
  );
};

export default SpendInputs;
