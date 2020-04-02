import { connect } from 'react-redux';
import { getGameId } from '../../selectors/routing';
import { getCurrentGameName } from '../../selectors/game';
import { getCurrentPlayer } from '../../selectors/player';
import { loadGame, sendInvite, startGame } from '../../actions/game';
import { navTo } from '../../actions/routing';
import NewGame from './NewGame';

const mapStateToProps = state => ({
  gameId: getGameId(state),
  gameName: getCurrentGameName(state),
  player: getCurrentPlayer(state)
});

const mapDispatchToProps = dispatch => ({
  loadGame: gameId => dispatch(loadGame(gameId)),
  sendInvite: email => dispatch(sendInvite(email)),
  startGame: () => dispatch(startGame()),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
