import React, { useState, useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { values } from 'ramda';
import { ROOT_ROUTE } from '../../constants/routes';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './NewGame.module.scss';

const NewGame = ({
  gameId,
  gameName,
  player,
  partyMembers,
  loadGame,
  sendInvite,
  startGame,
  deleteGame,
  navTo
}) => {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    gameId && loadGame(gameId);
  }, [gameId, loadGame]);

  return (
    <div className={styles.newGame}>
      <h1>{gameName || 'New Adventure'}</h1>
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
              onPressEnter={() => sendInvite(gameId, player.name, inviteEmail)}
            />
            <Button
              className={styles.inviteButton}
              text={'Send'}
              onClick={() => sendInvite(gameId, player.name, inviteEmail)}
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
          className={styles.newGameButton}
          text={'Cancel'}
          onClick={() => {
            deleteGame(gameId);
            navTo(ROOT_ROUTE);
          }}
        />
        <Button
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
  partyMembers: shape({
    _id: string,
    name: string,
    email: string
  }),
  loadGame: func.isRequired,
  sendInvite: func.isRequired,
  startGame: func.isRequired,
  deleteGame: func.isRequired,
  navTo: func.isRequired
};

export default NewGame;
