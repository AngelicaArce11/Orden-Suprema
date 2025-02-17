import { useState } from "react";

interface PayProps {
  message: string;
  payValue?: number;
  onSuccess?: (success: boolean) => void;
}

export const Pay = ({ message, payValue = 50, onSuccess }: PayProps) => {
  const [success, setSuccess] = useState<boolean|null>(null);

  const handleClick = (target) => {
    //If user can afford to be included
    if (payValue > 0){
        setSuccess(true);
        onSuccess && onSuccess(true)
        //Make the transaction on the user money
        return
    }
    target.className = "inline-block rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold !text-white outline-none ring-indigo-300 transition duration-100  md:text-base"
    setSuccess(false);
    onSuccess && onSuccess(false);
  };

  return (
    <div className="py-6 sm:py-8 lg:py-12">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-800 p-4 md:flex-row md:p-8">
        <div>
            <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">{message}</h2>
            {success === false &&
            <>
              <p className="text-white inline">No tienes suficientes monedas. </p>
              <a href="#" className="inline">Recargar más</a>
              </>
            }
        </div>

    <button onClick={e => handleClick(e.target)}
    className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold !text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
        Pagar ${payValue} ahora
    </button>
    </div>
    </div>
    </div>
  )
}
