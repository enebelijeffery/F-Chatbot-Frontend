import { Box, Button, TextField } from '@mui/material';
import { useUiStore } from '../../../store/uiStore';
import { useState } from 'react';
import { useRef } from 'react';



const Popup =()=>{
  const popupRef = useRef(null);
    const {setIsStartNewChat,setSelectedChatId,setNewlyCreatedChatTitle}=useUiStore();
    const [newConversationTidtle, setNewConversationTidtle]=useState('');
    const handleSubmit = async () => {
       try {
        const res = await fetch('https://f-chatbot-backend.onrender.com/api/chat-titles', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
            },
            body: JSON.stringify({ title: newConversationTidtle }),
          });
      
          const data = await res.json();
          console.log(data);  
          setNewlyCreatedChatTitle(data.title);
          setSelectedChatId(data.id);
       } catch (error) {
        console.error(error)
       }
      };
      const handleInputChange = (e) => {
        setNewConversationTidtle(e.target.value);
      };
      const handleSubmitAndClose = async () => {
        setIsStartNewChat(false);
        await handleSubmit();
      };

      window.addEventListener('mousedown', (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setIsStartNewChat(false);
        }
      });

    return(
        <Box ref={popupRef} sx={{ zIndex:"2",position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2, p: 4 }}>
          <TextField fullWidth label="Enter Title" variant="outlined" value={newConversationTidtle} onChange={handleInputChange} sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={()=>setIsStartNewChat(false)} variant="outlined" color="secondary">Cancel</Button>
            <Button onClick={handleSubmitAndClose} variant="contained" color="primary">Submit</Button>
          </Box>
        </Box>
    )
}

export default Popup