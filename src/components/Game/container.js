import { connect } from 'react-redux';
import { getMessages } from '../../selectors/game';
import { addUserInput } from '../../actions/game';
import Game from './Game';

const mapStateToProps = state => ({
  messages: getMessages(state)
});

const mapDispatchToProps = dispatch => ({
  addUserInput: message => dispatch(addUserInput(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
