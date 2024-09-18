import "./SideBar.css";
import {
  faHouseChimney,
  faMoneyBillTrendUp,
  faCircleDollarToSlot,
  faGear,
  faArrowRightFromBracket,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import SideNavItem from "./SideNav_Item";

function Sidebar({ updatePage, page }) {
  //array for sidebar
  const sidebar_list = [
    {
      tag: "Dashboard",
      icon: faHouseChimney,
    },
    { tag: "Income", icon: faMoneyBillTrendUp },
    { tag: "Donations", icon: faCircleDollarToSlot },
    { tag: "Inbox", icon: faMessage },
    { tag: "Settings", icon: faGear },
    {
      tag: "Logout",
      icon: faArrowRightFromBracket,
    },
  ];

  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar__logo">
          <h1 className="sidebar__logo-header">The Ma'aser App</h1>
        </div>
        <ul className="side-nav">
          {sidebar_list.map((list_item, index) => {
            return (
              <SideNavItem
                tag={list_item.tag}
                icon={list_item.icon}
                key={index}
                updatePage={updatePage}
                page={page}
              ></SideNavItem>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
