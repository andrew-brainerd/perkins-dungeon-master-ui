import React, { useState, useEffect } from 'react';
import { shape, string, bool, func } from 'prop-types';
import { isEmpty, values } from 'ramda';
import { events } from 'gm-common';
import usePrevious from '../../hooks/usePrevious';
import { useAuth0 } from '../../hooks/useAuth0';
import { isDefined } from '../../utils/validation';
import { ROOT_ROUTE } from '../../constants/routes';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './NewGame.module.scss';

const getIsPlayerPartyMember = (members, player) => values(members).find(member => member._id === player._id);

const NewGame = ({
  gameId,
  gameName,
  player,
  isLoadingPlayer,
  partyMembers,
  shouldUpdateGame,
  loadGame,
  sendInvite,
  startGame,
  deleteGame,
  addPlayer,
  connectClient,
  triggerUpdate,
  navTo
}) => {
  const { loading, loginWithRedirect } = useAuth0();
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(isDefined(gameId));
  const prevGameId = usePrevious(gameId);
  const hasUpdatedGameId = isDefined(gameId) && gameId !== prevGameId;
  const shouldUpdate = shouldUpdateGame || hasUpdatedGameId;

  useEffect(() => {
    isEmpty(player) && !isLoadingPlayer && !loading && loginWithRedirect();
  }, [player, isLoadingPlayer, loading, loginWithRedirect]);

  useEffect(() => {
    if ((shouldUpdate || isInitialLoad) && player) {
      loadGame(gameId);
      setIsInitialLoad(false);
    }
  }, [shouldUpdate, isInitialLoad, loadGame, gameId, player, prevGameId]);

  useEffect(() => {
    if (isDefined(gameId)) {
      connectClient(gameId, events.PLAYER_ADDED, triggerUpdate);
    }
  }, [connectClient, gameId, triggerUpdate]);

  useEffect(() => {
    !isEmpty(player) && !getIsPlayerPartyMember(partyMembers, player) &&
      addPlayer(gameId, player._id);
  }, [player, partyMembers, addPlayer, gameId]);

  return (
    <div className={styles.newGame}>
      <h1 name={'gameName'}>{gameName}</h1>
      <div className={styles.partyMembers}>
        <h2>Party Members</h2>
        <Icon
          className={styles.invite}
          name={'invitation'}
          title={'Invite Players'}
          onClick={() => setIsInviting(!isInviting)}
        />
        {isInviting && (
          <>
            <TextInput
              className={styles.inviteInput}
              placeholder={'Player Email'}
              value={inviteEmail}
              onChange={setInviteEmail}
              onPressEnter={() => {
                sendInvite(gameId, player.name, inviteEmail);
                setIsInviting(false);
              }}
            />
            <Button
              className={styles.inviteButton}
              text={'Send'}
              onClick={() => {
                sendInvite(gameId, player.name, inviteEmail);
                setIsInviting(false);
              }}
              disabled={!inviteEmail}
            />
          </>
        )}
      </div>
      <div className={styles.partyMemberList}>
        {values(partyMembers).map(player => (
          <div key={player._id} className={styles.partyMember}>
            {player.name}
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          name={'cancelGameStart'}
          className={styles.newGameButton}
          text={'Cancel'}
          onClick={() => {
            deleteGame(gameId);
            navTo(ROOT_ROUTE);
          }}
        />
        <Button
          name={'startNewGame'}
          className={styles.newGameButton}
          text={'Start'}
          onClick={() => startGame(gameId)}
          disabled={!player}
        />
      </div>
    </div>
  );
};

NewGame.propTypes = {
  gameId: string,
  gameName: string,
  player: shape({
    email: string
  }),
  isLoadingPlayer: bool,
  partyMembers: shape({
    _id: string,
    name: string,
    email: string
  }),
  shouldUpdateGame: bool,
  loadGame: func.isRequired,
  sendInvite: func.isRequired,
  startGame: func.isRequired,
  deleteGame: func.isRequired,
  addPlayer: func.isRequired,
  connectClient: func.isRequired,
  triggerUpdate: func.isRequired,
  navTo: func.isRequired
};

export default NewGame;
