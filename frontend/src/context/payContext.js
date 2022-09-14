import { createContext } from 'react'
import useProvider from "../hooks/useProvider";

const PayContext = createContext()

export function PayProvider(props) {
    const payProvider = useProvider()
    return (
        <PayContext.Provider value={payProvider}>{props.children}</PayContext.Provider>
    )
}

export default PayContext;