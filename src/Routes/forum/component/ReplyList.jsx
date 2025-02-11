import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Button, TextField, Typography, IconButton } from "@mui/material";
import { Image } from "@mui/icons-material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const ReplyList = ({ threadId, category_id, onBack }) => {
  const [replies, setReplies] = useState([])
  const [input, setInput] = useState('')
  const [replyId, setReplyId] = useState(null)
  const fetchReplies = async () => {
    try {
      const res = await fetch(`http://localhost:300/api/posts/${threadId}`)
      const data = await res.json()
      setReplies(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchReplies()
  }, [])
  console.log(replies)
  const sendMessage = async () => {
    try {
      const res = await fetch('http://localhost:300/api/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thread_id: threadId, content: input, user_id: 1, parent_post_id: replyId })

      })
      const data = await res.json()
      setReplies((prev) => [...prev, data[0]])
      setInput('')
      console.log('data repl', data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box flex="1" overflow="auto" mb={2}>
        <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
          Back to Threads
        </Button>
        <Box>
          {replies.map((reply) => {
            return (<Box
              key={reply.id}
              sx={{
                borderRadius: 1,
                m: 5,
                p: 2,
              }}
            >
              <Box
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Box display={'flex'}>
                  <Image />
                  <Typography>profile name</Typography>
                </Box>
                <Box>
                  {reply.created_at}
                </Box>
              </Box>
              {replies.map((perentReply) => {
                if (perentReply.id == reply.parent_post_id) {
                  return (
                    <Box
                      m={5}
                      width={'75%'}
                      borderLeft={'5px solid gray'}
                    >
                      <Box
                      display={'flex'}
                      >
                        <FormatQuoteIcon />
                        <Typography>QUOTED</Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                      >
                        <Box display={'flex'}>
                          <Image />
                          <Typography>profile name</Typography>
                        </Box>
                        <Box>
                          {perentReply.created_at}
                        </Box>
                      </Box>
                      <Box>
                        <Typography>
                          {perentReply.content}
                        </Typography>
                      </Box>
                    </Box>
                  )
                }
              })}
              <Box>
                <Typography>
                  {reply.content}
                </Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
              >
                <IconButton onClick={() => { setReplyId(reply.id) }}>
                  <AddCommentIcon />
                </IconButton>
                <Box>
                  <IconButton><ThumbDownIcon /></IconButton>
                  <IconButton><ThumbUpIcon /></IconButton>
                </Box>
              </Box>
            </Box>)
          })}
        </Box>
      </Box>
      <Box >
        {replies.map((reply) => {
          if (reply.id == replyId) {
            return (
              <Box
                m={5}
                width={'75%'}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  <Box display={'flex'}>
                    <Image />
                    <Typography>profile name</Typography>
                  </Box>
                  <Box>
                    {reply.created_at}
                  </Box>
                </Box>
                <Box>
                  <Typography>
                    {reply.content}
                  </Typography>
                </Box>
              </Box>)
          }
        })}
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>

  );
};

export default ReplyList;
