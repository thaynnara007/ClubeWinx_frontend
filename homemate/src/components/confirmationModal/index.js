import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: '#F4F4F4',
    padding: '20px',
    borderRadius: '8px',
  },
  button: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    color: '#F4F4F4',
    fontWeight: 'bold',
  },
}));

const defaultTitle = 'Deletar anúncio';
const defaultDescription =
  'Após apagar o anúncio o mesmo não poderá mais ser recuperado. Você tem certeza que quer deletar esse anúncio?';

function ConfirmationModal({
  open,
  handleClose,
  handleConfirm,
  title = defaultTitle,
  description = defaultDescription,
  confirmButtonName = 'Deletar',
}) {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{title}</h2>
      <hr />
      <p id="simple-modal-description">{description}</p>
      <br />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
        <button
          type="button"
          onClick={handleConfirm}
          className={classes.button}
          style={{ backgroundColor: '#FF7E67', marginLeft: '10px' }}
        >
          {confirmButtonName}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className={classes.button}
          style={{ backgroundColor: '#B2B1B9', marginRight: '10px' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default ConfirmationModal;
