import { connect } from 'react-redux';
import { updateCharacterStatus, processCommand } from '../../actions/game';
import { getSessionMessages } from '../../selectors/game';
import Game from './Game';

const mapStateToProps = state => ({
  sessionMessages: getSessionMessages(state)
});

const mapDispatchToProps = dispatch => ({
  updateCharacterStatus: characterName => dispatch(updateCharacterStatus(characterName)),
  processCommand: input => dispatch(processCommand(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
