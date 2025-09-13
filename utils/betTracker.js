/**
 * Helper functions to track user's bets for the winner popup using database
 */

/**
 * Store bet information in database when user places a bet
 * @param {Object} bet - Bet information
 * @param {string} bet.orderId - Unique order ID
 * @param {string} bet.randomNum - Card number (1-13)
 * @param {string} bet.cardno - Card position (1, 2, or 3)
 * @param {number} bet.amount - Bet amount
 * @param {string} bet.email - User email
 */
export const trackBet = async (bet) => {
  try {
    const { orderId, randomNum, cardno, amount, email } = bet;
    
    if (!email) {
      console.error('Email is required to track bet');
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createWinnerNotification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        orderData: {
          orderId: parseInt(orderId) || orderId,  // Ensure orderId is a number
          randomNum: parseInt(randomNum),
          cardno: parseInt(cardno),
          amount: parseFloat(amount)
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error tracking bet:', errorData.error);
    }
    
  } catch (error) {
    console.error('Error tracking bet:', error);
  }
};

/**
 * Check if user has pending winner notifications
 * @param {string} userToken - User's JWT token
 * @returns {Promise<boolean>}
 */
export const hasPendingResults = async (userToken) => {
  try {
    if (!userToken) return false;
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getPendingWinnerNotification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: userToken })
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.hasPendingNotification;
  } catch (error) {
    console.error('Error checking pending results:', error);
    return false;
  }
};

/**
 * Mark winner animation as shown
 * @param {string} userToken - User's JWT token
 * @param {string} notificationId - Notification ID
 */
export const markResultsAsShown = async (userToken, notificationId) => {
  try {
    if (!userToken || !notificationId) {
      console.error('Token and notificationId are required to mark results as shown');
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/markWinnerAnimationShown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        token: userToken, 
        notificationId 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error marking results as shown:', errorData.error);
    }
  } catch (error) {
    console.error('Error marking results as shown:', error);
  }
};

/**
 * Clear bet tracking data (legacy function for backward compatibility)
 * @deprecated Use database-based tracking instead
 */
export const clearBetTracking = () => {
  // Clear localStorage for backward compatibility
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('pendingBets');
  }
};
