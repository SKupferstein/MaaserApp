import "./Dashboard.css";
import MainLeft from "./Dashboard/Main_Left";
import MainRight from "./Dashboard/Main_Right";

function Dashboard({ incomeArray, donationsArray, updatePage, page, user }) {
  return (
    <div className="bottom-container">
      <MainLeft
        incomeArray={incomeArray}
        donationsArray={donationsArray}
        updatePage={updatePage}
        page={page}
      ></MainLeft>

      <MainRight
        incomeArray={incomeArray}
        donationsArray={donationsArray}
        updatePage={updatePage}
        user={user}
      ></MainRight>
    </div>
  );
}

export default Dashboard;
