import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useMemo } from 'react'
import { categories } from '../db/Categories'
import { formatCurrency } from '../helpers'
import type { ActivityActions } from "../reducers/activity-reducers"
import type { Activity } from '../types'
type ActivityListProps = {
    activities: Activity[]
    dispacht: React.ActionDispatch<[actions: ActivityActions]>
}

export const ActivityList = ({ activities, dispacht }: ActivityListProps) => {

    const categortName = useMemo(() => (category: Activity["category"]) => categories.map(cat => cat.id === category ? cat.name : ""), [activities])

    return (
        <>
            <h2 className=' text-4xl font-bold text-slate-600 text-center'>Savings and Expences</h2>

            {activities.map(activity => (
                <div key={activity.id} className=" px-5 py-10 bg-white mt-5 flex justify-between shadow">
                    <div className=" space-y-2 relative">
                        <p className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                             ${activity.category === 1 ? 'bg-red-500' : 'bg-blue-500'}`}> {categortName(+activity.category)}</p>
                        <p className=" text-2xl font-bold pt-5">{activity.name}</p>
                        <p className=" font-black text-4xl text-blue-500">{formatCurrency(activity.cash)}
                            <span> USD</span>
                        </p>
                    </div>
                    <div className=" flex items-center gap-5">
                        <button><PencilSquareIcon
                            onClick={() => dispacht({ type: 'set-activiteId', payload: { id: activity.id } })}
                            className="h-8 w-8 text-blue-600 cursor-pointer hover:rotate-10 transition-all" /></button>

                        <button><XCircleIcon
                            onClick={() => dispacht({ type: 'remove-item', payload: { id: activity.id } })}
                            className="h-8 w-8 text-red-600 cursor-pointer hover:rotate-10 transition-al" /></button>
                    </div>
                </div>
            ))}

        </>
    )
}
