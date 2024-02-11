import React, { useState, useEffect } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import TaskColumn from './components/TaskColumn';
import ColumnTasksModal from './components/ColumnTasksModal';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorageHelpers';

const App = () => {
  const initialColumns = loadFromLocalStorage('columns') || [
    { id: 1, title: 'To Do', tasks: [] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] }
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [open, setOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleAddTask = (columnId, newTaskContent) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, { id: Date.now(), content: newTaskContent }]
          };
        }
        return column;
      });
    });
  };

  const handleUpdateTitle = (columnId, newTitle) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            title: newTitle
          };
        }
        return column;
      });
    });
  };
  
  const handleDeleteTask = (columnId, taskId) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
          };
        }
        return column;
      });
    });
  };

  const handleAddColumn = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddColumnConfirmed = () => {
    const newColumn = { id: Date.now(), title: newColumnTitle, tasks: [] };
    setColumns(prevColumns => [...prevColumns, newColumn]);
    setNewColumnTitle('');
    setOpen(false);
  };

  const handleViewTasks = (columnId) => {
    const selectedColumn = columns.find(column => column.id === columnId);
    setSelectedColumn(selectedColumn);
    // Eliminar la columna seleccionada
    setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
    setOpen(true);
  };

  const handleDeleteColumn = (columnId) => {
    setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
  };

  useEffect(() => {
    saveToLocalStorage('columns', columns);
  }, [columns]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Trello Clone</h1>
      <Grid container spacing={3} justifyContent="center"> {/* Alinea las columnas en el centro */}
        {columns.map(column => (
          <Grid item key={column.id}>
            <TaskColumn
              id={column.id}
              initialTitle={column.title.toString()}
              tasks={column.tasks}
              onAddTask={(newTaskContent) => handleAddTask(column.id, newTaskContent)}
              onUpdateTitle={(newTitle) => handleUpdateTitle(column.id, newTitle)}
              onDeleteTask={(taskId) => handleDeleteTask(column.id, taskId)}
              onViewTasks={() => handleViewTasks(column.id)}
              onDeleteColumn={() => handleDeleteColumn(column.id)} // Pasar la función handleDeleteColumn
            />
          </Grid>
        ))}
        <Grid item>
          <Button variant="contained" onClick={handleAddColumn}>+</Button>
        </Grid>
      </Grid>
      
      {/* Diálogo para solicitar el título de la nueva columna */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Column Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title for the new column:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Column Title"
            type="text"
            fullWidth
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddColumnConfirmed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para mostrar las tareas de la columna seleccionada */}
      <ColumnTasksModal column={selectedColumn} isOpen={selectedColumn !== null} onClose={() => setSelectedColumn(null)} />
    </div>
  );
};

export default App;
