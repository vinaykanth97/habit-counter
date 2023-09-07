import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/CreateStore"


import { v4 as uuidv4 } from 'uuid';
import Popup from "./Popup";
import moment from "moment";


export default function CreateHabits() {

    let tsMoment = moment().add(1, 'M')
    let nonMoment = moment
    // Getting what we require from store
    const componentRequiredStates = useStore((state => {
        return {
            openHabitPopup: state.habitPopup,
            closeCreateHabit: state.openHabitPopup,
            createFormInput: state.createFormInput,
            closeCreateHabit: state.openHabitPopup,
            getHabitFormData: state?.createFormData,
            addHabits: state.AddHabitDatas,
            habitItems: state?.HabitDatas,
            currentDateTimeLocal: state.momentUtilities.currentDateTimeLocal,
            seconds: state.momentUtilities.seconds(tsMoment),
            numberOfDaysInbetween: state.momentUtilities.daysInbetween,
            inbetweenCount: state.momentUtilities.inbetweenInDays
        }
    }))
    const { openHabitPopup, closeCreateHabit, createFormInput, getHabitFormData, addHabits, habitItems, currentDateTimeLocal, seconds, numberOfDaysInbetween, inbetweenCount } = componentRequiredStates

    // Adding habits on submit
    const formRef = useRef(null)
    const AddHabitHandler = (e) => {
        e.preventDefault()
        getHabitFormData['id'] = uuidv4()
        numberOfDaysInbetween(nonMoment, getHabitFormData?.habitDate, getHabitFormData?.habitUntil)
        addHabits(getHabitFormData)
        closeCreateHabit('habitPopup')
        formRef.current.reset()
    }


    useEffect(() => {
        getHabitFormData['goal'] = inbetweenCount
        createFormInput("habitDate", currentDateTimeLocal(tsMoment))
        createFormInput("habitUntil", currentDateTimeLocal(tsMoment))
        localStorage.setItem('habitRecords', JSON.stringify(habitItems))
    }, [habitItems])

    const [countUp, setCountUp] = useState()

    useEffect(() => {
        setTimeout(() => {
            setCountUp(seconds)
        }, 1000);
    }, [countUp])

    return (
        <Popup openHabitPopup={openHabitPopup} closeCreateHabit={() => closeCreateHabit('habitPopup')}>
            <form onSubmit={AddHabitHandler} ref={formRef}>
                <div className="grouped-form">
                    <label htmlFor="habitTitle">Title of your Habit</label>
                    <input type="text" id="habitTitle" name="habitTitle" onChange={(e) => createFormInput(e.target.name, e.target.value)} required />
                </div>
                <div className="grouped-form">
                    <label htmlFor="habitDate">Habit Started/Start from</label>
                    <input type="datetime-local" name="habitDate" id="habitDate" max={currentDateTimeLocal(tsMoment)} onChange={(e) => createFormInput(e.target.name, e.target.value)} required defaultValue={currentDateTimeLocal(tsMoment)} />
                </div>
                <div className="grouped-form">
                    <label htmlFor="habitUntil">Habit Until</label>
                    <input type="datetime-local" name="habitUntil" id="habitUntil" min={currentDateTimeLocal(tsMoment)}
                        onChange={(e) => createFormInput(e.target.name, e.target.value)} defaultValue={currentDateTimeLocal(tsMoment)} />
                </div>
                <button className="secondary" type="submit">Add</button>
            </form>
        </Popup>
    )
}
