import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getMessages } from "../../Redux/actions/messageActions";
import SingleConv from "./SingleConv";

function ConversationBox({
  user,
  selectedConv,
  setSelectedConv,
  getSenderInfo,
  notification,
  setNotification,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        opacity: 0.9,
        flexDirection: "column",
        alignItems: "center",
        width: "77%",
        borderWidth: "1px",
        marginRight: "13px",
        marginLeft: "4px",
        borderRadius: "3px",
        padding: 1,
        background: "white",
        height: "98%",
      }}
    >
      <SingleConv
        selectedConv={selectedConv}
        setSelectedConv={setSelectedConv}
        getSenderInfo={getSenderInfo}
        notification={notification}
        setNotification={setNotification}
        user={user}
      />
    </Box>
  );
}

export default ConversationBox;
