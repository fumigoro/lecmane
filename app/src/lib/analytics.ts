import { TextBook } from '../types/global';
import ReactGA from 'react-ga4';

/**
 * Google Analytics に教科書検索ボタンクリックイベントを送信する
 */
export const sendBookSearchEvent = (textbook: TextBook, serviceName: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  ReactGA.event({
    category: 'textbook_button_book',
    action: 'click',
    label: `${textbook.title} ${textbook.isbn}`
  });
  ReactGA.event({
    category: 'textbook_button_service',
    action: 'click',
    label: serviceName
  });
};
