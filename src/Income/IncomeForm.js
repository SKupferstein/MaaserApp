import { useState } from "react";
import "./IncomeForm.css";
import { GetDate } from "../GetDateFunction";
import { post } from "../json.js";

function IncomeForm({ incomeArray, updateIncomeArray, user }) {
  const [name, updateName] = useState("");
  const [date, updateDate] = useState("");
  const [amount, updateAmount] = useState();
  const [exempt, updateExempt] = useState(false);
  const [formError, updateFormError] = useState("");

  //post function
  async function PostIncome() {
    try {
      const income_id = await post(
        "https://compuskills.info/Shifrak/API/IncomeAPI.php",
        {
          user_id: Number(user.user_id),
          name: name,
          date: date !== "" ? date : GetDate(),
          amount: Number(amount),
          exempt: exempt === false ? 0 : 1,
        }
      );
      return income_id;
    } catch (error) {
      updateFormError(error.message);
    }
  }

  //submit handler
  function SubmitHandler(e) {
    e.preventDefault();
    PostIncome().then((result) => {
      if (result) {
        const income_id = result.income_id;
        updateIncomeArray(function (prev) {
          const newIncome = [
            ...prev,
            {
              id: income_id,
              name: name,
              date: date !== "" ? date : GetDate(),
              amount: Number(amount),
              exempt: exempt,
            },
          ];
          return newIncome;
        });
        CancelDataHandler();
      }
    });
  }

  //form cancel handler
  function CancelDataHandler() {
    updateName("");
    updateDate("");
    updateAmount("");
    updateExempt(false);
  }
/*
  Income form:
  input fields:
  1.name - required
  2. date - can be left empty and sets default to today
  3. amount - required
  4.exempt (can be left empty)
  */
  return (
    <div className="Form-box">
      <form
        className="transaction-form"
        onSubmit={SubmitHandler}
        onReset={CancelDataHandler}
      >
        <div>
          <label id="name" htmlFor="name">
            Company Name
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => updateName(e.target.value)}
            required
            maxLength={25}
          ></input>
        </div>
        <div>
          <label id="date" htmlFor="date">
            Date
          </label>
          <br />
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => updateDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="amount" htmlFor="amount">
            Amount
          </label>
          <br />
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => updateAmount(e.target.value)}
            required
            max={9999999999.99}
          ></input>
        </div>
        <div>
          <input
            type="radio"
            id="exempt"
            name="exempt"
            checked={exempt === true}
            onChange={function (e) {
              !exempt && updateExempt(true);
              exempt && updateExempt(false);
            }}
          />
          <label className="short" htmlFor="exempt">
            Exempt from Maaser
          </label>
        </div>
        {formError && <p className="error">{formError}</p>}

        <div className="footer-container ">
          <button className="btn btn-white " type="submit">
            Add
          </button>
          <button className="btn btn-gray " type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default IncomeForm;
