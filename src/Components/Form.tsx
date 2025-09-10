import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../db/Categories"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducers"
import type { Activity } from "../types"

type formProps = {
    dispacht: React.ActionDispatch<[actions: ActivityActions]>,
    state: ActivityState
}

const initialState = {
    id: uuidv4(),
    category: 1,
    name: '',
    cash: 0
}

export const Form = ({ dispacht, state }: formProps) => {


    const [activity, setActivity] = useState<Activity>(initialState)
    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'cash'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value

        })
    }

    const isValidActivity = () => {
        const { name, cash } = activity
        return name.trim() !== '' && cash > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispacht({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className=" space-y-5 bg-white shadow p-10 rounded-lg">
            <div className=" grid grid-col-1 gap-3">
                <label htmlFor="category" className=" font-bold">Category</label>
                <select
                    value={activity.category}
                    onChange={handleChange}
                    className=" border border-slate-300 p-2 rounded-lg w-full" name="" id="category">
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className=" grid grid-col-1 gap-3">
                <label htmlFor="name" className=" font-bold">Activity</label>
                <input
                    onChange={handleChange} value={activity.name}
                    type="text" name="" id="name" className=" border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej, Suscripciones, Servicios"
                />
            </div>

            <div className=" grid grid-col-1 gap-3">
                <label htmlFor="cash" className=" font-bold">Cash</label>
                <input onChange={handleChange} value={activity.cash} type="number" name="" id="cash" className=" border border-slate-300 p-2 rounded-lg "
                    placeholder="Calorias Ej, 300"
                />
            </div>

            <input
                type="submit" className=" bg-blue-800 hover:bg-blue-900 w-full p-2 font-bold uppercase text-white disabled:opacity-10"
                value={activity.category === 1 ? 'Save Expense' : 'Save Saving'} disabled={!isValidActivity()}
            />
        </form>
    )
}
