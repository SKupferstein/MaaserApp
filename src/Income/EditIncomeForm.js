import { useState } from "react";
import "./IncomeForm.css";
import { GetDate } from "../GetDateFunction.js";
import { put } from "../json.js";

function EditIncomeForm({
  incomeArray,
  updateIncomeArray,
  editIForm,
  activateEditForm,
}) {
  const [incomeID, updateID] = useState(editIForm.id);
  const [name, updateName] = useState(editIForm.name);
  const [date, updateDate] = useState(editIForm.date);
  const [amount, updateAmount] = useState(editIForm.amount);
  const [exempt, updateExempt] = useState(editIForm.exempt);
  const [formError, updateFormError] = useState("");

  //put function
  async function editIncome() {
    try {
      const result = await put(
        "https://compuskills.info/Shifrak/API/IncomeAPI.php",
        {
          name: name,
          date: date !== "" ? date : GetDate(),
          amount: Number(amount),
          exempt: exempt === false ? 0 : 1,
          income_id: Number(incomeID),
        }
      );
      return result;
    } catch (error) {
      updateFormError(error.message);
    }
  }

  //submit handler
  function SubmitHandler(e) {
    e.preventDefault();
    editIncome().then((result) => {
      if (result) {
        updateIncomeArray(function (prev) {
          const newIncome = [...prev];
          const index = newIncome.findIndex((Income) => Income.id === incomeID);
          newIncome[index].id = incomeID;
          newIncome[index].name = name;
          //date: date.length > 0 ? date : GetDateFunction(),
          newIncome[index].date = date !== "" ? date : GetDate();
          newIncome[index].amount = Number(amount);
          newIncome[index].exempt = exempt;

          return newIncome;
        });
        activateEditForm();
      }
    });
  }

  /*
  Edit income form:(same as Income form)
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
        onReset={() => activateEditForm()}
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
            maxLength={12}
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
          <label id="exempt" htmlFor="exempt"></label>

          <input
            type="radio"
            id="yes"
            name="exempt"
            checked={exempt === true}
            onChange={function (e) {
              !exempt && updateExempt(true);
              exempt && updateExempt(false);
            }}
          />
          <label className="short" htmlFor="yes">
            Exempt from Maaser?
          </label>
        </div>
        {formError && <p className="error">{formError}</p>}

        <div className="footer-container ">
          <button className="btn btn-white " type="submit">
            Save changes
          </button>
          <button className="btn btn-gray " type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditIncomeForm;
