export type Organization = {
  id: string;
  belongs: string;
  type: 'faculty' | 'department' | 'course';
  displayText: string;
  regExp: RegExp;
};

export const Organizations: {
  Faculties: Organization[];
  Departments: Organization[];
  Courses: Organization[];
} = {
  Faculties: [
    {
      belongs: '',
      type: 'faculty',
      id: 'all',
      displayText: '全ての学部・学環',
      regExp: /^.[ZTAVRENS]/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '05',
      displayText: '全学共通教育',
      regExp: /^.Z/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '30',
      displayText: '工学部',
      regExp: /^.T/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '80',
      displayText: '応用生物科学部',
      regExp: /^.[AV]/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '70',
      displayText: '地域科学部',
      regExp: /^.R/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '10',
      displayText: '教育学部',
      regExp: /^.E/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '33',
      displayText: '医学部看護学科',
      regExp: /^.N/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '50',
      displayText: '社会システム経営学環',
      regExp: /^.S/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '09',
      displayText: '全学共通教職',
      regExp: /^.ZKY/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '45',
      displayText: '(大学院)自然科学技術研究科',
      regExp: /^.U/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '52',
      displayText: '(大学院)共同獣医学研究科',
      regExp: /^.X/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '11',
      displayText: '(大学院)教育学研究科',
      regExp: /^.C/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '71',
      displayText: '(大学院)地域科学研究科',
      regExp: /^.Q/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '29',
      displayText: '(大学院)医学系研究科看護学専攻',
      regExp: /^.[HG]/
    },
    {
      belongs: '',
      type: 'faculty',
      id: '35',
      displayText: '(大学院)連合創薬医療情報研究科',
      regExp: /^.I/
    }
  ],
  Departments: [
    {
      belongs: '30',
      type: 'department',
      id: 'civil',
      displayText: '社会基盤工学科',
      regExp: /^.T(A|[PTX]).{6,7}(-.*[A12].*|$)/
    },
    {
      belongs: '30',
      type: 'department',
      id: 'mechanical',
      displayText: '機械工学科',
      regExp: /^.T(B|[PTX]).{6,7}(-.*[B34].*|$)/
    },
    {
      belongs: '30',
      type: 'department',
      id: 'chemistry_bimolecular',
      displayText: '化学・生命工学科',
      regExp: /^.T(C|[PTX]).{6,7}(-.*[C56].*|$)/
    },
    {
      belongs: '30',
      type: 'department',
      id: 'electrical_electronic_computer',
      displayText: '電気電子・情報工学科',
      regExp: /^.T(D|[PTX]).{6,7}(-.*[D789].*|$)/
    },
    {
      belongs: '80',
      type: 'department',
      id: 'agriculture_environment',
      displayText: '生産環境科学課程',
      regExp: /^.A(B[ACKS]|FL|PK|SK)/
    },
    {
      belongs: '80',
      type: 'department',
      id: 'life_science',
      displayText: '応用生命科学課程',
      regExp: /^.A(B[KLS]|FL|PK)/
    },
    {
      belongs: '80',
      type: 'department',
      id: 'veterinarian',
      displayText: '共同獣医学科',
      regExp: /^.(V|ABT|AKG|APK)/
    },
    {
      belongs: '70',
      type: 'department',
      id: 'policy',
      displayText: '地域政策学科',
      regExp: /^.R.[CKSYZ]/
    },
    {
      belongs: '70',
      type: 'department',
      id: 'culture',
      displayText: '地域文化学科',
      regExp: /^.R.[BCKYZ]/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'nal',
      displayText: '国語教育講座',
      regExp: /^.E(KP|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'sos',
      displayText: '社会教育講座',
      regExp: /^.E(SG|SH|SP|ST|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'mat',
      displayText: '数学教育講座',
      regExp: /^.E(ME|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'sci',
      displayText: '理科教育講座',
      regExp: /^.E(RB|RK|RS|RT|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'mus',
      displayText: '音楽教育講座',
      regExp: /^.E(MK|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'art',
      displayText: '美術教育講座',
      regExp: /^.E(BK|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'hp',
      displayText: '保健体育講座',
      regExp: /^.E(HK|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'tec',
      displayText: '技術教育講座',
      regExp: /^.E(TK|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'hoe',
      displayText: '家政教育講座',
      regExp: /^.E(KK|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'eng',
      displayText: '英語教育講座',
      regExp: /^.E(EE|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'scl',
      displayText: '学校教育講座',
      regExp: /^.E(GE|GS|MS|PK|SY|TP|IE)/
    },
    {
      belongs: '10',
      type: 'department',
      id: 'spn',
      displayText: '特別支援教育講座',
      regExp: /^.E(AX|MS|PK|SY|TP|IE)/
    }
  ],
  Courses: [
    {
      belongs: 'civil',
      type: 'course',
      id: 'environmental',
      displayText: '環境コース',
      regExp: /^.T(A[AX]|[PTX].).{5,6}(-.*[A1].*|$)/
    },
    {
      belongs: 'civil',
      type: 'course',
      id: 'disaster_reduction',
      displayText: '防災コース',
      regExp: /^.T(A[DX]|[PTX].).{5,6}(-.*[A2].*|$)/
    },
    {
      belongs: 'mechanical',
      type: 'course',
      id: 'mechanical',
      displayText: '機械コース',
      regExp: /^.T(B[AX]|[PTX].).{5,6}(-.*[B3].*|$)/
    },
    {
      belongs: 'mechanical',
      type: 'course',
      id: 'intelligent_mechanical',
      displayText: '知能機械コース',
      regExp: /^.T(B[BX]|[PTX].).{5,6}(-.*[B4].*|$)/
    },
    {
      belongs: 'chemistry_bimolecular',
      type: 'course',
      id: 'materials',
      displayText: '物質化学コース',
      regExp: /^.T(C[AX]|[PTX].).{5,6}(-.*[C5].*|$)/
    },
    {
      belongs: 'chemistry_bimolecular',
      type: 'course',
      id: 'bimolecular',
      displayText: '生命化学コース',
      regExp: /^.T(C[BX]|[PTX].).{5,6}(-.*[C6].*|$)/
    },
    {
      belongs: 'electrical_electronic_computer',
      type: 'course',
      id: 'electrical_electronic',
      displayText: '電気電子コース',
      regExp: /^.T(D[AX]|[PTX].).{5,6}(-.*[D7].*|$)/
    },
    {
      belongs: 'electrical_electronic_computer',
      type: 'course',
      id: 'information',
      displayText: '情報コース',
      regExp: /^.T(D[BX]|[PTX].).{5,6}(-.*[D8].*|$)/
    },
    {
      belongs: 'electrical_electronic_computer',
      type: 'course',
      id: 'applied_physics',
      displayText: '応用物理コース',
      regExp: /^.T(D[CX]|[PTX].).{5,6}(-.*[D9].*|$)/
    },
    {
      belongs: 'sos',
      type: 'course',
      id: 'est',
      displayText: '地理学専攻',
      regExp: /^.E(ST|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'sos',
      type: 'course',
      id: 'esh',
      displayText: '史学専攻',
      regExp: /^.E(SH|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'sos',
      type: 'course',
      id: 'esg',
      displayText: '現代社会専攻',
      regExp: /^.E(SG|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'sci',
      type: 'course',
      id: 'erb',
      displayText: '物理学専攻',
      regExp: /^.E(RB|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'sci',
      type: 'course',
      id: 'erk',
      displayText: '化学専攻',
      regExp: /^.E(RK|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'sci',
      type: 'course',
      id: 'ers',
      displayText: '生物学専攻',
      regExp: /^.E(RS|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'sci',
      type: 'course',
      id: 'ert',
      displayText: '地学専攻',
      regExp: /^.E(RT|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'scl',
      type: 'course',
      id: 'ege',
      displayText: '教職基礎コース',
      regExp: /^.E(GE|MS|PK|SY|TP|IE)/
    },
    {
      belongs: 'scl',
      type: 'course',
      id: 'egs',
      displayText: '心理学コース',
      regExp: /^.E(GS|MS|PK|SY|TP|IE)/
    }
  ]
};
