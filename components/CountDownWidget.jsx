import { useEffect, useState } from "react"


export default function CountDownWidget({ requiredData }) {
    let hours = new Date().getHours(requiredData?.habitDate)
    // console.log(new Date().getTime(requiredData?.habitDate))
    const [daystoGo, setdaystoGo] = useState({
        days: new Date().getDay(requiredData?.habitDate),
        hours: new Date().getHours(requiredData?.habitDate),
        minutes: new Date().getMinutes(requiredData?.habitDate),
        seconds: new Date().getSeconds(requiredData?.habitDate)
    })

    useEffect(() => {

        setdaystoGo(daystoGo)
        // console.log(daystoGo?.days)
    }, [daystoGo])
    return (
        // <div className="countdown-widget">
        //     <h2>0</h2>
        //     <h4> {daystoGo.days} days {daystoGo.hours} hours {daystoGo.minutes}mins {daystoGo.seconds}secs</h4>
        //     <div className="display-range">
        //         <input type="range" readOnly defaultValue={0} />
        //         <span>{requiredData?.habitGoal} days left from goal</span>
        //     </div>
        // </div>
        <></>
    )
}
