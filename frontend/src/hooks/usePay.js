import { useContext } from "react";
import PayContext from "../context/payContext";

function usePay() {
    return useContext(PayContext)
}

export default usePay;