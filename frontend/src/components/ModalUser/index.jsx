import { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  InputLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "../../assets/modal/CloseIcon.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./style.css";
import api from "../../services/api";
import usePay from "../../hooks/usePay";
import edit from "../../assets/modal/edit.svg";
import * as yup from "yup";
import ToastSuccess from "../../helpers/toastSuccess";

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

const label = {
  fontFamily: "Nunito",
  fontWeight: 600,
  fontSize: "1.1rem",
  color: "#3F3F55",
  marginTop: "0.8rem",
};

export default function ModalUser() {
  const { getUserName } = usePay();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: null,
    telefone: "",
    senha: null,
    confSenha: null,
  });
  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    confSenha: "",
    geral: "",
  });
  const [eyes, setEyes] = useState({ eye1: false, eye2: false });

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "cpf" || name === "telefone") {
      if (value.length > 11) {
        return;
      }
    }
    setErrors({ ...errors, [name]: false });
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function validate() {
      let schema = yup.object().shape({
        confSenha: yup
          .string({ confSenha: "Este campo é obrigatório" })
          .nullable()
          .required({ confSenha: "Este campo é obrigatório" })
          .min(6, { confSenha: "Senha deve ter no mínimo 6 caracteres" })
          .matches(form.senha, {
            message: {
              confSenha: "Senhas não coincidem",
              senha: "Senhas não coincidem",
            },
          }),

        senha: yup
          .string({ senha: "Este campo é obrigatório" })
          .nullable()
          .min(6, { senha: "Senha deve ter no mínimo 6 caracteres" })
          .required({ senha: "Este campo é obrigatório" }),

        email: yup
          .string({ email: "Este campo é obrigatório" })
          .email({ email: "Insira um email válido" })
          .required({ email: "Este campo é obrigatório" }),

        nome: yup
          .string({ nome: "Este campo é obrigatório" })
          .required({ nome: "Este campo é obrigatório" }),
      });
      try {
        await schema.validate({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          confSenha: form.confSenha,
        });
        return true;
      } catch (error) {
        setErrors(error.errors[0]);
        return false;
      }
    }
    if (!(await validate())) return;
    if (form.senha.length !== form.confSenha.length) {
      return setErrors({
        senha: "Senhas não conferem",
        confSenha: "Senhas não conferem",
      });
    }

    try {
      await api.put("/usuario", {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        senha: form.senha,
      });
      setErrors({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        senha: "",
        confSenha: "",
        geral: "",
      });
      setForm({
        nome: "",
        email: "",
        cpf: null,
        telefone: "",
        senha: null,
        confSenha: null,
      });

      ToastSuccess("Usuário atualizado");
      getUserName(form.nome);
      setOpenModal(false);
    } catch (error) {
      if (
        error.response.data.mensagem ===
        "O CPF informado já está sendo utilizado por outro usuário."
      )
        return setErrors({ ...errors, cpf: error.response.data.mensagem });
      if (
        error.response.data.mensagem ===
        "O e-mail informado já está sendo utilizado por outro usuário."
      ) {
        return setErrors({ ...errors, email: error.response.data.mensagem });
      }
    }
  };

  const getUserApi = async () => {
    try {
      const response = await api.get("/usuario");
      setForm({
        ...form,
        nome: response.data.nome,
        email: response.data.email,
        cpf: response.data.cpf,
        telefone: response.data.telefone,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    getUserApi();
    setEyes({ eye1: false, eye2: false });
  };

  const cleanModal = () => {
    setOpenModal(false);
    setErrors({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      senha: "",
      confSenha: "",
      geral: "",
    });

    setForm({
      nome: "",
      email: "",
      cpf: null,
      telefone: "",
      senha: null,
      confSenha: null,
    });
  };

  return (
    <div>
      <div className="open-modal" onClick={() => handleOpenModal()}>
        <img src={edit} className="edit-user" alt="Editar Usuário" />
        <p className="edit-text">Editar</p>
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
          <Box sx={style} className="modal__userRespon">
            <form onSubmit={handleSubmit} className="modal-user">
              <div className="close-modal">
                <img
                  src={CloseIcon}
                  alt="Close Icon"
                  className="modal___close"
                  onClick={() => cleanModal()}
                />
              </div>
              <div className="title-modal-user">
                <h1>Edite seu cadastro</h1>
              </div>
              <InputLabel sx={label} htmlFor="nome">
                Nome*
              </InputLabel>
              <TextField
                id="nome"
                name="nome"
                className="input"
                type="text"
                error={errors.nome}
                helperText={errors.nome}
                value={form.nome}
                onChange={handleChangeInput}
              />
              <InputLabel sx={label} htmlFor="email">
                E-mail*
              </InputLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                className="input"
                error={errors.email}
                helperText={errors.email}
                value={form.email}
                onChange={handleChangeInput}
              />
              <div className="half-input">
                <div className="cpf grow">
                  <InputLabel sx={label} htmlFor="cpf">
                    CPF
                  </InputLabel>
                  <TextField
                    id="cpf"
                    type="number"
                    name="cpf"
                    className="input width100"
                    value={form.cpf}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="telefone grow">
                  <InputLabel sx={label} htmlFor="telefone">
                    Telefone
                  </InputLabel>
                  <TextField
                    id="telefone"
                    type="number"
                    name="telefone"
                    className="input width100"
                    value={form.telefone}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <InputLabel sx={label} htmlFor="senha">
                Senha*
              </InputLabel>
              <TextField
                id="senha"
                type={eyes.eye1 ? "text" : "password"}
                name="senha"
                className="input"
                error={errors.senha}
                value={form.senha}
                helperText={errors.senha}
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"start"}>
                      {eyes.eye1 ? (
                        <VisibilityIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => setEyes({ ...eyes, eye1: !eyes.eye1 })}
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => setEyes({ ...eyes, eye1: !eyes.eye1 })}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <InputLabel sx={label} htmlFor="confSenha">
                Confirmar Senha*
              </InputLabel>
              <TextField
                id="confSenha"
                type={eyes.eye2 ? "text" : "password"}
                name="confSenha"
                className="input"
                error={errors.confSenha}
                value={form.confSenha}
                helperText={errors.confSenha}
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"start"}>
                      {eyes.eye2 ? (
                        <VisibilityIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => setEyes({ ...eyes, eye2: !eyes.eye2 })}
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => setEyes({ ...eyes, eye2: !eyes.eye2 })}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <div className="buttons">
                <Button
                  variant="contained"
                  className="btn-submit"
                  type="submit"
                >
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
