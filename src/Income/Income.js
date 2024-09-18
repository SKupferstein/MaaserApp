import "./Income.css";
import Card from "../Card";
import IncomeForm from "./IncomeForm";
import EditIncomeForm from "./EditIncomeForm";
import TransBoxBox from "../Dashboard/TransBox_Box";
import { useState } from "react";

function Income({ incomeArray, updateIncomeArray, user }) {
  const [editIForm, activateEditIForm] = useState();

  const transBoxInfo = {
    title: "Income History",
    header: "Company",
    lastColumn: "Exempt from Maaser",
    activities: incomeArray,
    update: updateIncomeArray,
  };
  return (
    <div className="bottom-container">
      <div className="bottom-container__left">
        <Card>
          <TransBoxBox
            box={transBoxInfo}
            updateArray={updateIncomeArray}
            activateEditForm={activateEditIForm}
            page="Income"
            user={user}
          ></TransBoxBox>
        </Card>
      </div>
      <div className="bottom-container__right">
        <Card>
          {!editIForm && (
            <IncomeForm
              incomeArray={incomeArray}
              updateIncomeArray={updateIncomeArray}
              user={user}
            ></IncomeForm>
          )}
          {editIForm && (
            <EditIncomeForm
              incomeArray={incomeArray}
              updateIncomeArray={updateIncomeArray}
              editIForm={editIForm}
              activateEditForm={activateEditIForm}
            ></EditIncomeForm>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Income;
