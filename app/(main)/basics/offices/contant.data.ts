export const contant = {
    tabview: {
        external_drive: { l_name: 'ພາຍນອກ', e_name: 'Between Department', icon: 'pi pi-refresh' },
        internal_drive: { l_name: 'ພາຍໃນ', e_name: 'Between Division', icon: 'pi pi-refresh' },
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
