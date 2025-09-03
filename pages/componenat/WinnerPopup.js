import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Heart, Star } from 'lucide-react';

const WinnerPopup = ({ randomNum, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial'); // initial, glowing, revealing, result
  const [userResult, setUserResult] = useState(null);
  const [pendingBets, setPendingBets] = useState([]);
  const [winningCard, setWinningCard] = useState(null);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [oldCards, setOldCards] = useState({ card1: null, card2: null, card3: null });

  useEffect(() => {
    const checkForResults = async () => {
      try {
        console.log('🔍 Checking for results...');
        
        // Check localStorage for pending bets
        const stored = localStorage.getItem('pendingBets');
        console.log('📦 Stored pending bets:', stored);
        if (!stored) {
          console.log('❌ No stored pending bets found');
          return;
        }

        const pendingData = JSON.parse(stored);
        console.log('📊 Pending data:', pendingData);
        if (pendingData.hasShownResult) {
          console.log('✅ Result already shown, skipping');
          return;
        }

        // Fetch user's recent orders to check results
        const token = JSON.parse(localStorage.getItem('myuser'))?.token;
        if (!token) {
          console.log('❌ No user token found');
          return;
        }

        console.log('🌐 Fetching winner info from API...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getwinnerinfo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        const data = await response.json();
        console.log('📡 API Response:', data);
        const orders = data.OrdersInfo;
        const gameResult = data.GameResultInfo;
        console.log('📋 Orders received:', orders);
        console.log('🎮 Game Result:', gameResult);

        // Check if any orders have been resolved (not pending)
        const resolvedOrders = orders.filter(order => order.winning !== 'Pending');
        if (resolvedOrders.length === 0) {
          console.log('❌ No resolved orders found');
          return;
        }

        // Check if we have game result data
        if (!gameResult) {
          console.log('❌ No game result found for today');
          return;
        }

        // Use game result data for accurate card information
        const finalCards = {
          card1: gameResult.card1,
          card2: gameResult.card2,
          card3: gameResult.card3
        };
        
        const winningCardNum = gameResult.winningCard;
        
        setOldCards(finalCards);
        
        console.log('✅ Game result cards:', finalCards);
        console.log('🏆 Winning card:', winningCardNum);
        console.log('📍 Winning position:', gameResult.winningPosition);

        // Calculate user results
        const userWins = resolvedOrders.filter(order => order.winning === 'Win');
        const totalWin = userWins.reduce((sum, order) => sum + (order.amount * 2 - order.amount * 0.2), 0);

        setPendingBets(resolvedOrders);
        setWinningCard(winningCardNum);
        setTotalWinnings(Math.floor(totalWin));
        setUserResult(userWins.length > 0 ? 'win' : 'loss');
        
        // Show popup after 2 seconds
        setTimeout(() => {
          setShowPopup(true);
          startAnimationSequence();
        }, 2000);

        // Mark as shown
        const updatedPending = { ...pendingData, hasShownResult: true };
        localStorage.setItem('pendingBets', JSON.stringify(updatedPending));

      } catch (error) {
        console.error('Error checking results:', error);
      }
    };

    checkForResults();
  }, []);

  const startAnimationSequence = () => {
    // Phase 1: Show cards with glow
    setAnimationPhase('glowing');
    
    setTimeout(() => {
      // Phase 2: Reveal winner
      setAnimationPhase('revealing');
    }, 4000); // Increased from 3000 to 4000 (3s -> 4s)

    setTimeout(() => {
      // Phase 3: Show result
      setAnimationPhase('result');
    }, 6000); // Increased from 5000 to 6000 (5s -> 6s)
  };

  const handleClose = () => {
    setShowPopup(false);
    if (onClose) onClose();
  };

  const getCardPosition = (cardNum) => {
    if (cardNum == oldCards.card1) return 1;
    if (cardNum == oldCards.card2) return 2;
    if (cardNum == oldCards.card3) return 3;
    return 1;
  };

  const Sparkle = ({ delay = 0, position }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0.5], 
        rotate: [0, 180, 360] 
      }}
      transition={{ 
        duration: 1.5, 
        delay,
        repeat: Infinity,
        repeatDelay: 0.5 
      }}
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
    </motion.div>
  );

  const HeartFloat = ({ delay = 0, position }) => (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -50, opacity: 0 }}
      transition={{ duration: 2, delay, repeat: Infinity }}
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
    </motion.div>
  );

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-full max-w-4xl mx-2 sm:mx-4 bg-gradient-to-br from-red-900 via-red-800 to-red-950 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center py-4 sm:py-6 md:py-8 relative overflow-hidden">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 px-4"
            >
              <Trophy className="mx-auto text-yellow-400 mb-2 sm:mb-4" size={32} />
              <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white font-serif leading-tight">
                Winner Announcement
              </h1>
              <p className="text-yellow-200 text-sm sm:text-base lg:text-lg mt-1 sm:mt-2">
                The moment of truth has arrived!
              </p>
            </motion.div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-16 h-16 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute top-12 right-12 w-12 h-12 border-2 border-red-300 rounded-full"></div>
              <div className="absolute bottom-8 left-16 w-8 h-8 border-2 border-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="px-2 sm:px-4 md:px-8 pb-4 sm:pb-6 md:pb-8">
            <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-6 md:mb-8 flex-wrap">
              {/* Card 1 */}
              {oldCards.card1 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: animationPhase === 'revealing' && oldCards.card1 != winningCard ? 0 : 1,
                    y: 0,
                    scale: animationPhase === 'revealing' && oldCards.card1 == winningCard ? 1.3 : 1,
                    boxShadow: animationPhase === 'glowing' ? 
                      '0 0 30px rgba(255, 215, 0, 0.8)' : 
                      animationPhase === 'revealing' && oldCards.card1 == winningCard ?
                      '0 0 50px rgba(255, 215, 0, 1)' : '0 0 10px rgba(255, 255, 255, 0.3)',
                    display: (animationPhase === 'revealing' || animationPhase === 'result') && oldCards.card1 != winningCard ? 'none' : 'block'
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.5,
                    boxShadow: { duration: 0.5 }
                  }}
                  className="relative"
                >
                  <div className="w-28 h-40 bg-white rounded-lg shadow-xl overflow-hidden">
                    <img 
                      src={`/card/card-${oldCards.card1}.png`} 
                      alt="Card 1" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load card image:', `/card/card-${oldCards.card1}.png`);
                        e.target.src = '/card/card-1.png'; // fallback image
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Card 2 */}
              {oldCards.card2 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: animationPhase === 'revealing' && oldCards.card2 != winningCard ? 0 : 1,
                    y: 0,
                    scale: animationPhase === 'revealing' && oldCards.card2 == winningCard ? 1.3 : 1,
                    boxShadow: animationPhase === 'glowing' ? 
                      '0 0 30px rgba(255, 215, 0, 0.8)' : 
                      animationPhase === 'revealing' && oldCards.card2 == winningCard ?
                      '0 0 50px rgba(255, 215, 0, 1)' : '0 0 10px rgba(255, 255, 255, 0.3)',
                    display: (animationPhase === 'revealing' || animationPhase === 'result') && oldCards.card2 != winningCard ? 'none' : 'block'
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.7,
                    boxShadow: { duration: 0.5 }
                  }}
                  className="relative"
                >
                  <div className="w-28 h-40 bg-white rounded-lg shadow-xl overflow-hidden">
                    <img 
                      src={`/card/card-${oldCards.card2}.png`} 
                      alt="Card 2" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load card image:', `/card/card-${oldCards.card2}.png`);
                        e.target.src = '/card/card-2.png'; // fallback image
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Card 3 */}
              {oldCards.card3 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: animationPhase === 'revealing' && oldCards.card3 != winningCard ? 0 : 1,
                    y: 0,
                    scale: animationPhase === 'revealing' && oldCards.card3 == winningCard ? 1.3 : 1,
                    boxShadow: animationPhase === 'glowing' ? 
                      '0 0 30px rgba(255, 215, 0, 0.8)' : 
                      animationPhase === 'revealing' && oldCards.card3 == winningCard ?
                      '0 0 50px rgba(255, 215, 0, 1)' : '0 0 10px rgba(255, 255, 255, 0.3)',
                    display: (animationPhase === 'revealing' || animationPhase === 'result') && oldCards.card3 != winningCard ? 'none' : 'block'
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.9,
                    boxShadow: { duration: 0.5 }
                  }}
                  className="relative"
                >
                  <div className="w-28 h-40 bg-white rounded-lg shadow-xl overflow-hidden">
                    <img 
                      src={`/card/card-${oldCards.card3}.png`} 
                      alt="Card 3" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load card image:', `/card/card-${oldCards.card3}.png`);
                        e.target.src = '/card/card-3.png'; // fallback image
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Winner Announcement */}
            <AnimatePresence>
              {animationPhase === 'revealing' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-4 sm:mb-6 px-4"
                >
                  <motion.h2
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: 3 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-2"
                  >
                    🎉 Lucky Card Winner 🎉
                  </motion.h2>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">
                    Card {getCardPosition(winningCard)}
                  </div>
                  <div className="flex justify-center mb-2 sm:mb-4">
                    <img 
                      src={`/card/card-${winningCard}.png`} 
                      alt={`Winning Card ${winningCard}`}
                      className="w-16 h-22 sm:w-20 sm:h-28 md:w-24 md:h-32 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="text-sm sm:text-base md:text-lg text-yellow-200">
                    Winning Card Number: {winningCard}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result Section */}
            <AnimatePresence>
              {animationPhase === 'result' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative text-center"
                >
                  {userResult === 'win' ? (
                    <div className="relative">
                      {/* Celebration Effects */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                          <Sparkle 
                            key={i} 
                            delay={i * 0.1} 
                            position={{
                              x: Math.random() * 100,
                              y: Math.random() * 100
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Golden Glow Background */}
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            '0 0 50px rgba(255, 215, 0, 0.5)',
                            '0 0 100px rgba(255, 215, 0, 0.8)',
                            '0 0 50px rgba(255, 215, 0, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-red-900 rounded-2xl p-4 sm:p-6 md:p-8 mx-auto max-w-xs sm:max-w-sm md:max-w-md"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: 4 }}
                        >
                          <Trophy size={32} className="sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4" />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-2 sm:mb-4">🎊 CONGRATULATIONS! 🎊</h3>
                        <p className="text-lg sm:text-xl mb-2 sm:mb-4">You Won!</p>
                        <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">₹{totalWinnings}</div>
                        <p className="text-xs sm:text-sm opacity-80 capitalize">
                          {pendingBets.filter(b => b.winning === 'Win').length} winning bet's
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Hearts floating up */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                          <HeartFloat 
                            key={i} 
                            delay={i * 0.3} 
                            position={{
                              x: Math.random() * 100,
                              y: 70 + Math.random() * 30
                            }}
                          />
                        ))}
                      </div>

                      {/* Red themed result */}
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            '0 0 30px rgba(239, 68, 68, 0.5)',
                            '0 0 60px rgba(239, 68, 68, 0.8)',
                            '0 0 30px rgba(239, 68, 68, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-2xl p-4 sm:p-6 md:p-8 mx-auto max-w-xs sm:max-w-sm md:max-w-md"
                      >
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 1, repeat: 3 }}
                        >
                          <Heart size={48} className="sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4" fill="currentColor" />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Better Luck Next Time! 🍀</h3>
                        <p className="text-base sm:text-lg mb-1 sm:mb-2">Don't give up!</p>
                        <p className="text-xs sm:text-sm opacity-80 capitalize">
                          {pendingBets.length} bet's placed
                        </p>
                        <p className="text-yellow-200 mt-2 sm:mt-4 text-xs sm:text-sm">
                          Fortune favors the brave - try again tomorrow!
                        </p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <AnimatePresence>
              {animationPhase === 'result' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-4 sm:mt-6 md:mt-8 px-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:from-yellow-300 hover:to-yellow-500 transition-all text-sm sm:text-base w-full sm:w-auto max-w-xs"
                  >
                    Continue Playing
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinnerPopup;
