import {useEffect, useState} from "react";
import {CompleteStep, getStageList} from "../store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, FormLabel} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {Step} from "./Step";

export function StepList() {

    // getStageList function



    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getStageList());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const stageListGrab = dispatch(getStageList());

    const stageEditing = useSelector(state => state.stageEditing)

    const toDo = useSelector(state => state.toDo[0].title)
    const stageList = useSelector(state =>state.stageList)
    const filteredStageList = stageList.filter(steps => steps.processId === toDo)

    const stepOption = useSelector(state => state.selectedStage[0].id)
    const selectedStep = filteredStageList.filter(step => step.id === stepOption)

    const startedProcess = useSelector(state => state.startedProcess)

    const [formState, setFormState] = useState('')


    function Complete(s) {
        dispatch(CompleteStep(formState, s))
        setFormState('')
    }

    function handlePendingStatus(e) {
            setFormState({
                ...formState,
                pending: e.target.checked,
            })
    }

    function handleDoneStatus(e) {
            setFormState({
                ...formState,
                done: e.target.checked,
            })
    }

    function onCommentsChange(e) {
        setFormState({
            ...formState,
            comments: e.target.value
        })
    }

    if(stageEditing) {
        return (
            <>
                <div className={'row'}>
                    <Col>
                        <Card className={'m-2 col p-2'}>
                            <CardHeader className={'h2 text-center'}>STEPS</CardHeader>
                            <div className={'steps'}>

                                {
                                    selectedStep.map((stepData, idx) => {
                                        return <div key={"steps" + idx} className={'selectedStep'}>
                                            <Step stepData={stepData}/>
                                        </div>
                                    })
                                }
                            </div>
                        </Card>
                    </Col>
                </div>
            </>
        )
    }

    if(startedProcess){
        return(
            <>
                this process has started.

                <div>
                    <h2>Steps to take</h2>
                </div>

                {/*filters the unfinished quizzes from the user's assigned quizzes*/}
                {/*we then map over that new array, returning the user's quiz information*/}
                {filteredStageList.filter(s => s.pending === true).map((p)=>{
                    return <Card>
                        <div className={'d-flex float-start w-100 p-2 m-1'} key={p.id} style={{backgroundColor: 'linen', color: 'black', marginBottom: '3rem'}}>
                            Step: "<strong style={{color: "brown"}}>{p.promptu}</strong>" ...is
                            {/*//this is part of the onsubmit functionality*/}
                            {/*the code below is passing the quiz id OR p.id into our answer function*/}

                            <FormLabel className={''}>
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
                                    value="done"/>  Done:  |   comments:
                            </FormLabel>

                            <input onChange={onCommentsChange} type={'text'}/>
                                <button onClick = {() => Complete(p.id)} type={"button"}>Submit</button> <br />
                        </div>
                    </Card>
                })}
                <h2>Completed Steps</h2>
                {filteredStageList.filter(s =>s.done === true ).map((s)=>{
                    return <Card>
                        <div key = {s.id} style={{backgroundColor: 'linen', color: 'black'}}
                             className={'d-flex float-start w-100 p-2 m-1'}>


                            Step:  "{s.promptu}" is...
                            {s.done? "done" : "pending"}.
                            Comments: {s.comments}
                        </div>
                    </Card>
                })}

            </>
        )
    }

    return <>
        <div style={{backgroundColor: 'linen'}} className={'row'}>
            <Col>
                <Card className={'m-2 col p-2'}>
                    <CardHeader className={'h2 text-center'}>to "{toDo}" takes steps...</CardHeader>
                    <div className={'steps'}>

                        {
                            filteredStageList.map((stepData, idx) => {
                                return <div key={"steps" + idx} className={'filteredStageList'}>
                                    <Step stepData={stepData}/>
                                </div>
                            })
                        }
                    </div>
                </Card>
            </Col>
        </div>
    </>
}