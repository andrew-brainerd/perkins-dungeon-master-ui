import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { ROOT_ROUTE } from '../../constants/routes';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './NewGame.module.scss';

const NewGame = ({ player, sendInvite, startNewGame, navTo }) => {
  const [name, setName] = useState('');
  const [isInviting, setIsInviting] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <div className={styles.newGame}>
      <h1 className={styles.pageTitle}>New Adventure</h1>
      <TextInput
        autofocus
        className={styles.nameInput}
        placeholder={'Party Name'}
        value={name}
        onChange={setName}
      />
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
          onClick={() => navTo(ROOT_ROUTE)}
        />
        <Button
          className={styles.newGameButton}
          text={'Start'}
          onClick={() => startNewGame(name, player.email)}
          disabled={!name || !player}
        />
      </div>
    </div>
  );
};

NewGame.propTypes = {
  player: shape({
    email: string
  }),
  startNewGame: func.isRequired,
  navTo: func.isRequired
};

export default NewGame;
