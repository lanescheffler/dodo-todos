import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getStageList} from "../store/reduxFunctions";
import {Card, FormLabel} from "react-bootstrap";

export function Step({stepData}) {
    const dispatch = useDispatch();
    const stageList = useSelector(state => state.stageList)

    useEffect(() => {
        dispatch(getStageList())
    }, [])

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

                | comments: [{stepData.comments}]

            </span>

            <span> {stepData.pending}</span>
            <span> {stepData.done}</span>


            <div>
            </div>
        </Card>

    </>

}