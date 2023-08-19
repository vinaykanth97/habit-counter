export default function Popup({ children, openHabitPopup, closeCreateHabit }) {

    return (
        <>
            {openHabitPopup && (
                <div className='popup-modal'>
                    <div className={`createhabits ${!openHabitPopup ? 'd-none' : ''}`}>
                        <div className="close" onClick={closeCreateHabit}>&#10006;</div>
                        {children}
                    </div>
                    <div className={`overlay ${!openHabitPopup ? 'd-none' : ''}`} onClick={closeCreateHabit}></div>
                </div>
            )}
        </>

    )
}
