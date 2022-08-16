import axios from 'axios';
import {useState, createContext, useEffect} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user:{},
        token:"",
    });

    useEffect(() => {
        setState(JSON.parse(localStorage.getItem('user')))
    }, []);

    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return(
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}