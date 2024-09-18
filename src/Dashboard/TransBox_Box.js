import "./TransBox_Box.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TransboxItem from "./TransboxItem";

//transBoxBox is a single transactions box - incomes or donations

function TransBoxBox({ box, updatePage, page, updateArray, activateEditForm }) {
  return (
    <div className="transaction-box">
      <div className="header-container">
        <h3 className="section-header">{box.title}</h3>
      </div>
      <table className="transaction-history">
        <thead>
          <tr>
            <th>{box.header}</th>
            <th>
              Date
              <FontAwesomeIcon icon={faAngleDown} />
            </th>
            <th>
              Amount
              <FontAwesomeIcon icon={faAngleDown} />
            </th>
            <th>
              {box.lastColumn}
              <FontAwesomeIcon icon={faAngleDown} />
            </th>
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
