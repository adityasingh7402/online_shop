import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Calendar } from 'lucide-react';

const BettingRestrictedOverlay = ({ restriction, onClose }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center text-white"
          >
            <Shield size={32} className="mr-3" />
            <div className="text-center">
              <h2 className="text-xl font-bold">Betting Restricted</h2>
              <p className="text-red-100 text-sm">Currently Unavailable</p>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          {/* Main Message */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <p className="text-gray-800 text-base leading-relaxed">
                {restriction?.customMessage || "Betting is not available right now. Please come back later."}
              </p>
            </div>
          </motion.div>

          {/* Available After Info */}
          {restriction?.endTime && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-center text-gray-700 mb-2">
                <Clock size={20} className="mr-2 text-red-600" />
                <span className="font-medium">
                  {restriction?.availableAfterMessage || "Betting will be available after"}
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-lg font-bold text-red-600">
                  <Calendar size={18} className="mr-2" />
                  {formatDateTime(restriction.endTime)}
                </div>
              </div>
            </motion.div>
          )}

          {/* Status Indicator */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-600"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Restriction is currently active</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-gray-50 px-6 py-4"
        >
          <div className="text-center text-sm text-gray-600">
            <p>Thank you for your understanding. Please check back later.</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BettingRestrictedOverlay;
