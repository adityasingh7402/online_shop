import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, RefreshCw, ShieldOff, Calendar, Clock, MessageSquare, Trash2 } from "lucide-react";

const BettingRestrictions = () => {
  const router = useRouter();
  const [users, setUsers] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [restrictions, setRestrictions] = useState([]);
  const [currentRestriction, setCurrentRestriction] = useState(null);
  const [isBettingRestricted, setIsBettingRestricted] = useState(false);
  
  // Form states
  const [customMessage, setCustomMessage] = useState("Betting is not available right now. Please come back later.");
  const [availableAfterMessage, setAvailableAfterMessage] = useState("Betting will be available after");
  const [restrictionType, setRestrictionType] = useState("betting_only");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    
    if (myuser && myuser.token) {
      setUsers(myuser.email);
    }

    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',');

    if (!myuser || !allowedEmails.includes(myuser.email)) {
      router.push('/');
    } else {
      setIsHidden(false);
      fetchCurrentRestrictions();
      setDefaultDateTime();
    }
  }, [router]);

  const setDefaultDateTime = () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    
    // Set default start time to now
    setStartDate(now.toISOString().split('T')[0]);
    setStartTime(now.toTimeString().slice(0, 5));
    
    // Set default end time to 1 hour later
    setEndDate(oneHourLater.toISOString().split('T')[0]);
    setEndTime(oneHourLater.toTimeString().slice(0, 5));
  };

  const fetchCurrentRestrictions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getBettingRestrictions`);
      const data = await response.json();
      
      if (data.success) {
        setRestrictions(data.restrictions);
        setCurrentRestriction(data.currentRestriction);
        setIsBettingRestricted(data.isBettingRestricted);
      }
    } catch (error) {
      console.error('Error fetching betting restrictions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customMessage.trim()) {
      toast.error("Please enter a custom message", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!startDate || !startTime || !endDate || !endTime) {
      toast.error("Please fill in all date and time fields", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const startDateTime = new Date(`${startDate}T${startTime}:00`);
      const endDateTime = new Date(`${endDate}T${endTime}:00`);
      
      const data = { 
        customMessage: customMessage.trim(),
        availableAfterMessage: availableAfterMessage.trim(),
        restrictionType: restrictionType,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        isActive: true,
        updatedBy: users
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateBettingRestrictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Betting restriction created successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        
        await fetchCurrentRestrictions();
        
        // Reset form
        setCustomMessage("Betting is not available right now. Please come back later.");
        setAvailableAfterMessage("Betting will be available after");
        setRestrictionType("betting_only");
        setDefaultDateTime();
      } else {
        toast.error(result.error, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAll = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateBettingRestrictions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("All betting restrictions deactivated!", {
          position: "top-center",
          autoClose: 2000,
        });
        
        await fetchCurrentRestrictions();
      } else {
        toast.error(result.error, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (isHidden) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ToastContainer />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <Shield size={24} />
            <h1 className="text-xl md:text-2xl font-bold">Betting Restrictions</h1>
          </motion.div>
        </div>

        {/* Current Status */}
        {currentRestriction && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mb-8 rounded-lg shadow-md p-6 ${
              isBettingRestricted ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}
          >
            <div className="flex items-center mb-4">
              {isBettingRestricted ? (
                <Shield size={24} className="text-red-600 mr-2" />
              ) : (
                <ShieldOff size={24} className="text-green-600 mr-2" />
              )}
              <h2 className="text-lg font-semibold text-gray-700">
                Current Status: {isBettingRestricted ? "RESTRICTED" : "ACTIVE"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Message:</p>
                <p className="font-medium">{currentRestriction.customMessage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Available After:</p>
                <p className="font-medium">{formatDateTime(currentRestriction.endTime)}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeactivateAll}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                Deactivate All
              </button>
            </div>
          </motion.div>
        )}

        {/* Create New Restriction Form */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Create New Restriction</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restriction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield size={16} className="inline mr-1" />
                Restriction Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  restrictionType === 'betting_only' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="restrictionType"
                    value="betting_only"
                    checked={restrictionType === 'betting_only'}
                    onChange={(e) => setRestrictionType(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-800">Betting Only</div>
                    <div className="text-sm text-gray-600">Block only card selection and betting</div>
                  </div>
                </label>
                
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  restrictionType === 'site_wide' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="restrictionType"
                    value="site_wide"
                    checked={restrictionType === 'site_wide'}
                    onChange={(e) => setRestrictionType(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-800">Site-Wide</div>
                    <div className="text-sm text-gray-600">Block entire site access (except viewing restriction)</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare size={16} className="inline mr-1" />
                Restriction Message
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Enter the message to show users when betting is restricted..."
                required
              />
            </div>

            {/* Available After Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare size={16} className="inline mr-1" />
                Available After Message (Optional)
              </label>
              <input
                type="text"
                value={availableAfterMessage}
                onChange={(e) => setAvailableAfterMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Betting will be available after..."
              />
            </div>

            {/* Date and Time Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Time */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Restriction Start
                </h3>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* End Time */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 flex items-center">
                  <Clock size={16} className="mr-1" />
                  Restriction End
                </h3>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg shadow-md text-white font-medium transition-all duration-300 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <Shield size={20} />
                )}
                <span>{loading ? "Creating..." : "Create Restriction"}</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Restrictions History */}
        {restrictions.length > 0 && (
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Restrictions History</h2>
            
            <div className="space-y-4">
              {restrictions.slice(0, 5).map((restriction, index) => (
                <div 
                  key={restriction._id}
                  className={`p-4 rounded-lg border ${
                    restriction.isActive ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-800">{restriction.customMessage}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      restriction.isActive ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {restriction.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Start: {formatDateTime(restriction.startTime)}</p>
                    <p>End: {formatDateTime(restriction.endTime)}</p>
                    {restriction.createdBy && <p>Created by: {restriction.createdBy}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BettingRestrictions;
