/**
 * 講義検索画面の絞り込み条件を持たせる型
 */

export type ClassSearchQuery = {
  id?: string;
  year?: number;
  title?: string;
  semester?: Semester;
  weekday?: Weekday;
  time?: Time;
  teacher?: string;
  department?: string;
  category?: string;
  field?: string;
  room?: string;
  type?: string;
  grade?: Grade;
  credit?: number;
};
