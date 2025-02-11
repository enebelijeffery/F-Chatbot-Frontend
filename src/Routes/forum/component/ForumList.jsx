import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';

const ForumList = ({ forums, onSelect }) => {
  return (
    <List>
      {forums.map((forum) => (
        <ListItem
          button
          key={forum.id}
          onClick={() => onSelect(forum.id)}
          sx={{
            borderBottom: "1px solid #ccc",
            mb: 1,
            p: 2,
          }}
        >
          <ForumIcon/>
          <ListItemText
            primary={forum.name}
            secondary={
              <Typography variant="body2" color="text.secondary">
                {forum.thread_count} threads, {forum.post_count} replies
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ForumList;
