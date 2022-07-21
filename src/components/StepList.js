import {useEffect} from "react";
import {getStageList} from "../store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {Card, Col} from "react-bootstrap";
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
                    return <div key={p.id} style={{marginBottom: '1rem'}}>
                        <div style={{margin: '1rem', display:'inline'}}>{p.promptu}</div>
                        {/*//this is part of the onsubmit functionality*/}
                        {/*<input onChange={onAnswerChange} type={'text'}/>*/}
                        <input type={'text'}/>
                        {/*the code below is passing the quiz id OR p.id into our answer function*/}
                        {/*<button onClick = {() => Answer(p.id)} type={"button"}>Submit</button> <br />*/}
                        <button type={"button"}>Submit</button> <br />
                    </div>
                })}
                <h2>Completed Steps</h2>
                {filteredStageList.filter(s =>s.done === true ).map((s)=>{
                    return <div key = {s.id}>
                        <Card style={{backgroundColor: '#E7DFC6', color: '#607744'}}
                              className={'d-flex float-start w-25 p-2 m-1'}
                              border={'secondary'}>

                            <span className={'text-decoration-underline'}> Step: </span> {s.promptu}
                            <span className={'text-decoration-underline'}> is Pending: </span> {s.pending}
                            {/*might have to change this - its reading as function*/}
                            <span className={'text-decoration-underline'}> is Done: </span>{s.done}
                            <span className={'text-decoration-underline'}> Comments: </span>{s.comments}
                            {/*<span>{quizData.applicant}</span>*/}
                            <span> {s.done? "done" : "pending"}</span>
                        </Card>

                    </div>
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