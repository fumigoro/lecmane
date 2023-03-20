import { useEffect, useState } from "react";
import { classApi } from "../classes.api";
import { Year } from "../types/filter/Year";
import { FullClass } from "../types/global";

const loadPreviousData = async () => {
  const selected = localStorage.getItem('selected');
  if (!selected) {
    return;
  }
  const parsed: { id: string, takeYear: number }[] = JSON.parse(selected);

  const promises = parsed.map(async ({ id, takeYear }) => classApi.getSyllabus(takeYear as Year, id));
  const syllabusListTmp = await Promise.all(promises);
  const syllabusList = syllabusListTmp.flatMap(s => s ? [s] : []);
  return syllabusList;
}

const previousStorageKeys = [
  "s_grade",
  "s_time",
  "s_semester",
  "class_master_ts",
  "s_category",
  "s_department",
  "class_master",
  "s_course",
  "db_hash",
  "s_faculty",
  "db_timestamp",
  "s_weekday",
]

const Migration = () => {
  const [syllabusList, setSyllabusList] = useState<FullClass[]>([]);
  useEffect(() => { loadPreviousData().then(d => d && setSyllabusList(d)) }, []);

  useEffect(() => {
    syllabusList.forEach(s => {
      classApi.addFavorite(s.year, s.id);
    });
    localStorage.removeItem('selected');
    previousStorageKeys.forEach(k => localStorage.removeItem(k));
    console.log('データ移行完了');
  }, [syllabusList]);

  return (
    <></>
  )
}


export default Migration;
