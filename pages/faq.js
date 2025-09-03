import React, { useState } from 'react';
import { X, Home, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is Patti Circle Game?",
      answer: "Patti Circle is probably one of the easiest and most entertaining card games. It is known for its simple and easy-to-understand rules. It is played using standard 3-card without jokers by yourself only. This is totally based on one lucky card which you have to choose from given 3 cards."
    },
    {
      question: "Patti Circle Game Online",
      answer: "In Patti Circle, the player with the lucky card number wins the pot. Remember that Patti Circle is a game of skill, experience & luck. These basic Patti Circle rules can help you understand the game but it will take a lot of practice and skills to win. Therefore, it is recommended that you play responsibly and within your limits."
    },
    {
      question: "Why Patti Circle is Better than Others Games",
      answer: "Games have their own unique features and appeal to different audiences. Reasons why some people prefer Patti Circle over all:",
      listItems: [
        { title: "Skill-based:", content: "Patti Circle is considered to be a more skill-based game than other. Patti Circle provides players with a platform to understand strategy well and make decisions based on the cards they are dealt." },
        { title: "More Widely Played:", content: "Patti Circle is a more widely played game than others, particularly in India because of its simple & easy given task. Everybody can play easily this and no need of any kind of special tricks." },
        { title: "How do you play Patti Circle game online?", content: "You can play Patti Circle game online with a Patti Circle mobile app and on your laptop also. The game begins with three cards. You have to choose your lucky card. Once you choose your number, wait for the result from Patti Circle. If you win, the winning coins will be credited in your Patti Circle's account." },
        { title: "Can I play Patti Circle for real cash?", content: "Yes, you can play Patti Circle for real cash online by purchasing its coins. You should learn the game rules well before playing for cash. Learn all the tricks of the game to excel in Patti Circle online." },
        { title: "Which card is the highest in the Patti Circle game?", content: "One lucky card number already will be given on website. Choose/guess one lucky card from given 3 cards on website at which number the lucky card number is." }
      ]
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
            FAQ About Patti Circle Game
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto"
        >
          {faqItems.map((faq, index) => (
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
                  <h2 className="text-lg md:text-xl font-semibold">{faq.question}</h2>
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
                    <p className="text-base md:text-lg text-red-950">{faq.answer}</p>
                    
                    {faq.listItems && (
                      <ul className="mt-4 space-y-3">
                        {faq.listItems.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex gap-3 text-red-950"
                          >
                            <div className="min-w-4 h-4 mt-1.5 rounded-full bg-red-600"></div>
                            <div>
                              <span className="font-semibold">{item.title}</span> {item.content}
                            </div>
                          </motion.li>
                        ))}
                      </ul>
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

export default FAQ;
