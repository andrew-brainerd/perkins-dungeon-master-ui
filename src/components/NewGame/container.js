import { connect } from 'react-redux';
import { getCurrentPlayer } from '../../selectors/player';
import { startNewGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import NewGame from './NewGame';

const mapStateToProps = state => ({
  player: getCurrentPlayer(state)
});

const mapDispatchToProps = dispatch => ({
  startNewGame: (name, createdBy) => dispatch(startNewGame(name, createdBy)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
