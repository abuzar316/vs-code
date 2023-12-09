import FileExplorer from "../components/FileExplorer";
import SideBar from "../components/SideBar";
import { useThemeStore } from "../store/themeStore";
import { useFilesStore } from "../store/filesStore";
import TabsCode from "../components/TabsCode";
import FileSelectDialog from "../components/FileSelectDialog";

const HomeScreens = () => {
  const { width } = useThemeStore();
  const { activeFiles } = useFilesStore();

  return (
    <>
      <FileSelectDialog />
      <div className="row">
        <SideBar />
        <FileExplorer />
        <div
          className="editorBox"
          style={{ width: `calc(100% - ${width + 50}px)` }}
        >
          <TabsCode data={activeFiles} />
        </div>
      </div>
    </>
  );
};

export default HomeScreens;
