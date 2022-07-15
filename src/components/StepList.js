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

    const toDo = useSelector(state => state.toDo[0].title)
    const stageList = useSelector(state =>state.stageList)

    const filteredStageList = stageList.filter(step => step.processId === toDo)


    return <>

        <div className={'row'}>
            <Col>
                <Card className={'m-2 col p-2'}>
                    <CardHeader className={'h2 text-center'}>STEPS</CardHeader>
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