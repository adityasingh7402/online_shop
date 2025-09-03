/**
 * Helper functions to track user's bets for the winner popup
 */

/**
 * Store bet information in localStorage when user places a bet
 * @param {Object} bet - Bet information
 * @param {string} bet.orderId - Unique order ID
 * @param {string} bet.randomNum - Card number (1-13)
 * @param {string} bet.cardno - Card position (1, 2, or 3)
 * @param {number} bet.amount - Bet amount
 */
export const trackBet = (bet) => {
  try {
    // Get existing pending bets or create new object
    const existingData = localStorage.getItem('pendingBets');
    let pendingData = existingData 
      ? JSON.parse(existingData) 
      : {
          gameDate: new Date().toDateString(),
          bets: [],
          hasShownResult: false
        };
    
    // Add new bet to array
    pendingData.bets.push({
      orderId: bet.orderId,
      randomNum: bet.randomNum,
      cardno: bet.cardno,
      amount: bet.amount,
      timestamp: new Date().toISOString()
    });
    
    // Update localStorage
    localStorage.setItem('pendingBets', JSON.stringify(pendingData));
    
  } catch (error) {
    console.error('Error tracking bet:', error);
  }
};

/**
 * Clear bet tracking data from localStorage
 */
export const clearBetTracking = () => {
  localStorage.removeItem('pendingBets');
};

/**
 * Check if user has pending bets that need results
 * @returns {boolean}
 */
export const hasPendingResults = () => {
  try {
    const pendingData = localStorage.getItem('pendingBets');
    if (!pendingData) return false;
    
    const parsed = JSON.parse(pendingData);
    return parsed.bets && parsed.bets.length > 0 && !parsed.hasShownResult;
  } catch (error) {
    console.error('Error checking pending bets:', error);
    return false;
  }
};

/**
 * Mark pending bets as shown
 */
export const markResultsAsShown = () => {
  try {
    const pendingData = localStorage.getItem('pendingBets');
    if (!pendingData) return;
    
    const parsed = JSON.parse(pendingData);
    parsed.hasShownResult = true;
    localStorage.setItem('pendingBets', JSON.stringify(parsed));
  } catch (error) {
    console.error('Error marking results as shown:', error);
  }
};
