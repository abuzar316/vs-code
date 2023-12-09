import CloseIcon from "@mui/icons-material/Close";
import { useFilesStore } from "../store/filesStore";

const TabsCode = ({ data }: any) => {
  const { deleteActiveFiles, activeFileIndex, setActiveFileIndex } =
    useFilesStore();

  const handleChange = (newValue: number) => {
    setActiveFileIndex(newValue);
  };

  const handleCloseTab = (e: any, index: number) => {
    e.stopPropagation();
    deleteActiveFiles(index);
  };

  return (
    <div>
      <ul className="tabsContainer">
        {data.map((tab: any, index: number) => (
          <li
            className={`tabItem ${index === activeFileIndex && "activeTab"}`}
            onClick={() => handleChange(index)}
            key={index}
          >
            <span>{tab.title}</span>
            <span
              className="tabCloseIcon"
              onClick={(e) => handleCloseTab(e, index)}
            >
              <CloseIcon />
            </span>
          </li>
        ))}
      </ul>
      {data.map((tab: any, index: number) => (
        <div key={index}>
          {activeFileIndex === index && (
            <div className="editorBox">{tab.body}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabsCode;
