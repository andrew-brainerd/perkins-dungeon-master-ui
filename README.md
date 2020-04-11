# Anorak Game Master UI

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Run unit tests

### `yarn test:ui`

Run UI tests through Selenium (requires Chrome [driver](https://chromedriver.chromium.org/downloads) to exist in `PATH`)

### `yarn test:watch`

Run unit tests in interactive watch mode

### `yarn lint:js`

Run eslint on the project

### `yarn lint:css`

Run stylelint on the project

### `yarn coverage`

Get unit test coverage for the project

### `yarn verify`

Run linting and unit tests for the project

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Unit Testing Templates

### Reducers

```js

describe('Reducers', () => {
  import { actionToTest } from './actions';
  import reducer from './reducer';

  describe('REDUCER_NAME', () => {
    it('should update state in the following way', () => {
      const initialState = {};

      const expectedState = {};

      const action = actionToTest;

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
```

### Selectors

```js
import { derviveValueFromState } from './selectors';

describe('Selectors', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  describe('Selector Name', () => {
    it('should retrieve the following values from state', () => {
      const value = derviveValueFromState(state);

      const expectedResult = {};

      expect(value).toEqual(exprectedResult);
    });
});
```