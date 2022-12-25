import "styles/LoggedIn.scss";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import { SettingsSystemDaydreamRounded } from "@mui/icons-material";

const LoggedIn = props => {
  const {user, isLoggedIn} = props;
  const [name, setName] = useState('')
  const [profImgUrl, setProfImgUrl] = useState('');

  useEffect(() => {
    if (!user) return;
    setName(user.given_name)
    setProfImgUrl(user.picture)
  }, [user])
  if (isLoggedIn) {
    return <div className="logged-in"><img className="logged-in-prof-pic" src={profImgUrl} alt="" /> <p>Signed in as <span className="logged-in-name">{name}</span></p></div>
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.application.isLoggedIn,
    user: state.application.user
  }
}

export default connect(mapStateToProps, null)(LoggedIn);