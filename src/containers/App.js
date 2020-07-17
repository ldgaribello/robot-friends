import React, {Component} from "react";

import './App.css';

import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setTimeout(() => {
                    this.setState({robots: users})
                }, 1000)
            })
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    render() {
        const {robots, searchField} = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if (robots.length === 0) {
            return <h1 className="tc f2">Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className="f2">Robot Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>

                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;