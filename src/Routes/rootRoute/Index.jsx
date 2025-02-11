import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { colorTokens } from "../../theme";
import ChatSection from "./component/ChatSection";
import SavedChatsSection from "./component/SavedChatSection";
import Popup from "./component/Popup";
import { useUiStore } from "../../store/uiStore";
import TopBar from "../../global/topbar/Index";


const ChatBot = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [savedChats, setSavedChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  const { openMenu, isStartNewChat, setIsStartNewChat, selectedChatId } = useUiStore();

  return (
    <Box
    height="100vh"
    display={'flex'}
    flexDirection={'column'}
    >
      <TopBar />
      <Box
        display="flex"
        flex={1}
        overflow="auto"
        borderColor={'red'}

      >
        {openMenu && <SavedChatsSection savedChats={savedChats} />}
        {isStartNewChat && <Popup />}
        <Box
        display={'flex'}
        justifyContent={'center'}
         flex="2" p={2} overflow="auto">
          {selectedChatId ? (
            <ChatSection chat={activeChat} chatId={activeChatId} />
          ) : (
            <Box textAlign="center" mt={4}>
              <Button variant="contained" onClick={() => setIsStartNewChat(true)}>
                Start New Chat
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;
