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
  constructor() {
      super();
      this.state = {
        currentUser: 'Anonymous',
        messages: [],
        oldName:null
      }
  };

  sendMessage(text){
   const newMessage = {
    type: "postMessage",
    id: this.index, 
    username: this.state.currentUser,
    content: text
   };
    this.socket.send(JSON.stringify(newMessage), 'message');
  };

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
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.addEventListener('message', (event) => {
      const newMessages = this.state.messages;
      const messageObject = JSON.parse(event.data);

      //Detemines how the messages are rendered depending on type. 
      if(messageObject.type === "incomingMessage"){
           newMessages.push(messageObject);
           this.setState({messages: newMessages});
      } else if (messageObject.type === "incomingNotification") {
        if (this.state.oldName === null) {
          newMessages.push({id: messageObject.id, content: "Anonymous has changed their username to " + messageObject.username, type: 'notification'});
          this.setState({messages: newMessages});
        } else {
          newMessages.push({id: messageObject.id, content: this.state.oldName + " has changed their username to " + messageObject.username, type: 'notification'});
          this.setState({messages: newMessages});
        };
          this.setState({messages: newMessages});
      } else if (messageObject.type === "count"){
        this.setState({userCount: messageObject.userCount});
      };
    });
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