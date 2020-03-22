import { connect } from 'react-redux';
import { getCurrentPlayer } from '../../selectors/player';
import { getCurrentPlayerGames } from '../../selectors/game';
import { loadPlayerGames, startNewGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import Home from './Home';

const mapStateToProps = state => ({
  player: getCurrentPlayer(state),
  playerGames: getCurrentPlayerGames(state)
});

const mapDispatchToProps = dispatch => ({
  loadPlayerGames: playerId => dispatch(loadPlayerGames(playerId)),
  startNewGame: (name, createdBy) => dispatch(startNewGame(name, createdBy)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
