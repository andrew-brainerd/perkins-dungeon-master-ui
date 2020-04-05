import { connect } from 'react-redux';
import { getGameId } from '../../selectors/routing';
import { createCharacter } from '../../actions/characters';
import NewCharacter from './NewCharacter';

const mapStateToProps = state => ({
  gameId: getGameId(state)
});

const mapDispatchToProps = dispatch => ({
  createCharacter: character => dispatch(createCharacter(character))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
