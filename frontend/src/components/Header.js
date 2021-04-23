import { Link } from 'react-router-dom';
import logo from '../images/vector.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Around the U.S." className="header__image" />
      <div className="header__status">
        <p className="header__email">{props.email}</p>
        <Link className="header__link" to={props.linkTo}>
          <p onClick={props.onClick} className="header__linkBtn">
            {props.link}
          </p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
