import { useState } from "react";
import api from "../services/api";

function useProvider() {
    const [errorMessage, setErrorMessage] = useState('');
    const [clients, setClients] = useState([])
    const [userName, setUserName] = useState({ userName: '', firstsLetter: '' })
    const [detailsClient, setDetailsClient] = useState()
    const [charges, setCharges] = useState()
    const [chargesHome, setChargesHome] = useState([])
    const [payCharges, setPayCharges] = useState([])
    const [pendingCharges, setPendingCharges] = useState([])
    const [overdueCharges, setOverdueCharges] = useState([])
    const [clientsHome, setClientsHome] = useState([])
    const [openModalDetailCharge, setOpenModalDetailCharge] = useState(false);
    const [detailChargeId, setDetailChargeId] = useState(0)
    const [defaulterClients, setDefaulterClients] = useState([])
    const [payClients, setPayClients] = useState([])
    const [notFoundFilter, setNotFoundFilter] = useState(false)

    const getClientsApi = async (params) => {
        if (!params) {
            try {
                const response = await api.get('/clientes');
                setClients(response.data)
            } catch (error) {
                throw error
            }

        } else {
            try {
                const response = await api.get(`/clientes?search=${params}`);
                setClients(response.data)
                response.data.length === 0 ? setNotFoundFilter(true) : setNotFoundFilter(false)
            } catch (error) {
                throw error
            }
        }
    }

    const getUserName = (name) => {
        const nameFirstUpperCase = name[0].toUpperCase() + name.substring(1);

        const nameArray = name.split(' ').slice(0, 3);
        const initials = nameArray.slice(0, 2)

        let firstLetter = ''
        initials.forEach(item =>
            firstLetter = firstLetter + item[0].toUpperCase())

        setUserName({
            userName: nameFirstUpperCase,
            firstsLetter: firstLetter
        })
    }
    const handleGetClient = async (id) => {
        try {
            const response = await api.get(`/cobrancas/clientes/${id}`);
            setDetailsClient(response.data);
        } catch (error) {
            throw error;
        }
    };

    const getCharges = async (params) => {
        if (!params) {
            try {
                const response = await api.get(`/cobrancas`);
                setCharges(response.data);
            } catch (error) {
                throw error;
            }
        } else {
            try {
                const response = await api.get(`/cobrancas?search=${params}`);
                setCharges(response.data);
                response.data.length === 0 ? setNotFoundFilter(true) : setNotFoundFilter(false)
            } catch (error) {
                throw error;
            }
        }
    };

    const getResumeCharges = async (params, id) => {
        if (!params || !id) {
            try {
                const response = await api.get('/resumo/cobrancas')
                setOverdueCharges(response.data.listaCobrancasVencidas)
                setPayCharges(response.data.listaCobrancasPagas)
                setPendingCharges(response.data.listaCobrancasPendentes)
                setChargesHome(response.data)
                return setNotFoundFilter(false)
            } catch (error) {
                throw error;
            }
        } else {
            try {
                const response = await api.get(`/resumo/cobrancas?search=${params}`)
                setPayCharges(response.data.listaCobrancasPagas)
                setChargesHome(response.data)
                setPendingCharges(response.data.listaCobrancasPendentes)
                setOverdueCharges(response.data.listaCobrancasVencidas)
                if (id === 'Cobranças Pagas') {
                    return !response.data.listaCobrancasPagas.length ?
                        setNotFoundFilter(true) :
                        setNotFoundFilter(false)
                }
                if (id === 'Cobranças Pendentes') {
                    return !response.data.listaCobrancasPendentes.length ?
                        setNotFoundFilter(true) :
                        setNotFoundFilter(false)
                }

                if (id === 'Cobranças Vencidas') {
                    return !response.data.listaCobrancasVencidas.length ?
                        setNotFoundFilter(true) :
                        setNotFoundFilter(false)
                }
                return setNotFoundFilter(false)
            } catch (error) {
                throw error;
            }
        }
    }

    const getClientsResume = async (params, id) => {
        if (!params || !id) {
            try {
                const response = await api.get('/resumo/clientes')
                setDefaulterClients(response.data.listaClientesInadimplentes)
                setPayClients(response.data.listaClientesEmDia)
                setClientsHome(response.data)
                return setNotFoundFilter(false)
            } catch (error) {
                throw error;
            }
        } else {
            try {
                const response = await api.get(`/resumo/clientes?search=${params}`)
                setDefaulterClients(response.data.listaClientesInadimplentes)
                setPayClients(response.data.listaClientesEmDia)
                setClientsHome(response.data)
                if (id === 'Clientes Inadimplentes') {
                    return !response.data.listaClientesInadimplentes.length ?
                        setNotFoundFilter(true) :
                        setNotFoundFilter(false)
                }
                if (id === 'Clientes em dia') {
                    return !response.data.listaClientesEmDia.length ?
                        setNotFoundFilter(true) :
                        setNotFoundFilter(false)
                }
                return setNotFoundFilter(false)
            } catch (error) {
                throw error;
            }
        }
    }

    return {
        errorMessage,
        setErrorMessage,
        clients,
        setClients,
        getClientsApi,
        userName,
        setUserName,
        getUserName,
        detailsClient,
        setDetailsClient,
        charges,
        setCharges,
        handleGetClient,
        chargesHome,
        setChargesHome,
        clientsHome,
        setClientsHome,
        openModalDetailCharge,
        setOpenModalDetailCharge,
        detailChargeId,
        setDetailChargeId,
        getCharges,
        defaulterClients,
        setDefaulterClients,
        payClients,
        setPayClients,
        notFoundFilter,
        setNotFoundFilter,
        getResumeCharges,
        payCharges,
        setPayCharges,
        pendingCharges,
        setPendingCharges,
        overdueCharges,
        setOverdueCharges,
        getClientsResume
    }
}
export default useProvider;