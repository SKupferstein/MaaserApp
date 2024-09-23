import { useState } from "react";
import Card from "./Card";
import { put } from "./json";

function Settings({ updateUser, user }) {
  const [name, updateName] = useState(user.userName);
  const [percent, updatePercent] = useState(user.userPercent);
  const [formError, updateFormError] = useState("");

  async function editUser() {
    try {
      const result = await put(
        "https://compuskills.info/Shifrak/API/UsersAPI.php",
        {
          user_id: user.user_id,
          user_name: name,
          percent: percent,
        }
      );
      return result;
    } catch (error) {
      updateFormError(error.message);
    }
  }

  function SubmitHandler(e) {
    e.preventDefault();
    editUser().then((result) => {
      if (result) {
        updateUser({
          user_id: user.user_id,
          userEmail: user.userEmail,
          userName: name,
          userPassword: user.userPassword,
          userPercent: percent,
        });

        updateName("");
        updatePercent("");
        updateFormError("");
      }
    });
  }
  function CancelDataHandler() {
    updateName(user.userName);
    updatePercent(user.userPercent);
  }

  return (
    <div className="bottom-container">
      <Card>
        <div className="Form-box">
          <form
            className="transaction-form"
            onSubmit={SubmitHandler}
            onReset={CancelDataHandler}
          >
            <label id="name" htmlFor="name">
              Update User Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              required
              maxLength={20}
            ></input>

            <label id="percent">Update Maaser Percent:</label>
            <div>
              <input
                type="radio"
                id="10"
                name="percent"
                checked={percent === 10}
                onChange={() => updatePercent(10)}
              ></input>
              <label className="short" htmlFor="10">
                10%
              </label>

              <input
                type="radio"
                id="20"
                name="percent"
                checked={percent === 20}
                onChange={() => updatePercent(20)}
              ></input>
              <label className="short" htmlFor="20">
                20%
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
      </Card>
    </div>
  );
}

export default Settings;
