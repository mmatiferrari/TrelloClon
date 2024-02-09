// src/components/TaskList.js
import React from 'react';
import { Grid } from '@mui/material';

const TaskList = ({ tasks }) => {
  return (
    <Grid container spacing={2}>
      {tasks.map(task => (
        <Grid item key={task.id}>
          {task.content}
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
