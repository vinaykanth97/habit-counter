import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/CreateStore"


import { v4 as uuidv4 } from 'uuid';
import Popup from "./Popup";
import moment from "moment";


export default function CreateHabits() {

    let tsMoment = moment().add(1, 'M')
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
            currentDateTimeLocal: state.momentUtilities.currentDateTimeLocal(tsMoment),
            seconds: state.momentUtilities.seconds(tsMoment)
        }
    }))
    const { openHabitPopup, closeCreateHabit, createFormInput, getHabitFormData, addHabits, habitItems, currentDateTimeLocal, seconds } = componentRequiredStates
    // console.log(seconds)
    // Adding habits on submit
    const formRef = useRef(null)
    const AddHabitHandler = (e) => {
        e.preventDefault()
        getHabitFormData['id'] = uuidv4()
        addHabits(getHabitFormData)
        console.log(getHabitFormData)
        closeCreateHabit('habitPopup')
        formRef.current.reset()
    }
    useEffect(() => {
        localStorage.setItem('habitRecords', JSON.stringify(habitItems))
        createFormInput("habitDate", currentDateTimeLocal)
        createFormInput("habitUntil", currentDateTimeLocal)
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
                    <input type="datetime-local" name="habitDate" id="habitDate" max={currentDateTimeLocal} onChange={(e) => createFormInput(e.target.name, e.target.value)} required defaultValue={currentDateTimeLocal} />

                </div>
                <div className="grouped-form">
                    <label htmlFor="habitUntil">Habit Until</label>
                    <input type="datetime-local" name="habitUntil" id="habitUntil" min={currentDateTimeLocal}
                        onChange={(e) => createFormInput(e.target.name, e.target.value)} defaultValue={currentDateTimeLocal} />
                </div>
                <button className="secondary" type="submit">Add</button>
            </form>
        </Popup>
    )
}
