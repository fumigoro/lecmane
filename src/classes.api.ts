import { getClassDataUpdateAt, getClassList, getSyllabusOne } from './lib/s3io';
import { Key, StorageIO } from './lib/storage';
import { ClassSearchQuery } from './types/ClassSearchQuery';
import { Categories } from './types/filter/Category';
import { Flags } from './types/filter/Flag';
import { Organizations } from './types/filter/Organization';

import { Class } from './types/global';

// 講義データが利用可能な年度
export const AVAILABLE_YEARS = [2022, 2021];

class ClassApi {
  // 講義の検索用一覧データ
  private classList: Class[];
  private initialized: boolean = false;

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
      this.initialized = true;
      console.log('Class Api Initialized.');
      return;
    }
    // 更新チェックを行う
    // サーバー上データの最終更新と前回Fetchした際に取得したデータの最終更新を比較
    const { serverDataTimestamp } = await getClassDataUpdateAt();
    const localDataTimestamp = new Date(localDataTimestampString);
    if (serverDataTimestamp > localDataTimestamp) {
      // 更新ある場合は全取得
      this.classList = await getClassList();
      this.initialized = true;
      console.log('Class Api Initialized.');
      return;
    }
    // 更新がなかった場合はキャッシュ使用
    this.classList = JSON.parse(cachedListString);
    this.initialized = true;
    console.log('Class Api Initialized.');
  }

  /**
   * 講義一覧をクエリで絞り込んで返す
   * @param q クエリ
   */
  public async getClasses(q: ClassSearchQuery) {
    if (!this.initialized) {
      await this.initialize();
    }
    let filteredClasses = [...this.classList];
    if (q.id) {
      filteredClasses = filteredClasses.filter((c) => c.id === q.id);
    }
    if (q.year) {
      filteredClasses = filteredClasses.filter((c) => c.year === q.year);
    }
    if (q.title) {
      const words = q.title.split(/[\s　]/g);
      filteredClasses = filteredClasses.filter((c) => {
        let hit = true;
        for (const word of words) {
          if (c.title.indexOf(word) === -1) {
            hit = false;
          }
        }
        return hit;
      });
    }
    if (q.semester) {
      const semesters = ['', '前学期', '後学期', '通年'];
      const semesterString = semesters[Number(q.semester)];
      filteredClasses = filteredClasses.filter((c) => {
        return c.semester.indexOf(semesterString) !== -1;
      });
    }
    if (q.weekday) {
      const w = q.weekday;
      filteredClasses = filteredClasses.filter((c) => {
        return c.weekday.indexOf(w) !== -1;
      });
    }
    if (q.time) {
      const t = String(q.time);
      filteredClasses = filteredClasses.filter((c) => {
        return c.time.indexOf(t) !== -1;
      });
    }
    if (q.grade) {
      filteredClasses = filteredClasses.filter((c) => c.grade === q.grade);
    }
    const courseRegExp = Organizations.Courses.find((c) => c.id === q.course)?.regExp;
    if (courseRegExp) {
      filteredClasses = filteredClasses.filter((c) => c.customId.match(courseRegExp) !== null);
    }
    const departmentRegExp = Organizations.Departments.find((c) => c.id === q.department)?.regExp;
    if (departmentRegExp) {
      filteredClasses = filteredClasses.filter((c) => c.customId.match(departmentRegExp) !== null);
    }
    const facultyRegExp = Organizations.Faculties.find((c) => c.id === q.faculty)?.regExp;
    if (facultyRegExp) {
      filteredClasses = filteredClasses.filter((c) => c.customId.match(facultyRegExp) !== null);
    }
    const categoryRegExp = Categories.find((c) => c.id === q.category)?.regExp;
    if (categoryRegExp) {
      filteredClasses = filteredClasses.filter((c) => c.customId.match(categoryRegExp) !== null);
    }
    q.flags.forEach((flagId) => {
      const r = Flags.find((f) => f.id === flagId)?.regExp;
      if (r) {
        filteredClasses = filteredClasses.filter((c) => c.id.match(r) !== null);
      }
    });
    return filteredClasses;
  }

  /**
   * 指定したIDの指定した年度のシラバスを返す
   * @param year 年度
   * @param id 講義コード
   */
  public async getSyllabus(year: number, id: string) {
    try {
      const syllabus = await getSyllabusOne(year, id);
      return syllabus;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default ClassApi;

export const classApi = new ClassApi();
// classApi.initialize().then(() => {
// });
