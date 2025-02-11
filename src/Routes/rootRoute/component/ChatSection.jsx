import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useUiStore } from "../../../store/uiStore";
import { useAuthStore } from "../../../store/authStore";

const ChatSection = () => {
  const { token } = useAuthStore();
  const { selectedChatId } = useUiStore();
  const [conversationHistory, setConversationHistory] = useState([]);
  const [input, setInput] = useState("");

  const getConversationHistory = async (selectedChatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/chats/${selectedChatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch chat history: ${res.status}`);
      const data = await res.json();
      console.log(data);
      setConversationHistory(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (selectedChatId) {
      getConversationHistory(selectedChatId);
    }
  }, [selectedChatId]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { id: Date.now(), user_message: input, bot_response: null };

      // Append the user's message to the chat history
      setConversationHistory((prevChats) => [userMessage,...prevChats]);
      setInput("");

      try {
        const res = await fetch("http://localhost:5000/api/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            user_message: input,
            chat_title_id: selectedChatId,
          }),
        });

        if (!res.ok) throw new Error(`Failed to send message: ${res.status}`);
        const data = await res.json();
        const botMessage = {
          id: Date.now() + 1,
          user_message: null,
          bot_response: data.bot_response || "No response",
        };

        // Append the bot's response to the chat history
        setConversationHistory((prevChats) => [botMessage,...prevChats ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  console.log(conversationHistory)
  return (
    <Box
    width={{md:'50%'}}
    display="flex" flexDirection="column" height="100%">
      {/* Chat History Section */}
      <Box flex="1" overflow="auto" mb={2} sx={{ px: 2 }}>
        {conversationHistory.length > 0 ? (
          conversationHistory.slice().reverse().map((conversation,index) => (
            
            <Box key={index} sx={{ mb: 2 }}>
              {conversation.user_message && (
                <Box
                display="flex"
                justifyContent= "flex-end"
                mb={1}
              >
  
                <Box
                  bgcolor= "#1976d2"
                  color="#fff" 
                  p={1}
                  borderRadius="12px"
                  maxWidth="60%"
                  boxShadow={1}
                >
                  {conversation.user_message }
                </Box>  
              </Box>
              )
                }
              {conversation.bot_response && (
                <Box>
                <Box
                  bgcolor= "#2c3e50" 
                  color= "#fff" 
                  p={1}
                  borderRadius="12px"
                  maxWidth="60%"
                  boxShadow={1}
                >
                  {conversation.bot_response }
                </Box>
              </Box>
              )
              }
            
            </Box>
          ))
        ) : (
          <Typography color="textSecondary" textAlign="center">
            No messages yet. Start the conversation!
          </Typography>
        )}
      </Box>

      {/* Input Section */}
      <Box
      display="flex" alignItems="center" sx={{ px: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatSection;
