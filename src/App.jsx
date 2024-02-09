import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import TaskColumn from './components/TaskColumn';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorageHelpers';

const App = () => {
  console.log("Columns from local storage:", loadFromLocalStorage('columns'));

  const [columns, setColumns] = useState(
    loadFromLocalStorage('columns') || [
      { id: 1, title: 'To Do', tasks: [] },
      { id: 2, title: 'In Progress', tasks: [] },
      { id: 3, title: 'Done', tasks: [] }
    ]
  );

  // Guardar en localStorage cada vez que cambia el estado de las columnas
  useEffect(() => {
    saveToLocalStorage('columns', columns);
  }, [columns]);

  const handleAddTask = (columnId, newTaskContent) => {
    const newTask = { id: Date.now(), content: newTaskContent };
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          return { ...column, tasks: [...column.tasks, newTask] };
        }
        return column;
      });
    });
  };

  const handleUpdateTitle = (columnId, newTitle) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          return { ...column, title: newTitle };
        }
        return column;
      });
    });
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns(prevColumns => {
      const updatedColumns = prevColumns.map(column => {
        if (column.id === columnId) {
          const updatedTasks = column.tasks.filter(task => task.id !== taskId);
          return { ...column, tasks: updatedTasks };
        }
        return column;
      });
      saveToLocalStorage('columns', updatedColumns);
      return updatedColumns;
    });
  };
  
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>My Trello Clone</h1>
      <Grid container spacing={3}>
        {columns.map(column => (
          <TaskColumn
          key={column.id}
          id={column.id}
          initialTitle={column.title.toString()}
          tasks={column.tasks}
          onAddTask={(newTaskContent) => handleAddTask(column.id, newTaskContent)}
          onUpdateTitle={(newTitle) => handleUpdateTitle(column.id, newTitle)}
          onDeleteTask={(taskId) => handleDeleteTask(column.id, taskId)}
        />
        
        ))}
      </Grid>
    </div>
  );
};

export default App;
