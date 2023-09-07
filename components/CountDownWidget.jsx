import moment from "moment/moment"
import { useEffect, useRef, useState } from "react"
import Popup from "./Popup"
import { useStore } from "../store/CreateStore"



export default function countUpWidget({ requiredData, endAt, startFrom, habitItems, inbetweenDays }) {
    // Initializing Moment
    const momentFunc = moment()
    let tsMoment = moment
    const resetPopup = useStore((state) => state.resetPopup)
    const closeCreateHabit = useStore((state) => state.openHabitPopup)
    const ResetFormInput = useStore((state) => state.resetFormInput)
    const ResetFormData = useStore((state) => state.resetFormData)
    const numberOfDaysInbetween = useStore((state) => state.momentUtilities.daysInbetween)
    const addSuccess = useStore((state) => state.addSuccessHabit)
    const successHabit = useStore((state) => state.successHabit)
    // Number of days to go
    let start = moment(new Date())
    let end = moment(endAt)
    const momentLocalDateTime = useStore((state) => state.momentUtilities.currentDateTimeLocal)
    let currentLocalDateTime = momentLocalDateTime(moment().add(1, 'M'))


    let numberOfDaystoGo = Math.abs(Math.floor(moment.duration(start.diff(end)).asDays()));

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
        let updateReset = getHabitFormData?.map(datas => {
            if (datas?.id === requiredData?.id) {
                datas.habitDate = ResetFormData.resetDate
                numberOfDaysInbetween(moment, ResetFormData.resetDate, moment(ResetFormData.resetDate).add(requiredData?.goal, 'days'))
                // momentLocalDateTime(moment().add(inbetweenInDays, 'days'))
                datas.habitUntil = momentLocalDateTime(moment().add(datas.goal, 'days').add(1, 'M'))
                // moment(ResetFormData.resetDate).add(inbetweenInDays, 'days')

            }
            return datas
        })
        localStorage.setItem('habitRecords', JSON.stringify(updateReset))
    }



    let startingTime = new Date(startFrom).getTime()

    let [startingDate, setStartingDate] = useState()
    let [hms, setHms] = useState();
    const [countUp, setCountUp] = useState()

    // Start From Date
    useEffect(() => {
        setStartingDate(startingTime)
        ResetFormInput("resetDate", currentLocalDateTime)
    }, [startingTime])

    // To update countUp Hours, Minutes and seconds
    useEffect(() => {
        let newDate = new Date().getTime();
        let finalDate = newDate - startingDate;
        let days = Math.floor(finalDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor((finalDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((finalDate % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((finalDate % (1000 * 60)) / 1000);
        addSuccess(moment(requiredData?.habitUntil).isSame(moment(), 'day'))


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
                    <div className="counts">{countUp?.numberOfDaystoGo} days left from goal</div>
                    <span></span>
                </div>
                <p>success:{successHabit.toString()}</p>
                <button onClick={() => OpenResetAction('resetPopup')} className="secondary">Reset</button>

            </div>
            <Popup openHabitPopup={resetPopup} closeCreateHabit={() => closeCreateHabit('resetPopup')}>
                <form onSubmit={ResetFormPopup} ref={formRef}>
                    <div className="grouped-form">
                        <label htmlFor="resetDate">Specified Date and time you have failed</label>
                        <input type="datetime-local" name="resetDate" id="resetDate" min={requiredData?.habitDate} max={countUp?.currentLocalDateTime} defaultValue={countUp?.currentLocalDateTime} required onChange={(e) => ResetFormInput(e.target.name, e.target.value)} />

                    </div>
                    <button className="secondary" type="submit">Confirm</button>
                </form>
            </Popup>
        </>
    )
}
