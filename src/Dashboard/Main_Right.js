import "./Main_Right.css";
import BalanceBox from "./BalanceBox";
import Card from "../Card";
import SpendingBox from "./SpendingBox";

function MainRight({ incomeArray, donationsArray, updatePage, user }) {
  return (
    <div className="bottom-container__right">
      <Card>
        <BalanceBox
          incomeArray={incomeArray}
          donationsArray={donationsArray}
          updatePage={updatePage}
          user={user}
        ></BalanceBox>
      </Card>
      <Card>
        <SpendingBox donationsArray={donationsArray}></SpendingBox>
      </Card>
    </div>
  );
}

export default MainRight;
