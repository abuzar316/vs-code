import Editor from "@monaco-editor/react";
import { language } from "../content/content";
import { v4 as uuid4 } from "uuid";

export const manipulateData = (data: any) => {
  let newData = { ...data };
  let myData: any[] = [];
  for (let key in newData) {
    newData[key].id = uuid4();
    newData[key].parentId = null;
    newData[key].showInput = false;
    myData.push(newData[key]);
  }

  myData.map((item) => {
    let pathSplit = item.webkitRelativePath.split("/");
    pathSplit.length = pathSplit.length - 1;

    pathSplit.map((e: any) => {
      const dataFind = myData.findIndex((i: any) => i.name === e);
      if (0 <= dataFind) {
      } else {
        myData.push({
          id: uuid4(),
          name: e,
          webkitRelativePath: pathSplit.join("/"),
          parentId: null,
        });
      }
    });
  });

  myData.map((item) => {
    let pathSplit = item.webkitRelativePath.split("/");
    pathSplit.map((e: any, index: number) => {
      if (0 < index) {
        let parent = pathSplit[index - 1];
        let parentIndex = myData.findIndex((e) => e.name === parent);
        let childIndex = myData.findIndex((d) => d.name === e);
        myData[childIndex].parentId = myData[parentIndex].id;
      }
    });
  });

  const buildTree = (data: any, parentId: any = null) => {
    const tree: any = [];
    const fil = data.filter((node: any) => node.parentId === parentId);
    fil.forEach((node: any) => {
      const child = buildTree(data, node.id);
      if (child.length) {
        node.child = child;
      }
      tree.push(node);
    });
    return tree.reverse();
  };

  return buildTree(myData);
};

export const textReader = (data: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    if (typeof data === "object") {
      reader.readAsText(data, "UTF-8");
      reader.addEventListener("load", (e: any) => {
        const text = e.target.result;
        resolve(text);
      });
    } else {
      reject("not data");
    }
  });
};

export const createTabs = async (data: any) => {
  const response = await textReader(data);
  const lanKey = data.webkitRelativePath.split(".")[1];
  return {
    title: data.name,
    path: data.webkitRelativePath,
    body: (
      <Editor
        height="100%"
        defaultLanguage={language[lanKey]}
        defaultValue={response}
        theme="vs-dark"
        path={data.name}
      />
    ),
  };
};

export const createFile = (name: string, parentId: string, id: string) => {
  const lanKey = name.split(".")[1];
  const createdData = new File([""], name, {
    type: `text/${language[lanKey]}`,
  });
  createdData.parentId = parentId;
  createdData.id = id;
  return createdData;
};
