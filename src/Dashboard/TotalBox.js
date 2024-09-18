import "./TotalBox.css";
import {
  faDollarSign,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
import TotalComp from "./Total_comp";
import { GetTotal } from "./Totals";

function TotalBox({ incomeArray, donationsArray }) {
  //details for the 2 sides of the total box
  const totalComps = [
    {
      side: "left",
      header: "Income",
      icon: faDollarSign,
      total: GetTotal(incomeArray),
      percent: 100,
    },
    {
      side: "right",
      header: "Donations",
      icon: faHandHoldingHeart,
      total: GetTotal(donationsArray),
      percent: 100,
    },
  ];
  return (
    <div className="box total-box">
      {totalComps.map((comp, index) => {
        return (
          <TotalComp
            side={comp.side}
            header={comp.header}
            icon={comp.icon}
            total={comp.total}
            percent={comp.percent}
            key={index}
          ></TotalComp>
        );
      })}
    </div>
  );
}

export default TotalBox;
