import React from "react";
import { Box, List, ListItem, ListItemText, Button, Input, colors, Typography } from "@mui/material";
import { useUiStore } from "../../../store/uiStore";
import { useState } from "react";
import { useEffect } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRef } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useMediaQuery, useTheme } from "@mui/material";



const OptionMenu = ({ setRenameChat, chatId, refreshConversations, setIsOptionmenu }) => {
  const { selectedChatId, setSelectedChatId } = useUiStore();
  const menuRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOptionmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteSavedChats = async () => {
    console.log(chatId)
    try {
      const deletChatRes = await fetch(`https://f-chatbot-backend.onrender.com/api/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const deleteTitleRes = await fetch(`https://f-chatbot-backend.onrender.com/api/chat-titles/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const res = await deletChatRes.json()
      const res2 = await deleteTitleRes.json()
      console.log(res, res2);

      if (deletChatRes.ok && deleteTitleRes.ok) {
        if (selectedChatId === chatId) {
          console.log('chatid', chatId)
          setSelectedChatId(null)

        }
        // Refresh the conversations list after successful deletion
        refreshConversations();
      } else {
        console.error("Failed to delete title:", res.message, res2.message);
      }
    } catch (error) {
      console.error("Error deleting title:", error);
    }
  };



  return (
    <Box
      ref={menuRef}
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 999,
        borderRadius: 1,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button fullWidth className="optionButton" onClick={(e) => { setRenameChat(true); setIsOptionmenu(false); }}><DriveFileRenameOutlineIcon /> Rename</Button>
      <Button fullWidth className="optionButton" onClick={(e) => { deleteSavedChats(); setIsOptionmenu(false) }}><DeleteIcon />Delete</Button>
    </Box>
  )
}

const Rename = ({ chatTitle, chatId, setRenameChat, refreshConversations }) => {
  const [input, setInput] = useState(chatTitle)

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleRename = async () => {
    try {
      const res = await fetch(`https://f-chatbot-backend.onrender.com/api/chat-titles`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ title: input, id: chatId }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        refreshConversations();
        setRenameChat(false);
      } else {
        console.error("Failed to rename chat:", data.message);
      }
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Input value={input} onChange={handleChange} />
      <Button onClick={handleRename}>Rename</Button>
    </Box>
  )
}

const Signout = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/signin'; // Redirect to login page
  };
  return (
    <Box
      position={'absolute'}
      bottom={0}
      onClick={handleLogout} sx={{
        display: 'flex',
        marginBottom: 2,
        cursor: 'pointer',
      }}>

      <Button
        variant="contained"
      >
        <ExitToAppIcon sx={{ background: 'red' }} />
        <Typography
          variant="p">Signout</Typography>
      </Button>
    </Box>
  )
}

const SavedChatsSection = () => {
  const { setOpenMenu, savedConversations, selectedChatId, setSavedConversations, setSelectedChatId, setIsStartNewChat, newlyCreatedChatTitle } = useUiStore();
  const savedConversationsRef = useRef(null);
  const [optionIndex, setOptionIndex] = useState(null)
  const [renameChat, setRenameChat] = useState(false)
  const [isOptionmenu, setIsOptionmenu] = useState(false)
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // console.log(renameChat)
  const getSavedConversations = async () => {
    try {
      const res = await fetch(`https://f-chatbot-backend.onrender.com/api/chat-titles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await res.json();
      setSavedConversations(data);
    } catch (error) {
      console.log('err', error)
    }
  };
  useEffect(() => {
    getSavedConversations();
  }, [newlyCreatedChatTitle]); // Dependency array ensures it runs only once
  console.log(optionIndex)
  const handleIsOptionAndOptionIndex = (index) => {
    setOptionIndex((prevIndex) => (prevIndex === index ? null : index));


  }

  window.addEventListener('mousedown', (e) => {
    if (savedConversationsRef.current && !savedConversationsRef.current.contains(e.target)) {
      isXsScreen && setOpenMenu(false);
    }
  });



  return (
    <Box
      ref={savedConversationsRef}
      flex={'0.7'}
      width={{ xs: "75%" }}
      overflow="auto"
      height={'100%'}
      p={2}
      bgcolor={'#353b4a'}
      // color={colors.primary[100]}
      sx={{
        position: { xs: 'absolute', md: 'relative' },
        zIndex: { xs: '1' },
      }}
    >
      <Box
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => { isXsScreen && setOpenMenu(false); setIsStartNewChat(true) }}

        >
          New Chat
        </Button>
      </Box>
      <List>
        {savedConversations.map((chat, index) => (
          <ListItem
            button
            key={index}
            
            sx={{ borderBottom: "1px solid #ccc", p: 0 }}
          >
            {renameChat && optionIndex === index ? <Rename setRenameChat={setRenameChat} refreshConversations={getSavedConversations} chatTitle={chat.title} chatId={chat.id} /> : <Box m={0} p={1} bgcolor={selectedChatId === chat.id ? "#2c3e50" : "#353b4a"} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <ListItemText
                onClick={() => {
                  setSelectedChatId(chat.id);
                  isXsScreen && setOpenMenu(false);
                }}
                sx={{ cursor: 'pointer' }}
                primary={chat.title}
              />
              <MoreVertIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => { setIsOptionmenu(true); handleIsOptionAndOptionIndex(index) }} />
            </Box>}
            {
              isOptionmenu && optionIndex === index && <OptionMenu setIsOptionmenu={setIsOptionmenu} setRenameChat={setRenameChat} refreshConversations={getSavedConversations} chatId={chat.id} />
            }
          </ListItem>
        ))}
      </List>
      <Signout />
    </Box>
  );
};

export default SavedChatsSection;
