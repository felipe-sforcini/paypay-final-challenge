import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import { useState } from "react";
import del from "../../assets/modal/del.svg";
import iconAlert from "../../assets/modal/alertDeleteCharge.svg";
import closeIcon from "../../assets/modal/CloseIcon.svg";
import "./style.css";
import api from "../../services/api";
import usePay from "../../hooks/usePay";
import ToastError from "../../helpers/toastError";
import ToastSuccess from "../../helpers/toastSuccess";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "27%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function DeleteCharge({ charge }) {
  const { handleGetClient, getCharges, getResumeCharges, getClientsResume } =
    usePay();

  const [openModal, setOpenModal] = useState(false);

  const deleteCharge = async () => {
    if (!charge) return;
    const dataInfo = new Date(charge.vencimento);
    const dataOffset = dataInfo.getTimezoneOffset() * -60000;
    const data = new Date(dataInfo.getTime() - dataOffset);

    if (charge.status !== "pendente") {
      ToastError("Somente cobranças pendentes podem ser excluídas");
      setOpenModal(false);
      return;
    }

    try {
      await api.delete(`/cobrancas/${charge.id}`);
      ToastSuccess("Cobrança excluída");
      await handleGetClient(charge.cliente_id);
      await getCharges();
      await getClientsResume();
      await getResumeCharges();
      return setOpenModal(false);
    } catch (error) {
      ToastError(error.response.data.mensagem);
      return setOpenModal(false);
    }
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <div className="delete" onClick={() => setOpenModal(true)}>
        <img src={del} alt="icon Delete Charge" />
        <p className="redColor">Excluir</p>
      </div>
      <Modal
        sx={{
          backgroundColor: "#919A964D",
          backdropFilter: "blur(4px);",
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div className="modal--delete">
              <img
                src={closeIcon}
                alt="close"
                className="modal__close"
                onClick={() => setOpenModal(false)}
              />
              <img src={iconAlert} alt="alert" className="delete_alert" />
              <p className="title-delete">
                Tem certeza que deseja excluir esta cobrança?
              </p>
              <div className="buttons-delete">
                <Button onClick={() => setOpenModal(false)} variant="contained">
                  Não
                </Button>
                <Button
                  className="btn-confirm"
                  variant="contained"
                  onClick={() => deleteCharge()}
                >
                  Sim
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
