import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../selectors/routing';
import { getMessages, getShouldUpdateGame } from '../../selectors/game';
import { getCurrentPlayerId } from '../../selectors/player';
import { connectClient } from '../../actions/pusher';
import { loadGame } from '../../actions/game';
import { loadCharacters } from '../../actions/characters';
import Game from './Game';

const mapStateToProps = state => ({
  gameId: getPathname(state).split('/')[2],
  playerId: getCurrentPlayerId(state),
  messages: getMessages(state),
  shouldUpdateGame: getShouldUpdateGame(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  connectClient: podId => dispatch(connectClient(podId)),
  loadGame: gameId => dispatch(loadGame(gameId)),
  loadCharacters: gameId => dispatch(loadCharacters(gameId))
});


export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Game);
