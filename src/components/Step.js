import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {editStage, getStageList} from "../store/reduxFunctions";
import {Card, FormLabel} from "react-bootstrap";
import {useRef} from "react";
import {useState} from "react";
import {EDITING_STAGE, ON_SELECTED_TODO, SELECT_PROCESS_TO_EDIT, SELECT_STAGE_TO_EDIT} from "../store/reducer";

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
        promptu: 'Stage 1',
        stageId: new Date().getMilliseconds(),

        orderNumber: null,
        pending: true,
        done: false,

        comments: 'please enter comments',
    }

    const dispatch = useDispatch();
    const dropdown = useRef();
    const stageList = useSelector(state => state.stageList)
    const selectedStep = useSelector(state => state.selectedStep)
    const stepOption = useSelector(state => state.stepOption)
    // const follower = useSelector(state => state.isFollower)
    // const editor = useSelector(state => state.isEditor)
    const role = useSelector(state => state.role)


    const [formState, setFormState] = useState(newStage)
    const [editState, setEditState] = useState(newStage)

    if (selectedStep) {
        dispatch({type: SELECT_STAGE_TO_EDIT, select: false})
    }

    if (stepOption) {
        dispatch({type: ON_SELECTED_TODO, select: false})
    }

    function handleForm(e) {
        e.preventDefault();
    }

    function updatePromptu(e) {
        if (stageEditing) {
            setEditState({
                ...editState,
                promptu: e.target.value,
                comments: e.target.value
            })
        } else {
            setFormState({
                ...formState,
                promptu: e.target.value
            })
        }
    }

    function onEditSubmit() {
        if (editState.promptu === "") {
            return
        }

        console.log("formState: " + formState)
        console.log("stepData: " + stepData)
        console.log("editState:" + editState.promptu)
        console.log("selected stage:" + selectedStage[0].promptu)

        dispatch(editStage(editState, selectedStage[0].id))
        dispatch({type: SELECT_STAGE_TO_EDIT, select: true})
    }

    useEffect(() => {
        dispatch(getStageList())
    }, [])

    if (role === 'follower') {
        return (
            <>
                <Card style={{backgroundColor: 'grey', color: 'white'}}
                      className={'d-flex float-start w-100 p-2 m-1'}
                      border={'secondary'}>

                    <span className={'stepText'}>

                        step #{stepData.orderNumber} : "{stepData.promptu}" is...

                        <FormLabel className={''}>
                          Pending: <input type={'checkbox'} className={'m-1'}/>
                        </FormLabel>

                        <FormLabel className={''}>
                          Done: <input type={'checkbox'} className={'m-1'}/>  |
                        </FormLabel>

                        <FormLabel classname={''}>
                            {/*| comments:  <input type={'text'}/> [{stepData.comments}]*/}
                            | comments: [{stepData.comments}]
                        </FormLabel>

                        <span> pending: {stepData.pending.toString()}</span> |
                    <span> done: {stepData.done.toString()}</span>

                    </span>
                </Card>

            </>
        )
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
                  [{stepData.orderNumber}] | Edit OrderNumber:
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
                    Pending: <input type={'checkbox'} className={'m-1'}/>
                </FormLabel>

                <FormLabel className={''}>
                 Done: <input type={'checkbox'} className={'m-1'}/>  |
                </FormLabel>

                <FormLabel classname={''}>
                    | comments:  <input type={'text'}/> [{stepData.comments}]
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
                    }} className={'m-2'} size={'sm'}>
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
                  Pending: <input type={'checkbox'} className={'m-1'}/>
                </FormLabel>

                <FormLabel className={''}>
                  Done: <input type={'checkbox'} className={'m-1'}/>  |
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
                    }} className={'m-2'} size={'sm'}>
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
                        //dltStage
                    }} className={'m-2'} size={'sm'}>
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