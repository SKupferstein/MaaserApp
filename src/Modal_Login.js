import "./Modal.css";
import ReactModal from "react-modal";
import { useState } from "react";
import { get, post } from "./json.js";

function ModalLogin({
  updateUser,
  updateIncomeArray,
  updateDonationsArray,
  dates,
}) {
  const [isOpen, updateIsOpen] = useState(true); //modal login window
  const [login, updateLogin] = useState(true); //should window be login window?
  const [signUp, updateSignUp] = useState(false); //should window be sign-up window?
  //state variables for the input fields in the form
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [name, updateName] = useState("");
  const [percent, updatePercent] = useState(10);
  const [formError, updateFormError] = useState(""); //in case error in the form

  //fetch user data
  async function getUserData() {
    try {
      const userDataRes = await get(
        "https://compuskills.info/Shifrak/API/UsersAPI.php?user_email=" +
          email +
          "&password=" +
          password +
          "&start=" +
          dates.start +
          "&end=" +
          dates.end
      );
      return userDataRes;
    } catch (error) {
      updateFormError(error.message);
    }
  }

  //submit handler for login
  function LoginSubmitHandler(e) {
    e.preventDefault();
    getUserData().then((result) => {
      if (result) {
        updateUser({
          user_id: result.userData.user_id,
          userEmail: result.userData.userEmail,
          userName: result.userData.userName,
          userPassword: result.userData.password,
          userPercent: result.userData.percent,
        });

        const newIncomeArray = result.userData.income[0].map(function (income) {
          return {
            id: income.income_id,
            name: income.name,
            date: income.date,
            amount: Number(income.amount),
            exempt: income.exempt === 0 ? false : true,
          };
        });
        updateIncomeArray(newIncomeArray);

        const newDonationsArray = result.userData.donations[0].map(function (
          donation
        ) {
          return {
            id: donation.donation_id,
            name: donation.name,
            date: donation.date,
            amount: Number(donation.amount),
            catagory: donation.catagory,
          };
        });
        updateDonationsArray(newDonationsArray);

        updateIsOpen(false);
      }
    });
  }

  //switch to sign-up window
  function OpenSignUpPage() {
    updateLogin(false);
    updateSignUp(true);
    updateFormError("");
  }

  //sign up functions

  //post new user
  async function PostUser() {
    try {
      const result = await post(
        "https://compuskills.info/Shifrak/API/UsersAPI.php",
        {
          user_email: email,
          user_name: name,
          password: password,
          percent: Number(percent),
        }
      );
      return result;
    } catch (error) {
      updateFormError(error.message);
    }
  }

  //sign-up submit handler
  function SignUpSubmitHandler(e) {
    e.preventDefault();
    PostUser().then(function (result) {
      if (result) {
        updateUser({
          user_id: result.user_id,
          userEmail: email,
          userName: name,
          userPassword: password,
          userPercent: percent,
        });
        updateIsOpen(false);
      }
    });
  }
  /*login form:
input fields:
1. email - required
2. password - required

sign-up form:
input fields:
1. email-required
2. name - required
3. password - required
4. percent maaswer - (set by default to 10%)
*/
  return (
    <ReactModal isOpen={isOpen} ariaHideApp={false}>
      {login && (
        <div className="login_page">
          <h1>Login to your Account</h1>
          <p>
            Don't yet have an account?{" "}
            <span className="link" onClick={OpenSignUpPage}>
              Create account
            </span>
          </p>
          <form className="login-form" onSubmit={LoginSubmitHandler}>
            <br></br>
            <label id="email" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              required
              maxLength={25}
            ></input>
            <label id="password" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
              required
              maxLength={12}
            ></input>
            {formError && <p className="error">{formError}</p>}

            <button className="btn btn-purple " type="submit">
              Login
            </button>
          </form>
        </div>
      )}
      {signUp && (
        <div className="login_page">
          <h1>Create your Account</h1>
          <form className="login-form" onSubmit={SignUpSubmitHandler}>
            <br></br>
            <label id="email" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              required
              maxLength={25}
            ></input>
            <label id="name" htmlFor="name">
              User Name
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
            <label id="password" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
              required
              maxLength={12}
            ></input>

            <label id="percent">Percent Maaser:</label>
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

            <button className="btn btn-purple " type="submit">
              Create Account
            </button>
          </form>
        </div>
      )}
    </ReactModal>
  );
}

export default ModalLogin;
