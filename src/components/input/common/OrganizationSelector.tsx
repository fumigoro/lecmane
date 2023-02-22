import { useMemo } from 'react';
import { Organizations } from '../../../types/filter/Organization';
import { SingleSelector } from './SingleSelector';

type SelectedOrgId = {
  faculty?: string;
  department?: string;
  course?: string;
};

type Props = {
  selectedOrgId: SelectedOrgId;
  onChange: (o: SelectedOrgId) => void;
};

export const OrganizationSelector = ({ selectedOrgId, onChange }: Props) => {
  // 学部・学環・研究科の選択肢
  const facultyOptions = useMemo(() => {
    return Organizations.Faculties.map((o) => ({
      value: o.id,
      label: o.displayText
    }));
  }, []);
  // 学科・講座・課程の選択肢
  const departmentOptions = useMemo(() => {
    const selectedFaculty = Organizations.Faculties.find((f) => f.id === selectedOrgId.faculty);
    return Organizations.Departments.flatMap((o) => {
      if (!selectedFaculty) {
        return [];
      }
      if (o.belongs !== selectedFaculty.id) {
        return [];
      }
      return [
        {
          value: o.id,
          label: o.displayText
        }
      ];
    });
  }, [selectedOrgId.faculty]);
  // コースの選択肢
  const courseOptions = useMemo(() => {
    const selectedDepartment = Organizations.Departments.find((d) => d.id === selectedOrgId.department);
    return Organizations.Courses.flatMap((o) => {
      if (!selectedDepartment) {
        return [];
      }
      if (o.belongs !== selectedDepartment.id) {
        return [];
      }
      return [
        {
          value: o.id,
          label: o.displayText
        }
      ];
    });
  }, [selectedOrgId.department]);

  return (
    <>
      <SingleSelector
        options={facultyOptions}
        selectedValue={selectedOrgId.faculty}
        onChange={(v) => onChange({ ...selectedOrgId, faculty: v, department: undefined, course: undefined })}
        type="dropdown"
        label="学部・学環・研究科"
        noneOptionLabel="全ての学部・学環・研究科"
      />
      {departmentOptions.length > 0 && (
        <SingleSelector
          options={departmentOptions}
          selectedValue={selectedOrgId.department}
          onChange={(v) => onChange({ ...selectedOrgId, department: v, course: undefined })}
          type="dropdown"
          label="学科・講座・課程"
          noneOptionLabel="全ての学科・講座"
        />
      )}
      {courseOptions.length > 0 && (
        <SingleSelector
          options={courseOptions}
          selectedValue={selectedOrgId.course}
          onChange={(v) => onChange({ ...selectedOrgId, course: v })}
          type="dropdown"
          label="コース"
          noneOptionLabel="全てのコース"
        />
      )}
    </>
  );
};
