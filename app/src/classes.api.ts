import { getClassDataUpdateAt, getClassList, getSyllabusOne } from './lib/s3io';
import { Key, StorageIO } from './lib/storage';
import { ClassSearchQuery } from './types/ClassSearchQuery';
import { Categories } from './types/filter/Category';
import { Flags } from './types/filter/Flag';
import { Organizations } from './types/filter/Organization';
import { Semester } from './types/filter/Semester';
import { times } from './types/filter/Time';
import { weekdays } from './types/filter/Weekday';
import { Year, years } from './types/filter/Year';

import { Class, Favorite, FullClass } from './types/global';

// 講義データが利用可能な年度
export const AVAILABLE_YEARS = years.map((y) => y.value);

class ClassApi {
  // 講義の検索用一覧データ
  private classList: Class[];
  private initialized: boolean = false;
  private favoriteList: Favorite[] = [];
  private syllabusDict: { [key: string]: FullClass } = {};

  constructor() {
    this.classList = [];
  }

  /**
   * キャッシュの読み込みと必要に応じてサーバーからのデータ取得を行う。
   * インスタンス化後、どのメソッドよりも最初に実行する必要がある。
   * @returns
   */
  public async initializeClassList() {
    const cachedListString = StorageIO.get(Key.CLASS_LIST);
    const localDataTimestampString = StorageIO.get(Key.DATA_TIMESTAMP);
    // キャッシュが存在しない場合は全取得
    if (!cachedListString || !localDataTimestampString) {
      // 全取得
      this.classList = await getClassList();
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

  public initializeFavoriteList() {
    const fListString = StorageIO.get(Key.FAVORITE_LIST);
    this.favoriteList = JSON.parse(fListString || '[]');
  }

  /**
   * 講義をお気に入り登録する
   * @param year
   * @param classId
   * @returns 既に登録済みだった場合はFalse、この操作で登録された場合はTrueを返す
   */
  public addFavorite(year: Year, classId: string) {
    if (this.favoriteList.findIndex((f) => f.year === year && f.classId === classId) !== -1) {
      return false;
    }
    this.favoriteList.push({
      year,
      classId
    });
    StorageIO.set(Key.FAVORITE_LIST, JSON.stringify(this.favoriteList));
    return true;
  }

  /**
   * 講義をお気に入りから削除する
   * @param year
   * @param classId
   * @returns 元々未登録みだった場合はFalse、この操作で削除された場合はTrueを返す
   */
  public removeFavorite(year: Year, classId: string) {
    const index = this.favoriteList.findIndex((f) => f.year === year && f.classId === classId);
    if (index === -1) {
      return false;
    }
    this.favoriteList.splice(index, 1);
    StorageIO.set(Key.FAVORITE_LIST, JSON.stringify(this.favoriteList));
    return true;
  }

  /**
   * この講義がお気に入り登録済みかを返す
   * @param year
   * @param classId
   * @returns
   */
  public isFavorite(year: Year, classId: string) {
    return this.favoriteList.findIndex((f) => f.year === year && f.classId === classId) !== -1;
  }

  /**
   * 講義一覧をクエリで絞り込んで返す
   * @param q クエリ
   */
  public async getClasses(q: ClassSearchQuery) {
    if (!this.initialized) {
      await this.initializeClassList();
    }
    return this.getClassesWithoutInitCheck(q);
  }

  private getClassesWithoutInitCheck(q: ClassSearchQuery) {
    let filteredClasses = [...this.classList];
    if (q.id) {
      filteredClasses = filteredClasses.filter((c) => c.id === q.id);
    }
    if (q.year) {
      filteredClasses = filteredClasses.filter((c) => c.year === q.year);
    }
    if (q.keyWord) {
      const words = q.keyWord.split(/[\s　]/g);
      filteredClasses = filteredClasses.filter((c) => {
        let hit = true;
        for (const word of words) {
          if (c.id === word) {
            // 講義IDが完全一致した場合はヒット
            return hit;
          }
          if (c.title.indexOf(word) === -1 && c.teachers.join(' ').indexOf(word) === -1) {
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
    if (q.isFavorite) {
      filteredClasses = filteredClasses.filter((c) => {
        const index = this.favoriteList.findIndex((f) => f.classId === c.id && f.year === c.year);
        return index !== -1;
      });
    }
    return filteredClasses;
  }

  public async getTimetable(year: Year, semester: Semester) {
    if (!this.initialized) {
      await this.initializeClassList();
    }

    const timetable = times.map((time) => {
      // 集中講義はweekdaysに含まれない。
      return weekdays.flatMap((weekday) => {
        const q: ClassSearchQuery = {
          year,
          semester,
          weekday: weekday.value,
          time: time.value,
          flags: [],
          isFavorite: true
        };
        return [this.getClassesWithoutInitCheck(q)];
      });
    });
    return timetable;
  }

  /**
   * 指定したIDの指定した年度のシラバスを返す
   * @param year 年度
   * @param id 講義コード
   */
  public async getSyllabus(year: Year, id: string) {
    const key = `C${year}${id}`;
    if (key in this.syllabusDict) {
      return this.syllabusDict[key];
    }
    try {
      const syllabus = await getSyllabusOne(year, id);
      this.syllabusDict[key] = syllabus;
      return syllabus;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * 年とIDのリストから複数の講義のシラバスを一括取得する
   * @param cList
   * @returns
   */
  public async getSyllabusList(cList: { year: Year; id: string }[]) {
    const syllabusListNull = await Promise.all(cList.map((c) => this.getSyllabus(c.year, c.id)));
    const syllabusList = syllabusListNull.flatMap((s) => (s ? [s] : []));
    return syllabusList;
  }
}

export default ClassApi;

export const classApi = new ClassApi();
classApi.initializeFavoriteList();
// classApi.initialize().then(() => {
// });
