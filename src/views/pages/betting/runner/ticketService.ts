export const getTicketCount = (tickets: any, selectedPool: string, legs: number) => {
    let totalTickets = 0;
    switch (selectedPool.toUpperCase()) {
        case 'WIN':
        case 'SHP':
        case 'THP':
        case 'PLC':
        case 'SHW':
            totalTickets = singleLeg(tickets);
            break;
        case 'FOR':
            totalTickets = forecastTickets(tickets);
            break;
        case 'QUI':
            totalTickets = quinelaTickets(tickets);
            break;
        case 'TAN':
            totalTickets = tanalaTickets(tickets);
            break;
        case 'EXA':
            totalTickets = exactaTickets(tickets);
            break;
        default:
            totalTickets = multiTickets(tickets, legs);
            break;
    }
    return totalTickets;
};

// const nthNumber = (value: number) => {
//   if (value > 3 && value < 21) return 'th';
//   switch (value % 10) {
//     case 1:
//       return 'st';
//     case 2:
//       return 'nd';
//     case 3:
//       return 'rd';
//     default:
//       return 'th';
//   }
// };

const singleLeg = (combs: any) => {
    return combs.length === 1 ? combs[0].length : 0;
};

const forecastTickets = (combs: any) => {
    let totalTickets = 0;

    if (combs.length === 2) {
        for (let i = 0; i < combs[0].length; i++) {
            const fRun = combs[0][i];
            for (let j = 0; j < combs[1].length; j++) {
                const sRun = combs[1][j];
                if (fRun === '' || sRun === '' || fRun === sRun) continue;
                totalTickets++;
            }
        }
    }
    return totalTickets;
};

const quinelaTickets = (combs: any) => {
    const usedV = [];

    if (combs.length === 2) {
        for (let i = 0; i < combs[0].length; i++) {
            const fRun = combs[0][i];

            for (let j = 0; j < combs[1].length; j++) {
                const sRun = combs[1][j];
                if (fRun === '' || sRun === '' || fRun === sRun) continue;
                if (parseInt(fRun) < parseInt(sRun)) {
                    if (usedV.indexOf(fRun + ',' + sRun) === -1) usedV.push(fRun + ',' + sRun);
                } else {
                    if (usedV.indexOf(sRun + ',' + fRun) === -1) usedV.push(sRun + ',' + fRun);
                }
            }
        }
    }
    return usedV.length;
};

const tanalaTickets = (combs: any) => {
    let totalTickets = 0;

    if (combs.length === 3) {
        for (let i = 0; i < combs[0].length; i++) {
            const fRun = combs[0][i];
            for (let j = 0; j < combs[1].length; j++) {
                const sRun = combs[1][j];
                if (fRun === '' || sRun === '' || fRun === sRun) continue;

                for (let k = 0; k < combs[2].length; k++) {
                    const tRun = combs[2][k];
                    if (fRun === '' || sRun === '' || tRun === '' || fRun === tRun || sRun === tRun) continue;
                    totalTickets++;
                }
            }
        }
    }
    return totalTickets;
};

const exactaTickets = (combs: any) => {
    let totalTickets = 0;

    if (combs.length === 4) {
        for (let i = 0; i < combs[0].length; i++) {
            const fRun = combs[0][i];
            for (let j = 0; j < combs[1].length; j++) {
                const sRun = combs[1][j];
                if (fRun === '' || sRun === '' || fRun === sRun) continue;
                for (let k = 0; k < combs[2].length; k++) {
                    const tRun = combs[2][k];
                    if (fRun === '' || sRun === '' || tRun === '' || fRun === tRun || sRun === tRun) continue;
                    for (let x = 0; x < combs[3].length; x++) {
                        const xRun = combs[3][x];
                        if (fRun === '' || sRun === '' || tRun === '' || xRun === '' || fRun === xRun || sRun === xRun || tRun === xRun)
                            continue;
                        totalTickets++;
                    }
                }
            }
        }
    }
    return totalTickets;
};

const multiTickets = (combs: any, legs: number) => {
    let totalTickets = 0;
    let countPos = 0;

    combs.forEach((items: any) => {
        if (totalTickets === 0) totalTickets = items.length;
        else totalTickets *= items.length;
        if (items.length > 0) countPos++;
    });
    if (countPos === legs) return totalTickets;
    else return 0;
};
