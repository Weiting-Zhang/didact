/** @jsx didact.createElement */

const React = didact;
const ReactDOM = didact;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 0
        }
    }
    onClick() {
        for ( let i = 0; i < 100; i++ ) {
            this.setState( { num: this.state.num + 1 } );
            console.log( this.state.num );    // 会输出什么？
        }
    }
    render() {
        return (
            <div className="App">
                <h1>{ this.state.num }</h1>
                <button onClick={this.onClick.bind(this)}>updateState</button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
