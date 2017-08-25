import React, {Component} from 'react';

class ChatBar extends Component {

  onMessageKeyPress(e){
   console.log(e.keyCode);
   if(e.keyCode === 13 /* if the key is enter */){
     this.props.sendMessage(e.target.value);
     e.target.value = "";
   }
  };
  onMessageKeyPressUser(e){
   console.log(e.keyCode);
   if(e.keyCode === 13 /* if the key is enter */){
     this.props.changeUsername(e.target.value);
   }
  };

  render() {
   return (
     <div>
      <footer className="chatbar">
         <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyUp={(e) => this.onMessageKeyPressUser(e)}/>
         <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={(e) => this.onMessageKeyPress(e)}/>
      </footer>
     </div>
    )
  }
};

export default ChatBar;