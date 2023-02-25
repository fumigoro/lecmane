import { Semester } from './filter/Semester';
import { Weekday } from './filter/Weekday';
import { Time } from './filter/Time';
import { Grade } from './filter/Grade';
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
  faculty?: string;
  department?: string;
  course?: string;
  category?: string;
  grade?: Grade;
  flags: string[];
  isFavorite?: boolean;
};
