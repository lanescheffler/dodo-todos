import './App.css';
import {useSelector} from "react-redux";
import {Process} from "./components/Process";
import {ToDoList} from "./components/ToDoList";
// import {ToDo} from "./components/ToDo";
// import {StepList} from "./components/StepList";
import {Stage} from "./components/Stage";
import {StepList} from "./components/StepList";

function App() {

    const role = useSelector(state => state.role)
    const toDo = useSelector(state => state.toDo)
    console.log("current role state: " + role)

    if (role === 'home') {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        welcome to DODO toDO's
                    </p>
                    <a
                        className="App-link"
                        href="editor"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        |EDITOR|
                    </a>
                    <a
                        className="App-link"
                        href="follower"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        |FOLLOWER|
                    </a>
                </header>
            </div>
        )
    }
    if (role === 'editor') {
        return (
            <>
                <div style={{backgroundColor: 'grey'}}><h1>Editor</h1></div>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    {/*<button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>*/}
                    <button>Home</button>
                </div>
                <Process/>
                <ToDoList/>
                <StepList/>
            </>
        )
    }
    if (role === 'follower') {
        return (<>
                <div style={{backgroundColor: 'grey'}}><h1>FOLLOWER</h1></div>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    {/*<button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>*/}
                    <button>Home</button>
                </div>
                <Stage/>
            </>
        )
    }
}

export default App;
