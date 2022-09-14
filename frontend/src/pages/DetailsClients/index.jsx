import Sidebar from "../../components/Sidebar";
import "./style.css";
import CardDetailsClients from "../../components/DetailsClient/CardDetalsClient";
import CardChargesClient from "../../components/DetailsClient/CardDetailCharge";
import UsersIcon from "../../assets/sidebar/UsersIcon";
import usePay from "../../hooks/usePay";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailClient() {
  const { detailsClient, handleGetClient } = usePay();
  const { id } = useParams();

  const setName = () => {
    if (!detailsClient) {
      return;
    }

    return (
      <h1 className="title-detail-client">{detailsClient.cliente.nome}</h1>
    );
  };

  useEffect(() => {
    async function getClient() {
      await handleGetClient(id);
    }
    getClient();
  }, []);

  return (
    <div className="container-home">
      <div className="fixed">
        <Sidebar page={"details"} />
      </div>
      <main className="content-home">
        <section className="section-home">
          <div className="header--home-clients">
            <UsersIcon color={"#343447"} />
            {setName()}
          </div>
          <section className="table-details">

            <CardDetailsClients
              handleGetClient={handleGetClient}
              id={id} />
            <CardChargesClient />
          </section>
        </section>
      </main>
    </div>
  );
}

export default DetailClient;
