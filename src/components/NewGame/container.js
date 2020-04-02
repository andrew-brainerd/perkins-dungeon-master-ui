import { connect } from 'react-redux';
import { getGameId } from '../../selectors/routing';
import { getCurrentGameName, getGamePlayers } from '../../selectors/game';
import { getCurrentPlayer } from '../../selectors/player';
import { loadGame, sendInvite, startGame, deleteGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import NewGame from './NewGame';

const mapStateToProps = state => ({
  gameId: getGameId(state),
  gameName: getCurrentGameName(state),
  player: getCurrentPlayer(state),
  partyMembers: getGamePlayers(state)
});

const mapDispatchToProps = dispatch => ({
  loadGame: gameId => dispatch(loadGame(gameId)),
  sendInvite: (gameId, playerName, email) => dispatch(sendInvite(gameId, playerName, email)),
  startGame: gameId => dispatch(startGame(gameId)),
  deleteGame: gameId => dispatch(deleteGame(gameId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
