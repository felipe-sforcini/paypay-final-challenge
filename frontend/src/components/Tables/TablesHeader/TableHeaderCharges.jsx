import {
    TableCell,
    TableHead,
} from "@mui/material";
import sort from "../../../assets/cards/sort.svg";
import usePay from "../../../hooks/usePay";

export default function RenderTableHeaderCharges({ page, column }) {

    const {
        charges,
        setCharges,
        payCharges,
        setPayCharges,
        pendingCharges,
        setPendingCharges,
        overdueCharges,
        setOverdueCharges
    } = usePay();

    const styleHead = {
        fontSize: "1rem",
        fontFamiy: "Nunito",
        fontWeight: "700",
        color: "#3F3F55",
    };

    const handleOrderByName = () => {
        if (page === 'charges') {
            const currentCharges = [...charges];
            const sortByName = currentCharges.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setCharges(sortByName);
        }

        if (page === 'chargesFilter') {
            const currentPay = [...payCharges];
            const sortByNamePay = currentPay.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setPayCharges(sortByNamePay);

            const currentPending = [...pendingCharges];
            const sortByNamePending = currentPending.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setPendingCharges(sortByNamePending);

            const currentOverdue = [...overdueCharges];
            const sortByNameOverdue = currentOverdue.sort((a, b) => {
                return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
            });
            setOverdueCharges(sortByNameOverdue);
        }

    };


    const handleOrderById = () => {
        if (page === 'charges') {
            const currentCharges = [...charges];
            const sortById = currentCharges.sort((a, b) => {
                if (a.id + b.id) {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
            setCharges(sortById);
        }

        if (page === 'chargesFilter') {
            const currentPay = [...payCharges];
            const sortByIdPay = currentPay.sort((a, b) => {
                if (a.id + b.id) {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
            setPayCharges(sortByIdPay);

            const currentPending = [...pendingCharges];
            const sortByIdPending = currentPending.sort((a, b) => {
                if (a.id + b.id) {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
            setPendingCharges(sortByIdPending);

            const currentOverdue = [...overdueCharges];
            const sortByIdOverdue = currentOverdue.sort((a, b) => {
                if (a.id + b.id) {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
            setOverdueCharges(sortByIdOverdue);
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
            <TableCell sx={styleHead}>
                {" "}
                <div className="client-head" onClick={() => handleOrderById()}>
                    <img src={sort} alt="Ordenar" className="sort" />
                    ID Cob.
                </div>
            </TableCell>
            <TableCell sx={styleHead}>Valor</TableCell>
            <TableCell sx={styleHead}>Data de venc.</TableCell>
            <TableCell sx={styleHead}>Status</TableCell>
            <TableCell sx={styleHead}>Descrição</TableCell>
            <TableCell></TableCell>
        </TableHead>
    );
};