import Card from "../Card";
import DonationForm from "./DonationForm";
import EditDonationForm from "./EditDonationForm";
import TransBoxBox from "../Dashboard/TransBox_Box";
import { useState } from "react";

function Income({ donationsArray, updateDonationsArray, user }) {
  const [editDForm, activateEditDForm] = useState();

  const transBoxInfo = {
    title: "Donation History",
    header: "Orgenization",
    lastColumn: "Category",
    activities: donationsArray,
    update: updateDonationsArray,
  };
  return (
    <div className="bottom-container">
      <div class="bottom-container__left">
        <Card>
          <TransBoxBox
            box={transBoxInfo}
            updateArray={updateDonationsArray}
            activateEditForm={activateEditDForm}
            page="Donations"
            user={user}
          ></TransBoxBox>
        </Card>
      </div>

      <div className="bottom-container__right">
        <Card>
          {!editDForm && (
            <DonationForm
              donationsArray={donationsArray}
              updateDonationsArray={updateDonationsArray}
              user={user}
            ></DonationForm>
          )}
          {editDForm && (
            <EditDonationForm
              donationsArray={donationsArray}
              updateDonationsArray={updateDonationsArray}
              editDForm={editDForm}
              activateEditForm={activateEditDForm}
              user={user}
            ></EditDonationForm>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Income;
