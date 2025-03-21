import React, { useState } from 'react';
import { Home, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Terms & Conditions:",
      content: "Here are Patti Circle rules and a step-by-step guide on how to play Patti Circle game:"
    },
    {
      title: "Patti Circle:",
      content: "Patti Circle is the flagship brand Himalayaan International. Here are Patti Circle rules and a step-by-step guide on how to play Patti Circle game:"
    },
    {
      title: "Eligibility:",
      listItems: [
        "The Contest(s) are open only to persons above the age of 18 years.",
        "The Contest(s) are open only to persons, currently residing in India.",
        "Persons who wish to participate must have a valid email address.",
        "Only those Participants who have successfully registered on the Patti Circle shall be eligible to participate in the Contest and win prizes."
      ]
    },
    {
      title: "Risk:",
      content: "Once Bet done, no refund will be entertained."
    },
    {
      title: "Patti Circle may, at its sole and absolute discretion:",
      listItems: [
        "Restrict, suspend, or terminate any User's access to all or any part of Patti Circle or Patti Circle Platform Services.",
        "Change, suspend, or discontinue all or any part of the Patti Circle Platform Services.",
        "Reject, move, or remove any material that may be submitted by a User.",
        "Move or remove any content that is available on Patti Circle Platform.",
        "Establish general practices and limits concerning use of Patti Circle Platform."
      ]
    },
    {
      title: "User Conduct:",
      content: "Users agree to abide by these Terms and Conditions and all other rules, regulations and terms of use of the Website. In the event User does not abide by these Terms and Conditions and all other rules, regulations and terms of use, Patti Circle, at its sole and absolute discretion, take necessary remedial action, including but not limited to:",
      listItems: [
        "Restricting, Suspending, or Terminating any User's access to all or any part of Patti Circle Services.",
        "Deactivating or deleting a user's account and all related information and files on the account. Any amount remaining unused in the User's Unutilised Account or Winnings Account (subject to deduction of applicable TDS with effect from 1st April 2023 as applicable) on the date of deactivation or deletion shall be transferred to the User's bank account on record with Patti Circle subject to a processing fee (if any) applicable on such transfers as set out herein. or",
        "Refraining from awarding any prize(s) to such User"
      ],
      subListItems: [
        "Users agree to provide true, accurate, current and complete information at the time of registration and at all other times (as required by Patti Circle). Users further agree to update and keep updated their registration information.",
        "Users agree and acknowledge that the address related details provided, if any, by the user shall be treated as \"Address on record\" of the user for the purposes of Goods and Service Tax Act. In the event of the change in such details, the user shall promptly update his/her profile on the Patti Circle platform or write to Patti Circle at Contact Us.",
        "A User shall not register or operate more than one User account with Patti Circle.",
        "Users are responsible for maintaining the confidentiality of their accounts and passwords. Users agree to immediately notify Patti Circle of any unauthorized use of accounts or any other breach of security.",
        "Users agree to exit/log-out of their accounts at the end of each session. Patti Circle shall not be responsible for any loss or damage that may result if the User fails to comply with these requirements.",
        "Users agree not to use cheats, exploits, automation, software, bots, hacks or any unauthorised third-party software designed to modify or interfere with Patti Circle Services and/or Patti Circle experience or assist in such activity.",
        "Users agree not to copy, modify, rent, lease, loan, sell, assign, distribute, reverse engineer, grant a security interest in, or otherwise transfer any right to the technology or software underlying Patti Circle or Patti Circle's Services.",
        "Users agree that without Patti Circle's express written consent, they shall not modify or cause to be modified any files or software that are part of Patti Circle's Services.",
        "User shall not to publish any content that is patently false and untrue, and is written or published in any form, with the intent to mislead or harass a person, entity or agency for financial gain or to cause any injury to any person.",
        "Use of Patti Circle is subject to existing laws and legal processes. Nothing contained in these Terms and Conditions shall limit Patti Circle's right to comply with governmental, court, and law-enforcement requests or requirements relating to Users' use of Patti Circle."
      ]
    },
    {
      title: "Transfers:",
      content: "Players can cash anytime their coins by giving request to Patti Circle. Within 24 Hours their coins in cash will be credited in their given account to Patti Circle. Request minimum of 500 Coins or more will be acceptable and not less than 500 coins."
    },
    {
      title: "Taxes Payable:",
      listItems: [
        "All prizes shall be subject to deduction of tax (\"TDS\") as per the Income Tax Act 1961. With effect from 1st April 2023, TDS of 30% shall be deducted on Net Winnings (NW) on each withdrawal request placed by the user. With effect from 1st May 2023, Net Winnings shall be calculated as follows:",
        "In the event, a user does not withdraw any of his winnings during a financial year and has Net Winning balance as at 31 March of each year, then TDS of 30% shall be deducted on such Net Winnings balance from the user's Winning Account as on 31 March. In case of any revisions by the Government of India to the aforementioned rate or the definition of Net Winnings in the future, TDS will be deducted by Patti Circle in accordance with the then current prescribed TDS rate and the revised definition of Net Winnings. Winners will be provided TDS certificates in respect of such tax deductions. The Winners shall be responsible for payment of any other applicable taxes, including but not limited to, income tax, gift tax, etc. in respect of the Net Winnings. Patti Circle shall not in any manner be responsible for user's individual tax matters."
      ]
    },
    {
      title: "General Conditions:",
      content: "If it comes to the notice of Patti Circle that any governmental, statutory or regulatory compliances or approvals are required for conducting any Contest(s) or if it comes to the notice of Patti Circle that conduct of any such Contest(s) is prohibited, then Patti Circle shall withdraw and / or cancel such Contest(s) without prior notice to any Participants or winners of any Contest(s). Users agree not to make any claim in respect of such cancellation or withdrawal of the Contest or Contest it in any manner.",
      additionalContent: "Employees are not be eligible to participate in any Public Contest(s)."
    },
    {
      title: "Contact:",
      content: "Objectives may contact us if any quarry they have, in Contact us link."
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
            Terms & Conditions
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Terms & Conditions Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          {sections.map((section, index) => (
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
                  <h2 className="text-lg md:text-xl font-semibold">{section.title}</h2>
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
                    {section.content && (
                      <p className="text-base md:text-lg text-red-950 mb-3">{section.content}</p>
                    )}
                    
                    {section.listItems && (
                      <ul className="ml-6 space-y-2">
                        {section.listItems.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                            className="flex gap-3 text-red-950"
                          >
                            <div className="min-w-4 h-4 mt-1.5 rounded-full bg-red-600"></div>
                            <div className="text-base">{item}</div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    
                    {section.subListItems && (
                      <ol className="ml-12 mt-4 space-y-2 list-decimal">
                        {section.subListItems.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.03 * i }}
                            className="text-red-950 pl-2"
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ol>
                    )}
                    
                    {section.additionalContent && (
                      <p className="text-base md:text-lg text-red-950 mt-3">{section.additionalContent}</p>
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

export default TermsConditions;