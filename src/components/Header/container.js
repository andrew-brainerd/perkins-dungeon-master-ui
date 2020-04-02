import { connect } from 'react-redux';
import { getIsPlaying } from '../../selectors/game';
import { setCurrentPlayer } from '../../actions/player';
import { exitGame } from '../../actions/game';
import Header from './Header';

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentPlayer: email => dispatch(setCurrentPlayer(email)),
  exitGame: () => dispatch(exitGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
