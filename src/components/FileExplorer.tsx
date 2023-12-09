import { Resizable } from "re-resizable";
import { useFilesStore } from "../store/filesStore";
import { useThemeStore } from "../store/themeStore";
import { manipulateData } from "../utils/utils";
import { ChangeEvent } from "react";
import FileItem from "./FileItem";

const FileExplorer = () => {
  const { setAllFiles, setFileExplore } = useFilesStore();
  const { width, setWidth } = useThemeStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const allFile = e.target.files;
    setFileExplore(manipulateData(allFile));
    setAllFiles(allFile);
  };

  return (
    <Resizable
      defaultSize={{
        width: width + "px",
        height: "100vh",
      }}
      onResizeStop={(_e, _direction, _ref, d) => {
        setWidth(d.width);
      }}
    >
      <div className="fileExplorer">
        <span className="colorFff p1 dInBlock">Explorer</span>
        {/* <input
          type="file"
          directory=""
          webkitdirectory=""
          onChange={handleChange}
        /> */}
        <FileItem />
        <div className="divider"></div>
      </div>
    </Resizable>
  );
};

export default FileExplorer;
