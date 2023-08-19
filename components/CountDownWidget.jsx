
import { useEffect, useState } from "react"



export default function CountDownWidget({ requiredData, endAt, startFrom, habitItems }) {

    // How much days left
    let currentDate = new Date()
    let endDateToCurrent = new Date(endAt)
    const inBetweendates = []

    function getInbetweenDates(start, end, selectArr) {
        for (let i = start; start <= end; i++) {
            selectArr.push(new Date(start));
            start.setDate(start.getDate() + 1);
        }
    }

    getInbetweenDates(currentDate, endDateToCurrent, inBetweendates)
    let startingTime = new Date(startFrom).getTime()

    const RestHandler = () => {
        startingTime = new Date().getTime()
        setStartingDate(startingTime)
        const dataToStore = Array.from(habitItems).filter(data => {
            if (requiredData.id === data.id) {
                const selectedDatetime = new Date();
                const dateTimeLocalValue = `${selectedDatetime.getFullYear()}-${String(selectedDatetime.getMonth() + 1).padStart(2, "0")
                    }-${String(selectedDatetime.getDate()).padStart(2, "0")}T${String(selectedDatetime.getHours()).padStart(2, "0")
                    }:${String(selectedDatetime.getMinutes()).padStart(2, "0")}`;
                data.habitDate = dateTimeLocalValue
            }
            return data
        })

        localStorage.setItem('habitRecords', JSON.stringify(dataToStore))
    }

    let [startingDate, setStartingDate] = useState()
    let [hms, setHms] = useState();
    const [countDown, setCountDown] = useState()
    useEffect(() => {
        setStartingDate(startingTime)
    }, [startingTime])
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
            inBetweendates
        }
        setHms(hms)
    }, [startFrom, countDown])

    useEffect(() => {
        setTimeout(() => {
            setCountDown(hms)
            // console.log(hms)
        }, 1000);
    }, [countDown])
    return (
        <div className="countdown-widget">
            <h4>{countDown?.seconds !== undefined && !isNaN(countDown?.seconds) && (`${countDown?.days} days ${countDown?.hours} Hours ${countDown?.minutes} min ${countDown?.seconds} sec`)}</h4>
            <div className="display-range">
                <input type="range" readOnly defaultValue={0} />
                <span>{countDown?.inBetweendates.length} days left from goal</span>
            </div>
            <button onClick={RestHandler} className="secondary">Reset</button>
        </div>

    )
}
