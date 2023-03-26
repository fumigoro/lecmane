import { AVAILABLE_YEARS } from '../classes.api';
import filterConfig from '../json/filter_config.json';
import { Key, StorageIO } from './storage';
import { Calender, Class, FullClass } from '../types/global';
import { Room } from '../rooms.api';
import { Year } from '../types/filter/Year';

// S3上のデータを取得する関数

/**
 * サーバー上のデータの最終更新日時を取得する
 * @params cache 前回のリクエストから日が浅い場合、localstorageに記録されたものを返すかどうか
 * @return 日時とコミットハッシュ
 */
export const getClassDataUpdateAt = async (cache = true) => {
  const lastFetchedString = StorageIO.get(Key.LAST_FETCHED);
  const dataTimestampString = StorageIO.get(Key.DATA_TIMESTAMP);
  // キャッシュ利用時
  if (cache && lastFetchedString && dataTimestampString) {
    const lastFetched = new Date(lastFetchedString);
    const dataTimestamp = new Date(dataTimestampString);
    const now = new Date();
    // 最後の更新確認から30分以内の場合はキャッシュを返す
    if (now.getTime() - lastFetched.getTime() < 30 * 60 * 1000) {
      return { serverDataTimestamp: dataTimestamp };
    }
  }
  // Fetchして取得しに行く
  const fetchUrl = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/modified.txt`;
  try {
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    const responseText = await response.text();
    const timestamp: string = responseText.split('\n')[0];
    if (Number.isNaN(Number(timestamp))) {
      throw new Error(`Invalid timestamp.`);
    }
    // Timestampは秒からミリ秒へ変換後、Dateへ
    const serverDataTimestamp = new Date(Number(timestamp) * 1000);
    // LocalStorageに取得時刻を記録
    StorageIO.set(Key.LAST_FETCHED, new Date().toISOString());
    // サーバーから得た最終更新日時を記録
    StorageIO.set(Key.DATA_TIMESTAMP, serverDataTimestamp.toISOString());
    return { serverDataTimestamp };
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch: ${fetchUrl}`);
  }
};

/**
 * １つの学部の1つの年の講義リストを取得する
 */
const getClassListOne = async (year: number, facultyId: string) => {
  const fetchUrl = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/${year}/list/${facultyId}.json`;
  try {
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    const body = await response.json();
    const { main }: { main: Class[] } = body;
    console.log(`fetch ${year} ${facultyId}.json`);
    return main;
  } catch (error) {
    window.alert(`データの取得に失敗しました。${year}-${facultyId}${error}`);
    throw error;
  }
};

/**
 * 講義リストを全て取得する
 */
export const getClassList = async () => {
  // サーバー上データの最終更新日時を取得
  const { serverDataTimestamp } = await getClassDataUpdateAt();
  // 学部のIDリスト
  const faculties = filterConfig.organization.filter((item) => item.type === 'faculty' && item.id !== 'all');
  const fetchTasks = AVAILABLE_YEARS.flatMap((year) => {
    return faculties.map((fac) => getClassListOne(year, fac.id));
  });
  return Promise.allSettled(fetchTasks).then((results) => {
    // resultを順に確認し、成功してデータがあるものだけを一つの配列にまとめる
    const successList = results.flatMap((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return [];
    });
    // キャッシュ保存
    StorageIO.set(Key.CLASS_LIST, JSON.stringify(successList));
    StorageIO.set(Key.LAST_FETCHED, new Date().toISOString());
    StorageIO.set(Key.DATA_TIMESTAMP, serverDataTimestamp.toISOString());
    return successList;
  }).catch((error) => {
    window.alert(`データの取得に失敗しました。${error}`);
    return [];
  });
};

/**
 * 指定の年度、IDのシラバスを取得する
 */
export const getSyllabusOne = async (year: Year, id: string) => {
  const fetchUrl = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/${year}/detail/${id}.json`;
  try {
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    const body = await response.json();
    const syllabus: FullClass = body;
    console.log(`fetch ${year} ${id}.json`);
    return syllabus;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRoomSchedule = async (year: Year) => {
  const url = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/${year}/room_schedule.json`;
  try {
    const response = await fetch(url, { cache: 'no-store' });
    const body: { name: string; building: string; search: boolean; schedule: string[][] }[] = await response.json();
    return body.map((b) => new Room(b));
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * 学年暦を取得する
 * @param year
 * @returns
 */
export const getCalender = async (year: Year) => {
  const url = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/${year}/calender.json`;
  try {
    const response = await fetch(url, { cache: 'no-store' });
    const body: Calender = await response.json();
    Object.keys(body).forEach((key) => {
      body[key].date = new Date(key);
    });
    return body;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
