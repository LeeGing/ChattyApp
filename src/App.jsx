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
        messages: ChattyData.messages,
        oldName:null
      }
      this.index = 4;
  }

  sendMessage(text){
   const newMessage = {
    type: "postMessage",
    id: this.index, //We don't have this.index anymore. But I believe that an empty array can be good.
    username: this.state.currentUser,
    content: text
   }
    this.socket.send(JSON.stringify(newMessage), 'message');
  }

  changeUsername(newUsername){
    this.setState({oldName: this.state.currentUser});
    this.setState({currentUser: newUsername});
    const newUser = {
      type: "postNotification",
      id: this.index,
      username: newUsername,
      content: this.state.content
   }
    this.socket.send(JSON.stringify(newUser), 'message');
   //TO DO : Send a system message saying that the user changed their name.
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    
    this.socket.addEventListener('message', (event) => {
      console.log(event.data);
      const newMessages = this.state.messages;
      const messageObject = JSON.parse(event.data);

      if(messageObject.type === "incomingMessage"){
           newMessages.push(messageObject);
           this.setState({messages: newMessages});
           console.log(event.data);
      } else if (messageObject.type === "incomingNotification") {
          newMessages.push({content: this.state.oldName + " has changed their username to " + messageObject.username});
          this.setState({messages: newMessages});
          console.log(event.data);

      }

      this.setState({messages: newMessages});
    });
  }

  render() {
    return (
      <div>
          <NavBar/>
          <MessageList messages={ this.state.messages}/>
          <ChatBar sendMessage={text => this.sendMessage(text)} changeUsername={text => this.changeUsername(text)}/>
      </div>
    );
  }
}

export default App;