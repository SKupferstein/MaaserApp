import "./TransBox_Box.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TransboxItem from "./TransboxItem";

//transBoxBox is a single transactions box - incomes or donations

function TransBoxBox({ box, updatePage, page, updateArray, activateEditForm }) {
  const newArray = [...box.activities];
  const test = [
    { name: "Orange", number: 20 },
    { name: "Red", number: 45 },
    { name: "Blue", number: 12 },
    { name: "Green", number: 30 },
  ];
  function SortDateHandler() {
    newArray.sort(function (a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    updateArray(newArray);
  }
  function SortAmountHandler() {
    newArray.sort(function (a, b) {
      if (a.amount < b.amount) {
        return -1;
      }
      if (a.amount > b.amount) {
        return 1;
      }
      return 0;
    });
    updateArray(newArray);
  }
  function SortNameHandler() {
    newArray.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    updateArray(newArray);
  }

  return (
    <div className="transaction-box">
      <div className="header-container">
        <h3 className="section-header">{box.title}</h3>
      </div>
      <table className="transaction-history">
        <thead>
          <tr>
            <th>
              {box.header}
              <FontAwesomeIcon icon={faAngleDown} onClick={SortNameHandler} />
            </th>
            <th>
              Date
              <FontAwesomeIcon icon={faAngleDown} onClick={SortDateHandler} />
            </th>
            <th>
              Amount
              <FontAwesomeIcon icon={faAngleDown} onClick={SortAmountHandler} />
            </th>
            <th>{box.lastColumn}</th>
          </tr>
        </thead>
        <tbody>
          {box.activities &&
            box.activities
              .slice(0, page !== "Dashboard" ? box.activities.length : 5) //limit number of items for the dashboard
              .map(function (item, index) {
                return (
                  <TransboxItem
                    item={item}
                    key={index}
                    updateArray={updateArray}
                    page={page}
                    activateEditForm={activateEditForm}
                  ></TransboxItem>
                );
              })}
        </tbody>
      </table>
      {page === "dashboard" && ( //add "see more" button to dachboard transaction boxes
        <div className="footer-container ">
          <button
            className="btn btn-white "
            onClick={() => updatePage(box.page)}
          >
            See More..
          </button>
        </div>
      )}
    </div>
  );
}

export default TransBoxBox;
