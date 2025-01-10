export const contant = {
    tabview: {
        field_work: { l_name: 'ອອກວຽກສະໜາມ', e_name: 'Field Work', icon: 'pi pi-refresh' },
        outside_work: { l_name: 'ອອກວຽກນອກ', e_name: 'OutSide Work', icon: 'pi pi-refresh' },
        sick_leave: { l_name: 'ຄອບລາ ພັກ/ປວນ', e_name: 'Sick Leave', icon: 'pi pi-refresh' },
        employee_daily: { l_name: 'ປະຫວັດພະນັກງານ ກົດເຂົ້າ-ອອກ', e_name: 'Employee Rountim', icon: 'pi pi-refresh' },
        monthly_report: { l_name: 'ປະຈຳເດືອນ', e_name: 'Monthly Report', icon: 'pi pi-refresh' },
    },
};
export const translate = (contant: any, object: string, subobj: string, itensub: string, lang: string) => {
  const selectedObject = contant[object];
  if (!selectedObject) return null;
  const selectedSubObject = selectedObject[subobj];
  if (!selectedSubObject) return null;
  let langKey :any;
  if (itensub === 'icon') {langKey = 'icon';}
  else if (itensub === 'path') {langKey = 'path';}
  else {langKey = lang === 'LA' ? 'l_name' : 'e_name';}
  return selectedSubObject[langKey];
};
