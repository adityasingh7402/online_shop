import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BettingRestrictedOverlay from './BettingRestrictedOverlay';
import { AnimatePresence } from 'framer-motion';

const SiteWideRestrictionGuard = ({ children }) => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [currentRestriction, setCurrentRestriction] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkRestriction();
    
    // Check every minute
    const interval = setInterval(checkRestriction, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkRestriction = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getBettingRestrictions`);
      const data = await response.json();
      
      if (data.success && data.currentRestriction) {
        const restriction = data.currentRestriction;
        const now = new Date();
        const start = new Date(restriction.startTime);
        const end = new Date(restriction.endTime);
        
        const isCurrentlyRestricted = restriction.isActive && now >= start && now <= end;
        const isSiteWide = isCurrentlyRestricted && restriction.restrictionType === 'site_wide';
        
        setIsRestricted(isSiteWide);
        setCurrentRestriction(isSiteWide ? restriction : null);
      } else {
        setIsRestricted(false);
        setCurrentRestriction(null);
      }
    } catch (error) {
      console.error('Error checking site restriction:', error);
      setIsRestricted(false);
      setCurrentRestriction(null);
    }
    
    setLoading(false);
  };

  // Don't apply restrictions to admin pages and home page (home handles it internally)
  if (router.pathname === '/' || router.pathname.startsWith('/admin')) {
    return children;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isRestricted && currentRestriction) {
    return (
      <AnimatePresence>
        <BettingRestrictedOverlay restriction={currentRestriction} />
      </AnimatePresence>
    );
  }

  return children;
};

export default SiteWideRestrictionGuard;
