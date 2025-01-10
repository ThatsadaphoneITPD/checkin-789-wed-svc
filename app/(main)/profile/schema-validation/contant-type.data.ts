export const contant = {
    text: {},
    path: { header: { l_name: 'ເອກະສານຂາອອກ', e_name: 'Previous comment', icon: 'pi pi-book' } },
    title: {},
    button: {
        historycomment: { l_name: 'ປະຫວັດຄຳເຫັນ', e_name: 'Previous comment', icon: 'pi pi-book' }
    },
    detail: {
        code_doc: { l_name: 'ເລກທີພາຍນອກ', e_name: 'External No.', icon: '' },
        content: { l_name: 'ເນື້ອໃນເອກະສານ', e_name: 'Description', icon: '' },
        due_date: { l_name: 'ກຳນົດສຳເລັດ', e_name: 'Due to', icon: '' },
        create_by: { l_name: 'ສ້າງຂື້ນ', e_name: 'Description', icon: '' },
        belong_to: { l_name: 'ຈາກພາກສ່ວນ', e_name: 'Description', icon: '' },
        ex_date: { l_name: 'ທີພາຍນອກ', e_name: 'Description', icon: '' },
        detail_secession: { l_name: 'ລາຍລະອຽບ ເອກະສານ', e_name: 'Detail', icon: '' },
        attachment_secession: { l_name: 'ເອກະສານທັງໝົດ', e_name: 'Attachment', icon: '' },
        process_secession: { l_name: 'ການເຄື່ອນໄຫວຂອງໜ້າວຽກ', e_name: 'Process', icon: '' },
        provious_comment_secession: { l_name: 'ຄຳເຫັນກ່ອນໜ້າ', e_name: 'Provious', icon: '' },
        assign_secession : {l_name: 'ມອບໝາຍໃຫ້', e_name: 'Assign to', icon: ''},
        priority_complete_secession: { l_name: 'ກຳນົດລະດັບຄວາມສຳເລັດ - ເວລາ', e_name: 'Priority to Complete', icon: '' },
        task_status: { l_name: 'ຄວາມສຳຄັນ', e_name: 'Description', icon: '' },
        process_status: { l_name: 'ດຳເນີນການ', e_name: 'Description', icon: '' },
        complete_task : {l_name: 'ກຳນົດເວລາສຳເລັດ', e_name: 'Completed at', icon: ''},
        accept_task : {l_name: 'ຮັບວຽກ', e_name: 'Accept', icon: ''},
        comment_task : {l_name: 'ຄຳເຫັນຈາກຄະນະຮັບຜິດຊອບ:', e_name: 'Responsiber Comment', icon: ''},
        comment_assign : {l_name: 'ຄຳເຫັນມອບວຽກ:', e_name: 'Comment Assign', icon: ''},
        comment_accept : {l_name: 'ຄຳເຫັນຮັບວຽກ:', e_name: 'Comment Accpt', icon: ''},
        comment_cancel : {l_name: 'ຄຳເຫັນຕີກັບ:', e_name: 'Comment Cancel', icon: ''},
        comment_report : {l_name: 'ຄຳເຫັນຕອບກັບ', e_name: 'Comment report', icon: ''},
        comment_aprove : {l_name: 'ຄຳເຫັນອານຸມັດ', e_name: 'Comment report', icon: ''},
        attachment_files_secession : {l_name: 'ເພີ່ມເຕີມ ແນບເອກະສານຕິດຄັດ :', e_name: 'More Attachment', icon: ''},
        report_summit_task: {l_name: 'ດຳເນີນການ', e_name: 'Description', icon: ''},
    },
    tabview: {
        external: { l_name: 'ເອກະສານພາຍນອກ', e_name: 'External EDL', icon: 'pi pi-book' },
        md_assgin: { l_name: 'ຜອ ມອບໝາຍ', e_name: 'MD Assignment', icon: 'pi pi-refresh' },
        department_department: { l_name: 'ເອກະສານພາຍໃນ', e_name: 'Internal EDL', icon: 'pi pi-refresh' },
        general_detail: { l_name: 'ຂໍ້ມູນເອກະສານ', e_name: 'Detail Document', icon: 'pi pi-refresh' },
        //tabedetail previous/1
        tab_back_ex_doc: { l_name: 'ເອກະສານ ຜອ', e_name: 'MD Doc', path: "md",icon: 'pi pi-refresh' }
    },
    actionlabel: {
        handleTask: { l_name: 'ຈັດການວຽກ', e_name: 'Action', icon: 'pi pi-book' },
        edit: { l_name: 'ແກ້ໄຂ', e_name: 'Edit', icon: 'pi pi-refresh' },
        timeline: { l_name: 'ຕິດຕາມ', e_name: 'Track', icon: 'pi pi-eye' },
        document: { l_name: 'ເອກະສານ', e_name: 'Doc', icon: 'pi pi-file' }
    },
    roles: {}
};

export const translate = (contant: any, object: string, subobj: string, itensub: string, lang: string) => {
   // Retrieve the requested object from the contant structure
  const selectedObject = contant[object];
  if (!selectedObject) return null;
  // Retrieve the sub-object within the selected object
  const selectedSubObject = selectedObject[subobj];
  if (!selectedSubObject) return null;
  // Determine the key to use based on the language and the provided 'itensub'
  let langKey :any;
  if (itensub === 'icon') {
    langKey = 'icon';
  } else if (itensub === 'path') {
    langKey = 'path';
  } else {
    langKey = lang === 'LA' ? 'l_name' : 'e_name';
  }
  return selectedSubObject[langKey];
};

