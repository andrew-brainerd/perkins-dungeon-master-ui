import { connect } from 'react-redux';
import { getMessages } from '../../../selectors/games';
import { getCurrentCharacterId } from '../../../selectors/characters';
import TextDisplay from './TextDisplay';

const mapStateToProps = state => ({
  messages: getMessages(state),
  characterId: getCurrentCharacterId(state)
});

export default connect(mapStateToProps)(TextDisplay);
