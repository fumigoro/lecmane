import { useEffect, useState } from 'react';
import { Calender, FullClass } from '../types/global';
import { getCalender } from '../lib/s3io';
import { getSchoolYear } from '../lib/main';

const getCalenderKey = (date: Date) => {
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

/**
 * 学年暦情報を取得するフック
 * 日付（Date）からの取得か、講義情報と回数からの取得が可能
 * @param option
 * @returns
 */
const useDateInfo = (option: Date | { fullClass: FullClass; classCount: number }) => {
  if (option instanceof Date) {
    return useDateInfoByDate(option);
  }
  return useDateInfoByClass(option.fullClass, option.classCount);
};

export default useDateInfo;

/**
 * 特定日付のDateオブジェクトから日付情報を取得する場合
 * @param date
 * @returns
 */
const useDateInfoByDate = (date: Date) => {
  const [calender, setCalender] = useState<Calender | undefined | null>(undefined);

  useEffect(() => {
    const schoolYear = getSchoolYear(date);
    getCalender(schoolYear)
      .then((c) => {
        setCalender(c);
      })
      .catch((e) => {
        setCalender(null);
      });
  }, [date]);

  // 休日の場合はholidayを返す
  const isHoliday = date.getDay() === 0 || date.getDay() === 6;
  if (isHoliday) {
    return 'holiday';
  }

  // fetchできなかった場合
  if (calender === null) return 'nodata';

  // fetchの応答待ち
  if (!calender) return undefined;

  const key = getCalenderKey(date);
  const dateInfo = calender[key];

  // 取得したデータ内に当該日のデータが無い場合（通常はありえない）
  if (!dateInfo) return 'nodata';

  return dateInfo;
};

/**
 * 講義情報と回数から日付情報を取得する場合
 * @param fullClass
 * @param classCount
 * @returns
 */
const useDateInfoByClass = (fullClass: FullClass, classCount: number) => {
  const [calender, setCalender] = useState<Calender | undefined | null>(undefined);
  useEffect(() => {
    const schoolYear = fullClass.year;
    getCalender(schoolYear)
      .then((c) => {
        setCalender(c);
      })
      .catch((e) => {
        setCalender(null);
      });
  }, [fullClass]);

  // fetchできなかった場合
  if (calender === null) return 'nodata';

  // fetchの応答待ち
  if (!calender) return undefined;

  // calenderを配列に変換
  const keys = Object.keys(calender);
  const dateInfoList = keys.map((k) => calender[k]);
  // idの1文字目
  const semesterId = fullClass.id.charAt(0);
  const dateInfo = dateInfoList.find(
    (d) =>
      d.count === classCount && d.semester === semesterId && d.schoolWeekday === fullClass.weekday.replace('曜日', '')
  );
  if (!dateInfo) {
    return 'nodata';
  }
  return dateInfo;
};
