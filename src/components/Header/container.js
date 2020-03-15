import { connect } from 'react-redux';
import { getIsPlaying } from '../../selectors/game';
import { setCurrentUser } from '../../actions/user';
import { startNewGame } from '../../actions/game';
import Header from './Header';

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: email => dispatch(setCurrentUser(email)),
  startGame: (name, createdBy) => dispatch(startNewGame(name, createdBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
