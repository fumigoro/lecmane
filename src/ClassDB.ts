import { Class, ClassDetails, ClassList, FilterState, FlagFilterState, SelectedClass } from './types/global';
import filterConfig from './json/filter_config.json';

export default class classDB {
  private classMaster: ClassList[];
  private selectedClasses: SelectedClass[];
  private year = this.getAcademicYear();

  constructor() {
    const cashData = localStorage.getItem(`class_master`);
    const cashedTimestamp = localStorage.getItem('class_master_ts');
    if (cashData) {
      const classData: ClassList[] = JSON.parse(cashData);
      this.classMaster = classData;
      console.log('Using cache');
      // 一旦キャッシュを読み込んでおき、データベースのタイムスタンプが届き次第期限確認を行う
      classDB.getDBTimestamp().then((timestamp) => {
        const isAvailable = timestamp - Number(cashedTimestamp) / 1000 < 0;
        if (!isAvailable) {
          console.log('期限切れに付きキャッシュ削除');
          localStorage.setItem('class_master', '');
          localStorage.setItem('class_master_ts', '');
        }
      });
    } else {
      this.classMaster = [];
    }

    const selected = localStorage.getItem(`selected`);
    if (selected) {
      this.selectedClasses = JSON.parse(selected);
    } else {
      this.selectedClasses = [];
    }
  }

  private getAcademicYear() {
    const yearTmp = Number(localStorage.getItem('year'));
    if (Number.isNaN(yearTmp) || yearTmp === 0) {
      let year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      if (month >= 1 && month <= 3) {
        year -= 1;
      }
      return year;
    }
    return yearTmp;
  }

  public setYear(_year: number) {
    this.year = _year;
    localStorage.setItem('year', _year.toString());
  }

  public getYear() {
    return this.year;
  }

