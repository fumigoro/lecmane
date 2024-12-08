import { getRoomSchedule } from './lib/s3io';
import { SemesterSpringAndFall, semesters } from './types/filter/Semester';
import { SEMESTER } from './types/filter/Semester';
import { Time, times } from './types/filter/Time';
import { WeekdayExcludeConcentrated, weekdays } from './types/filter/Weekday';
import { years } from './types/filter/Year';

class RoomsApi {
  private rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  public async initialize() {
    // すでにデータがあれば取得しない
    if (this.rooms.length > 0) return;
    this.rooms = await getRoomSchedule(years[0].value);
  }

  public getData() {
    return this.rooms;
  }

  /**
   * 該当する講義室を返す
   */
  public getRoom({ name, building }: { name: string; building: string }) {
    const room = this.rooms.find((room) => room.name === name && room.building === building);
    console.log(room);
    return room;
  }

  /**
   * 建物、学期、曜日、時限から空いている教室を配列で返す（search===Trueの教室のみ返される）
   */
  public getAvailableRooms({
    building,
    semester,
    weekday,
    time
  }: {
    building: string;
    semester: SemesterSpringAndFall;
    weekday: WeekdayExcludeConcentrated;
    time: Time;
  }) {
    const rooms = this.rooms.filter((room) => room.building === building);
    return rooms.filter((room) => room.search && room.isAvailable({ semester, weekday, time }));
  }

  /**
   * 建物名が一致している教室の一覧を返す
   */
  public getRooms({ building }: { building: string | undefined }) {
    return this.rooms.flatMap((room) => (building === room.building ? [room] : []));
  }

  /**
   * 時間割データのある建物の一覧を返す
   */
  public getBuildings() {
    const allBuildings = this.rooms.map((room) => room.building);
    // 重複を削除
    const uniqueBuildings = Array.from(new Set(allBuildings));
    const availableBuildings = ['全共棟', '工学部棟', '応生棟', '地域棟', '教育棟', '看護棟'];
    const buildings = uniqueBuildings.filter((building) => availableBuildings.includes(building));

    return buildings;
  }
}

export default RoomsApi;

export class Room {
  public name: string = '';
  public building: string = '';
  public schedule: RoomSchedule | undefined = undefined;
  public scheduleArray: string[][] = [];
  public search: boolean = false;

  public isAvailable({
    semester,
    weekday,
    time
  }: {
    semester: SemesterSpringAndFall;
    weekday: WeekdayExcludeConcentrated;
    time: Time;
  }) {
    if (!(semester === SEMESTER.SPRING || semester === SEMESTER.FALL)) {
      console.log(`不正な学期指定：${semester}`);
      return false;
    }
    if (this.schedule) {
      const schedule = this.schedule[semester][weekday][time];
      return !schedule;
    }
    console.log('データ未取得');
    return false;
  }

  constructor(init: { name: string; building: string; search: boolean; schedule: string[][] }) {
    this.name = init.name;
    this.building = init.building;
    /**
     * 時間指定での検索時、検索対象にするかどうか
     */
    this.search = init.search;
    this.scheduleArray = init.schedule;
    // schedule[][]の1次元目は前期後期、2次元目は時限＋曜日 [0][0]は前期月曜1時限、[1][1]は後期火曜1時限
    // 月1,火1,水1,木1,金1,月2,火2,水2,木2,金2,月3,火3,水3,木3,金3,月4,火4,水4,木4,金4,月5,火5,水5,木5,金5 の順
    const schedule: RoomSchedule = {
      '1': {
        月: {},
        火: {},
        水: {},
        木: {},
        金: {}
      },
      '2': {
        月: {},
        火: {},
        水: {},
        木: {},
        金: {}
      }
    };
    init.schedule.forEach((semesterSchedule, semesterIdx) => {
      semesterSchedule.forEach((classSchedule, idx) => {
        const semester = semesters[semesterIdx].value as SemesterSpringAndFall;
        const weekday = weekdays[idx % 5].value as WeekdayExcludeConcentrated;
        const time = times[Math.floor(idx / 5)].value;
        // classScheduleはその時間にこの講義室を使用する講義のID
        schedule[semester][weekday][time] = classSchedule;
      });
    });
    this.schedule = schedule;
  }

  /**
   * 指定した学期のスケジュール配列を返す
   */
  getScheduleArray(sem: SemesterSpringAndFall) {
    return this.scheduleArray[semesters.map((s) => s.value).indexOf(sem)];
  }
}

export const roomApi = new RoomsApi();

// 集中講義と通年（3）は除外
type RoomSchedule = {
  [key in SemesterSpringAndFall]: { [key in WeekdayExcludeConcentrated]: { [key in Time]?: string | undefined } };
};
