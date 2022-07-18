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
        }, 5000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const stageEditing = useSelector(state => state.stageEditing)

    const toDo = useSelector(state => state.toDo[0].title)
    const stageList = useSelector(state =>state.stageList)
    const filteredStageList = stageList.filter(steps => steps.processId === toDo)

    const stepOption = useSelector(state => state.selectedStage[0].id)
    const selectedStep = filteredStageList.filter(step => step.id === stepOption)


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