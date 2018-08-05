import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./app.css";
import PostMove from './api/move.js';
import SelectPanel from './components/SelectPanel';
import ResultsPanel from './components/ResultsPanel';
import LoaderIcon from './components/loaderIcon';
import ComputerFace from './components/computerFace';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      player: null,
      computer: null,
      result: false,
      face: null,
      hasErr: false,
    };
  }

  componentDidMount() {
    fetch("/api/getUsername").then(res => res.json()).then(user => this.setState({ username: user.username }));
  }

  notify(message) {
    toast(message, { 
      position: toast.POSITION.TOP_LEFT
    });
  }

  handleSelectionClick(choice) {
    this.setState({
      player: choice,
      computer: null,
      result: false,
      face: null
    });
    PostMove(choice).then(data => {
      if(data.message !== undefined){
        this.setState({ player: null, computer: null, result: false, face: null, hasErr: true });
        this.notify("something went wrong try again");
      } else {
        const { computerChoice: computer, result, face } = data;
        this.setState({computer, result, face });
        this.notify(`You ${result}`);
      }
    });
  }

  handleResetGame() {
    this.setState({ player: null, computer: null, result: false, face: null, hasErr: false });
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1>Hello {this.state.username}<div>Lets play rock paper scissors</div></h1>
        ) : <h1>Loading.. please wait!</h1>}
        <SelectPanel onSelection={e => this.handleSelectionClick(e)}/>
        {this.state.hasErr ? <i className="thinking fas fa-exclamation-triangle fa-10x"></i> : null}
        {this.state.result ? <ResultsPanel {...this.state} /> : this.state.player ? <LoaderIcon /> : null}
        {this.state.result || this.state.hasErr ? <button onClick={() => this.handleResetGame()}>Clear Results</button> : null}
        <ComputerFace face={this.state.face} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}