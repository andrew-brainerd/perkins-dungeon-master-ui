import { connect } from 'react-redux';
import { getMessages } from '../../../selectors/game';
import { getCurrentCharacterId } from '../../../selectors/characters';
import { addPlayerInput } from '../../../actions/game';
import TextDisplay from './TextDisplay';

const mapStateToProps = state => ({
  messages: getMessages(state),
  characterId: getCurrentCharacterId(state)
});

const mapDispatchToProps = dispatch => ({
  addPlayerInput: message => dispatch(addPlayerInput(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextDisplay);
