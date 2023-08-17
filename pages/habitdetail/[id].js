

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CountDownWidget from '../../components/CountDownWidget';
import { useStore } from '../../store/CreateStore';
import { useRouter } from 'next/router'

export default function Page() {
    const router = useRouter()
    const habitItems = useStore((state) => state.HabitDatas)
    const requiredData = Array.from(habitItems).filter(data => data.id === router.query.id)


    let dateMethod = requiredData[0]?.habitDate !== undefined ? requiredData[0]?.habitDate : false
    let goal = requiredData[0]?.habitGoal !== undefined ? requiredData[0]?.habitGoal : false

    let endCalc = new Date(new Date(dateMethod).getTime() + (goal * 24 * 60 * 60 * 1000))
    let endDate = endCalc.getDate()
    let endDateMonth = endCalc.getMonth()
    let endDateYear = endCalc.getFullYear()
    let getEndhour = new Date(dateMethod).getHours(),
        getEndminute = new Date(dateMethod).getMinutes(),
        getEndseconds = new Date(dateMethod).getSeconds()
    let startFrom = new Date(dateMethod)
    let endAt = new Date(endDateYear, endDateMonth, endDate, getEndhour, getEndminute, getEndseconds)

    return (
        <div className='container'>
            <CountDownWidget requiredData={requiredData[0]} />
            <Calendar
                // onChange={onChange}
                value={[startFrom, endAt > new Date() ? new Date() : endAt]}

            />
        </div>
    )
}