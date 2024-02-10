import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ColumnTasksModal = ({ column, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {column ? (
        <>
          <DialogTitle>{column.title} Tasks</DialogTitle>
          <DialogContent>
            <List>
              {column.tasks.map(task => (
                <ListItem key={task.id}>
                  <ListItemText primary={task.content} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
};

ColumnTasksModal.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ColumnTasksModal;
