import './App.css';
import {useSelector} from "react-redux";
import {Process} from "./components/Process";
import {ToDoList} from "./components/ToDoList";

function App() {

  const role = useSelector(state => state.role)
  console.log("role: " + role)

  if(role === 'home') {
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
  if(role === 'editor') {
    return (
        <>
          <div style={{backgroundColor: 'grey'}}><h1>Editor</h1></div>
          <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 10, right: 0}}>
            {/*<button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>*/}
            <button>Home</button>
          </div>
            <Process/>
            <ToDoList/>
        </>
    )
  }
}

export default App;
