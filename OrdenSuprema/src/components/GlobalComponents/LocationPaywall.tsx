import { useState } from "react";
import { User } from "../../types";
import { Location } from "../../types";

interface LocationPaywallProps {
    users: User[];
    onSelectLocation: (location: Location) => void;
}


export const LocationPaywall = ({ users, onSelectLocation }: LocationPaywallProps) => {
    const [isPayed, setisPayed] = useState<boolean|null>(null);
    const [selectedUser, setSelectedUser] = useState<User|null>(null);

    const handleClick1 = (user:User) => {
        setisPayed(false)
        setSelectedUser(user)
    }
    const handleClick2 = () => {
        setisPayed(true)
        selectedUser !== null &&
        onSelectLocation(selectedUser.location)
    }

    return (
    <div>
        <p className="text-lg">Elige al asesino que quieras ubicar:</p>

        <div className="flex gap-2">
            {users.map((user) => (
            <button
                key={`map_btn${user.name}`}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                //onClick={() => onSelectLocation(user.location)}
                onClick={() => handleClick1(user)}
            >
            {user.name}
        </button>
        ))}
        {
            isPayed !== null && !isPayed &&
            <>
            <p>Tenes que pagarme como 1000</p>
            <button onClick={handleClick2}>
                pagar
            </button>
            </>
        }
        </div>
    </div>
  )
}
