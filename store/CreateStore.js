import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'

export const useStore = create((set) => ({
    habitPopup: false,
    openHabitPopup: () => {
        return set((state) => {
            return ({
                habitPopup: !state.habitPopup
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