import { catagories } from "../Catagories";
import { useState } from "react";
import "./DonationForm.css";
import { GetDate } from "../GetDateFunction";
import { put } from "../json.js";

function EditDonationForm({
  donationsArray,
  updateDonationsArray,
  editDForm,
  activateEditForm,
}) {
  const [donationID, updateID] = useState(editDForm.id);
  const [name, updateName] = useState(editDForm.name);
  const [date, updateDate] = useState(editDForm.date);
  const [amount, updateAmount] = useState(editDForm.amount);
  const [catagory, updateCatagory] = useState(editDForm.catagory);
  const [formError, updateFormError] = useState("");

  //put function
  async function editDonation() {
    try {
      const result = await put(
        "https://compuskills.info/Shifrak/API/DonationsAPI.php",
        {
          name: name,
          date: date !== "" ? date : GetDate(),
          amount: Number(amount),
          catagory: Number(catagory),
          donation_id: Number(donationID),
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
    editDonation().then((result) => {
      if (result) {
        updateDonationsArray(function (prev) {
          const newDonation = [...prev];
          const index = newDonation.findIndex(
            (donation) => donation.id === donationID
          );
          newDonation[index].id = donationID;
          newDonation[index].name = name;
          //date: date.length > 0 ? date : GetDateFunction(),
          newDonation[index].date = date;
          newDonation[index].amount = Number(amount);
          newDonation[index].catagory = catagory;

          return newDonation;
        });
        activateEditForm();
      }
    });
  }

  /*
  Edit-donation form (same as donation form):
  input fields:
  1.name - required
  2. date - can be left empty and sets default to today
  3. amount - required
  4.catagory - required
  */
  return (
    <div class="Form-box">
      <form
        class="transaction-form"
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
            required="required"
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
            required
            onChange={(e) => updateCatagory(e.target.value)}
          >
            <option value="">Select catagory</option>

            {catagories.map(function (catagory, index) {
              return (
                <option
                  className={`label__color ${catagory.class} pie-chart__labels pie-chart__labels-item label`}
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
          <button class="btn btn-white " type="submit">
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

export default EditDonationForm;
