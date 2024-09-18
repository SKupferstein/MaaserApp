import "./TransBox.css";
import TransBoxBox from "./TransBox_Box";
import Card from "../Card";

//tansbox is a container for the two transaction boxes
function TransBox({ incomeArray, donationsArray, updatePage, page }) {
  //array of info for the transaction boxes
  const boxInfo = [
    {
      title: "Income History",
      header: "Company",
      lastColumn: "Exempt from Maaser",
      activities: incomeArray,
      page: "Income",
    },
    {
      title: "Donation History",
      header: "Orgenization",
      lastColumn: "Category",
      activities: donationsArray,
      page: "Donations",
    },
  ];
  return (
    <div>
      {boxInfo.map(function (item, index) {
        //map through the array to create both boxes
        return (
          <Card key={index}>
            <TransBoxBox
              box={item}
              key={index}
              updatePage={updatePage}
              page={page}
            ></TransBoxBox>
          </Card>
        );
      })}
    </div>
  );
}

export default TransBox;
