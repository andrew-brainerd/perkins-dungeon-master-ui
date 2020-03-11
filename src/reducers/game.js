import { START_GAME, END_GAME, SELECT_CHARACTER, UPDATE_STATUS, ADD_MESSAGE } from '../actions/game';

const initialState = {
  isPlaying: false,
  characterName: undefined,
  status: undefined,
  locationHistory: [],
  locationChanged: false,
  locationIsNew: false,
  sessionMessages: []
};

export default function game (state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isPlaying: true
      };
    case END_GAME:
      return initialState;
    case SELECT_CHARACTER: {
      // Methinks this is massive. TODO: Ask experts where this logic should live.
      const sessionMessages = state.sessionMessages.slice();
      sessionMessages.push({ speaker: 'System', message: `Joined as ${action.characterName}` });
      return {
        ...state,
        sessionMessages,
        characterName: action.characterName
      };
    }
    case UPDATE_STATUS: {
      let locationChanged = false;
      let locationIsNew = false;
      const locationHistory = state.locationHistory;
      const currentLocation = action.status.location;
      const sessionMessages = state.sessionMessages.slice();

      if (!state.status || locationHistory.length === 0) {
        locationChanged = true;
        locationIsNew = true;
        locationHistory.push(currentLocation._id);
      } else {
        locationIsNew = !locationHistory.includes(currentLocation._id);
        if (locationHistory[locationHistory.length - 1] !== currentLocation._id) {
          locationChanged = true;
          locationHistory.push(currentLocation._id);
        }
      }

      if (locationIsNew) {
        sessionMessages.push({ message: currentLocation.fullDescription });
      } else if (locationChanged) {
        sessionMessages.push({ message: currentLocation.name });
      }

      return {
        ...state,
        status: action.status,
        sessionMessages,
        locationHistory,
        locationChanged,
        locationIsNew
      };
    }
    case ADD_MESSAGE: {
      const sessionMessages = state.sessionMessages.slice();
      sessionMessages.push(action.message);
      return {
        ...state,
        sessionMessages
      };
    }
    default:
      return state;
  }
};
