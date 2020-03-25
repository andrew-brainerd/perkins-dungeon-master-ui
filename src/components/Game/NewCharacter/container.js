import { connect } from 'react-redux';
import { createCharacter } from '../../../actions/characters';
import NewCharacter from './NewCharacter';

const mapDispatchToProps = dispatch => ({
  createCharacter: name => dispatch(createCharacter(name))
});

export default connect(null, mapDispatchToProps)(NewCharacter);
