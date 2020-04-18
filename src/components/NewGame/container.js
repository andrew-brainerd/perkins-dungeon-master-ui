import { connect } from 'react-redux';
import { getGameId } from '../../selectors/routing';
import { getCurrentGameName, getGamePlayers, getShouldUpdateGame } from '../../selectors/games';
import { getCurrentPlayer } from '../../selectors/players';
import {
  loadGame,
  sendInvite,
  startGame,
  deleteGame,
  addPlayer,
  triggerUpdate
} from '../../actions/games';
import { connectClient } from '../../actions/pusher';
import { navTo } from '../../actions/routing';
import NewGame from './NewGame';

const mapStateToProps = state => ({
  gameId: getGameId(state),
  gameName: getCurrentGameName(state),
  player: getCurrentPlayer(state),
  partyMembers: getGamePlayers(state),
  shouldUpdateGame: getShouldUpdateGame(state)
});

const mapDispatchToProps = dispatch => ({
  loadGame: gameId => dispatch(loadGame(gameId)),
  sendInvite: (gameId, playerName, email) => dispatch(sendInvite(gameId, playerName, email)),
  startGame: gameId => dispatch(startGame(gameId)),
  deleteGame: gameId => dispatch(deleteGame(gameId)),
  addPlayer: (gameId, playerId) => dispatch(addPlayer(gameId, playerId)),
  connectClient: (channel, event, action) => dispatch(connectClient(channel, event, action)),
  triggerUpdate: () => dispatch(triggerUpdate),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
