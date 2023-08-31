import {createContext, useState} from "react"

const UserContext = createContext()

export default UserContext


export const UserContextProvider = ({children}) => {
    
    //* pass all values that you want ot share
    const [user, setUser] = useState()

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}