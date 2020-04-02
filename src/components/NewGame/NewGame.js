import React, { useState, useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { ROOT_ROUTE } from '../../constants/routes';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './NewGame.module.scss';

const NewGame = ({ gameId, gameName, player, loadGame, sendInvite, startGame, navTo }) => {
  const [isInviting, setIsInviting] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    loadGame(gameId);
  });

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
              onPressEnter={() => console.log('Sending Email')}
            />
            <Button
              className={styles.inviteButton}
              text={'Send'}
              onClick={() => sendInvite(inviteEmail)}
              disabled={!inviteEmail}
            />
          </>
        )}
      </div>
      <div className={styles.partyMemberList}></div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.newGameButton}
          text={'Cancel'}
          onClick={() => {
            // delete game
            navTo(ROOT_ROUTE);
          }}
        />
        <Button
          className={styles.newGameButton}
          text={'Start'}
          onClick={() => startGame()}
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
  loadGame: func.isRequired,
  sendInvite: func.isRequired,
  startGame: func.isRequired,
  navTo: func.isRequired
};

export default NewGame;
