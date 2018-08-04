import React, { Component } from "react";
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
    };
  }

  componentDidMount() {
    fetch("/api/getUsername").then(res => res.json()).then(user => this.setState({ username: user.username }));
  }

  handleSelectionClick(choice) {
    this.setState({
      player: choice,
      computer: null,
      result: false,
      face: null
    });
    PostMove(choice).then(data => {
      console.log('data',data);
      const { computerChoice: computer, result, face } = data;
      this.setState({computer, result, face });
    });
  }

  handleResetGame() {
    this.setState({ player: null, computer: null, result: false, face: null });
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1>Hello {this.state.username}<div>Lets play rock paper scissors</div></h1>
        ) : <h1>Loading.. please wait!</h1>}
        <SelectPanel onSelection={e => this.handleSelectionClick(e)}/>
        {this.state.result ? <ResultsPanel {...this.state} /> : this.state.player ? <LoaderIcon /> : null}
        {this.state.result ? <button onClick={() => this.handleResetGame()}>Clear Results</button> : null}
        <ComputerFace face={this.state.face} />
      </div>
    );
  }
}