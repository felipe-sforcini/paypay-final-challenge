import { Backdrop, Box, Fade, Modal } from "@mui/material";
import CloseIcon from "../../assets/modal/CloseIcon.svg";
import FileIcon from "../../assets/modal/FileIcon.svg";
import usePay from "../../hooks/usePay";
import { formatDate, formatReal } from "../../utils/dataFormat";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  padding: "2.6rem 3rem",
};

export default function ChargeDetail({ charge }) {
  const {
    openModalDetailCharge,
    setOpenModalDetailCharge,
    detailChargeId,
    setDetailChargeId,
  } = usePay();
  const closeModal = (e) => {
    e.stopPropagation();
    setDetailChargeId(0);
    setOpenModalDetailCharge(false);
  };
  const chargeStatus = (status) => {
    if (status === "pendente") {
      return <span className="pendente">Pendente</span>;
    }
    if (status === "vencida") {
      return <span className="vencida">Vencida</span>;
    }
    return <span className="paga">Paga</span>;
  };
  return (
    <>
      {charge.id === detailChargeId && (
        <Modal
          sx={{
            backgroundColor: "#919A964D",
            backdropFilter: "blur(4px);",
          }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModalDetailCharge}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalDetailCharge}>
            <Box sx={style} className="modal__details">
              <img
                src={CloseIcon}
                alt="close"
                onClick={(e) => closeModal(e)}
                className="modal__close"
              />
              <div className="details-header" style={{ display: "flex" }}>
                <img src={FileIcon} alt="Detalhe" className="detail-icon" />
                <h1>Detalhe da Cobrança</h1>
              </div>
              <h2>Nome</h2>
              <p>{charge.nome}</p>
              <h2>Descrição</h2>
              <p>{charge.descricao}</p>
              <div className="vencimento-valor">
                <div className="vencimento">
                  <h2>Vencimento</h2>
                  <p>{formatDate(charge.vencimento)}</p>
                </div>
                <div className="valor">
                  <h2>Valor</h2>
                  <p>{formatReal(charge.valor)}</p>
                </div>
              </div>
              <div className="cobranca-status">
                <div className="cobranca">
                  <h2>ID Cobrança</h2>
                  <p>{charge.id}</p>
                </div>
                <div className="status">
                  <h2>Status</h2>
                  {chargeStatus(charge.status)}
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
