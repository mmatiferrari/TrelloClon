import { Paper, Typography} from '@mui/material';
import PropTypes from 'prop-types'; 

const TaskCard = ({ content, onDeleteTask}) => {
  return (
    <Paper style={{ padding: '10px', marginBottom: '10px' }}>
      <Typography variant="body1">{content}</Typography>
      <button onClick={onDeleteTask}>x
      </button>
    </Paper>
  );
};

TaskCard.propTypes = {
  content: PropTypes.string.isRequired, 
  onDeleteTask: PropTypes.func.isRequired, 
};

export default TaskCard;
