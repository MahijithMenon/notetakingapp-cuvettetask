import PocketNotesImage from './assets/image-removebg-preview 1.png';
import { useEffect, useState } from 'react';
import NewNotes from './components/NewNotes';
import ProfilePicture from './components/ProfilePicture';

function App() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [userTypedMessage, setUserTypedMessage] = useState('');
  const [newId, setNewID] = useState(0);
  const handleCreateNotes = () => {
    setShowModal(true);
  };

  const updateMessage = (id) => {
    if (userTypedMessage === '') return;
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const currentEnteredMessage = {
      message: userTypedMessage,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString('en-US', options),
    };

    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        const updatedNote = {
          ...note,
          messages: [...note.messages, currentEnteredMessage],
        };
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
    setMessages(updatedNotes[id].messages);
    console.log(id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setUserTypedMessage('');
  };

  const handleMessage = (e, id) => {
    e.preventDefault();
    setShowMessage(true);
    setMessages(notes[id].messages);
    setCurrentGroup(notes[id]);
  };

  useEffect(() => {
    const notes = localStorage.getItem('notes');
    if (notes) {
      setNotes(JSON.parse(notes));
      setNewID(JSON.parse(notes).length);
    }
    // console.log(notes);
  }, []);
  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      {showModal && (
        <NewNotes
          setNotes={setNotes}
          setShowModal={setShowModal}
          showModal={showModal}
          notes={notes}
          id={newId}
          setID={setNewID}
        />
      )}
      <section
        style={{
          background: '#FFF',
          color: '#000',
          width: '410px',
          height: '100vh',
          top: '0',
          left: '468px',
          borderRadius: '9px',
          border: '1px',
          overflow: 'hidden',
        }}
      >
        <h1>Pocket Notes</h1>
        <button
          onClick={handleCreateNotes}
          style={{
            width: '343px',
            height: '51px',
            top: '117px',
            left: '44px',
            borderRadius: '50px',
            background: '#000000',
            color: '#FFFFFF',
          }}
        >
          + Create Notes Group
        </button>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              display: 'flex',
              cursor: 'pointer',
              alignItems: 'center',
              color: '#000000',
            }}
            onClick={(e) => handleMessage(e, note.id)}
          >
            <ProfilePicture userName={note.title} color={note.color} />
            {note.title}
          </div>
        ))}
      </section>
      {showMessage ? (
        <section
          style={{
            background: '#F7ECDC',
            color: '#000',
            width: '1014px',
            top: '0',
            left: '468px',
            borderRadius: '9px',
            overflowY: 'auto',
            maxHeight: '100%',
          }}
        >
          <div
            style={{ background: '#E8E8E8', color: '#000', display: 'flex' }}
          >
            <ProfilePicture
              userName={currentGroup.title}
              color={currentGroup.color}
            />
            <h1>{currentGroup.title}</h1>
          </div>
          <div style={{ background: '#F7ECDC', color: '#000' }}>
            {messages.length === 0 ? (
              <section
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <p>Start A Conversation</p>
              </section>
            ) : (
              <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                {messages.map((message) => (
                  <div key={message.id} style={{ display: 'flex' }}>
                    <div>
                      <p>{message.time}</p>
                      <p>{message.date}</p>
                    </div>
                    <div>
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              background: '#CCCCCC',
              position: 'fixed',
              bottom: '30px',
              left: '340px',
              right: '0',
              height: '35%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '75%',
            }}
          >
            <textarea
              placeholder="Enter Your Text Here"
              style={{
                color: '#000',
                width: '67%',
                height: '180px',
                position: 'fixed',
                bottom: '50px',
                left: '370px',
                right: '0',
                margin: '0',
                padding: '0',
                border: '0',
                resize: 'none',
              }}
              onChange={(e) => setUserTypedMessage(e.target.value)}
              value={userTypedMessage}
            ></textarea>
            <button
              onClick={() => updateMessage(currentGroup.id)}
              style={{
                background: '#000',
                color: '#FFF',
                width: '5%',
                height: '50px',
                position: 'fixed',
                bottom: '70px',
                left: '1080px',
                right: '0',
                margin: '0',
                padding: '0',
                border: '0',
                resize: 'none',
              }}
            >
              {'>'}
            </button>
          </div>
        </section>
      ) : (
        <section
          style={{
            background: '#F7ECDC',
            color: '#000',
            width: '1014px',
            top: '0',
            left: '468px',
            borderRadius: '9px',
            overflowY: 'auto',
            maxHeight: '100%',
            textAlign: 'center',
          }}
        >
          <img src={PocketNotesImage} alt="notes" />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online.</p>
          <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '200px',
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            end-to-end encrypted
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
