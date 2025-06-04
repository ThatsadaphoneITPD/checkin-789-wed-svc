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
            bgcolor = "#d6e4ff";
            color = "#1d39c4";
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
            bgcolor = "#f4ffb8";
            color = "#3a3d00";
            icon = "pi-heart-fill";
            break;
        case 5: 
            // statusla = "ລາພັກຄອບຄົວເສຍຊີວິດ";
            bgcolor = "#ffccc7";
            color = "#a8071a";
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
