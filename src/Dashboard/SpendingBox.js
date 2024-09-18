import "./SpendingBox.css";
import { catagories } from "../Catagories";
import { numberSettings } from "../NumberSettings";
import { PieChart } from "react-minimal-pie-chart";
import { GetTotal } from "./Totals";

function SpendingBox({ donationsArray }) {
 
  //function to get total for each catagory
  function CatagoryTotal(catagory) {
    const newarr = donationsArray.filter(
      (item) => catagories[item.catagory].name === catagory
    );
    return newarr.length > 0 ? GetTotal(newarr) : 0;
  }

  return (
    <div className="box spending-box">
      <div className="header-container">
        <h3 className="section-header">Donations by category</h3>
      </div>
      <div className="pie-chart">
        <PieChart
          data={[
            {
              title: catagories[0].item,
              value: CatagoryTotal(catagories[0].name),
              color: catagories[0].color,
            },
            {
              title: catagories[1].item,
              value: CatagoryTotal(catagories[1].name),
              color: catagories[1].color,
            },
            {
              title: catagories[2].item,
              value: CatagoryTotal(catagories[2].name),
              color: catagories[2].color,
            },
            {
              title: catagories[3].item,
              value: CatagoryTotal(catagories[3].name),
              color: catagories[3].color,
            },
          ]}
        />
        ;
      </div>
      <div className="overall-spending">
        <h4>Overall</h4>
        <span>
          ${GetTotal(donationsArray).toLocaleString("en-US", numberSettings)}
        </span>
      </div>
      <div className="pie-chart__labels">
        {catagories.map((catagory, index) => {
          return (
            <div className="pie-chart__labels-item" key={index}>
              <div className="label">
                <div className={`label__color ${catagory.class}`}></div>
                {catagory.name}
              </div>
              $
              {CatagoryTotal(catagory.name).toLocaleString(
                "en-US",
                numberSettings
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpendingBox;
