export default (path = '/') => ({
  payload: {
    args: [path],
    method: 'push'
  },
  type: '@@router/CALL_HISTORY_METHOD'
});
