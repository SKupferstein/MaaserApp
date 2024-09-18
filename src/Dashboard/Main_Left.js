import "./Main_Left.css";
import Card from "../Card";
import TotalBox from "./TotalBox";
import TransBox from "./TransBox";

function MainLeft({ incomeArray, donationsArray, updatePage, page }) {
  return (
    <div className="bottom-container__left">
      <Card>
        <TotalBox
          incomeArray={incomeArray}
          donationsArray={donationsArray}
        ></TotalBox>
      </Card>

      <TransBox
        incomeArray={incomeArray}
        donationsArray={donationsArray}
        updatePage={updatePage}
        page={page}
      ></TransBox>
    </div>
  );
}

export default MainLeft;
