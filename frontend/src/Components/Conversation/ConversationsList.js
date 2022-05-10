import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../Redux/actions/convActions";

function ConversationsList({
  selectedConv,
  setSelectedConv,
  getSenderInfo,
  user,
}) {
  //getting conversations
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, []);

  const setBackgroundColor = (id) => {
    return selectedConv._id === id ? "#3393FF" : "#E8E8E8";
  };
  const setColor = (id) => {
    return selectedConv._id === id ? "white" : "black";
  };
  const conversations = useSelector((state) => state.convReducer.conversations);
  return (
    <Box
      sx={{
        display: "flex",
        opacity: 0.9,
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
        height: "98%",
        borderWidth: "1px",
        marginLeft: "-5px",
        borderRadius: "3px",
        background: "white",
        padding: 1,
      }}
    >
      <Box
        sx={{
          width: "90%",
          background: "#F8F8F8",
          alignItems: "center",
          color: "Black",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "3px",
          paddingX: 1,
          pb: 0,
        }}
      >
        <h1>My conversations</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          backgroundColor: "#F8F8F8",
          width: "90%",
          height: "100%",
          borderRadius: "3px",
          overflowY: "hidden",
        }}
      >
        <Stack
          overflow="scroll"
          sx={{
            scrollPaddingTop: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {conversations.map((conv) => (
            <Box
              onClick={() => setSelectedConv(conv)}
              key={conv._id}
              backgroundColor={setBackgroundColor(conv._id)}
              color={setColor(conv._id)}
              sx={{
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#3393FF",
                  color: "white",
                },
                width: "85%",
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                marginLeft: 1,
                paddingX: 2,
                paddingY: 2,
                borderRadius: 2,
                justifyContent: "space-between",
              }}
            >
              <Avatar
                variant="square"
                src={getSenderInfo(user, conv.users).profilpic}
                sx={{
                  width: 70,
                  height: 70,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <Typography>
                  {getSenderInfo(user, conv.users).username}
                </Typography>
                <Typography>{getSenderInfo(user, conv.users).email}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default ConversationsList;
