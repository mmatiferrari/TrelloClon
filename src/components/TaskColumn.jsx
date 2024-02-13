import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import TaskCard from './TaskCard';
import PropTypes from 'prop-types';

const TaskColumn = ({ id, initialTitle, tasks, onAddTask, onUpdateTitle, onDeleteTask, onViewTasks, onDeleteColumn }) => {
  const [title, setTitle] = useState(initialTitle);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setEditingTitle(false);
    onUpdateTitle(id, title);
  };

  const handleTaskContentChange = (e) => {
    setNewTaskContent(e.target.value);
  };

  const handleAddTaskClick = () => {
    if (newTaskContent.trim() !== '') {
      onAddTask(newTaskContent);
      setNewTaskContent('');
    }
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    <Grid item xs={3} sx={{ minWidth: '300px' }}>
      <Paper style={{ padding: '10px' }}>
        {editingTitle ? (
          <TextField
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            fullWidth
          />
        ) : (
          <Typography variant="h6" gutterBottom onClick={handleTitleClick}>
            {title}
          </Typography>
        )}
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            content={task.content}
            onDeleteTask={() => handleDeleteTask(task.id)}
          />
        ))}
        <TextField
          label="New Task"
          variant="outlined"
          value={newTaskContent}
          onChange={handleTaskContentChange}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTaskClick}>
          Add Task
        </Button>
        <Button variant="contained" color="secondary" onClick={onDeleteColumn}>
          Delete Column {/* Botón para eliminar la columna */}
        </Button>
        <Button variant="contained" color="primary" onClick={onViewTasks}>
          View Tasks
        </Button>
      </Paper>
    </Grid>
  );
};

TaskColumn.propTypes = {
  id: PropTypes.number.isRequired,
  initialTitle: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onViewTasks: PropTypes.func.isRequired,
  onDeleteColumn: PropTypes.func.isRequired, // PropTypes para la nueva función onDeleteColumn
};

export default TaskColumn;
