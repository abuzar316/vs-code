import { buttonList } from "../content/content";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div>
        {buttonList?.map((button, index) => (
          <button
            key={index}
            className={`sideBarButton ${button.active && "btnActive"}`}
          >
            <button.icon />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
