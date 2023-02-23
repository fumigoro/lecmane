export const Categories: {
  target: string;
  id: string;
  displayText: string;
  regExp: RegExp;
}[] = [
  {
    target: '30',
    id: 'T-basic',
    displayText: '基礎科目',
    regExp: /^.T[^P][^K]0/
  },
  {
    target: '30',
    id: 'T-common_to_department',
    displayText: '学科共通科目',
    regExp: /^.T[A-D]X[A-D]/
  },
  {
    target: '30',
    id: 'T-course_unique',
    displayText: 'コース科目',
    regExp: /^.T[A-D].[1-9]/
  },
  {
    target: '30',
    id: 'T-iptca',
    displayText: '航空宇宙生産技術科目',
    regExp: /^.TTVG/
  },
  {
    target: '30',
    id: 'T-die',
    displayText: '金型創成技術科目',
    regExp: /^.TTVE/
  },
  {
    target: '30',
    id: 'T-teacher_class',
    displayText: '教職科目',
    regExp: /^.T..F/
  },
  {
    target: '05',
    id: 'Z-humanities',
    displayText: '人文科学',
    regExp: /^.ZJI/
  },
  {
    target: '05',
    id: 'Z-social_science',
    displayText: '社会科学',
    regExp: /^.ZSY/
  },
  {
    target: '05',
    id: 'Z-natural_science',
    displayText: '自然科学',
    regExp: /^.ZSI/
  },
  {
    target: '05',
    id: 'Z-sports_health_science',
    displayText: 'スポーツ健康科学',
    regExp: /^.ZSK/
  },
  {
    target: '05',
    id: 'Z-freshman_seminar',
    displayText: '初年次セミナー',
    regExp: /^.ZFS/
  },
  {
    target: '05',
    id: 'Z-english',
    displayText: '英語',
    regExp: /^.ZEN/
  },
  {
    target: '05',
    id: 'Z-gifu',
    displayText: '(2022~)岐阜学',
    regExp: /^.ZGF/
  },
  {
    target: '05',
    id: 'Z-data_science',
    displayText: '(2022~)数理・データサイエンス・AI',
    regExp: /^.ZDS/
  },
  {
    target: '05',
    id: 'Z-langage',
    displayText: '(2022~)言語と文化',
    regExp: /^.ZLA/
  },
  {
    target: '05',
    id: 'Z-literacy',
    displayText: '(2022~)社会人リテラシー',
    regExp: /^.ZSL/
  },
  {
    target: '05',
    id: 'Z-chinese',
    displayText: '(~2021)中国語',
    regExp: /^.ZCN/
  },
  {
    target: '05',
    id: 'Z-german',
    displayText: '(~2021)ドイツ語',
    regExp: /^.ZDE/
  },
  {
    target: '05',
    id: 'Z-french',
    displayText: '(~2021)フランス語',
    regExp: /^.ZFR/
  },
  {
    target: '05',
    id: 'Z-korean',
    displayText: '(~2021)韓国語',
    regExp: /^.ZKR/
  },
  {
    target: '05',
    id: 'Z-portuguese',
    displayText: '(~2021)ポルトガル語',
    regExp: /^.ZPT/
  },
  {
    target: '05',
    id: 'Z-combined_study',
    displayText: '(~2021)複合領域',
    regExp: /^.ZFU/
  },
  {
    target: '05',
    id: 'Z-japanese',
    displayText: '日本語(留学生)',
    regExp: /^.ZJP/
  },
  {
    target: '05',
    id: 'Z-introduction_of_japan',
    displayText: '日本事情(留学生)',
    regExp: /^.ZJJ/
  },
  {
    target: '05',
    id: 'Z-teacher',
    displayText: '全学共通教職',
    regExp: /^.ZKY/
  },
  {
    target: '70',
    id: 'R-basic',
    displayText: '専門基礎科目',
    regExp: /^.R.K/
  },
  {
    target: '70',
    id: 'Z-special',
    displayText: '専門科目',
    regExp: /^.R.[BCSYZ]/
  },
  {
    target: '10',
    id: 'E-kyosyoku',
    displayText: '教職に関する科目',
    regExp: /^.ETP/
  },
  {
    target: '10',
    id: 'E-kyoyo',
    displayText: '教養科目(教養基礎)',
    regExp: /^.EPK/
  },
  {
    target: '10',
    id: 'E-senmon-senko',
    displayText: '専門科目(専攻別)',
    regExp: /^.E(AX|BK|EE|GE|GS|HK|KK|KP|ME|MK|RB|RK|RS|RT|SG|SH|SP|ST|TK)/
  },
  {
    target: '10',
    id: 'E-senmon-common',
    displayText: '専門科目(学部共通)',
    regExp: /^.EMS/
  },
  {
    target: '10',
    id: 'E-senmon-syou',
    displayText: '小学校教科に関する科目',
    regExp: /^.ESY/
  },
  {
    target: '10',
    id: 'E-info',
    displayText: '情報教育',
    regExp: /^.EIE/
  },
  {
    target: '80',
    id: 'kiso',
    displayText: '基礎科目',
    regExp: /^.(AFL|APK|VKE|VKG|VKH)/
  },
  {
    target: '80',
    id: 'kyosyoku',
    displayText: '教職科目',
    regExp: /^.(ABK|ABS)/
  },
  {
    target: '80',
    id: 'kyoyo',
    displayText: '教養科目',
    regExp: /^.(AKG|VKD)/
  },
  {
    target: '80',
    id: 'gakugei',
    displayText: '博物館学芸員に関する科目',
    regExp: /^.ASK/
  },
  {
    target: '80',
    id: 'senmon-10',
    displayText: '専門科目・専門基礎科目',
    regExp: /^.(ABA|ABL|VKK|ABC|ABT|VKM|VTK)/
  }
];
