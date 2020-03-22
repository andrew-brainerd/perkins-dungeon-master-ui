import { connect } from 'react-redux';
import { getIsPlaying } from '../../selectors/game';
import { setCurrentPlayer } from '../../actions/player';
import { startNewGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentPlayer: email => dispatch(setCurrentPlayer(email)),
  startGame: (name, createdBy) => dispatch(startNewGame(name, createdBy)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
