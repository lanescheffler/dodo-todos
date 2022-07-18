import {useEffect, useRef, useState} from "react";
import {createStage, deleteProcess, getProcessList, getStageList} from "../store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
// import {Button} from "react-bootstrap";
import {EDITING_PROCESS, ON_SELECTED_TODO, SELECT_PROCESS_TO_EDIT, STEP, TO_DO} from "../store/reducer";
import {ToDo} from "./ToDo";
import {Card} from "react-bootstrap";

// process = ToDo

export function ToDoList() {

    const dispatch = useDispatch()
    const dropdown = useRef();
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getProcessList());
            dispatch(getStageList());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const processList = useSelector(state => state.processList)
    const selectedToDo = useSelector(state => state.selectedToDo)
    const toDoOption = useSelector(state => state.toDoOption)
    const toDo = useSelector(state => state.toDo)

    let {selectedStage} = useSelector(state => ({selectedStage: state.selectedStage}))
    const stageList = useSelector(state => state.stageList)


    // const newStage = {
    //     promptu: 'Stage 1',
    //     stageId: new Date().getMilliseconds(),
    //     processId: toDo[0].title.toString(),
    //
    //     orderNumber: null,
    //     pending: true,
    //     done: false,
    //
    //     comments: 'please enter comments',
    //
    // }

    const [formState, setFormState] = useState("")
    // const [stageState, setStageState] = useState(newStage)

    if (selectedToDo) {
        dropdown.current.value = "default"
        dispatch({type: SELECT_PROCESS_TO_EDIT, select: false})
    }

    if (toDoOption) {
        dropdown.current.value = "default"
        dispatch({type: ON_SELECTED_TODO, select: false})
    }

    // if (toDo) {
    //     dropdown.current.value = "default"
    // }

    function handleForm(e) {
        e.preventDefault();
    }

    function onChangeProcess(e) {
        setFormState({
            ...formState,
            processToDo: e.target.value
        })
    }

    function editProcess() {
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const selectedProcess = processList.filter(s => s.title === formState.processToDo)
            dispatch({type: EDITING_PROCESS, selectedProcess: selectedProcess})

        }
    }

    function dltProcess() {
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            dispatch(deleteProcess(formState))
            dropdown.current.value = "default"
        }
    }

    function selectProcess() {
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const toDo = processList.filter(s => s.title === formState.processToDo)
            const selectedStage = stageList
            dispatch({type: TO_DO, toDo: toDo})
            dispatch({type: STEP, selectedStage: selectedStage})
            dropdown.current.value = "default"
        }
    }

    return <>
        <div>
            <div><font color="black"><h2>TODO List</h2></font></div>
            <form onSubmit={handleForm}>
                <select ref={dropdown} onChange={onChangeProcess}>
                    <option value="default">Please select a TODO</option>
                    {processList.map((processToDo, idx) => {
                            return <option key={idx} value={processToDo.title}>
                                {processToDo.title}
                            </option>
                        }
                    )}}
                </select>
                <span>
                    <button onClick={(e) => {
                        editProcess()
                    }} className="homeButtons">
                        Edit
                    </button>
                </span>
                <span className="homeButtons">
                    <button className="homeButtons" onClick={(e) => {
                        dltProcess()
                    }} className="homeButtons" >
                        Delete
                    </button>
                </span>
                <span className="homeButtons">
                    <button className="homeButtons" onClick={(e) => {
                        selectProcess()
                    }} className="homeButtons" >
                        Select
                    </button>
                </span>
            </form>

        </div>
    </>
}