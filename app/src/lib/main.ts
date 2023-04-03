import {
  amber,
  blue,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
} from '@mui/material/colors';
import { SEMESTER } from '../types/filter/Semester';
import { Year } from '../types/filter/Year';

export const zen2han = (text: string) => {
  let result = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  result = result.replace(/（/g, '(');
  result = result.replace(/）/g, ')');
  return result;
};

/**
 * テキスト内の半角数字を全角に置換する
 * @param text
 * @returns
 */
export const hanNumber2zenNumber = (text: string) => {
  let result = text.replace(/[0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
  return result;
};

export const removeSpace = (text: string) => {
  return text.replace(/[\s　]/g, '');
};

export const shortRoomName = (text: string) => {
  let short = zen2han(text);
  short = removeSpace(short);
  return short;
};

/**
 * 年度を取得する
 * @param date
 * @returns
 */
export const getSchoolYear = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  if (month >= 3) {
    return year as Year;
  } else {
    return (year - 1) as Year;
  }
};

/**
 * 学期を取得する
 * @param date
 * @returns
 */
export const getSemester = (date: Date) => {
  const month = date.getMonth() + 1;
  if (3 <= month && month <= 8) {
    return SEMESTER.SPRING;
  } else {
    return SEMESTER.FALL;
  }
};

/**
 * テキストをクリップボードにコピーする
 *
 * LIFFブラウザではclipboard.writeTextが使えないため、execCommandを使用する
 * @param text
 * @returns
 */
export const copyToClipboard = (text: string) => {
  const rootElement = document.querySelector('#root');
  if (!rootElement) return;
  const targetElement = document.createElement('textarea');
  targetElement.value = text;
  targetElement.style.position = 'absolute';
  targetElement.style.top = '100vh';
  rootElement.appendChild(targetElement);
  targetElement.select();

  console.log(document.execCommand('copy'));

  rootElement.removeChild(targetElement);
};

/**
 * 学部名からカテゴリ色を取得する
 * @param category
 * @returns
 */
export const getCategoryColor = (category: string) => {
  const categoryColors = [
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    brown,
    lightGreen,
    amber,
    yellow,
    orange,
    deepOrange
  ];
  return categoryColors[category.charCodeAt(0) % categoryColors.length];
};
