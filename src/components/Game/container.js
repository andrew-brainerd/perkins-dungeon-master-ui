import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../selectors/routing';
import { getMessages, getShouldUpdateGame } from '../../selectors/game';
import { loadGame } from '../../actions/game';
import { connectClient } from '../../actions/pusher';
import { loadGame } from '../../actions/game';
import { loadCharacters } from '../../actions/characters';
import { navTo } from '../../actions/routing';
import Game from './Game';

const mapStateToProps = state => ({
  gameId: getPathname(state).split('/')[2],
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
