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