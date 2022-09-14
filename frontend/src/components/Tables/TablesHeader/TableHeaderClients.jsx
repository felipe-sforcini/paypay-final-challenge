import {
    TableCell,
    TableHead,
} from "@mui/material";
import sort from "../../../assets/cards/sort.svg";
import usePay from "../../../hooks/usePay";

export default function RenderTableHeaderClients({ column, page }) {

    const styleHead = {
        fontSize: "1rem",
        fontFamiy: "Nunito",
        fontWeight: "700",
        color: "#3F3F55",
    };

    const {
        clients,
        setClients,
        payClients,
        setPayClients,
        defaulterClients,
        setDefaulterClients
    } = usePay();

    const handleOrderByName = () => {
        if (page === 'clients') {
            const currentClients = [...clients];
            const sortByName = currentClients.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setClients(sortByName);
        }

        if (page === 'clientsFilter') {
            const currentPay = [...payClients];
            const sortByNamePay = currentPay.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setPayClients(sortByNamePay);
            const currentDefaulter = [...defaulterClients];
            const sortByNameDefaulter = currentDefaulter.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setDefaulterClients(sortByNameDefaulter);
        }
    };

    return (
        <TableHead>
            <TableCell sx={styleHead}>
                <div className="client-head" onClick={() => handleOrderByName()}>
                    <img src={sort} alt="Ordenar" className="sort" />
                    {column}
                </div>
            </TableCell>
            <TableCell sx={styleHead}>CPF</TableCell>
            <TableCell sx={styleHead}>E-mail</TableCell>
            <TableCell sx={styleHead}>Telefone</TableCell>
            <TableCell sx={styleHead}>Status</TableCell>
            <TableCell sx={styleHead}>Criar Cobrança</TableCell>
            <TableCell></TableCell>
        </TableHead>
    );
};
