import { connect } from 'react-redux';
import { getGameId } from '../../../selectors/routing';
import { addPlayerInput } from '../../../actions/games';
import CommandLine from './CommandLine';
import { getCurrentCharacter } from '../../../selectors/characters';

const mapStateToProps = state => ({
  gameId: getGameId(state),
  character: getCurrentCharacter(state)
});

const mapDispatchToProps = dispatch => ({
  addPlayerInput: message => dispatch(addPlayerInput(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);
