import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useFilesStore } from "../store/filesStore";
import { useThemeStore } from "../store/themeStore";
import { manipulateData } from "../utils/utils";
import { ChangeEvent } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FileSelectDialog = () => {
  const [open, setOpen] = React.useState(true);
  const { setAllFiles, setFileExplore } = useFilesStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const allFile = e.target.files;
    setFileExplore(manipulateData(allFile));
    setAllFiles(allFile);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ background: "#252526", color: "#fff", width: "500px" }}>
          <DialogTitle>{"Upload folder"}</DialogTitle>
          <DialogContent>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                type="file"
                directory=""
                webkitdirectory=""
                onChange={handleChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <button className="buttonModal">Select File</button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default FileSelectDialog;
