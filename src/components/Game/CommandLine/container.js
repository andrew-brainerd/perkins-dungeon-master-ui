import { connect } from 'react-redux';
import { getGameId } from '../../../selectors/routing';
import { addPlayerInput, loadGame } from '../../../actions/game';
import { connectClient } from '../../../actions/pusher';
import CommandLine from './CommandLine';
import { getCurrentCharacter } from '../../../selectors/characters';

const mapStateToProps = state => ({
  gameId: getGameId(state),
  character: getCurrentCharacter(state)
});

const mapDispatchToProps = dispatch => ({
  addPlayerInput: message => dispatch(addPlayerInput(message)),
  connectClient: (channel, event) => dispatch(connectClient(channel, event)),
  loadGame: gameId => dispatch(loadGame(gameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);
