import { TableCell, TableRow } from "@mui/material";
import usePay from "../../../hooks/usePay";
import { formatReal, formatDate } from "../../../utils/dataFormat";
import DeleteCharge from "../../../components/ModalDeleteCharges";
import ChargeDetail from "../../ChargeDetail";
import ModalEditCharge from "../../ModalEditCharge";

export default function RenderPendingCharges() {
    const {
        openModalDetailCharge,
        setOpenModalDetailCharge,
        setDetailChargeId,
        pendingCharges
    } = usePay();

    const styleBody = {
        fontSize: "0.8rem",
        fontFamiy: "Nunito",
        fontWeight: "400",
        color: "#6E6E85",
    };

    const openDetailCharge = (id) => {
        setDetailChargeId(id);
        setOpenModalDetailCharge(true);
    };

    const chargeStatus = (status) => {
        if (status === "pendente") {
            return <p className="pendente">Pendente</p>;
        }
        if (status === "vencida") {
            return <p className="vencida">Vencida</p>;
        }
        return <p className="paga">Paga</p>;
    };

    if (!pendingCharges) {
        return
    }
    return (
        <>
            {
                pendingCharges.map((item) => (
                    <TableRow
                        key={item.id}
                        onClick={() => openDetailCharge(item.id)}
                        style={{ cursor: "pointer" }}>
                        <TableCell sx={styleBody}>{item.nome}</TableCell>
                        <TableCell sx={styleBody}>{item.id}</TableCell>
                        <TableCell sx={styleBody}>{formatReal(item.valor)}</TableCell>
                        <TableCell sx={styleBody}>{formatDate(item.vencimento)}</TableCell>
                        <TableCell sx={styleBody}>{chargeStatus(item.status)}</TableCell>
                        <TableCell sx={styleBody}>{item.descricao}</TableCell>
                        <TableCell sx={styleBody} onClick={(e) => e.stopPropagation()}>
                            <div className="desc">
                                <ModalEditCharge charge={item} page="charges" />
                                <DeleteCharge charge={item} page={"charges"} />
                            </div>
                        </TableCell>
                        {openModalDetailCharge && <ChargeDetail charge={item} />}
                    </TableRow>
                ))
            }
        </>
    )
}