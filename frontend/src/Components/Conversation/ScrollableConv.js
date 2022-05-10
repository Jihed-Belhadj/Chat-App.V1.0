import { Avatar, Tooltip } from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getMessages } from "../../Redux/actions/messageActions";

function ScrollableConv({ user, messages }) {
  //const [selectedConvComp, setSelectedConvComp] = useState();
  /* var messages = useSelector((state) => state.messageReducer.messages);
  var dispatch = useDispatch(); */

  // messages display logics
  const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 4;
    else return "auto";
  };

  const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  /*   useEffect(() => {
    dispatch(getMessages(selectedConv._id));
    selectedConvComp = selectedConv;
  }); */

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Avatar sx={{ width: 50, height: 50 }} src={m.sender.profilpic}>
                {m.sender.username}
              </Avatar>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#3393FF" : "#E8E8E8"
                }`,
                color: `${m.sender._id === user._id ? "white" : "black"}`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: 5,
                padding: "5px 15px",
                maxWidth: "75%",
                marginBottom: 3,
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableConv;
