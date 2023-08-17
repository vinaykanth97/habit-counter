import Link from "next/link"
import { useStore } from "../store/CreateStore"

export default function OverviewCards() {
    const habitItems = useStore((state) => state.HabitDatas)
    return (
        <div className="overview_wrap">
            <div className="container">
                <h1>Overview</h1>
                <div className="overview">
                    {
                        habitItems?.map((card, i) => {
                            return (
                                <div className="overview_cards" suppressHydrationWarning={true}>
                                    <h5>{card.habitTitle}</h5>
                                    <h6>Started On: {card.habitDate}</h6>
                                    <p>Goal: {card.habitGoal} days</p>
                                    <Link href={`/habitdetail/${card.id}`}>Check your Stats</Link>
                                </div>
                            )
                        })
                    }
                </div>
                {habitItems?.length <= 0 && (
                    <p className="empty-card">You have not created anything yet</p>
                )}
            </div>
        </div>
    )
}
