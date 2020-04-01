import { connect } from 'react-redux';
import { getPathname } from '../../../selectors/routing';
import { addPlayerInput, loadGame } from '../../../actions/game';
import { connectClient } from '../../../actions/pusher';
import CommandLine from './CommandLine';
import { getCurrentCharacter } from '../../../selectors/characters';

const mapStateToProps = state => ({
  gameId: getPathname(state).split('/')[2],
  character: getCurrentCharacter(state)
});

const mapDispatchToProps = dispatch => ({
  addPlayerInput: message => dispatch(addPlayerInput(message)),
  connectClient: podId => dispatch(connectClient(podId)),
  loadGame: gameId => dispatch(loadGame(gameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);
