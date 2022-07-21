import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Process} from "./components/Process";
import {ToDoList} from "./components/ToDoList";
import {Stage} from "./components/Stage";
import {StepList} from "./components/StepList";
import {ToDo} from "./components/ToDo";
import {EDITING_STAGE, EDITOR, FOLLOWER, LOGIN, ON_HOME} from "./store/reducer";
import {useState} from "react";
import {initCancelProcess} from "./store/reduxFunctions";

function App() {

    const dispatch = useDispatch();

    const role = useSelector(state => state.role)
    const toDo = useSelector(state => state.toDo)

    const [thisRole, setRole] = useState();

    function handleRole(e) {
        setRole(e.target.value)
    }

    function onSetRole(e) {
        e.preventDefault()
        dispatch({type: LOGIN, role: thisRole})
    }

    if (role === 'editor' && !toDo) {
        return (
            <>
                <div style={{backgroundColor: 'grey'}}><h1>EDITOR</h1></div>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    {/*<button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>*/}
                    <button className="homeButtons" onClick={() => {
                        dispatch({type: ON_HOME})}}> Home</button>
                </div>
                <Process/>
                <ToDoList/>
            </>
        )
    }
    if (role === 'editor' && toDo) {
        return (
            <>
                <div style={{backgroundColor: 'grey'}}><h1>EDITOR</h1></div>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    {/*<button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>*/}
                    <button className="homeButtons" onClick={() => {
                        dispatch({type: ON_HOME})}}>Home</button>
                </div>


                <Process/>
                <ToDoList/>
                <ToDo/>
                <StepList/>
            </>
        )
    }
    if (role === 'follower') {
        return (<>
                <div style={{backgroundColor: 'grey'}}><h1>FOLLOWER</h1></div>
                <div style={{display: 'flex', justifyContent: "space-evenly", position: "absolute", top: 5, right: 10}}>
                    {/*<button onClick={()=> dispatch({type: GO_HOME})}>Go Home</button>*/}
                    <button className="homeButtons" onClick={() => {
                        dispatch({type: ON_HOME})}}>Home</button>
                </div>
                <Stage/>
            </>
        )
    }

    return <>
        <div className="App">
            <header className="App-header">
                <p>
                    welcome to DODO toDO's
                </p>
            </header>
            <div>
                <form onSubmit={onSetRole}>
                    <input type="radio" onChange={handleRole} name="role" value="editor"/> EDITOR
                    <input type="radio" onChange={handleRole} name="role" value="follower"/> FOLLOWER
                    <button className="homeButtons" type='submit'>ENTER</button>
                </form>
            </div>
        </div>
    </>

}

export default App;
