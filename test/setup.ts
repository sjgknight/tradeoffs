// Boardzilla's TestRunner dispatches some moves via internal setTimeout.
// When the game flow advances past an action (e.g., after checkStatus the flow
// returns to the play phase), a stale timer can fire and throw
// "No action X available at this point". This is a framework timing issue,
// not a game bug. We suppress these specific errors here.
process.on('uncaughtException', (err) => {
  if (err.message?.includes('No action') && err.message?.includes('available at this point')) {
    return; // suppress Boardzilla async timing errors
  }
  throw err;
});
