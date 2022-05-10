import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import ConversationsList from "../Components/Conversation/ConversationsList";
import ConversationBox from "../Components/Conversation/ConversationBox";
import SearchAppBar from "../Components/Miscellaneous/SearchAppBar";

function MessengerP() {
  const [selectedConv, setSelectedConv] = useState("");
  const [notification, setNotification] = useState([]);
  const user = useSelector((state) => state.authReducer.user);

  //function to get sender
  const getSenderInfo = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  return (
    <div className="messenger">
      {user && <SearchAppBar user={user} />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "91.5vh",
          padding: "10px",
        }}
      >
        {user && (
          <ConversationsList
            selectedConv={selectedConv}
            setSelectedConv={setSelectedConv}
            getSenderInfo={getSenderInfo}
            user={user}
          />
        )}
        {user && (
          <ConversationBox
            selectedConv={selectedConv}
            setSelectedConv={setSelectedConv}
            getSenderInfo={getSenderInfo}
            notification={notification}
            setNotification={setNotification}
            user={user}
          />
        )}
      </Box>
    </div>
  );
}

export default MessengerP;
