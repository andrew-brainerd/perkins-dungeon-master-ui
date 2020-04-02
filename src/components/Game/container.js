import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getGameId } from '../../selectors/routing';
import { getShouldUpdateGame } from '../../selectors/game';
import { getCurrentPlayerId } from '../../selectors/player';
import { getCurrentCharacterId, getIsLoadingCharacters } from '../../selectors/characters';
import { connectClient } from '../../actions/pusher';
import { loadGame } from '../../actions/game';
import { loadCharacters } from '../../actions/characters';
import { navTo } from '../../actions/routing';
import Game from './Game';

const mapStateToProps = state => ({
  gameId: getGameId(state),
  playerId: getCurrentPlayerId(state),
  characterId: getCurrentCharacterId(state),
  isLoadingCharacters: getIsLoadingCharacters(state),
  shouldUpdateGame: getShouldUpdateGame(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  connectClient: podId => dispatch(connectClient(podId)),
  loadGame: gameId => dispatch(loadGame(gameId)),
  loadCharacters: gameId => dispatch(loadCharacters(gameId)),
  navTo: path => dispatch(navTo(path))
});


export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Game);
