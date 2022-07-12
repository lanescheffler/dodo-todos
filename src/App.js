import './App.css';
import {useSelector} from "react-redux";

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
                href="website"
                target="_blank"
                rel="noopener noreferrer"
            >
              |EDITOR|
            </a>
            <a
                className="App-link"
                href="website"
                target="_blank"
                rel="noopener noreferrer"
            >
              |FOLLOWER|
            </a>
          </header>
        </div>
    )
  }
}

export default App;
