import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * Google Analytics にPageViewイベントを送信する
 */
const useGA4PageEvent = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search
    });
  }, [location]);
};

export default useGA4PageEvent;
