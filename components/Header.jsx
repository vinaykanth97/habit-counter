import Link from "next/link"
import { useStore } from "../store/CreateStore"
import CreateHabits from "./CreateHabits"


export default function Header() {
    const createBtnAction = useStore((state) => state.openHabitPopup)
    return (
        <>
            <header>
                <div className="container header-wrap">
                    <h1><Link href='/'>Habit Tracker</Link></h1>
                    <button className="primary" onClick={createBtnAction}>Create</button>
                </div>
            </header>
            <CreateHabits />
        </>
    )
}
