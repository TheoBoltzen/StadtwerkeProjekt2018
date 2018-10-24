import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import {MemberTest} from "./MemberTest";

export interface Members {
    id: number,
    name: string
}

interface Props {

}

interface State {
    members: Members[]
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            members: []
        }
    }

    componentDidMount() {
        this.getMembers()
    }

    private getMembers() {
        fetch('/api/members')
            .then(res => res.json())
            .then(res => this.setState({members: res.data}, () => console.log('fetched', res.data)))
    }

    public render() {

        const {members} = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <MemberTest members={members}/>
            </div>
        );
    }

}

export default App;
