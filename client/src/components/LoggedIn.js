import {connect} from "react-redux";

const LoggedIn = props => {
  return <div className="logged-in">TEST</div>
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.application.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(LoggedIn);