import "./App.css";

import ModalLogin from "./Modal_Login.js";
import Sidebar from "./SideBar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Income from "./Income/Income.js";
import Donations from "./Donations/Donations.js";
import { GetYear } from "./GetDateFunction.js";
import Logout from "./Logout.js";
import Settings from "./Settings.js";
import Inbox from "./Inbox.js";

function App() {
  const [page, updatePage] = useState("Dashboard"); //state to change pages

  const [user, updateUser] = useState({}); //state to load user info

  const [dates, updateDates] = useState({
    start: GetYear() + "-01-01",
    end: GetYear() + "-12-31",
  }); //state to update dates - default is for current year

  const [incomeArray, updateIncomeArray] = useState([]);

  const [donationsArray, updateDonationsArray] = useState([]);

  return (
    <div>
      <ModalLogin
        updateUser={updateUser}
        updateIncomeArray={updateIncomeArray}
        updateDonationsArray={updateDonationsArray}
        dates={dates}
      ></ModalLogin>

      {page !== "Logout" && (
        <div className="container">
          <Sidebar updatePage={updatePage} page={page}></Sidebar>

          <main className="main-content">
            <Header
              user={user}
              updatePage={updatePage}
              dates={dates}
              updateDates={updateDates}
              updateIncomeArray={updateIncomeArray}
              updateDonationsArray={updateDonationsArray}
            ></Header>

            {page === "Dashboard" && (
              <Dashboard
                incomeArray={incomeArray}
                donationsArray={donationsArray}
                updatePage={updatePage}
                page="Dashboard"
                user={user}
              ></Dashboard>
            )}

            {page === "Income" && (
              <Income
                incomeArray={incomeArray}
                updateIncomeArray={updateIncomeArray}
                user={user}
              ></Income>
            )}

            {page === "Donations" && (
              <Donations
                donationsArray={donationsArray}
                updateDonationsArray={updateDonationsArray}
                user={user}
              ></Donations>
            )}

            {page === "Inbox" && <Inbox></Inbox>}

            {page === "Settings" && (
              <Settings updateUser={updateUser} user={user}></Settings>
            )}
          </main>
        </div>
      )}
      {page === "Logout" && <Logout></Logout>}

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.1/chart.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </div>
  );
}

export default App;
