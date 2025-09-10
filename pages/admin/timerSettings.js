import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, RefreshCw, Settings, X, ChevronDown } from "lucide-react";

const TimerSettings = () => {
  const router = useRouter();
  const [users, setUsers] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentSettings, setCurrentSettings] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [customUnit, setCustomUnit] = useState("minutes");
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  
  const predefinedOptions = [
    { label: "1 Min", value: 1, minutes: 1 },
    { label: "2 Min", value: 2, minutes: 2 },
    { label: "3 Min", value: 3, minutes: 3 },
    { label: "5 Min", value: 5, minutes: 5 },
    { label: "10 Min", value: 10, minutes: 10 },
    { label: "Custom", value: "custom", minutes: null }
  ];

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
      fetchCurrentSettings();
    }
  }, [router]);

  const fetchCurrentSettings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getTimerSettings`);
      const data = await response.json();
      
      if (data.success) {
        setCurrentSettings(data.timerSettings);
      }
    } catch (error) {
      console.error('Error fetching timer settings:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedDuration(option);
    if (option.value === "custom") {
      setShowCustomPopup(true);
    }
  };

  const handleCustomSubmit = () => {
    if (!customValue || customValue < 1) {
      toast.error("Please enter a valid duration", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const minutes = customUnit === "hours" 
      ? parseInt(customValue) * 60 
      : parseInt(customValue);

    const customOption = {
      label: `${customValue} ${customUnit}`,
      value: "custom",
      minutes: minutes
    };

    setSelectedDuration(customOption);
    setShowCustomPopup(false);
    setCustomValue("");
    setCustomUnit("minutes");
  };

  const handleTimerUpdate = async () => {
    if (!selectedDuration || !selectedDuration.minutes) {
      toast.error("Please select a duration first", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const data = { 
        durationInMinutes: selectedDuration.minutes,
        updatedBy: users
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateTimerSettings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Timer settings updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        
        setCurrentSettings(result.timerSettings);
        setSelectedDuration(null);
        
        // Refresh the page after successful update
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

  const formatNextAnnouncementTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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
            <Clock size={24} />
            <h1 className="text-xl md:text-2xl font-bold">Timer Settings</h1>
          </motion.div>
        </div>

        {/* Current Settings Display */}
        {currentSettings && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Current Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock size={18} className="text-red-600" />
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {currentSettings.durationInMinutes >= 60 
                    ? `${Math.floor(currentSettings.durationInMinutes / 60)}h ${currentSettings.durationInMinutes % 60}m`
                    : `${currentSettings.durationInMinutes}m`
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings size={18} className="text-red-600" />
                <span className="text-gray-600">Next Announcement:</span>
                <span className="font-medium text-sm">
                  {formatNextAnnouncementTime(currentSettings.nextAnnouncementTime)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timer Options Grid */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Select Timer Duration</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {predefinedOptions.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionSelect(option)}
                className={`cursor-pointer bg-white rounded-lg shadow-md p-6 text-center border-2 transition-all duration-300 hover:shadow-lg ${
                  selectedDuration?.value === option.value ? 'border-red-600 bg-red-50' : 'border-transparent'
                }`}
              >
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {option.value === "custom" ? <Settings size={32} className="mx-auto" /> : option.label}
                </div>
                {option.value !== "custom" && (
                  <div className="text-sm text-gray-600">
                    {option.minutes} minute{option.minutes !== 1 ? 's' : ''}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Duration Display */}
        {selectedDuration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <h2 className="text-lg font-medium text-gray-700 mb-4">Selected Duration</h2>
            
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                borderColor: ['#e5e7eb', '#dc2626', '#e5e7eb']
              }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md border-2 p-6 flex flex-col items-center"
            >
              <Clock size={32} className="text-red-600 mb-2" />
              <p className="text-lg font-bold">{selectedDuration.label}</p>
              <p className="text-gray-600">
                {selectedDuration.minutes} minute{selectedDuration.minutes !== 1 ? 's' : ''}
              </p>
            </motion.div>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTimerUpdate}
              disabled={loading}
              className={`mt-6 flex items-center gap-2 px-8 py-3 rounded-lg shadow-md text-white font-medium transition-all duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : (
                <Clock size={20} />
              )}
              <span>{loading ? "Updating..." : "Update Timer"}</span>
            </motion.button>
          </motion.div>
        )}

        {/* Custom Time Popup */}
        <AnimatePresence>
          {showCustomPopup && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Custom Timer Duration</h3>
                  <button
                    onClick={() => {
                      setShowCustomPopup(false);
                      setCustomValue("");
                      setCustomUnit("minutes");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Duration
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Unit
                    </label>
                    <button
                      onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                    >
                      <span className="capitalize">{customUnit}</span>
                      <ChevronDown size={20} className={`transform transition-transform ${showUnitDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showUnitDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                        >
                          {["minutes", "hours"].map(unit => (
                            <button
                              key={unit}
                              onClick={() => {
                                setCustomUnit(unit);
                                setShowUnitDropdown(false);
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 capitalize first:rounded-t-lg last:rounded-b-lg"
                            >
                              {unit}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowCustomPopup(false);
                        setCustomValue("");
                        setCustomUnit("minutes");
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCustomSubmit}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimerSettings;
