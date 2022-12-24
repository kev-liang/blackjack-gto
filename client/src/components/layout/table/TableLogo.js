import "styles/TableLogo.scss";
import logo from "img/logo.png";
const TableLogo = (props) => {
  return (
    <div className="logo horizontal-center-absolute">
      <div className="">
        <img src={logo} className="logo-img" alt="Crack Blackjack Logo" />
      </div>
      <div className="table-logo">Crack Blackjack</div>
    </div>
  );
};

export default TableLogo;
