import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteStage, editStage, getStageList} from "../store/reduxFunctions";
import {Card, FormLabel} from "react-bootstrap";
import {useRef} from "react";
import {useState} from "react";
import {EDITING_STAGE, LOGIN, ON_SELECTED_TODO, SELECT_PROCESS_TO_EDIT, SELECT_STAGE_TO_EDIT} from "../store/reducer";

export function Step({stepData}) {

    let {
        stageEditing,
        selectedStage,
        editfailed,
    } = useSelector(state => ({
        stageEditing: state.stageEditing,
        selectedStage: state.selectedStage,
        editFailed: state.editFailed,
    }))

    const newStage = {
        promptu: 'promptu',
        stageId: new Date().getMilliseconds(),

        orderNumber: null,
        pending: false,
        done: false,

        comments: 'please enter comments',
    }

    // const follower = useSelector(state => state.isFollower)
    // const editor = useSelector(state => state.isEditor)
    const role = useSelector(state => state.role)

    const dispatch = useDispatch();
    const dropdown = useRef();
    const stageList = useSelector(state => state.stageList)
    const selectedStep = useSelector(state => state.selectedStep)
    const stepOption = useSelector(state => state.stepOption)

    const startedProcess = useSelector(state => state.startedProcess)

    const [formState, setFormState] = useState(newStage)
    const [editState, setEditState] = useState(newStage)
    const [thisStatus, setStatus] = useState();


    if (selectedStep) {
        dispatch({type: SELECT_STAGE_TO_EDIT, select: false})
    }

    if (stepOption) {
        dispatch({type: ON_SELECTED_TODO, select: false})
    }

    function handleForm(e) {
        e.preventDefault();
    }

    function handlePendingStatus(e) {
        if (stageEditing) {
            setEditState({
                ...editState,
                pending: e.target.checked,
            })
        } else {
            setFormState({
                ...formState,
                pending: stepData.pending,
            })
        }
    }

    function handleDoneStatus(e) {
        if (stageEditing) {
            setEditState({
                ...editState,
                done: e.target.checked,
            })
        } else {
            setFormState({
                ...formState,
                done: stepData.done,
            })
        }
    }

    // function onSetStatus(e) {
    //     e.preventDefault()
    //     dispatch({type: STATUS, role: thisStatus})
    // }

    function updatePromptu(e) {
        if (stageEditing) {
            setEditState({
                ...editState,
                promptu: e.target.value,
            })
        } else {
            setFormState({
                ...formState,
                promptu: e.target.value,
            })
        }
    }

    function updateComments(e) {
        if (stageEditing) {
            setEditState({
                ...editState,
                comments: e.target.value,
            })
        } else {
            setFormState({
                ...formState,
                comments: e.target.value,
            })
        }
    }


    function onEditSubmit() {
        if (editState.promptu === "") {
            return
        }
        dispatch(editStage(editState, selectedStage[0].id))
        dispatch({type: SELECT_STAGE_TO_EDIT, select: true})
        setFormState(newStage)
        setEditState(newStage)
        //this is setting the edit state to a default state,
        // where you must edit all things in order to update edit state
    }

    function dltStage(e) {
        const selectedStage = stageList.filter(s => s.id === stepData.id)
        dispatch(deleteStage(selectedStage[0].id))
    }

    useEffect(() => {
        dispatch(getStageList())
    }, [])

    if (role === 'follower' && !startedProcess) {
        return (
            <>
                <Card style={{backgroundColor: 'grey', color: 'white'}}
                      className={'d-flex float-start w-100 p-2 m-1'}
                      border={'secondary'}>

                    <span className={'stepText'}>

                        step #{stepData.orderNumber} : "{stepData.promptu}" is...

                        <span> pending: {stepData.pending.toString()}</span> |
                        <span> done: {stepData.done.toString()}</span>

                        {/*<FormLabel className={''}>*/}
                        {/*  Pending: <input type={'checkbox'} className={'m-1'}/>*/}
                        {/*</FormLabel>*/}

                        {/*<FormLabel className={''}>*/}
                        {/*  Done: <input type={'checkbox'} className={'m-1'}/>  |*/}
                        {/*</FormLabel>*/}

                        <FormLabel classname={''}>
                            {/*| comments:  <input type={'text'}/> [{stepData.comments}]*/}
                            | comments: [{stepData.comments}]
                        </FormLabel>

                    </span>
                </Card>

            </>
        )
    }

    if (role === 'follower' && startedProcess) {
        return (<>

            please complete all the following steps before submit.

            <Card onSubmit={handleForm}
                  style={{backgroundColor: 'grey', color: 'white'}}
                  className={'d-flex float-start w-100 p-2 m-1'}
                  border={'secondary'}>

            <span className={'stepText'}>

                <FormLabel classname={''}>
                  step: [{stepData.orderNumber}]
                </FormLabel>

                <select ref={dropdown}>
                        <option value="default">123...</option>
                    {/*//need to write more code here for selecting order*/}
                    </select>


                <FormLabel classname={''}>
                    | Promptu:

                    {/*<input value={selectedStage[0].promptu} type={'text'}/> */}

                    [{stepData.promptu}]
                </FormLabel>

                <FormLabel className={''}>
                    THIS STEP: is...
                    <input type={'radio'}
                           className={'m-1'}
                           onChange={handlePendingStatus}
                           name="statuz"
                           value="pending"
                    /> Pending:
                </FormLabel>

                <FormLabel className={''}>
                    <input
                        type={'radio'}
                        className={'m-1'}
                        onChange={handleDoneStatus}
                        name="statuz"
                        value="done"/>  Done:  |
                </FormLabel>

                <FormLabel classname={''}>
                    | comments:  <input
                    onChange={updateComments}
                    placeholder={selectedStage[0].comments}
                    type={'text'}/> [{stepData.comments}]
                </FormLabel>

                <span className={'ml-2'} style={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    position: "absolute",
                    top: 5,
                    right: 10
                }}>
                    <button onClick={() => {
                        onEditSubmit()
                    }} className="homeButtons" size={'sm'}>
                        Submit
                    </button>
                </span>

            </span>

                <span> {stepData.pending}</span>
                <span> {stepData.done}</span>

                <div>
                </div>
            </Card>

        </>)
    }

    if (stageEditing) {
        return (<>

            [please edit step]

            <Card onSubmit={handleForm}
                  style={{backgroundColor: 'grey', color: 'white'}}
                  className={'d-flex float-start w-100 p-2 m-1'}
                  border={'secondary'}>

            <span className={'stepText'}>

                <FormLabel classname={''}>
                  [{stepData.orderNumber}] | Edit Order Number:
                </FormLabel>

                <select ref={dropdown}>
                        <option value="default">123...</option>
                    {/*//need to write more code here for selecting order*/}
                    </select>


                <FormLabel classname={''}>
                    | Edit Prompt:  <input
                    onChange={updatePromptu}
                    placeholder={selectedStage[0].promptu}
                    type={'text'}/> [{stepData.promptu}]
                </FormLabel>

                <FormLabel className={''}>
                    STATUS: is...
                    <input type={'radio'}
                           className={'m-1'}
                           onChange={handlePendingStatus}
                           name="statuz"
                           value="pending"
                    /> Pending:
                </FormLabel>

                <FormLabel className={''}>
                    <input
                        type={'radio'}
                        className={'m-1'}
                        onChange={handleDoneStatus}
                        name="statuz"
                        value="done"/>  Done:  |
                </FormLabel>

                <FormLabel classname={''}>
                    | comments:  <input
                    onChange={updateComments}
                    placeholder={selectedStage[0].comments}
                    type={'text'}/> [{stepData.comments}]
                </FormLabel>

                <span className={'ml-2'} style={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    position: "absolute",
                    top: 5,
                    right: 10
                }}>
                    <button onClick={() => {
                        onEditSubmit()
                    }} className="homeButtons" size={'sm'}>
                        Submit
                    </button>
                </span>

            </span>

                <span> {stepData.pending}</span>
                <span> {stepData.done}</span>

                <div>
                </div>
            </Card>

        </>)
    }

    return <>

        <Card style={{backgroundColor: 'grey', color: 'white'}}
              className={'d-flex float-start w-100 p-2 m-1'}
              border={'secondary'}>

            <span className={'stepText'}>

                step #{stepData.orderNumber} : "{stepData.promptu}" is...

                <FormLabel className={''}>
                  <input
                      type={'radio'}
                      className={'m-1'}
                      checked={stepData.pending}
                  /> Pending:
                </FormLabel>

                <FormLabel className={''}>
                  <input
                      type={'radio'}
                      className={'m-1'}
                      checked={stepData.done}
                  />  Done:  |
                </FormLabel>

                <FormLabel classname={''}>
                    {/*| comments:  <input type={'text'}/> [{stepData.comments}]*/}
                    | comments: [{stepData.comments}]
                </FormLabel>

                <span className={'ml-2'} style={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    position: "absolute",
                    top: 5,
                    right: 85
                }}>
                    <button onClick={(e) => {
                        // editProcess()
                        //editStage
                        const selectedStage = stageList.filter(s => s.id === stepData.id)
                        dispatch({type: EDITING_STAGE, selectedStage: selectedStage})
                    }} className="homeButtons" size={'sm'}>
                        Edit
                    </button>
                </span>
                <span className={'ml-2'} style={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    position: "absolute",
                    top: 5,
                    right: 10
                }}>
                    <button onClick={(e) => {
                        // dltProcess()
                        dltStage(e)
                    }} className="homeButtons" size={'sm'}>
                        Delete
                    </button>
                </span>

            </span>

            <span> {stepData.pending}</span>
            <span> {stepData.done}</span>

            <div>
            </div>
        </Card>

    </>

}