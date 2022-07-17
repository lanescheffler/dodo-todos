import {StepList} from "./StepList";
import {useDispatch, useSelector} from "react-redux";
import {STEP, TO_DO} from "../store/reducer";
import {useEffect, useRef, useState} from "react";
import {addUser, getProcessList, getStageList, initCancelProcess} from "../store/reduxFunctions";

export function Stage() {

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
    const currentProcess = useSelector(state => state.toDo)
    const filteredProcessList = processList.filter(td => td.todo = currentProcess)
    const stageList = useSelector(state => state.stageList)

    const role = useSelector(state => state.role)


    const [formState, setFormState] = useState("")
    const [name, setName] = useState("")
    const [processStarted, setProcessStarted] = useState("")

    const processToStart = processList.filter(s => s.title === formState.processToDo)


    function handleForm(e) {
        e.preventDefault();
    }

    function updateName(e) {
        setName({
            ...name,
            name: e.target.value
        })
        setProcessStarted({
            ...processStarted,
            processStarted: processToStart[0].title
        })
    }

    function onChangeProcess(e) {
        setFormState({
            ...formState,
            processToDo: e.target.value
        })
    }

    function selectProcess() {
        console.log(formState)
        if (formState.processToDo === undefined || formState.processToDo === 'Please select a TODO') {
            return;
        } else {
            const toDo = processList.filter(s => s.title === formState.processToDo)
            const selectedStage = stageList
            dispatch({type: TO_DO, toDo: toDo})
            dispatch({type: STEP, selectedStage: selectedStage})
            // dropdown.current.value = "default"
        }
    }

    function startProcess(e) {
        e.preventDefault()
        if (role !== 'follower') {
            return;
        } else {
            const processToStart = processList.filter(s => s.title === formState.processToDo)
            const processStarted = processToStart[0].title
            console.log(processStarted)
            dispatch(addUser(name, processStarted))
            // dispatch(initStartProcess({name}))
        }
    }

    if (!currentProcess) {
        return (
            <>
                <div><h2>please select a todo</h2></div>
                <div>
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

                        <span className={'ml-2'}>
                    <button onClick={(e) => {
                        selectProcess()
                    }} className={'m-2'} size={'sm'}>
                        Select
                    </button>
                </span>
                    </form>
                </div>
            </>
        )
    }
    if (currentProcess) {
        return (
            <>
                <div><h2>please select a todo</h2></div>
                <div>
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

                        <span className={'ml-2'}>
                            <button onClick={(e) => {
                                selectProcess()
                            }} className={'m-2'} size={'sm'}>
                                Select
                            </button>
                        </span>
                    </form>
                    <form onSubmit={startProcess}>
                        <input onChange={updateName} value={name.name} placeholder="please enter your name" type='text'/>

                        <button type='submit'>START</button>

                        <span className={'ml-2'}>
                            <button onClick={(e) => {
                                initCancelProcess(e)
                            }} className={'m-2'} size={'sm'}>
                                CANCEL
                            </button>
                        </span>
                    </form>
                </div>
                <StepList/>
            </>
        )
    }
}