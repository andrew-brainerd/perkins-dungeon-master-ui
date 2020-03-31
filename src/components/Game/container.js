import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../selectors/routing';
import { getMessages, getShouldUpdateGame } from '../../selectors/game';
import { loadGame } from '../../actions/game';
import { connectClient } from '../../actions/pusher';
import Game from './Game';

const mapStateToProps = state => ({
  gameId: getPathname(state).split('/')[2],
  messages: getMessages(state),
  shouldUpdateGame: getShouldUpdateGame(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  connectClient: podId => dispatch(connectClient(podId)),
  loadGame: gameId => dispatch(loadGame(gameId))
});


export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Game);
