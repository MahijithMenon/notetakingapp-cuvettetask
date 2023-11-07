import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    position: 'absolute',
    width: '740px',
    height: '317px',
    top: '144px',
    left: '256px',
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const NewNotes = ({ setNotes, notes, id, setID, setShowModal, showModal }) => {
  const [title, setTitle] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(showModal);
  const [color, setColor] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
    setShowModal(false);
  };
  const backgroundColors = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ];

  const handleCreateNotes = (e) => {
    e.preventDefault();
    if (!title || !color) return;
    const newNotes = [...notes, { id, title, color, messages: [] }];
    setNotes(newNotes);
    closeModal();
    setID((prevID) => prevID + 1);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        shouldCloseOnOverlayClick={false}
      >
        <h1>Create New Notes Group</h1>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          X
        </button>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Choose Color</label>
            <div className="color-buttons">
              {backgroundColors.map((bgColor) => (
                <button
                  key={bgColor}
                  style={{
                    width: '30px',
                    height: '30px',
                    border: bgColor === color ? '2px solid #000' : 'none',
                    borderRadius: '50%',
                    margin: '0 5px',
                    cursor: 'pointer',
                    backgroundColor: bgColor,
                  }}
                  onClick={(e) => e.preventDefault() || setColor(bgColor)}
                ></button>
              ))}
            </div>
          </div>
          <button
            style={{
              width: '154px',
              height: '38px',
              borderRadius: '11px',
              background: '#000000',
              color: '#fff',
              marginTop: '20px', // Add some top margin
            }}
            onClick={handleCreateNotes}
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

NewNotes.propTypes = {
  setNotes: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setID: PropTypes.func.isRequired,
};

export default NewNotes;
