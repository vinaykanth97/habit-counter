import { useEffect, useRef } from "react";
import { useStore, useHabitStore } from "../store/CreateStore"
import { shallow } from "zustand/shallow";
import { v4 as uuidv4 } from 'uuid';
import Popup from "./Popup";

export default function CreateHabits() {
    const openHabitPopup = useStore((state) => state.habitPopup)
    const closeCreateHabit = useStore((state) => state.openHabitPopup)

    const [updateHabitTitle, updateHabitDate, updateHabitGoal] = useHabitStore(
        (state) => [state.updateHabitTitle, state.updateHabitDate, state.updateHabitGoal], shallow
    )
    const getHabitFormData = useHabitStore()?.formData
    const addHabits = useStore((state) => state.AddHabitDatas)
    const habitItems = useStore((state) => state.HabitDatas)
    const formRef = useRef(null)
    const AddHabitHandler = (e) => {
        e.preventDefault()
        getHabitFormData['id'] = uuidv4()
        addHabits(getHabitFormData)
        closeCreateHabit()
        formRef.current.reset()
    }
    useEffect(() => {
        localStorage.setItem('habitRecords', JSON.stringify(habitItems))
    }, [habitItems])
    return (
        <Popup openHabitPopup={openHabitPopup} closeCreateHabit={() => closeCreateHabit('habitPopup')}>
            <form onSubmit={AddHabitHandler} ref={formRef}>
                <div className="grouped-form">
                    <label htmlFor="habitTitle">Title of your Habit</label>
                    <input type="text" id="habitTitle" name="habitTitle" onChange={(e) => updateHabitTitle(e.currentTarget.value)} required />
                </div>
                <div className="grouped-form">
                    <label htmlFor="habitDate">Habit Started/Start from</label>
                    <input type="datetime-local" name="habitDate" id="habitDate" onChange={(e) => updateHabitDate(e.currentTarget.value)} required />
                </div>
                <div className="grouped-form">
                    <label htmlFor="habitGoal">Goal</label>
                    <input type="number" name="habitGoal" id="habitGoal" onChange={(e) => updateHabitGoal(e.currentTarget.value)} required />
                </div>
                <button className="secondary" type="submit">Add</button>
            </form>
        </Popup>
    )
}
