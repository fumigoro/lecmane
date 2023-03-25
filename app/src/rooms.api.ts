import { getRoomSchedule } from './lib/s3io';
import { SEMESTER, Semester } from './types/filter/Semester';
import { Time } from './types/filter/Time';
import { Weekday } from './types/filter/Weekday';
import { years } from './types/filter/Year';

class RoomsApi {
  private rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  public async initialize() {
    this.rooms = await getRoomSchedule(years[0].value);
  }

  public getData() {
    return this.rooms;
  }
}

export default RoomsApi;

export class Room {
  public name: string = '';
  public building: string = '';
  public schedule: { [key in Semester]: { [key in Weekday]: { [key in Time]: string[] } } } | undefined = undefined;
  public search: boolean = false;

  public isAvailable({ semester, weekday, time }: { semester: Semester; weekday: Weekday; time: Time }) {
    if (!(semester === SEMESTER.SPRING || semester === SEMESTER.FALL)) {
      console.log(`不正な学期指定：${semester}`);
      return;
    }
    if (this.schedule) {
      const schedule = this.schedule[semester][weekday][time];
      return schedule.length === 0;
    }
    console.log('データ未取得');
    return false;
  }

  constructor(init: { name: string; building: string; search: boolean; schedule: string[][] }) {
    this.name = init.name;
    this.building = init.building;
    this.search = init.search;
    // TODO: scheduleを2時限配列からRoom.scheduleの形式に変形する
  }
}

export const roomApi = new RoomsApi();
