import axios from 'axios';

const base = process.env.REACT_APP_PERKINS_API_ROOT;

export const login = async (email, password) => {
  const response = await axios.post(`${base}/api/player/login`, {
    email,
    password
  });

  const player = response.data;
  player.characters = (await axios.get(`${base}/api/player/characters`, {
    headers: {
      Authorization: `Token ${player.token}`
    }
  })).data;

  return player;
};

export const getStatus = async (token, character) => {
  return (await axios.get(`${base}/api/player/character/${character}/status`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })).data;
};

export const move = async (token, character, direction) => {
  await axios.put(
    `${base}/api/player/character/${character}/location`,
    { direction },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};
