import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import {MemberTest} from "./MemberTest";

export interface Items {
    id: number,
    name: string,
    description: string,
    qty: number
}

interface Props {

}

interface State {
    items: Items[]
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.getMembers()
    }

    private getMembers() {
        fetch('/api/items')
            .then(res => res.json())
            .then(res => this.setState({items: res}, () => console.log('fetched', res)))
    }

    public render() {

        const {items} = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <MemberTest items={items}/>
            </div>
        );
    }

}

export default App;
