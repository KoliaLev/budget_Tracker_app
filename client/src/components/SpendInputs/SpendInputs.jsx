import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useApiRequest } from "../../hooks/apiRequest";

const SpendInputs = () => {
  const auth = useContext(AuthContext);
  console.log("spendInp", auth.token);
  const { request, loading, error, clearError } = useApiRequest();
  const [form, setForm] = useState({
    category: "",
    amount: null,
  });
  const onChangeHadler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSpendHandler = async () => {
    if (form.amount && form.category) {
      try {
        const data = await request(
          "api/create/add",
          "POST",
          {
            category: form.category,
            amount: form.amount,
            date: new Date(),
          },
          { authorization: `Beaer ${auth.token}` }
        );
        console.log(data);
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
