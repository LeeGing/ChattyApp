import React, {Component} from 'react';
import UserData from './UserData.jsx'

SetUser(function() {
  ReactDOM.render(
    <App date={new Date()} userName="currentUser.name" />,
    document.getElementById('example')
  );
}, 500);