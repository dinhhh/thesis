/* eslint-disable no-unused-vars */
import {
  ContentCopy,
  Download,
  ExitToApp,
  Groups,
  Mic,
  MicOff,
  PlayArrow,
  Settings,
  Share,
} from "@mui/icons-material";
import {
  Backdrop,
  Badge,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PROGRAMMING_LANGUAGES } from "utils/constants";
import {
  setIsMute,
  setIsVisibleConfigEditor,
  setIsVisibleParticipants,
  setIsVisibleShareForm,
  setOutput,
  setSelectedLanguage,
  setTabKey,
} from "../reducers/codeEditorReducers";
import { getLanguageFileType } from "utils/CodeEditorUtils";
import ShareForm from "./ShareForm";
import axios from "axios";
import { errorNoti, successNoti } from "utils/notification";
import ConfigEditor from "./ConfigEditor";

const NavBarRoom = (props) => {
  const { socket, myPeer } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadingRunCode, setLoadingRunCode] = useState(false);
  const { isVisibleParticipants, selectedLanguage, participants, source, input, isMute } =
    useSelector((state) => state.codeEditor);

  const [anchorConfigEditor, setAnchorConfigEditor] = useState(null);
  const handleDisplayParticipants = () => {
    dispatch(setIsVisibleParticipants(!isVisibleParticipants));
  };

  const handleLeaveRoom = () => {
    myPeer.current.disconnect();
    myPeer.current.destroy();
    socket.current.disconnect();
    history.push("/code-editor/create-join-room");
  };
  function handleDownloadSource(language) {
    const blob = new Blob([source], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `code.${getLanguageFileType(language)}`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function getJdoodleLanguage(language) {
    if (language === PROGRAMMING_LANGUAGES.CPP.value) {
      return "cpp";
    } else if (language === PROGRAMMING_LANGUAGES.JAVA.value) {
      return "java";
    } else if (language === PROGRAMMING_LANGUAGES.PYTHON.value) {
      return "python3";
    }
    return "";
  }

  const handleRunCode = async (input, source, language) => {
    setLoadingRunCode(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:7008/api/code-editor/execute",
        data: {
          source: source,
          input: input,
          language: language,
        },
      });
      if (response && response.status === 200) {
        successNoti("Compiled successfully", true);
        dispatch(setTabKey("output"));
        dispatch(setOutput(response.data.output));
        setLoadingRunCode(false);
      } else {
        errorNoti("Compiled failed", true);
      }
    } catch (error) {
      errorNoti("Compiled failed", true);
      setLoadingRunCode(false);
    }
  };

  const handleConfigEditor = (event) => {
    setAnchorConfigEditor(event.currentTarget);
    dispatch(setIsVisibleConfigEditor(true));
  };

  const handleCloseConfigEditor = () => {
    setAnchorConfigEditor(null);
    dispatch(setIsVisibleConfigEditor(false));
  };

  const handleMuteMicrophone = () => {
    dispatch(setIsMute(!isMute));
  };
  return (
    <div>
      <ShareForm />
      <ConfigEditor anchorElement={anchorConfigEditor} handleClose={handleCloseConfigEditor} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingRunCode}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                size="small"
                startIcon={<PlayArrow />}
                variant="contained"
                color="success"
                onClick={() => {
                  handleRunCode(input, source, getJdoodleLanguage(selectedLanguage));
                }}
              >
                Run
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                startIcon={<Download />}
                variant="contained"
                onClick={() => {
                  handleDownloadSource(selectedLanguage);
                }}
              >
                Download
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                startIcon={<Share />}
                variant="contained"
                onClick={() => {
                  dispatch(setIsVisibleShareForm(true));
                }}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControl fullWidth size="small" sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLanguage}
              label="Language"
              autoWidth
              onChange={(e) => {
                dispatch(setSelectedLanguage(e.target.value));
              }}
            >
              <MenuItem value={PROGRAMMING_LANGUAGES.CPP.value}>
                {PROGRAMMING_LANGUAGES.CPP.label}
              </MenuItem>
              <MenuItem value={PROGRAMMING_LANGUAGES.JAVA.value}>
                {PROGRAMMING_LANGUAGES.JAVA.label}
              </MenuItem>
              <MenuItem value={PROGRAMMING_LANGUAGES.PYTHON.value}>
                {PROGRAMMING_LANGUAGES.PYTHON.label}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton onClick={handleMuteMicrophone}>
                {isMute ? <MicOff fontSize="large" /> : <Mic fontSize="large" />}
              </IconButton>
            </Grid>
            <Grid item>
              <Tooltip title="Người tham gia">
                <IconButton
                  onClick={() => {
                    handleDisplayParticipants();
                  }}
                >
                  <Badge badgeContent={participants.length} color="primary">
                    <Groups fontSize="large" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Cài đặt">
                <IconButton onClick={handleConfigEditor}>
                  <Settings fontSize="large" />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Button
                size="small"
                startIcon={<ExitToApp />}
                variant="contained"
                color="error"
                onClick={() => {
                  handleLeaveRoom();
                }}
              >
                Leave room
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavBarRoom;
