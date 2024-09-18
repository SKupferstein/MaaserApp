import "./BalanceBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { numberSettings } from "../NumberSettings";
import { GetTotal } from "./Totals";

function BalanceBox({ incomeArray, donationsArray, updatePage, user }) {
 //get income array with incomes to exempt
  const incomToMaaser = incomeArray
    ? incomeArray.filter((income) => income.exempt === false)
    : 0;
  return (
    <div>
      <div className="header-container">
        <h3 className="section-header">Your Ma'aser Balance</h3>
      </div>
      <h1 className="price">
        $
        {(
          GetTotal(donationsArray) -
          (incomToMaaser.length > 0
            ? GetTotal(incomToMaaser) / (100 / Number(user.userPercent))
            : 0)
        ).toLocaleString("en-US", numberSettings)}{" "}
        <span className="price-currency">(USD)</span>
      </h1>
      <p>From Jan 01, 2023 to May 24, 2023</p>
      <div className="button-box">
        <button
          className="btn btn-purple"
          onClick={() => updatePage("Donations")}
        >
          <FontAwesomeIcon icon={faCircleDollarToSlot} size="xl" />

          <span>Donate</span>
        </button>
      </div>
    </div>
  );
}

export default BalanceBox;
