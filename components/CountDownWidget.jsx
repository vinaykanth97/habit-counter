import moment from "moment/moment"
import { useEffect, useRef, useState } from "react"
import Popup from "./Popup"
import { useStore } from "../store/CreateStore"



export default function countUpWidget({ requiredData, endAt, startFrom, habitItems, inbetweenDays }) {
    // Initializing Moment
    const momentFunc = moment()

    const resetPopup = useStore((state) => state.resetPopup)
    const closeCreateHabit = useStore((state) => state.openHabitPopup)
    const ResetFormInput = useStore((state) => state.resetFormInput)
    const ResetFormData = useStore((state) => state.resetFormData)
    const momentLocalDateTime = useStore((state) => state.momentUtilities.currentDateTimeLocal)

    const OpenResetAction = useStore((state) => {
        return state.openHabitPopup
    })

    const getHabitFormData = useStore((state) => state.HabitDatas)
    // Reset time when click
    const formRef = useRef(null)
    function ResetFormPopup(e) {
        e.preventDefault()
        closeCreateHabit('resetPopup')
        
        setStartingDate(new Date(ResetFormData.resetDate))
        formRef.current.reset()
        // let updatedFormData = getHabitFormData?.map(datas => {
        //     console.log(datas)
        //     if (datas?.id === requiredData?.id) {
        //         datas.habitDate = ResetFormData.resetDate
        //     }
        //     return datas
        // })
        // console.log(getHabitFormData)
    }

    // Number of days to go
    let start = moment(new Date())
    let end = moment(endAt)
    let numberOfDaystoGo = Math.abs(Math.floor(moment.duration(start.diff(end)).asDays()));
    let startingTime = new Date(startFrom).getTime()

    let [startingDate, setStartingDate] = useState()
    let [hms, setHms] = useState();
    const [countUp, setCountUp] = useState()
    let currentLocalDateTime = momentLocalDateTime(moment())
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
            currentLocalDateTime,
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
                <form onSubmit={ResetFormPopup} ref={formRef}>
                    <div className="grouped-form">
                        <label htmlFor="resetDate">Specified Date and time you have failed</label>
                        <input type="datetime-local" name="resetDate" id="resetDate" min={requiredData?.habitDate} max={countUp?.currentLocalDateTime} required onChange={(e) => ResetFormInput(e.target.name, e.target.value)} />

                    </div>
                    <button className="secondary" type="submit">Confirm</button>
                </form>
            </Popup>
        </>
    )
}
