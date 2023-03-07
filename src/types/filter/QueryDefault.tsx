import { ClassSearchQuery } from '../ClassSearchQuery';
import { years } from './Year';

export const queryDefault: ClassSearchQuery = {
  year: years[0].value,
  flags: []
};
