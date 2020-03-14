import { connect } from 'react-redux';
import { getPathname } from '../../selectors/routing';
import { getGameLogs, getShouldUpdateGame } from '../../selectors/game';
import { addUserInput, loadGame } from '../../actions/game';
import { connectClient } from '../../actions/pusher';
import Game from './Game';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  messages: getGameLogs(state),
  shouldUpdateGame: getShouldUpdateGame(state)
});

const mapDispatchToProps = dispatch => ({
  addUserInput: message => dispatch(addUserInput(message)),
  connectClient: podId => dispatch(connectClient(podId)),
  loadGame: gameId => dispatch(loadGame(gameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
