
import dynamic from "next/dynamic"
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
    let endAt = new Date(new Date(dateMethod).getTime() + (goal * 24 * 60 * 60 * 1000))
    let startFrom = new Date(dateMethod)

    return (
        <div className='container'>
            <div className="wrap-details">
                <CountDownWidget requiredData={requiredData[0]} endAt={endAt} startFrom={startFrom} habitItems={habitItems} />
                <Calendar
                    value={[startFrom, endAt > new Date() ? new Date() : endAt]}
                />
            </div>
        </div>
    )
}