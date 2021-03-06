import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSpends } from "../../context/SpendContext";
import { useApiRequest } from "../../hooks/apiRequest";

const SpendInputs = () => {
  const { date, spends, setSpends } = useSpends();
  const auth = useContext(AuthContext);
  const { request } = useApiRequest();
  const [form, setForm] = useState({
    category: "",
    amount: "",
  });
  const onChangeHadler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSpendHandler = async () => {
    if (form.amount && form.category) {
      // let date = props.date;
      // date.setHours(12);
      // date = date.toISOString().slice(0, 10);
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
          console.log(spends);

          const newSpends = spends.some((spend) => spend.category === data.spend.category)
            ? spends.map((spend) => {
                if (spend.category === data.spend.category) {
                  return { ...spend, amount: data.spend.amount };
                } else {
                  return { ...spend };
                }
              })
            : [...spends, data.spend];

          setSpends(newSpends);
          setForm({ category: "", amount: "" });
        }
      } catch (e) {}
    }
  };
  return (
    <div className="row">
      <div className="container ">
        <div className="card-content white-text">
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
      </div>
    </div>
  );
};

export default SpendInputs;
