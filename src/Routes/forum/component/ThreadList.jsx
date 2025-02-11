import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Button, TextField } from "@mui/material";

const ThreadList = ({ category_id, onSelect, onBack }) => {
  const [threadList,setThreadList]=useState([])
  const [isCreateThread,setIsCreateThread]=useState(false)
  const [input,setInput]=useState('')
  const fetchThreads=async()=>{
    try {
      const res=await fetch(`http://localhost:300/api/threads/${category_id}`)
      const data= await res.json()
      console.log(typeof [])
      console.log(typeof data)
      setThreadList(data)
      console.log('thread dada',data)
    } catch (error) {
      console.log('fetchthread err',error)
    }
  }
  const handleSubmit=async()=>{ 
    try {
      const res=await fetch(`http://localhost:300/api/threads/`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({category_id, title:input, user_id:1})
      })
      const data =await res.json()
      setThreadList((prev)=>[...prev,data[0]])
    } catch (error) {
      console.log(error)
    }
  }
  console.log('after handle submit',isCreateThread)
  useEffect(()=>{
    fetchThreads()
  },[])
  return (
    <Box>
      <Box
      display={'flex'}
      justifyContent={'space-between'}
      >
      <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
        Back to Forums
      </Button>
      <Button
      variant="outlined"
      onClick={()=>setIsCreateThread(true)}
      sx={{ mb:2}}
      >
        Create Thread
      </Button>
      </Box>
      {isCreateThread && (<Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                zIndex:999
              }}
            >
                <TextField
                fullWidth
                label="Enter Title"
                variant="outlined"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={()=>setIsCreateThread(false)} variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button onClick={()=>{handleSubmit();setIsCreateThread(false);}}  variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Box>)}
      <List>
        {threadList.map((thread) => (
          <ListItem
            button
            key={thread.id}
            onClick={() => onSelect(thread.id)}
            sx={{
              borderBottom: "1px solid #ccc",
              mb: 1,
              p: 2,
            }}
          >
            <ListItemText
              primary={thread.title}
              secondary={`Replies: ${thread.post_count}, Last updated: ${thread.last_post_time}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ThreadList;
