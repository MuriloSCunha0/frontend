import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArenaCard = ({ arena }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/arena/${arena.id}`);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={arena.photos ? arena.photos[0] : '/static/images/arena.jpg'}
        alt={arena.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {arena.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {arena.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArenaCard;
