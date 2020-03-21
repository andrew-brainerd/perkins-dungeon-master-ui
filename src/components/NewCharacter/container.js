import { connect } from 'react-redux';
import { getPathname } from '../../selectors/routing';
import { createCharacter } from '../../actions/characters';
import NewCharacter from './NewCharacter';

const mapStateToProps = state => ({
  gameId: getPathname(state).split('/')[2]
});

const mapDispatchToProps = dispatch => ({
  createCharacter: character => dispatch(createCharacter(character))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
