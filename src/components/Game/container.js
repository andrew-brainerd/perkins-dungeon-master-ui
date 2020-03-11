import { connect } from 'react-redux';
import { getMessages } from '../../selectors/game';
import { addUserInput } from '../../actions/game';
import { connectClient } from '../../actions/pusher';
import Game from './Game';

const mapStateToProps = state => ({
  messages: getMessages(state)
});

const mapDispatchToProps = dispatch => ({
  addUserInput: message => dispatch(addUserInput(message)),
  connectClient: podId => dispatch(connectClient(podId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