const positionEDL = {
    Department_Head: { status: 'Depatment Head', l_status: 'ຫົວໜ້າຝ່າຍ' },
    Vice_Department: { status: 'Vice Department', l_status: 'ຮອງຫົວໜ້າຝ່າຍ' },
    Division_Head: { status: 'Division Head', l_status: 'ຫົວໜ້າພະແນກ' },
    Vice_Division: { status: 'Vice Division', l_status: 'ຮອງຫົວໜ້າພະແນກ' },
} as const;

const Taskstatus = {
    NoRush: { status: 'NORUSH', l_status: 'ບໍ່ດ່ວນ' },
    Normal: { status: 'NORMAL', l_status: 'ທໍຳມະດາ' },
    Urgent: { status: 'URGENT', l_status: 'ດ່ວນ' }
} as const;

const MD = [
    { emp_code: "10011", f_name: "ວົງສະກຸນ", l_name: "ຍິ່ງຍົງ" },
    { emp_code: "10012", f_name: "ສຸລິຍາ", l_name: "ມະນິວົງ" },
    { emp_code: "10013", f_name: "ວິລະພອນ", l_name: "ວິສຸນະລາດ" },
    { emp_code: "10014", f_name: "ຊິນ", l_name: "ອິນທະວົງ" },
    { emp_code: "10015", f_name: "ບຸນແທນ", l_name: "ຈັນສະໄໝ" },
  ];
const Departments = {
    HR: 'ຝ່າຍບຸກຄະລະກອນ',
    D_M: 'ຝ່າຍພັດທະນາ ແລະ ບຳລຸງຮັກສາ',
    B_P: 'ຝ່າຍທຸລະກິດ ແລະ ແຜນການ'
} as const;



export const positions = Object.entries(positionEDL).map(([key, value]) => ({
    name: value.status,
    la: value.l_status,
    value: key
}));
export const mds = Object.entries(MD).map(([key, value]) => ({
    ful_name: `ທ່ານ ${value?.f_name} ${value?.l_name} [${value?.emp_code}]`,
    emp_id: value?.emp_code
}));

export const taskstatus = Object.entries(Taskstatus).map(([key, value]) => ({
    name: value.status,
    la: value.l_status,
    value: key
}));
export const departments = Object.entries(Departments).map(([key, value]) => ({
    name: value,
    value: key
}));

export const translateEng = (eng: string) => {
    switch (eng) {
        case 'NORUSH':
            return 'ທຳມະດາ';
        case 'NORMAL':
            return 'ປານກາງ';
        case 'URGENT':
            return 'ດ່ວນ';
        case 'PEND_EVAlUATE':
            return 'ລໍຖ້າພິຈາລະນາ';
        case 'PEND_ACCEPT':
            return 'ລໍຖ້າຮັບວຽກ';
        case 'OPERATING':
            return 'ກຳລັງດຳເນີນງານ';
        case 'AUDIT':
            return 'ກວດເອກະສານ';
        case 'COMPLETED':
            return 'ສຳເລັດ';
        default:
            return eng;
    }
};
export const badge = (option: any) => {
    switch (option?.name) {
        case 'NORUSH':
            return 'task-badge status-norush';
        case 'NORMAL':
            return 'task-badge status-normal';
        case 'URGENT':
            return 'task-badge status-urgent';
        default:
            return '';
    }
};

export const customEvents: any[] = [
    {
        comment: 'ຮ່າງເອກະສານ',
        im_out_status: 1,
        create_by: 40010,
        comments: [{ comment: 'ຝ່າຍ ຊີ້ນຳ', date: '2024-08-12 03:02:37.794' }],
        date: '2024-08-10 03:02:37.794',
    },
    {
        comment: 'ຜອ ຊີ້ນຳ',
        create_by: 40011,
        im_out_status: 1,
        comments: [],
        date: '2024-08-11 03:02:37.794',
    },
    {
        comment: 'ຝ່າຍ ຊີ້ນຳ',
        create_by: 40012,
        im_out_status: 1,
        comments: [{ comment: 'ຝ່າຍ ຊີ້ນຳ', date: '2024-08-12 03:02:37.794' }, { comment: 'ຝ່າຍ ຊີ້ນຳ ແກ້ໄຂເດີ', date: '2024-08-12 03:02:37.794' }],
        date: '2024-08-12 03:02:37.794',
    },
    {
        comment: 'ລໍຖ້າ ປະຕິບັດ',
        create_by: 40013,
        im_out_status: 1,
        comments: [],
        date: '2024-08-12 05:02:37.794',
    },
    {
        comment: 'ຮັບວຽກ',
        create_by: 40013,
        im_out_status: 1,
        comments: [],
        date: '2024-08-12 05:02:37.794',
    },
    {
        comment: 'ຮ່າງບົດບັນທຶກ ແລະ ນຳສົ່ງຝ່າຍ',
        create_by: 40013,
        im_out_status: 2,
        comments: [],
        date: '2024-08-12 05:02:37.794',
    },
    {
        comment: 'ອະນຸມັດເຫັນດີຕາມການບັນທຶກກ່ອງປະຊຸ່ມ',
        create_by: 40012,
        im_out_status: 2,
        comments: [],
        date: '2024-08-12 05:02:37.794',
    },
];