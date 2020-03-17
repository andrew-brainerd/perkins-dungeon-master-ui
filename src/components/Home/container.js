import { connect } from 'react-redux';
import { getCurrentUser } from '../../selectors/user';
import { getCurrentUserGames } from '../../selectors/game';
import { loadUserGames, startNewGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import Home from './Home';

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  userGames: getCurrentUserGames(state)
});

const mapDispatchToProps = dispatch => ({
  loadUserGames: userEmail => dispatch(loadUserGames(userEmail)),
  startNewGame: (name, createdBy) => dispatch(startNewGame(name, createdBy)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
