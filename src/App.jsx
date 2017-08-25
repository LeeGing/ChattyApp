import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'

const ChattyData = {
  // optional. if currentUser is not defined, it means the user is Anonymous
  currentUser: {name: "Anonymous"}, 
  messages: []
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
    };
  };

  sendMessage(text){
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser,
      content: text
    };
    this.socket.send(JSON.stringify(newMessage));
  };

  changeUsername(newUsername){
    this.setState({currentUser: newUsername});
    const newUser = {
      type: "postNotification",
      content: this.state.currentUser + " changed their name to " + newUsername
   }
    this.socket.send(JSON.stringify(newUser));
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onmessage = (event) => {
      const newMessages = this.state.messages;
      const messageObject = JSON.parse(event.data);
      console.log(event);
      switch (messageObject.type) {
        case "incomingMessage":
        case "incomingNotification":
          newMessages.push(messageObject);
          this.setState({messages: newMessages});
          break;
        case "count":
          this.setState({userCount: messageObject.userCount});
          break;
        default:
          break;
      }
    }
  };

  render() {
    return (
      <div>
          <NavBar userCount={this.state.userCount}/>
          <MessageList messages={ this.state.messages}/>
          <ChatBar sendMessage={text => this.sendMessage(text)} changeUsername={text => this.changeUsername(text)}/>
      </div>
    );
  };
};

export default App;
