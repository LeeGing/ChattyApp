import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'

const ChattyData = {
currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
messages: [
  { id: "1",
    username: "Bob",
    content: "Has anyone seen my marbles?",
  },
  { id: "2",
    username: "Anonymous",
    content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
  }
]
}

class App extends Component {
  constructor() {
      super();
      this.state = {
        currentUser: ChattyData.currentUser.name,
        messages: ChattyData.messages
      }
      this.index = 4;
  }

  componentDidMount() {
   console.log("componentDidMount <App />");
   setTimeout(() => {
     console.log("Simulating incoming message");
     // Add a new message to the list of messages in the data store
     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
     const messages = this.state.messages.concat(newMessage)
     // Update the state of the app component.
     // Calling setState will trigger a call to render() in App and all child components.
     this.setState({messages: messages})
   }, 3000);
  }

  sendMessage(text){
   const newMessage = {
     id: this.index,
     username: this.state.currentUser,
     content: text
   }
   const messagePlusNewMessage = this.state.messages.concat([newMessage]);

   this.setState({messages: messagePlusNewMessage});
   this.index += 1;
  }

  render() {
    return (
      <div>
          <NavBar/>
          <MessageList messages={ this.state.messages}/>
          <ChatBar user={ this.state.currentUser} sendMessage={text => this.sendMessage(text)}/>
      </div>
    );
  }
}
export default App;