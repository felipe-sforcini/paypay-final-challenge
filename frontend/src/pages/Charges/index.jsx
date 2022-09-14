import Sidebar from "../../components/Sidebar";
import CardCharges from "../../components/CardClientsCharges";
import FileIcon from "../../assets/sidebar/FileIcon";
import filter from "../../assets/filter.svg";
import "./style.css";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import usePay from "../../hooks/usePay";

function Charges() {
  const { getCharges, setNotFoundFilter } = usePay();

  const handleFilterCharges = async (e) => {
    const search = e.target.value
    await getCharges(search)
  }

  useEffect(() => {
    getCharges();
    setNotFoundFilter(false)
  }, []);

  return (
    <div className="container-home">
      <div className="fixed">
        <Sidebar page={"charges"} />
      </div>
      <main className="content-home">
        <section className="section-home">
          <div className="header--home-clients">
            <FileIcon color={"#343447"} />
            <h1 className="client--title">Cobranças</h1>
            <div className="actions-client">
              <img className="filter" src={filter} alt="Filtro" />
              <TextField
                id="search"
                name="search"
                type="text"

                placeholder="Pesquisa"
                onChange={handleFilterCharges}
              />
              <SearchIcon className="search-icon" />
            </div>
          </div>
          <section className="table">
            <CardCharges
              page={"charges"}
              column1={"Clientes"}
              column2={"ID Cob."}
              column3={"Valor"}
              column4={"Data de venc."}
              column5={"Status"}
              column6={"Descrição"}
            />
          </section>
        </section>
      </main>
    </div>
  );
}

export default Charges;
