import React, { Component } from 'react';

export default class TimerComponent extends Component {
  // set the initial state to indicate that that the timer is not loading
  // React will call the functions in the following order when it mounts the component:
  //   constructor
  //   componentWillMount (not used in this component)
  //   render
  //   componentDidMount
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make ajax requests or setTimeout.
  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: true})  // change the state. this calls render() and the component updates.
    }, 500)
  }

  // Called any time the props or state changes. The jsx elements returned in this
  // method are rendered in the DOM.
  render() {
    if(this.state.loading) {
      return <h1 className='loading' >Loading...</h1>
    } else {
      return <h1 className='loading' >3 seconds have elapsed and page is loaded</h1>
    }
  }
}