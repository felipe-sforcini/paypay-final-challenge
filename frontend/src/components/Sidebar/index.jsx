import HomeIcon from "../../assets/sidebar/HomeIcon";
import UsersIcon from "../../assets/sidebar/UsersIcon";
import FileIcon from "../../assets/sidebar/FileIcon";
import Header from "../../components/Header";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ page }) {
  const navigate = useNavigate();
  return (
    <div className="div-side-header">
      <header>
        <Header page={page} />
      </header>
      <div className="sidebar">
        <div
          className={`home ${page === "home" ? "sidebar-active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <HomeIcon color={page === "home" ? "#DA0175" : "#343447"} />
          <span className={page === "home" ? "evidence" : ""}>Home</span>
        </div>
        <div
          className={`clients ${page === "clients" ? "sidebar-active" : ""}`}
          onClick={() => navigate("/clients")}
        >
          <UsersIcon color={page === "clients" ? "#DA0175" : "#343447"} />
          <span className={page === "clients" ? "evidence" : ""}>Clientes</span>
        </div>
        <div
          className={`charges ${page === "charges" ? "sidebar-active" : ""}`}
          onClick={() => navigate("/charges")}
        >
          <FileIcon color={page === "charges" ? "#DA0175" : "#343447"} />
          <span className={page === "charges" ? "evidence" : ""}>
            Cobranças
          </span>
        </div>
      </div>
    </div>
  );
}
