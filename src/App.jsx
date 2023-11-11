import PocketNotesImage from './assets/image-removebg-preview 1.png';
import { useEffect, useState } from 'react';
import NewNotes from './components/NewNotes';
import ProfilePicture from './components/ProfilePicture';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isVisibleChat, setIsVisibleChat] = useState(false);
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
    setIsVisibleChat(true);
  };

  useEffect(() => {
    const notes = localStorage.getItem('notes');
    if (notes) {
      setNotes(JSON.parse(notes));
      setNewID(JSON.parse(notes).length);
    }
    console.log(JSON.parse(notes));
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
        className={`chat-user-list ${isVisibleChat ? 'hide' : 'show'}`}
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
        <h1
          style={{
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: '500',
            lineHeight: '37px',
            letterSpacing: '0.02em',
            textAlign: 'left',
          }}
        >
          Pocket Notes
        </h1>
        <button
          onClick={handleCreateNotes}
          style={{
            width: '303px',
            height: '51px',
            top: '117px',
            left: '44px',
            borderRadius: '50px',
            background: '#000000',
            color: '#FFFFFF',
            fontSize: '18px',
            margin: '10px',
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
              overflow: 'hidden',
              background: note.id === currentGroup?.id ? '#F7ECDC' : '#FFFFFF',
            }}
            onClick={(e) => handleMessage(e, note.id)}
          >
            <ProfilePicture userName={note.title} color={note.color} />
            <p
              style={{
                fontFamily: 'Roboto',
                fontSize: '21px',
                fontWeight: '500',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                textAlign: 'left',
              }}
            >
              {note.title}
            </p>
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
          className={`chatSection ${isVisibleChat ? 'show' : 'hide'}`}
        >
          <div
            style={{
              background: '#E8E8E8',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isVisibleChat && (
              <button
                className="close-btn-mobile"
                onClick={() => setIsVisibleChat(false)}
              >
                X
              </button>
            )}
            <ProfilePicture
              userName={currentGroup.title}
              color={currentGroup.color}
              style={{ marginRight: '10px' }}
            />
            <h1
              style={{
                fontFamily: 'Roboto',
                fontSize: '21px',
                fontWeight: '800',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                textAlign: 'left',
              }}
            >
              {currentGroup.title}
            </h1>
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
                  <div key={message.time} style={{ display: 'flex' }}>
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
          <div className="message-box-div">
            <textarea
              placeholder="Enter Your Text Here"
              onChange={(e) => setUserTypedMessage(e.target.value)}
              value={userTypedMessage}
            ></textarea>
            <button
              onClick={() => updateMessage(currentGroup.id)}
              className="send-btn"
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
            top: '100px',
            left: '468px',
            bottem: '100px',
            overflowY: 'auto',
            maxHeight: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={`chatSection ${isVisibleChat ? 'show' : 'hide'}`}
        >
          <img
            src={PocketNotesImage}
            style={{ marginTop: '100px' }}
            alt="notes"
          />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online.</p>
          <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '0',
              left: '150px',
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="21"
              viewBox="0 0 17 21"
              fill="none"
            >
              <path
                d="M2.125 21C1.54063 21 1.04019 20.804 0.623689 20.412C0.207189 20.02 -0.000706529 19.5493 1.80391e-06 19V9C1.80391e-06 8.45 0.208252 7.979 0.624752 7.587C1.04125 7.195 1.54134 6.99933 2.125 7H3.1875V5C3.1875 3.61667 3.70565 2.43733 4.74194 1.462C5.77823 0.486667 7.03092 -0.000665984 8.5 6.8306e-07C9.96979 6.8306e-07 11.2228 0.487667 12.2591 1.463C13.2954 2.43833 13.8132 3.61733 13.8125 5V7H14.875C15.4594 7 15.9598 7.196 16.3763 7.588C16.7928 7.98 17.0007 8.45067 17 9V19C17 19.55 16.7918 20.021 16.3753 20.413C15.9588 20.805 15.4587 21.0007 14.875 21H2.125ZM8.5 16C9.08438 16 9.58482 15.804 10.0013 15.412C10.4178 15.02 10.6257 14.5493 10.625 14C10.625 13.45 10.4168 12.979 10.0003 12.587C9.58375 12.195 9.08367 11.9993 8.5 12C7.91563 12 7.41519 12.196 6.99869 12.588C6.58219 12.98 6.37429 13.4507 6.375 14C6.375 14.55 6.58325 15.021 6.99975 15.413C7.41625 15.805 7.91634 16.0007 8.5 16ZM5.3125 7H11.6875V5C11.6875 4.16667 11.3776 3.45833 10.7578 2.875C10.138 2.29167 9.38542 2 8.5 2C7.61459 2 6.86198 2.29167 6.24219 2.875C5.6224 3.45833 5.3125 4.16667 5.3125 5V7Z"
                fill="#292929"
              />
            </svg>
            <span style={{ marginLeft: '10px', alignItems: 'center' }}>
              end-to-end encrypted
            </span>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
