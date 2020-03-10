import { connect } from 'react-redux';
import { getIsPlaying } from '../../selectors/game';
import { startNewGame } from '../../actions/game';
import Header from './Header';

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  startGame: name => dispatch(startNewGame(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
