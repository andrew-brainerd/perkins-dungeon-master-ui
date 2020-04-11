import { connect } from 'react-redux';
import { deriveMessages } from '../../../selectors/games';
import { getCurrentCharacterId } from '../../../selectors/characters';
import TextDisplay from './TextDisplay';

const mapStateToProps = state => ({
  messages: deriveMessages(state),
  characterId: getCurrentCharacterId(state)
});

export default connect(mapStateToProps)(TextDisplay);
