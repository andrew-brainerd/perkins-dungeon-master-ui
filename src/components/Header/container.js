import { connect } from 'react-redux';
import { getIsPlaying } from '../../selectors/game';
import { setCurrentPlayer } from '../../actions/player';
import { startNewGame, exitGame } from '../../actions/game';
import Header from './Header';

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentPlayer: email => dispatch(setCurrentPlayer(email)),
  startGame: (name, createdBy) => dispatch(startNewGame(name, createdBy)),
  exitGame: path => dispatch(exitGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
