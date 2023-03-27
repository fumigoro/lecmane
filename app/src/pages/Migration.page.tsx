import { useEffect, useState } from 'react';
import { classApi } from '../classes.api';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import { Year } from '../types/filter/Year';
import { FullClass } from '../types/global';

const loadPreviousData = async () => {
  const selected = localStorage.getItem('selected');
  if (!selected) {
    return;
  }
  const parsed: { id: string; takeYear: number }[] = JSON.parse(selected);
  const syllabusList = await classApi.getSyllabusList(parsed.map((p) => ({ id: p.id, year: p.takeYear as Year })));
  return syllabusList;
};

const previousStorageKeys = [
  's_grade',
  's_time',
  's_semester',
  'class_master_ts',
  's_category',
  's_department',
  'class_master',
  's_course',
  'db_hash',
  's_faculty',
  'db_timestamp',
  's_weekday'
];

const Migration = () => {
  useGA4PageEvent();
  const [syllabusList, setSyllabusList] = useState<FullClass[]>([]);
  useEffect(() => {
    loadPreviousData().then((d) => d && setSyllabusList(d));
  }, []);

  useEffect(() => {
    syllabusList.forEach((s) => {
      classApi.addFavorite(s.year, s.id);
    });
    localStorage.removeItem('selected');
    previousStorageKeys.forEach((k) => localStorage.removeItem(k));
    console.log('データ移行完了');
  }, [syllabusList]);

  return <></>;
};

export default Migration;
