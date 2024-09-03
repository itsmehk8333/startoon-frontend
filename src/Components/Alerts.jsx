import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AlertComponent(props) {
//   const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    props.close(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.close(false);
  };

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={props.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}