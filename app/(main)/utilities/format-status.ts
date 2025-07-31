export const statusCases = (status: string): { statusla: string; bgcolor: string; color: string; icon: string} => {
    let statusla: string = '';
    let color: any = "info";
    let bgcolor: any = "info";
    let icon: any = "pi-info-circle";
    switch (status) {
        case "Approved":
            statusla = "ອະນຸມັດ";
            bgcolor = "#d9f7be";
            color = "#52c41a";
            icon = 'pi-check';
            break;
        case "Rejected":
            statusla = "ບໍ່ອະນຸມັດ";
            bgcolor = "#ffe7ba";
            color = "#fa8c16";
            icon = 'pi-exclamation-triangle';
            break;
        case "Pending":
            statusla = "ລໍອະນຸມັດ";
            bgcolor = "#ffccc7";
            color = "#f5222d";
            icon = 'pi-user';
            break;
        default:
            statusla = "ບໍ່ມີ";
            bgcolor = "#d6e4ff";
            color = "#1890ff";
            icon = 'pi-info-circle';
            break;
    }

    return { statusla, bgcolor, color, icon };
};

export const status_in_out = (
  status: string
): { statusla: string; bgcolor: string; color: string; icon: string } => {
  let statusla = '';
  let color = '';
  let bgcolor = '';
  let icon = '';

  switch (status) {
    case 'in':
      statusla = 'ກົດເຂົ້າ';
      bgcolor = '#E6FFFB';       // light teal background
      color = '#13C2C2';         // teal text
      icon = 'pi-sign-in';       // PrimeIcons sign‑in
      break;

    case 'normal':
      statusla = 'ທຳມະດາ';
      bgcolor = '#E6FFFB';       // light teal background
      color = '#13C2C2';         // teal text
      icon = 'pi-sign-in';       // PrimeIcons sign‑in
      break;

    case 'manual':
      statusla = 'Manual';
      bgcolor = '#f0f5ff';       // light red background
      color = '#2f54eb';         // red text
      icon = 'pi-sign-out';      // PrimeIcons sign‑out
      break;

    case 'out':
      statusla = 'ກົດອອກ';
      bgcolor = '#FFF1F0';       // light red background
      color = '#FF4D4F';         // red text
      icon = 'pi-sign-out';      // PrimeIcons sign‑out
      break;

    default:
      statusla = 'ບໍ່ມີ';
      bgcolor = '#F0F5FF';       // light blue background
      color = '#2F54EB';         // blue text
      icon = 'pi-info-circle';   // info icon
      break;
  }

  return { statusla, bgcolor, color, icon };
};


export const statusTypeField = (statustype: string): { statusla: string; bgcolor: string; color: string; icon: string} => {
    let statusla: string = '';
    let bgcolor: any = "info";
    let color: any = "info";
    let icon: any = "pi-info-circle";
    switch (statustype) {
        case "ຕ່າງປະເທດ":
            statusla = statustype;
            bgcolor = "#d6e4ff";
            color = "#1d39c4";
            icon = 'pi-globe';
            break;
        case "ພາຍໃນປະເທດ":
            statusla = "ພາຍໃນ";
            bgcolor = "#fffb8f";
            color = "#876800";
            icon = 'pi-car';
            break;
        default:
            statusla = statustype;
            bgcolor = "#d3adf7";
            color = "#722ed1";
            icon = 'pi-th-large';
            break;
    }

    return { statusla, color, bgcolor, icon };
};

export const statusLeaveType = (statusLeave_type_id: number): { bgcolor: string; color: string; icon: string} => {
    // let statusla: string = '';
    let bgcolor: any = "info";
    let color: any = "info";
    let icon: any = "pi-info-circle";
    switch (statusLeave_type_id) {
        case 1:
            // statusla = "ລາພັກເຈັບປ່ວຍ Sick";
            bgcolor = "#ffccc7";
            color = "#a8071a";
            icon = "pi-heart";
            break;
        case 2: 
            // statusla = "ລາພັກປະຈຳປີ";
            bgcolor = "#fffb8f";
            color = "#876800";
            icon = "pi-calendar";
            break;
        case 3: 
            // statusla = "ລາພັກເກີດລູກ";
            bgcolor = "#ffd6e7";
            color = "#c41d7f";
            icon = "pi-star";
            break;
        case 4: 
            // statusla = "ລາພັກແຕ່ງງານ";
            bgcolor = "#fff1f0";
            color = "#cf1322";
            icon = "pi-heart-fill";
            break;
        case 5: 
            // statusla = "ລາພັກຄອບຄົວເສຍຊີວິດ";
            bgcolor = "#fff2e8";
            color = "#d4380d";
            icon = "pi-exclamation-circle";
            break;
        case 6: 
            // statusla = "ລາພັກບໍ່ເອົາເງິນເດືອນ";
            bgcolor = "#d9f7be";
            color = "#135200";
            icon = "pi-wallet";
            break;
        default:
            // statusla = "ປະເພດບໍ່ທຣາບ";
            bgcolor = "#d3adf7";
            color = "#722ed1";
            icon = "pi-question-circle";
            break;
    }
    return { color, bgcolor, icon };
};

export const statusLeaveTypeName = (statusLeave_type_name: string): { bgcolor: string; color: string; icon: string} => {
    // let statusla: string = '';
    let bgcolor: any = "info";
    let color: any = "info";
    let icon: any = "pi-info-circle";
    switch (statusLeave_type_name) {
        case "ລາພັກເຈັບປ່ວຍ":
            // statusla = "ລາພັກເຈັບປ່ວຍ Sick";
            bgcolor = "#ffff";
            color = "#a8071a";
            icon = "pi-heart";
            break;
        case "ລາພັກປະຈຳປີ": 
            // statusla = "ລາພັກປະຈຳປີ";
            bgcolor = "#fffb8f";
            color = "#876800";
            icon = "pi-calendar";
            break;
        case "ລາພັກເກີດລູກ": 
            // statusla = "ລາພັກເກີດລູກ";
            bgcolor = "#ffd6e7";
            color = "#c41d7f";
            icon = "pi-star";
            break;
        case "ລາພັກແຕ່ງງານ": 
            // statusla = "ລາພັກແຕ່ງງານ";
            bgcolor = "#fff1f0";
            color = "#cf1322";
            icon = "pi-heart-fill";
            break;
        case "ລາພັກຄອບຄົວເສຍຊີວິດ": 
            // statusla = "ລາພັກຄອບຄົວເສຍຊີວິດ";
            bgcolor = "#fff2e8";
            color = "#d4380d";
            icon = "pi-exclamation-circle";
            break;
        case "ລາພັກບໍ່ເອົາເງິນເດືອນ": 
            // statusla = "ລາພັກບໍ່ເອົາເງິນເດືອນ";
            bgcolor = "#d9f7be";
            color = "#135200";
            icon = "pi-wallet";
            break;
        default:
            // statusla = "ປະເພດບໍ່ທຣາບ";
            bgcolor = "#d3adf7";
            color = "#722ed1";
            icon = "pi-question-circle";
            break;
    }
    return { color, bgcolor, icon };
};
