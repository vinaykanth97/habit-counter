import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'

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

    HabitDatas: typeof window !== 'undefined' ? localStorage.getItem('habitRecords') !== null ? JSON.parse(localStorage.getItem('habitRecords')) : [] : '',
    AddHabitDatas: (datas) => {
        return set((state) => {
            return ({
                HabitDatas: [...state?.HabitDatas, datas]
            })
        })
    }
}))
export const useHabitStore = createWithEqualityFn(
    (set) => ({
        updateHabitTitle: (habitTitle) => set((state) => ({ formData: { ...state?.formData, habitTitle: habitTitle } })),
        updateHabitDate: (habitDate) => set((state) => ({ formData: { ...state?.formData, habitDate: habitDate } })),
        updateHabitGoal: (habitGoal) => set((state) => ({ formData: { ...state?.formData, habitGoal: habitGoal } })),

    }),
    Object.is
)