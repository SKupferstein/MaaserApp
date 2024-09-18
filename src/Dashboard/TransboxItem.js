import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleDollarToSlot,
  faXmark,
  faCheck,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { numberSettings } from "../NumberSettings";
import { catagories } from "../Catagories";
import { remove } from "../json.js";

//TransboxItem is a single row in the transboxBox
function TransboxItem({ item, updateArray, page, activateEditForm }) {
  
  //delete function for income
  async function deleteIncome() {
    const response = await remove(
      "https://compuskills.info/Shifrak/API/IncomeAPI.php",
      {
        income_id: Number(item.id),
      }
    );
    console.log(response);
  }

  //delete function for donation
  async function deleteDonation() {
    const response = await remove(
      "https://compuskills.info/Shifrak/API/DonationsAPI.php",
      {
        donation_id: Number(item.id),
      }
    );
  }

  //remove item handler
  function removeItem() {
    page === "Income" && deleteIncome();
    page === "Donations" && deleteDonation();
    updateArray(function (prev) {
      const newArr = prev.filter((prevItem) => prevItem.id !== item.id);
      return newArr;
    });
  }

  //activate edit form
  function editItem() {
    activateEditForm(item);
  }

  return (
    <tr>
      <td>
        <FontAwesomeIcon icon={faCircleDollarToSlot} size="xl" />
        {item.name}
      </td>
      <td>{item.date}</td>
      <td>${item.amount.toLocaleString("en-US", numberSettings)}</td>
      <td>
        {item.catagory && item.catagory >= 0 && (
          <div className="pie-chart__labels-item">
            <div className="label">
              <div
                className={`label__color ${catagories[item.catagory].class}`}
              ></div>
              {catagories[item.catagory].name}
            </div>
          </div>
        )}
        {item.exempt === true && (
          <div>
            <FontAwesomeIcon icon={faCheck} size="xl" />
            &nbsp;Yes
          </div>
        )}
        {item.exempt === false && (
          <div>
            <FontAwesomeIcon icon={faXmark} size="xl" />
            &nbsp;No
          </div>
        )}
      </td>
      {page !== "Dashboard" && (
        <td>
          <button
            type="button"
            className=" edit icon  btn-white"
            onClick={editItem}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>

          <button
            type="button"
            className=" remove icon  btn-white"
            onClick={removeItem}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </td>
      )}
    </tr>
  );
}

export default TransboxItem;
