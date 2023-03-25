export type QueryFlag = {
  target: string;
  id: string;
  label: string;
  regExp: RegExp;
  default: boolean;
};

export const Flags: QueryFlag[] = [
  {
    target: '05',
    id: 'except_freshman_seminar',
    label: '初年次セミナーを除外',
    regExp: /^(?!.ZFS)/,
    default: true
  },
  {
    target: '05',
    id: 'except_foreign_language',
    label: '外国語科目を除外',
    regExp: /^(?!.Z(EN|..6))/,
    default: true
  },
  {
    target: '05',
    id: 'except_international_student_class',
    label: '留学生向け科目を除外',
    regExp: /^(?!.ZJ[JP])/,
    default: true
  },
  {
    target: '30',
    id: 'except_iptca_class',
    label: '航空宇宙生産技術科目を除外',
    regExp: /^(?!.TTVG)/,
    default: true
  },
  {
    target: '30',
    id: 'except_die_class',
    label: '金型創成科目を除外',
    regExp: /^(?!.TTVE)/,
    default: true
  },
  {
    target: '30',
    id: 'except_teacher_class',
    label: '教職科目を除外',
    regExp: /^(?!.T..F)/,
    default: true
  },
  {
    target: '70',
    id: 'except_special_seminor_class',
    label: '専門セミナーを除外',
    regExp: /^(?!.R.Z98)/,
    default: true
  },
  {
    target: '70',
    id: 'except_research_class',
    label: '卒業研究を除外',
    regExp: /^(?!.R.Z99)/,
    default: true
  },
  {
    target: '10',
    id: 'except_syougaku',
    label: '小学校教育に関する科目を除外',
    regExp: /^(?!.ESY)/,
    default: true
  },
  {
    target: '10',
    id: 'except_info',
    label: '情報教育を除外',
    regExp: /^(?!.EIE)/,
    default: true
  }
];
