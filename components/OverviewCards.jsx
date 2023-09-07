import Link from "next/link"
import { useStore } from "../store/CreateStore"
import moment from "moment"

export default function OverviewCards() {
    const componentRequiredStates = useStore((state => {
        return {
            habitItems: state?.HabitDatas,
            numberOfDaysInbetween: state.momentUtilities.daysInbetween,
            inbetweenCount: state.momentUtilities.inbetweenInDays
        }
    }))
    let { habitItems } = componentRequiredStates

    return (
        <div className="overview_wrap">
            <div className="container">
                <h1>Overview</h1>
                <div className="overview">
                    {
                        habitItems?.map((card, i) => {
                            return (
                                <div className="overview_cards" suppressHydrationWarning={true} key={i}>
                                    <h5>{card.habitTitle}</h5>
                                    <h6>Started On: {moment(card.habitDate).format('DD-MM-yyyy')}</h6>
                                    <p>Goal: {card.goal} days</p>
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
