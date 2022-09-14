// modal cobrança
import {
  Backdrop,
  Box,
  Button,
  Fade,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import * as yup from "yup";
import editIcon from "../../assets/modal/edit.svg";
import FileIcon from "../../assets/modal/FileIcon.svg";
import RadioUnselected from "../../assets/modal/RadioIconFalse.svg";
import RadioSelected from "../../assets/modal/RadioIconTrue.svg";
import ToastError from "../../helpers/toastError";
import ToastSuccess from "../../helpers/toastSuccess";
import usePay from "../../hooks/usePay";
import api from "../../services/api";
import { formatDate } from "../../utils/dataFormat";
import "../ModalCharge/style.css";
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
};

export default function ModalEditCharge({ charge, page }) {
  const {
    handleGetClient,
    getCharges,
    getResumeCharges,
    getClientsApi,
    getClientsResume,
  } = usePay();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    descriçao: "",
    vencimento: "",
    valor: 0,
    status: "paga",
  });
  const [error, setError] = useState({});
  useEffect(() => {
    const dataInfo = new Date(charge.vencimento);
    const dataOffset = dataInfo.getTimezoneOffset() * -60000;
    const data = format(
      new Date(dataInfo.getTime() - dataOffset),
      "yyyy-MM-dd"
    );
    setError({});
    setForm({
      nome: charge.nome,
      descriçao: charge.descricao,
      vencimento: data,
      valor: (charge.valor / 100).toFixed(2),
      status: charge.status,
    });
  }, [openModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataInfo = new Date(form.vencimento);
    const dataOffset = dataInfo.getTimezoneOffset() * -60000;
    const data = new Date(dataInfo.getTime() - dataOffset);
    let newStatus = "";
    newStatus = form.status;
    if (new Date() >= data) {
      if (newStatus === "pendente") {
        newStatus = "vencida";
      }
    } else {
      if (newStatus === "vencida") {
        newStatus = "pendente";
      }
    }
    async function validate() {
      const schema = yup.object().shape({
        valor: yup
          .number()
          .required({ valor: "Este campo deve ser preenchido" })
          .min(1, { valor: "Valor deve ser maior que 0" }),
        vencimento: yup
          .string()
          .required({ vencimento: "Este campo deve ser preenchido" }),
        descriçao: yup
          .string()
          .required({ descriçao: "Este campo deve ser preenchido" }),
        nome: yup.string().required({ nome: "Este campo deve ser preenchido" }),
      });
      try {
        await schema.validate({
          nome: form.nome,
          descriçao: form.descriçao,
          vencimento: form.vencimento,
          valor: form.valor,
        });
        return true;
      } catch (error) {
        setError(error.errors[0]);
        return false;
      }
    }
    if (!(await validate())) return;
    try {
      const date = formatDate(form.vencimento, true);
      const newValue = Number(form.valor).toFixed(2) * 100;
      if (String(date) === "Invalid Date") {
        return setError({ vencimento: "Insira uma data válida (dd/MM/yyyy)" });
      }
      await api.put(`/cobrancas/${charge.id}`, {
        nome: form.nome,
        descricao: form.descriçao,
        vencimento: new Date(date),
        valor: newValue,
        status: newStatus,
      });
      if (page === "detailClient") {
        await handleGetClient(charge.cliente_id);
      }
      if (page === "charges") {
        await getCharges();
      }
      await getResumeCharges();
      await getClientsApi();
      await getClientsResume();
      ToastSuccess("Cobrança atualizada");
      clearModal();
      return setOpenModal(false);
    } catch (error) {
      ToastError("Não foi possível alterar a cobrança");
      clearModal();
      setOpenModal(false);
    }
  };
  const handleChangeInput = (e) => {
    const value = e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };
  const clearModal = () => {
    setForm({
      nome: "",
      descriçao: "",
      vencimento: "",
      valor: 0,
      status: "paga",
    });
  };
  const closeModal = (e) => {
    e.stopPropagation();
    clearModal();
    setOpenModal(false);
  };
  return (
    <div className="edit-div" onClick={() => setOpenModal(true)}>
      <img src={editIcon} alt="Editar" className="edit" />
      <p>Editar</p>
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
          <Box sx={style} className="card__charge">
            <form onSubmit={handleSubmit} className="modal--charge">
              <div className="modal_title">
                <img
                  src={FileIcon}
                  alt="Cadastro de cobrança"
                  style={{ width: "4rem" }}
                />
                <h1>Edição de cobrança</h1>
              </div>
              <InputLabel htmlFor="nome">Nome*</InputLabel>
              <TextField
                fullWidth
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                error={error.nome}
                helperText={error.nome}
              />
              <InputLabel htmlFor="descriçao">Descrição*</InputLabel>
              <TextField
                fullWidth
                id="descriçao"
                name="descriçao"
                multiline
                rows={3}
                type="text"
                value={form.descriçao}
                error={error.descriçao}
                helperText={error.descriçao}
                onChange={handleChangeInput}
              />
              <div className="vencimento-valor">
                <div>
                  <InputLabel htmlFor="vencimento">Vencimento*</InputLabel>
                  <TextField
                    id="vencimento"
                    name="vencimento"
                    placeholder="dd/MM/yyyy"
                    type="date"
                    value={form.vencimento}
                    error={error.vencimento}
                    helperText={error.vencimento}
                    onChange={handleChangeInput}
                  />
                </div>
                <div>
                  <InputLabel htmlFor="valor">Valor*</InputLabel>
                  <TextField
                    id="valor"
                    name="valor"
                    type="number"
                    value={form.valor}
                    error={error.valor}
                    helperText={error.valor}
                    onChange={handleChangeInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <fieldset className="charge-status">
                <legend>Status:*</legend>
                <div
                  className="cobranca-paga"
                  style={{ display: "flex" }}
                  onClick={() => setForm({ ...form, status: "paga" })}
                >
                  <img
                    src={
                      form.status === "paga" ? RadioSelected : RadioUnselected
                    }
                    alt="Cobrança Paga"
                  />
                  <span>Cobrança Paga</span>
                </div>
                <div
                  className="cobranca-pendente"
                  style={{ display: "flex" }}
                  onClick={() => setForm({ ...form, status: "pendente" })}
                >
                  <img
                    src={
                      form.status === "pendente"
                        ? RadioSelected
                        : RadioUnselected
                    }
                    alt="Cobrança Paga"
                  />
                  <span>Cobrança Pendente</span>
                </div>
              </fieldset>
              <div className="modal-buttons">
                <Button
                  className="btn-cancel"
                  type="button"
                  onClick={(e) => closeModal(e)}
                >
                  Cancelar
                </Button>
                <Button className="btn-submit" type="submit">
                  Aplicar
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
