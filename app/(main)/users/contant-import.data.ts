export const contant = {
    tabview: {
        import: { l_name: 'ເອກະສານພາຍນອກ', e_name: 'External EDL', icon: 'pi pi-book' },
        department_department: { l_name: 'ເອກະສານພາຍໃນຝ່າຍ-ຝ່າຍ', e_name: 'Between Department', icon: 'pi pi-refresh' },
        divion_divion: { l_name: 'ເອກະສານພະແນກ-ພະແນກ', e_name: 'Between Division', icon: 'pi pi-refresh' },
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
