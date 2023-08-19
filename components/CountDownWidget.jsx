import moment from "moment/moment"
import { useEffect, useState } from "react"
import Popup from "./Popup"
import { useStore } from "../store/CreateStore"



export default function countUpWidget({ requiredData, endAt, startFrom, habitItems }) {

    const resetPopup = useStore((state) => state.resetPopup)
    const closeCreateHabit = useStore((state) => state.openHabitPopup)
    const OpenResetAction = useStore((state) => {
        return state.openHabitPopup
    })

    // Reset time when click
    function ResetFormPopup(e) {
        e.preventDefault()
    }

    // Number of days to go
    let start = moment(new Date())
    let end = moment(endAt)
    let numberOfDaystoGo = Math.abs(Math.floor(moment.duration(start.diff(end)).asDays()));
    let startingTime = new Date(startFrom).getTime()

    let [startingDate, setStartingDate] = useState()
    let [hms, setHms] = useState();
    const [countUp, setCountUp] = useState()

    // Start From Date
    useEffect(() => {
        setStartingDate(startingTime)
    }, [startingTime])

    // To update countUp Hours, Minutes and seconds
    useEffect(() => {
        let newDate = new Date().getTime();
        let finalDate = newDate - startingDate;
        let days = Math.floor(finalDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor((finalDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((finalDate % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((finalDate % (1000 * 60)) / 1000);

        hms = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            numberOfDaystoGo
        }
        setHms(hms)
    }, [startFrom, countUp])

    useEffect(() => {
        setTimeout(() => {
            setCountUp(hms)
        }, 1000);
    }, [countUp])
    return (
        <>
            <div className="countup-widget">
                <h4>{countUp?.seconds !== undefined && !isNaN(countUp?.seconds) && (`${countUp?.days} days ${countUp?.hours} Hours ${countUp?.minutes} min ${countUp?.seconds} sec`)}</h4>
                <div className="display-range">
                    <input type="range" readOnly defaultValue={0} />
                    <span>{countUp?.numberOfDaystoGo} days left from goal</span>
                </div>
                <button onClick={() => OpenResetAction('resetPopup')} className="secondary">Reset</button>

            </div>
            <Popup openHabitPopup={resetPopup} closeCreateHabit={() => closeCreateHabit('resetPopup')}>
                <form onSubmit={ResetFormPopup}>
                    <div className="grouped-form">
                        <label htmlFor="habitDate">Specified Date and time you have failed</label>
                        <input type="datetime-local" name="habitDate" id="habitDate" min={requiredData?.habitDate} max={moment(new Date()).format('YYYY-MM-DDThh:mm')} required />
                    </div>
                    <button className="secondary" type="submit">Apply</button>
                </form>
            </Popup>
        </>
    )
}
