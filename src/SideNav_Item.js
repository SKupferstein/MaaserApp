import "./SideNav_Item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideNavItem({ tag, icon, updatePage, page }) {
  //update page:
  function clickNavHandler(tag) {
    updatePage(tag);
  }
  return (
    <li
      onClick={() => clickNavHandler(tag)}
      className={`side-nav__item ${
        page === tag ? "side-nav__item-active" : ""
      } `}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{tag}</span>
    </li>
  );
}

export default SideNavItem;
