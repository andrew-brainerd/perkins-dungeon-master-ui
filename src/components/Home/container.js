import { connect } from 'react-redux';
import { getCurrentUser } from '../../selectors/user';
import { startNewGame } from '../../actions/game';
import Home from './Home';

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  startNewGame: (name, createdBy) => dispatch(startNewGame(name, createdBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
