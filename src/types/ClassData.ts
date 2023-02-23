export class ClassData {
  public id: string;
  public customId: string;
  public year: number;
  public title: string;
  public url: string;
  public semester: string;
  public weekday: string;
  public time: string;
  public teachers: string[];
  public grade: number;
  public department: string;
  public category: string;
  public field: string;
  public room: string;
  public type: string;
  public credit: number;

  constructor(_class: {
    id: string;
    customId: string;
    year: number;
    title: string;
    url: string;
    semester: string;
    weekday: string;
    time: string;
    teachers: string[];
    grade: number;
    department: string;
    category: string;
    field: string;
    room: string;
    type: string;
    credit: number;
  }) {
    this.id = _class.id;
    this.customId = _class.customId;
    this.year = _class.year;
    this.title = _class.title;
    this.url = _class.url;
    this.semester = _class.semester;
    this.weekday = _class.weekday;
    this.time = _class.time;
    this.teachers = _class.teachers;
    this.grade = _class.grade;
    this.department = _class.department;
    this.category = _class.category;
    this.field = _class.field;
    this.room = _class.room;
    this.type = _class.type;
    this.credit = _class.credit;
  }
}
