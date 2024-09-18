import { catagories } from "../Catagories";
import { useState } from "react";
import "./DonationForm.css";
import { GetDate } from "../GetDateFunction";
import { post } from "../json.js";

function DonationsForm({ donationsArray, updateDonationsArray, user }) {
  //state variables for input fields in form
  const [name, updateName] = useState("");
  const [date, updateDate] = useState("");
  const [amount, updateAmount] = useState();
  const [catagory, updateCatagory] = useState();
  const [formError, updateFormError] = useState(""); //check if error in the form

  //post function
  async function PostDonation() {
    try {
      const donation_id = await post(
        "https://compuskills.info/Shifrak/API/DonationsAPI.php",
        {
          user_id: Number(user.user_id),
          name: name,
          date: date !== "" ? date : GetDate(),
          amount: Number(amount),
          catagory: Number(catagory),
        }
      );
      return donation_id;
    } catch (error) {
      updateFormError(error.message);
    }
  }

  //submit form
  function SubmitHandler(e) {
    e.preventDefault();
    PostDonation().then((result) => {
      if (result) {
        const donation_id = result.donation_id;
        updateDonationsArray(function (prev) {
          const newDonation = [
            ...prev,
            {
              id: donation_id,
              name: name,
              date: date !== "" ? date : GetDate(),
              amount: Number(amount),
              catagory: catagory,
            },
          ];
          return newDonation;
        });
        CancelDataHandler();
      }
    });
  }

  //reset form
  function CancelDataHandler() {
    updateName("");
    updateDate("");
    updateAmount("");
    updateCatagory("");
  }

  /*
  donation form:
  input fields:
  1.name - required
  2. date - can be left empty and sets default to today
  3. amount - required
  4.catagory - required
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
          <label id="catagories" htmlFor="catagories">
            Catagory
          </label>
          <br />

          <select
            name="catagory"
            id="catagory"
            value={catagory}
            onChange={(e) => updateCatagory(e.target.value)}
            required
          >
            <option value="">Select catagory</option>

            {catagories.map(function (catagory, index) {
              return (
                <option
                  className={`label__color ${catagory.class} pie-chart__labels-item `}
                  value={index}
                  key={index}
                >
                  {catagory.name}
                </option>
              );
            })}
          </select>
        </div>
        {formError && <p className="error">{formError}</p>}

        <div class="footer-container ">
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

export default DonationsForm;
