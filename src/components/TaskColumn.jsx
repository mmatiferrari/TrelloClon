import { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import TaskCard from './TaskCard';
import PropTypes from 'prop-types'

const TaskColumn = ({ id, initialTitle, tasks, onAddTask, onUpdateTitle, onDeleteTask }) => {
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
    <Grid item xs={3}>
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
            onDeleteTask={() => handleDeleteTask(task.id)} // Pasa el id de la tarea, no el id de la columna
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
      </Paper>
    </Grid>
  );
};

TaskColumn.propTypes = {
  id: PropTypes.number.isRequired, // id requerido y debe ser un número
  initialTitle: PropTypes.string.isRequired, // initialTitle requerido y debe ser una cadena
  tasks: PropTypes.array.isRequired, // tasks requerido y debe ser un array
  onAddTask: PropTypes.func.isRequired, // onAddTask requerido y debe ser una función
  onUpdateTitle: PropTypes.func.isRequired, // onUpdateTitle requerido y debe ser una función
  onDeleteTask: PropTypes.func.isRequired, // onDeleteTask requerido y debe ser una función
};

export default TaskColumn;
