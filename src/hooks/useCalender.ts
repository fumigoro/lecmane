import { useEffect, useState } from 'react';
import { Calender } from '../types/global';
import { getCalender } from '../lib/s3io';
import { getSchoolYear } from '../lib/main';

const getCalenderKey = (date: Date) => {
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const useCalender = (date: Date) => {
  const [calender, setCalender] = useState<Calender | undefined | null>(undefined);

  // 休日の場合はholidayを返す
  const isHoliday = date.getDay() === 0 || date.getDay() === 6;
  if (isHoliday) {
    return 'holiday';
  }

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

export default useCalender;
