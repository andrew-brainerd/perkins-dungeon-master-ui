import { connect } from 'react-redux';
import { getIsPlaying } from '../../selectors/games';
import { setCurrentPlayer } from '../../actions/players';
import { exitGame } from '../../actions/games';
import Header from './Header';

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentPlayer: email => dispatch(setCurrentPlayer(email)),
  exitGame: () => dispatch(exitGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
