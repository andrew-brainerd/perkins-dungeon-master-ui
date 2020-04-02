import { connect } from 'react-redux';
import { getCurrentPlayer } from '../../selectors/player';
import { sendInvite, startNewGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import NewGame from './NewGame';

const mapStateToProps = state => ({
  player: getCurrentPlayer(state)
});

const mapDispatchToProps = dispatch => ({
  sendInvite: email => dispatch(sendInvite(email)),
  startNewGame: (name, createdBy) => dispatch(startNewGame(name, createdBy)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
