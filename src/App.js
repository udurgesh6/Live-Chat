import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Message from "./Message";
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
function App() {
  //So this is the state for input field which is initially empty
  //STATE HOOKS CONCEPT
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  //useState = variable in REACT
  //useEffect = run code on a condition in REACT
  useEffect(()=> {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapShot => {
      setMessages(snapShot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  }, [])
  useEffect(() => {
    //write your code here
    //if the square bracket is blank the code runs once when
    //app component loads
    setUsername(prompt('Please enter your name'))

  }, [])//and a condition here
  //in the console prints whatever is being typed
  //console.log(input);

  //this prints messages array
  //console.log(messages);


  const sendMessage = (event) => {
    //All the logic to send the message goes here

    //To prevent form from refreshing once submitted we do this
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //this is basically appending the new message to
    //the other older messages AT THE END
    //if made [input, ...messages] it appends the message 
    //at the front
    //setMessages([...messages, {username: username, text: input}]); 
    //No set the input again to empty string
    setInput('');
  }
  return (
    <div className="App">
      <img height="150px" width="150px" src="https://st2.depositphotos.com/5943796/11433/v/950/depositphotos_114333810-stock-illustration-initial-letter-sd-red-swoosh.jpg" alt=""/>
      <h2>Welcome {username}</h2>
      {/* Natural tendency of form is to refresh on submit */}
      {/* But thats what we need to change */}
      {/* So we added a code to sendMessage function */}
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value) }/>
          <IconButton className="app_iconButton" disabled={!input} variant="contaned" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
        </FormControl>

      </form>
      {/* messages themselves */}
      <FlipMove>
          {
            messages.map(({ id, message }) => (
              <Message key={id} username={username} message={message}/>
            ))
          }
      </FlipMove>
    </div>
  );
}

export default App;
