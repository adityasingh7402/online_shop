import React, { useState } from 'react';
import { Home, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HowToPlay = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const playSteps = [
    {
      title: "The Objective:",
      content: "Understanding the basic objective of Patti Circle Game.",
      listItems: [
        "Patti Circle is once in a day Bet game. The Bet starts daily from 6am early in the morning to 11pm Midnight. The bet result will be shown in your account after one hour from the Bet time closed.",
        "To start the Bet, Player has to invest their Coins in Bet. Players can take coins as much as they want from Patti Circle by making request of it on. The coins are safe and may be redeemed any time by giving request to Patti Circle.",
        "In Patti Circle game, the objective has to guess which one is lucky card with the best 3 cards given by Patti Circle. Players bet on the strength of their mind/experience/luck and skill. The player with hit lucky card wins the game."
      ]
    },
    {
      title: "Choose Your Lucky Card Number:",
      content: "Select lucky card from the given three cards. The player click with lucky number becomes winner."
    },
    {
      title: "Place the Bet Amount:",
      content: "Before the bet start, each player contributes a predetermined number of coins to the pot. The pot is the central area where all wagers are placed."
    },
    {
      title: "Guess the Card:",
      content: "The player has to guess the lucky card from the given three cards."
    },
    {
      title: "Winner:",
      content: "After winning the game, coins will be credited their Patti Circle's account."
    },
    {
      title: "Cancellation:",
      content: "Once Bet done, cancellation will not do in any condition."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white text-white relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      {/* Navigation button */}
      <motion.div 
        className="fixed top-4 right-4 md:top-8 md:right-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/">
          <a className="group flex items-center gap-2 bg-red-900 hover:bg-white text-white hover:text-red-900 px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/20">
            <Home size={20} className="transition-transform group-hover:scale-110" />
            <span className="font-medium hidden md:inline">Go Back</span>
          </a>
        </Link>
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative z-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-red-700">
            How to Play Patti Circle Game
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </motion.div>

        {/* How to Play Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto"
        >
          {playSteps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="mb-6"
            >
              <motion.div
                className={`p-4 md:p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  expandedIndex === index 
                    ? "bg-white text-red-900 shadow-xl" 
                    : "bg-red-900/80 hover:bg-red-800 text-white shadow-md hover:shadow-lg"
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleExpand(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-xl font-semibold">{step.title}</h2>
                  {expandedIndex === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>

                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    {step.content && !step.listItems && (
                      <p className="text-base md:text-lg text-red-950 ml-5">{step.content}</p>
                    )}
                    
                    {step.listItems && (
                      <>
                        {step.content && (
                          <p className="text-base md:text-lg text-red-950 mb-3">{step.content}</p>
                        )}
                        <ul className="space-y-3 ml-5">
                          {step.listItems.map((item, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i }}
                              className="flex gap-3 text-red-950"
                            >
                              <div className="min-w-4 h-4 mt-1.5 rounded-full bg-red-600"></div>
                              <div className="text-base">{item}</div>
                            </motion.li>
                          ))}
                        </ul>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cards decoration */}
        <motion.div 
          className="hidden lg:block absolute -left-24 top-1/4"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="w-48 h-64 rounded-lg border-2 border-red-500 transform rotate-12"></div>
        </motion.div>
        
        <motion.div 
          className="hidden lg:block absolute -right-16 bottom-1/4"
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-48 h-64 rounded-lg border-2 border-red-500 transform -rotate-12"></div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div 
        className="text-center text-sm text-gray-400 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>Play responsibly. Terms and conditions apply.</p>
      </motion.div>
    </div>
  );
};

export default HowToPlay;