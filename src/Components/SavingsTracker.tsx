import { useMemo } from "react"
import type { Activity } from "../types"
import { SavingsDisplay } from "./SavingsDisplay"

type SavingsTrackerProps = {
    activities: Activity[]
}

export const SavingsTracker = ({ activities }: SavingsTrackerProps) => {

    const bills = useMemo(() => activities.reduce((total, item) => item.category === 1 ? total + item.cash : total, 0), [activities])
    const savings = useMemo(() => activities.reduce((total, item) => item.category === 2 ? total + item.cash : total, 0), [activities])
    const summary = useMemo(() => savings - bills, [activities])

    return (
        <>
            <h2 className=' text-4xl font-black text-center text-white'>Summary</h2>
            <div className=' flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
                <SavingsDisplay
                    cash={bills}
                    text="Expences"
                />
                <SavingsDisplay
                    cash={summary}
                    text="Outcome"
                />
                <SavingsDisplay
                    cash={savings}
                    text="Savigns"
                />
            </div>
        </>
    )
}
