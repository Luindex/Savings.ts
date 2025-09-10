import { formatCurrency } from "../helpers"

type SavingsDisplayProps = {
    cash: number,
    text: string
}


export const SavingsDisplay = ({ cash, text }: SavingsDisplayProps) => {
    return (
        <p className=' text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'><span className=' font-black text-6xl text-orange'>{formatCurrency(cash)}<span className=" text-xs"> usd</span></span>{text}</p>
    )
}
