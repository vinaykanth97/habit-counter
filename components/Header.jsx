import Link from "next/link"
import { useStore } from "../store/CreateStore"
import CreateHabits from "./CreateHabits"


export default function Header() {
    const habitPopup = useStore((state) => state.habitPopup)
    const createBtnAction = useStore((state) => {
        return state.openHabitPopup
    })
    return (
        <>
            <header>
                <div className="container header-wrap">
                    <h1><Link href='/'>Habit Tracker</Link></h1>
                    <button className="primary" onClick={() => createBtnAction('habitPopup')}>Create</button>
                </div>
            </header>
            <CreateHabits />
        </>
    )
}
