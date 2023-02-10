import { getClassDataUpdateAt, getClassList } from './lib/s3io';
import { Key, StorageIO } from './lib/storage';
import { Class } from './types/global';

// 講義データが利用可能な年度
export const AVAILABLE_YEARS = [2022, 2021];

export type ClassesQuery = {
  id: string;
  customId: string;
  title: string;
  url: string;
  semester: string;
  weekday: string;
  time: string;
  teacher: string;
  department: string;
  category: string;
  field: string;
  room: string;
  type: string;

  grade: number;
  year: number;
  credit: number;
  taked: boolean;
};

class ClassApi {
  // 講義の検索用一覧データ
  private classList: Class[];

  constructor() {
    this.classList = [];
  }

  /**
   * キャッシュの読み込みと必要に応じてサーバーからのデータ取得を行う。
   * インスタンス化後、どのメソッドよりも最初に実行する必要がある。
   * @returns 
   */
  public async initialize() {
    const cachedListString = StorageIO.get(Key.CLASS_LIST);
    const localDataTimestampString = StorageIO.get(Key.DATA_TIMESTAMP);
    // キャッシュが存在しない場合は全取得
    if (!cachedListString || !localDataTimestampString) {
      // 全取得
      this.classList = await getClassList();
      // console.log(this.classList);
      return;
    }
    // 更新チェックを行う
    // サーバー上データの最終更新と前回Fetchした際に取得したデータの最終更新を比較
    const { serverDataTimestamp } = await getClassDataUpdateAt();
    const localDataTimestamp = new Date(localDataTimestampString);
    if (serverDataTimestamp > localDataTimestamp) {
      // 更新ある場合は全取得
      this.classList = await getClassList();
      return;
    }
    // 更新がなかった場合はキャッシュ使用
    this.classList = JSON.parse(cachedListString);
  }

  /**
   * 講義一覧をクエリで絞り込んで返す
   * @param q クエリ
   */
  public getClasses(q: ClassesQuery) {}

  /**
   * 指定したIDの指定した年度のシラバスを返す
   * @param year 年度
   * @param id 講義コード
   */
  public getSyllabus(year: number, id: string) {

  }
}

export default ClassApi;

export const classApi = new ClassApi();
classApi.initialize().then(() => {
  console.log('Class Api Initialized.');
});
