import { useFilesStore } from "../store/filesStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { createFile, createTabs } from "../utils/utils";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ReplayIcon from "@mui/icons-material/Replay";
import { v4 as uuid4 } from "uuid";
import { useRef, useState } from "react";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

const FileItem = () => {
  const {
    fileExplore,
    allFiles,
    setAllFiles,
    setActiveFiles,
    setCurrentFolder,
    currentFolder,
    setFileExplore,
  } = useFilesStore();
  const [folderId, setFolderId] = useState(uuid4());
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [parentNodeId, setParentNodeId] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  const handleActiveFolder = (data: any) => {
    setCurrentFolder(data);
    setParentNodeId(data.id);
  };

  const findData = (data: any, id: any, index: any) => {
    if (data.child) {
      if (data.id === id) {
        const id = folderId;
        data.child.push({
          id: id,
          name: "",
          showInput: true,
        });
        setFileExplore([...fileExplore]);
      }
      data.child.forEach((item: any) => {
        findData(item, id, index);
      });
    } else {
      if (data.id === id) {
        const id = folderId;
        data.child = [];
        data.child?.push({
          id: id,
          name: "",
          showInput: true,
        });
        setFileExplore([...fileExplore]);
      }
    }
  };

  const createFolder = (id: any) => {
    fileExplore.forEach((item: any, index: any) => {
      findData(item, id, index);
    });
  };

  const handleCreateFile = (e: any) => {
    e.stopPropagation();
    createFolder(currentFolder.id);
  };

  const FileView = (data: any) => {
    const handleOpenTab = async (data: any) => {
      for (let key in allFiles) {
        if (allFiles[key].id === data.id) {
          const tab = await createTabs(allFiles[key]);
          setActiveFiles(tab);
        }
      }
    };

    const handleActiveFolder = (data: any) => {
      setCurrentFolder(data);
    };

    const createNow = (data: any, id: any, name: any) => {
      if (data.child) {
        if (data.id === id) {
          data.name = name;
          data.showInput = false;
          data.parentId = currentFolder.id;
          setFileExplore([...fileExplore]);
        }
        data.child.forEach((item: any) => {
          createNow(item, id, name);
        });
      } else {
        if (data.id === id) {
          data.name = name;
          data.showInput = false;
          data.parentId = currentFolder.id;

          setFileExplore([...fileExplore]);
        }
      }
    };

    const handleBlur = (e: any) => {
      const { value } = e.target;

      const file = createFile(value, currentFolder.id, folderId);
      allFiles[value] = file;

      fileExplore.forEach((item: any, index: any) => {
        createNow(item, folderId, value);
      });
      setFolderId(uuid4());
      setAllFiles(allFiles);
    };

    if (data.child) {
      return (
        <>
          <TreeItem
            key={data.id}
            sx={{ borderLeft: "1px solid #585858" }}
            onClick={() => handleActiveFolder(data)}
            nodeId={data.id}
            label={data.name}
          >
            {data.child.map((item: any) => {
              return FileView(item);
            })}
          </TreeItem>
        </>
      );
    } else {
      return (
        <>
          {data.showInput && (
            <TreeItem
              // onClick={() => handleOpenTab(data)}
              key={`${data.id}/${data.name}`}
              nodeId={data.id}
              label={
                <input
                  type={"text"}
                  className="fileInput"
                  onBlur={handleBlur}
                  ref={inputRef}
                />
              }
            />
          )}
          <TreeItem
            onClick={() => handleOpenTab(data)}
            key={data.id}
            sx={{ borderLeft: "1px solid #585858" }}
            nodeId={data.id}
            label={data.name}
          />
        </>
      );
    }
  };

  const handleExpandClick = (e: any) => {
    e.stopPropagation();
    setExpanded(() => [parentNodeId]);
  };

  const handleReloadExplorer = (e: any) => {
    e.stopPropagation();
  };

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  // console.log("fileExplore", fileExplore);
  // console.log("allFiles", allFiles);
  // console.log("inputRef", inputRef);
  // console.log("expanded", expanded);

  return (
    <div className="treeView">
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
        sx={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
          color: "#fff",
        }}
      >
        {fileExplore?.map((item: any) => {
          if (item.child) {
            return (
              <TreeItem
                key={item.id}
                onClick={() => handleActiveFolder(item)}
                nodeId={item.id}
                label={
                  <div className="row justifyContentBetween alignItemCenter">
                    <div>{item.name}</div>
                    <div className="row alignItemCenter">
                      <div className="treeIcon" onClick={handleCreateFile}>
                        <NoteAddIcon />
                      </div>
                      <div className="treeIcon">
                        <CreateNewFolderIcon />
                      </div>
                      <div className="treeIcon" onClick={handleReloadExplorer}>
                        <ReplayIcon />
                      </div>
                      <div className="treeIcon" onClick={handleExpandClick}>
                        <AutoAwesomeMotionIcon />
                      </div>
                    </div>
                  </div>
                }
              >
                {item.child.map((data: any) => FileView(data))}
              </TreeItem>
            );
          } else {
            // return FileView(item);
          }
        })}
      </TreeView>
    </div>
  );
};

export default FileItem;
