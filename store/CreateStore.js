import { create } from 'zustand'


export const useStore = create((set) => ({
    habitPopup: false,
    resetPopup: false,
    openHabitPopup: (whichState) => {
        return set((state) => {
            return ({
                [whichState]: !state[whichState]
            })
        })
    },

    createFormData: {},
    createFormInput: (name, value) => {
        return set((state) => {
            return ({
                createFormData: {
                    ...state.createFormData,
                    [name]: value
                }
            })
        })
    },


    resetFormData: {},
    resetFormInput: (name, value) => {
        return set((state) => {
            return ({
                resetFormData: {
                    ...state.resetFormData,
                    [name]: value
                }
            })
        })
    },

    HabitDatas: typeof window !== 'undefined' ? localStorage.getItem('habitRecords') !== null ? JSON?.parse(localStorage.getItem('habitRecords')) : [] : '',
    AddHabitDatas: (datas) => {
        return set((state) => {
            return ({
                HabitDatas: [...state?.HabitDatas, datas]
            })
        })
    },

    momentUtilities: {
        currentDateTimeLocal: (prefixer) => prefixer.format(`${prefixer.year()}-${prefixer.month() < 10 ? `0${prefixer.month()}` : ''}-${prefixer.date()}T${prefixer.hour()}:${prefixer.minute() < 10 ? `0${prefixer.minute()}` : prefixer.minute()}`),
        seconds: (prefixer) => prefixer.seconds(),
    }

}))