  private async fetchClassList(year: number) {
    const faculties = filterConfig.organization.filter((item) => item.type === 'faculty');
    let classList: ClassDetails[] = [];

    for (const faculty of faculties) {
      console.log('Fetch data:', faculty.id);
      const fetchUrl = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/${year}/list/${faculty.id}.json`;
      const classListTmp: { main: ClassDetails[] } = await fetch(fetchUrl, { cache: 'no-store' })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(`Skipped : ${fetchUrl}`);
          const data: ClassDetails[] = [];
          return { main: data };
        });
      const classListFetched = classListTmp.main;
      for (const classItem of classListFetched) {
        classItem.hasDetails = false;
      }
      classList = classList.concat(classListFetched);
    }
    let thisYearIndex = this.classMaster.findIndex((item) => item.year === year);
    if (thisYearIndex === -1) {
      this.classMaster.push({
        year: year,
        classes: []
      });
    }
    thisYearIndex = this.classMaster.findIndex((item) => item.year === year);
    this.classMaster[thisYearIndex].classes = classList;
    this.saveCache();
    classDB.getDBTimestamp();
  }

  private saveCache() {
    const stringData = JSON.stringify(this.classMaster);
    localStorage.setItem(`class_master`, stringData);
    const cacheTimestamp = new Date().getTime().toString();
    localStorage.setItem(`class_master_ts`, cacheTimestamp);
    localStorage.setItem('selected', JSON.stringify(this.selectedClasses));
  }

  public async getClassesList(year: number, filter?: FilterState): Promise<Class[] | undefined> {
    const returnList: Class[] = [];
    let thisYearList = this.classMaster.find((item) => item.year === year);
    if (thisYearList === undefined) {
      try {
        await this.fetchClassList(year);
      } catch (err) {
        console.log(err);
        return undefined;
      }
      thisYearList = this.classMaster.find((item) => item.year === year);
      if (!thisYearList) {
        return undefined;
      }
    }

    for (const classDetailItem of thisYearList.classes) {
      const classItem = this.detail2summary(classDetailItem);
      let showFlag = true;

      if (filter === undefined) {
        returnList.push(classItem);
        continue;
      }

      if (!this.filterOrganization(classItem, filter.facultyId)) {
        continue;
      }
      if (!this.filterOrganization(classItem, filter.departmentId)) {
        continue;
      }
      if (!this.filterOrganization(classItem, filter.courseId)) {
        continue;
      }
      if (!this.filterCategory(classItem, filter.categoryId)) {
        continue;
      }
      if (!this.filterGrade(classItem, filter.grade)) {
        continue;
      }
      if (!this.filterSemester(classItem, filter.semester)) {
        continue;
      }
      if (!this.filterWeekday(classItem, filter.weekday)) {
        continue;
      }
      if (!this.filterTime(classItem, filter.time)) {
        continue;
      }
      if (!this.filterKeyword(classItem, filter.keyword)) {
        continue;
      }

      for (const flagState of filter.flags) {
        if (!this.filterFlag(classItem, filter.facultyId, flagState)) {
          showFlag = false;
          break;
        }
      }

      if (showFlag) {
        returnList.push(classItem);
      }
    }
    return returnList;
  }

  public async fetchClassDetails(year: number, id: string) {
    const fetchUrl = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/${year}/detail/${id}.json`;
    const classData: ClassDetails = await fetch(fetchUrl, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e, fetchUrl);
        throw new Error(`Failed to fetch: ${fetchUrl}`);
      });
    // classDataはundefinedの可能性あり
    if (classData) {
      const thisYearIndex = this.classMaster.findIndex((item) => item.year === year);
      const targetObjectIndex = this.classMaster[thisYearIndex].classes.findIndex((item) => item.id === id);
      if (targetObjectIndex !== -1 && thisYearIndex !== -1) {
        this.classMaster[thisYearIndex].classes[targetObjectIndex] = classData;
        this.classMaster[thisYearIndex].classes[targetObjectIndex].hasDetails = true;
        console.log(`Fetched. ${year} ${id}`);
        this.saveCache();
      }
    }
    classDB.getDBTimestamp();
  }

  public async getClassDetails(year: number, id: string): Promise<ClassDetails | undefined> {
    const thisYearList = this.classMaster.find((item) => item.year === year);
    if (thisYearList === undefined) {
      try {
        await this.fetchClassList(year);
      } catch (err) {
        console.log(err);
        return undefined;
      }
      return this.getClassDetails(year, id);
    }
    const targetObjectIndex = thisYearList.classes.findIndex((item) => item.id === id);
    if (targetObjectIndex !== -1) {
      if (thisYearList.classes[targetObjectIndex].hasDetails === false) {
        try {
          await this.fetchClassDetails(year, id);
        } catch (err) {
          console.log(err);
          return undefined;
        }
        return this.getClassDetails(year, id);
      } else {
        return thisYearList.classes[targetObjectIndex];
      }
    }
    console.log(`Not found ${year} ${id}`);
    return undefined;
  }

  public async getClassSummary(year: number, id: string): Promise<Class | undefined> {
    const thisYearList = this.classMaster.find((item) => item.year === year);
    if (thisYearList === undefined) {
      try {
        await this.fetchClassList(year);
      } catch (err) {
        console.log(err);
        return undefined;
      }
      return this.getClassSummary(year, id);
    }
    const targetObjectIndex = thisYearList.classes.findIndex((item) => item.id === id);
    if (targetObjectIndex !== -1) {
      return this.detail2summary(thisYearList.classes[targetObjectIndex]);
    }
    console.log(`Not found ${year} ${id}`);
    return undefined;
  }
  public getBlankSchedule(): (Class | null)[][][] {
    const schedule: Class | null[][][] = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push([null]);
      }
      schedule.push(row);
    }
    return schedule;
  }
  public getBlankOneDaySchedule(): (Class | null)[][] {
    const schedule: Class | null[][] = [];
    for (let j = 0; j < 5; j++) {
      schedule.push([null]);
    }
    return schedule;
  }
  public async getScheduleArray(year: number, semester: string): Promise<(Class | null)[][][]> {
    const schedule: (Class | null)[][][] = this.getBlankSchedule();
    const selected = await this.getSelectedClassSummary();
    const weekday = ['月', '火', '水', '木', '金'];
    const time = ['1', '2', '3', '4', '5'];
    for (const classItem of selected) {
      if (classItem.takeYear !== year) {
        continue;
      }
      if (!this.filterSemester(classItem, semester)) {
        continue;
      }
      for (let wd = 0; wd < weekday.length; wd++) {
        const hitWD = this.filterWeekday(classItem, weekday[wd]);
        if (!hitWD) {
          continue;
        }
        for (let t = 0; t < time.length; t++) {
          const hitT = this.filterTime(classItem, time[t]);
          if (!hitT) {
            continue;
          }
          // 曜日と時限を特定
          if (schedule[wd][t][0] === null) {
            schedule[wd][t][0] = classItem;
          } else {
            schedule[wd][t].push(classItem);
          }
        }
      }
    }
    return schedule;
  }

  public async getSelectedClassSummary() {
    const selectedList = this.selectedClasses;
    const returnList: Class[] = [];
    for (const selected of selectedList) {
      const classItem = await this.getClassSummary(selected.takeYear, selected.id);
      if (classItem) {
        classItem.takeYear = selected.takeYear;
        returnList.push(classItem);
      }
    }
    return returnList;
  }
  public async getSelectedClassDetails(year: number, semester: number) {
    const selectedList = this.selectedClasses;
    const returnList: ClassDetails[] = [];
    const notFoundList: Class[] = [];
    for (const selected of selectedList) {
      // 年度と学期で絞り込み
      if (selected.takeYear !== year) {
        continue;
      }
      const classItem = await this.getClassDetails(selected.takeYear, selected.id);
      if (classItem) {
        // 当該学期のものだけ抽出して返す
        if (this.filterSemester(this.detail2summary(classItem), semester.toString())) {
          returnList.push(classItem);
        }
      } else {
        const summary = await this.getClassSummary(selected.takeYear, selected.id);
        if (summary) {
          notFoundList.push(summary);
        }
      }
    }
    return { list: returnList, notFound: notFoundList };
  }

  public isSelected(takeYear: number, id: string): boolean {
    return this.selectedClasses.some((item) => {
      return item.id === id && item.takeYear === takeYear;
    });
  }

  public getSelectedClasses() {
    return this.selectedClasses;
  }

  private getOrganizationRegExp(id: string) {
    if (id === 'none') {
      return filterConfig.organization[0].regExp;
    }
    const org = filterConfig.organization.find((item) => item.id === id);
    // 指定されたIDの組織が見つからないことは無いはずなので例外時は0番目を返すようにしている
    return org ? org.regExp : filterConfig.organization[0].regExp;
  }
  private filterOrganization(classItem: Class, selectedFacultyId: string): boolean {
    const regExpString = this.getOrganizationRegExp(selectedFacultyId);
    const regExp = new RegExp(regExpString);
    if (classItem.customId.match(regExp) != null) {
      return true;
    } else {
      return false;
    }
  }

  private getCategoryRegExp(id: string) {
    if (id === 'none') {
      return filterConfig.category[0].regExp;
    }
    const org = filterConfig.category.find((item) => item.id === id);
    // 指定されたIDのカテゴリが見つからないことは無いはずなので例外時は0番目を返すようにしている
    return org ? org.regExp : filterConfig.category[0].regExp;
  }

  private filterCategory(classItem: Class, categoryId: string): boolean {
    const regExpString = this.getCategoryRegExp(categoryId);
    const regExp = new RegExp(regExpString);
    if (classItem.customId.match(regExp) != null) {
      return true;
    } else {
      return false;
    }
  }

  private filterGrade(classItem: Class, selectedGrade: string): boolean {
    if (selectedGrade === 'none') {
      return true;
    }
    return classItem.grade.toString() === selectedGrade;
  }
  private filterSemester(classItem: Class, selectedSemester: string): boolean {
    if (selectedSemester === 'none') {
      return true;
    }
    const semesters = ['', '前学期', '後学期', '通年'];
    const semesterString = semesters[Number(selectedSemester)];
    return classItem.semester.indexOf(semesterString) !== -1;
  }
  private filterWeekday(classItem: Class, selectedWeekday: string): boolean {
    if (selectedWeekday === 'none') {
      return true;
    }
    return classItem.weekday.search(selectedWeekday) !== -1;
  }
  private filterTime(classItem: Class, selectedTime: string): boolean {
    if (selectedTime === 'none') {
      return true;
    }
    return classItem.time.search(selectedTime) !== -1;
  }
  private filterKeyword(classItem: Class, filterKeyword: string): boolean {
    const hitTitle = classItem.title.search(filterKeyword) !== -1;
    const hitTeachers = classItem.teachers.some((value) => {
      return value.search(filterKeyword) !== -1;
    });
    const hitId = classItem.id === filterKeyword;
    return hitTitle || hitTeachers || hitId;
  }
  private filterFlag(classItem: Class, selectedFacultyId: string, flagState: FlagFilterState): boolean {
    let regExpString: string | null = null;
    // 絞り込み対象の学部でない場合
    if (flagState.target.indexOf(selectedFacultyId) === -1) {
      return true;
    }
    // チェックされていない場合は適用しない
    if (flagState.state === false) {
      return true;
    }

    for (const flagConfig of filterConfig.flag) {
      if (flagConfig.id === flagState.id) {
        regExpString = flagConfig.regExp;
      }
    }
    // 該当するフラグフィルタがconfigに無い場合
    if (regExpString === null) {
      return true;
    }
    const regExp = new RegExp(regExpString);
    // フィルターにより除外対象になった場合
    if (classItem.id.match(regExp) !== null) {
      return false;
    }
    return true;
  }
  private detail2summary(classDetails: ClassDetails) {
    const classItem: Class = {
      takeYear: 0,
      id: classDetails.id,
      customId: classDetails.customId,
      year: classDetails.year,
      title: classDetails.title,
      url: classDetails.url,
      semester: classDetails.semester,
      weekday: classDetails.weekday,
      time: classDetails.time,
      teachers: classDetails.teachers,
      grade: classDetails.grade,
      department: classDetails.department,
      category: classDetails.category,
      field: classDetails.field,
      room: classDetails.room,
      type: classDetails.type,
      credit: classDetails.credit
    };
    return classItem;
  }

  public selectClass(selected: SelectedClass) {
    if (
      this.selectedClasses.some((item) => {
        return item.id === selected.id && item.takeYear === selected.takeYear;
      })
    ) {
      console.log(selected, 'already exist');
    } else {
      this.selectedClasses.push(selected);
    }
    localStorage.setItem('selected', JSON.stringify(this.selectedClasses));
  }

  public unSelectClass(selected: SelectedClass) {
    const targetIndex = this.selectedClasses.findIndex((item) => {
      return item.id === selected.id && item.takeYear === selected.takeYear;
    });
    if (targetIndex === -1) {
      console.log(selected, 'not exist');
    } else {
      this.selectedClasses.splice(targetIndex, 1);
    }
    localStorage.setItem('selected', JSON.stringify(this.selectedClasses));
  }

  public unSelectAllClass() {
    this.selectedClasses = [];
    localStorage.setItem('selected', JSON.stringify([]));
  }

  public static async getDBTimestamp() {
    const fetchUrl = `https://gu-syllabus-db.s3.ap-northeast-1.amazonaws.com/modified.txt`;
    const [timestamp, commitHash] = await fetch(fetchUrl, { cache: 'no-store' })
      .then((response) => response.text())
      .then((data) => {
        return data.split('\n');
      })
      .catch((err) => {
        console.log(err);
        throw new Error(`Failed to fetch: ${fetchUrl}`);
      });
    if (Number.isNaN(Number(timestamp))) {
      throw new Error(`Invalid timestamp.`);
    }
    localStorage.setItem('db_timestamp', timestamp);
    localStorage.setItem('db_hash', commitHash);

    return Number(timestamp);
  }

  public async getOneDaySchedule(date: Date) {
    const year = date.getFullYear();
    const dayOfWeekIndex = date.getDay();
    const selected = await this.getSelectedClassSummary();
    const schedule: (Class | null)[][] = this.getBlankOneDaySchedule();
    const weekday = ['日', '月', '火', '水', '木', '金', '土'];
    const time = ['1', '2', '3', '4', '5'];

    const semester = this.getSemester(date, ['1', '2', '0']);
    if (semester === '0') {
      // エラー
      // console.log("日付範囲外")
    }
    if ([0, 6].indexOf(dayOfWeekIndex) !== -1) {
      // console.log("休日です");
      // 休日
    }
    for (const classItem of selected) {
      if (classItem.takeYear !== year) {
        continue;
      }
      if (!this.filterSemester(classItem, semester)) {
        continue;
      }

      const hitWD = this.filterWeekday(classItem, weekday[dayOfWeekIndex]);
      if (!hitWD) {
        continue;
      }
      for (let t = 0; t < time.length; t++) {
        const hitT = this.filterTime(classItem, time[t]);
        if (!hitT) {
          continue;
        }
        // 曜日と時限を特定
        if (schedule[t][0] === null) {
          schedule[t][0] = classItem;
        } else {
          schedule[t].push(classItem);
        }
      }
    }
    return schedule;
  }

  public static getSemester<T>(date: Date, returnValues: T[], full?: boolean) {
    if (full) {
      const month = date.getMonth() + 1;

      if (3 <= month && month <= 8) {
        return returnValues[0];
      }
      if (9 <= month || month <= 2) {
        return returnValues[1];
      }
      return returnValues[2];
    }

    const sem1 = [new Date('2022/4/11').getTime(), new Date('2022/8/5').getTime()];
    const sem2 = [new Date('2022/10/1').getTime(), new Date('2023/2/10').getTime()];
    const dateTime = date.getTime();
    if (sem1[0] <= dateTime && dateTime <= sem1[1]) {
      return returnValues[0];
    }
    if (sem2[0] <= dateTime && dateTime <= sem2[1]) {
      return returnValues[1];
    }
    return returnValues[2];
  }

  public getSemester(date: Date, returnString: string[]) {
    return classDB.getSemester<string>(date, returnString);
  }
}
