import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const Comments = ({ arenaId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, 'comments'), where('arenaId', '==', arenaId));
      const querySnapshot = await getDocs(q);
      const commentsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
    };

    fetchComments();
  }, [arenaId]);

  const handleAddComment = async () => {
    if (newComment) {
      await addDoc(collection(db, 'comments'), {
        arenaId,
        text: newComment,
        createdAt: new Date(),
      });
      setNewComment('');
      const updatedComments = await getDocs(query(collection(db, 'comments'), where('arenaId', '==', arenaId)));
      setComments(updatedComments.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
  };

  return (
    <div>
      <TextField
        label="Leave a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddComment} variant="contained" color="primary">
        Add Comment
      </Button>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.text} secondary={comment.createdAt.toDate().toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Comments;
