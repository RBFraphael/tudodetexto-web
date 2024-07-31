'use client';

import { IUser } from "@/interfaces/IUser";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IUserContextProps {
    user: IUser|null;
    setUser: Dispatch<SetStateAction<any>>;
}

const UserContext = createContext<IUserContextProps>({
    user: null,
    setUser: () => {}
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export {
    UserContext,
    UserContextProvider
};
