import React, { useEffect, useState } from "react";
import ForumList from "./component/ForumList";
import ThreadList from "./component/ThreadList";
import ReplyList from "./component/ReplyList";
import { Box, List, ListItem, Typography } from "@mui/material";

const Forum = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [forumList, setForumList] = useState([])



  const fetchListOfForum = async () => {
    try {
      const res = await fetch('http://localhost:300/api/categories')
      const data = await res.json()
      const forums = data.data
      console.log('1', forums)
      setForumList(forums)
      return forums
    } catch (error) {
      console.log('failed to fetch err:',error)
    }
  }

  useEffect(() => {
    fetchListOfForum()
  }, [])
  console.log('forum id', selectedForum)
  return (
   <Box
   
   >
    <Box>
      <Box>
        <Typography>Online Now</Typography>
        <List>
          <ListItem>
            <Typography></Typography>
          </ListItem>
          <ListItem>
            <Typography></Typography>
          </ListItem>
          <ListItem>
            <Typography></Typography>
          </ListItem>
          <ListItem>
            <Typography></Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
     <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {selectedForum
          ? selectedThread
            ? "Replies"
            : "Threads"
          : "Forums"}
      </Typography>
      {!selectedForum ? (
        <ForumList forums={forumList} onSelect={setSelectedForum} />
      ) : !selectedThread ? (
        <ThreadList
        category_id={selectedForum}
          onSelect={setSelectedThread}
          onBack={() => setSelectedForum(null)}
        />
      ) : (
        <ReplyList
          threadId={selectedThread}
          category_id={selectedForum}
          onBack={() => setSelectedThread(null)}
        />
      )}
    </Box>
   </Box>
  );
};

export default Forum;
