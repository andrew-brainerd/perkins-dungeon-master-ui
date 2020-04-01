import { connect } from 'react-redux';
import { getMessages } from '../../../selectors/game';
import { getCurrentCharacterId } from '../../../selectors/characters';
import { addPlayerInput, loadGame } from '../../../actions/game';
import { connectClient } from '../../../actions/pusher';
import TextDisplay from './TextDisplay';

const mapStateToProps = state => ({
  messages: getMessages(state),
  characterId: getCurrentCharacterId(state)
});

const mapDispatchToProps = dispatch => ({
  addPlayerInput: message => dispatch(addPlayerInput(message)),
  connectClient: podId => dispatch(connectClient(podId)),
  loadGame: gameId => dispatch(loadGame(gameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
