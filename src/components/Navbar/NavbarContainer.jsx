import { connect } from 'react-redux';
import Navbar from './Navbar';

let mapStateToProps = (state) => {
  return {
    friends_sidebar: state.sidebar.friends_sidebar,
  }
}
/* let mapDispatchToProps = (dispatch) => {
  return {

  }
} */
const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;