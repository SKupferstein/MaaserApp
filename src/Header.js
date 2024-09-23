import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { get } from "./json.js";
import ReactModal from "react-modal";

function Header({
  user,
  updatePage,
  dates,
  updateDates,
  updateIncomeArray,
  updateDonationsArray,
}) {
  const [isOpen, updateIsOpen] = useState(false);//for logout window

  //fetch data when changing dates
  async function getDonations() {//fetch donations
    try {
      const donations = await get(
        "https://compuskills.info/Shifrak/API/DonationsAPI.php?user_id=" +
          user.user_id +
          "&start=" +
          dates.start +
          "&end=" +
          dates.end
      );
      return donations;
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getIncome() {//fetch income
    try {
      const income = await get(
        "https://compuskills.info/Shifrak/API/IncomeAPI.php?user_id=" +
          user.user_id +
          "&start=" +
          dates.start +
          "&end=" +
          dates.end
      );
      return income;
    } catch (error) {
      console.log(error.message);
    }
  }

  //submit date changes
  function SetDatesHandler(e) {
    e.preventDefault();

    getDonations().then((result) => {
      if (result) {
        const newDonationsArray = result.donationsData.map(function (donation) {
          return {
            id: donation.donation_id,
            name: donation.name,
            date: donation.date,
            amount: Number(donation.amount),
            catagory: donation.catagory,
          };
        });
        updateDonationsArray(newDonationsArray);
      }
    });

    getIncome().then((result) => {
      if (result) {
        const newIncomeArray = result.IncomesData.map(function (income) {
          return {
            id: income.income_id,
            name: income.name,
            date: income.date,
            amount: Number(income.amount),
            exempt: income.exempt === 0 ? false : true,
          };
        });
        updateIncomeArray(newIncomeArray);
      }
    });
  }

  return (
    <div className="top-container">
      <div className="dates">
        <form className="dates" onSubmit={SetDatesHandler}>
          For Dates Between:
          <input
            type="date"
            value={dates.start}
            required="required"
            onChange={(e) =>
              updateDates(function (prev) {
                const newDates = { start: e.target.value, end: prev.end };
                return newDates;
              })
            }
          />
          <input
            type="date"
            value={dates.end}
            required="required"
            onChange={(e) =>
              updateDates(function (prev) {
                const newDates = { start: prev.start, end: e.target.value };
                return newDates;
              })
            }
          />
          <button className="btn-purple submit-btn">Go</button>
        </form>
      </div>
      {/*<div action="#" className="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          className="search__input"
          placeholder="Search something here"
        />
      </div>*/}
      <div className="user-nav">
        <div className="user-info">
          <FontAwesomeIcon icon={faUser} size="2xl" />
          <span className="user-name">{user.userName}</span>
          <span onClick={() => updateIsOpen(true)}>Log Out</span>
        </div>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {/*logout window:*/}
      <ReactModal
        isOpen={
          isOpen
        }
        className="logoutPopUp"
        ariaHideApp={false}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        preventScroll={false}
      >
        <form
          onSubmit={() => updatePage("Logout")}
          onReset={() => updateIsOpen(false)}
        >
          <p>Log out of givemaaser?</p>
          <div class="footer-container ">
            <button className="btn btn-white wb" type="submit">
              Log out
            </button>
            <button className="btn btn-gray wb" type="reset">
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}

export default Header;
