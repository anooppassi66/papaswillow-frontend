import { setUserWallet } from 'store/slices/wallet';
import { store } from 'store';
import RacingService from './RacingService';
// import RacingService from './RacingService';
// import LocalStorageService from './LocalStorageService';
import { ToastContainer, toast } from 'react-toastify';
import { getRacingData, setRaceCardChange, setRaceCardEventChage } from 'store/slices/racecard';
import LocalStorageService from './LocalStorageService';

export const updateModelAttributes = async (modelAttributes: any) => {
    const { wallet } = store.getState();
    console.log('socket calling');
    console.log(modelAttributes, '===MODEL ATTRIBUTES');
    if (modelAttributes.typename === 'wallet') {
        const { balance } = modelAttributes;
        store.dispatch(setUserWallet(balance));
    }
    if (modelAttributes.typename === 'racecardactions') {
        updateRaceCardEvents(modelAttributes);
    }
    if (modelAttributes.typename === 'racecardodds') {
        changeRaceOdds(modelAttributes);
    }
    // if (modelAttributes.typename === 'stream') {
    //     let streamData = {
    //         // ...raceinfo.raceStreamData,
    //         ...modelAttributes
    //     };
    //     if (streamData.provider === 'SIS') {
    //         const response = await getSISStreamURL(streamData.streamId);
    //         console.log(response);
    //         streamData.iframeFlag = 'N';
    //         if (response.error !== undefined && response.error) {
    //             streamData.message = response.error;
    //         } else {
    //             streamData.message = '';
    //             streamData.iframeFlag = 'Y';
    //             streamData.streamUrl = response.phenixEmbedUrl;
    //         }
    //     }
    //     console.log(streamData);
    //     store.dispatch(setRaceStreamData(streamData));
    // }
};

export const updateRaceCardEvents = (modelAttributes: any) => {
    if (modelAttributes.action != 'odds') console.log(modelAttributes.action);
    let notifyMessage = '';
    switch (modelAttributes.action) {
        case 'save':
            notifyMessage = `Race card for ${modelAttributes.venueCode} published`;
            fetchRaceCard(modelAttributes.action.raceCardId);
            break;
        case 'refresh':
            fetchRaceCard(modelAttributes.raceCardId);
            break;
        case 'startBet':
            notifyMessage = `Betting Started for ${modelAttributes.venueCode} race ${modelAttributes.races}`;
            changeRaceCard(modelAttributes, 'status', 'BST');
            break;
        case 'stopBet':
            notifyMessage = `Betting Stopped for ${modelAttributes.venueCode} race ${modelAttributes.races}`;
            changeRaceCard(modelAttributes, 'status', 'BSP');
            break;
        case 'resultSaved':
            notifyMessage = `Results Announced ${modelAttributes.venueCode} race ${modelAttributes.races}`;
            changeRaceCard(modelAttributes, 'statusView', 'STP');
            fetchRaceCard(modelAttributes.raceCardId);
            break;
        case 'resultPublished':
            notifyMessage = `Results Published ${modelAttributes.venueCode} race ${modelAttributes.races}`;
            fetchRaceCard(modelAttributes.raceCardId);
            break;
        case 'releaseDividend':
            notifyMessage = `Dividends Released For ${modelAttributes.venueCode} race ${modelAttributes.races}`;
            fetchRaceCard(modelAttributes.raceCardId);
            break;
        case 'withDraw_revert':
            changeRunner(modelAttributes);
            break;
        case 'withDraw':
            changeRunner(modelAttributes);
            break;
        default:
            console.log('Missed Action ', modelAttributes);
            //props.setRaceCardUpdated(props.raceCardUpdated+1);
            break;
    }
    if (notifyMessage !== '') toast(notifyMessage);
};

const fetchRaceCard = (id: string) => {
    console.log(id, '==SOCKET ID');
    store.dispatch(getRacingData(id));
    store.dispatch(setRaceCardEventChage());
};

const getSISStreamURL = async (id: any) => {
    let result: any = await RacingService.getSISStreamUrl(id);
    return result.body.data;
};

const changeRaceOdds = async (data: any) => {
    let raceCardTemp: any = await RacingService.getLocalRaceData();
    raceCardTemp = JSON.parse(raceCardTemp);
    if (raceCardTemp === undefined || raceCardTemp === '' || raceCardTemp.details === undefined) {
        store.dispatch(getRacingData(data.raceCardId));
        return;
    }
    let racecard = raceCardTemp.details;
    const actualRunners = data.runners.reduce((previousObject: any, currentObject: any) => {
        return Object.assign(previousObject, {
            [currentObject.position]: currentObject
        });
    }, {});
    if (racecard[data.raceNumber - 1] !== undefined && racecard[data.raceNumber - 1]['runners'] !== undefined) {
        let runners = racecard[data.raceNumber - 1]['runners'];
        const resultRunners =
            runners.length > 0 &&
            runners?.map((item: any) => {
                if (actualRunners[item.position] !== undefined && actualRunners[item.position].odds !== undefined) {
                    item.odds = actualRunners[item.position].odds;
                    item.vendorOdds = actualRunners[item.position].vendorOdds;
                    return item;
                }
                return item;
            });
        console.log('RUNNERS ODDS', resultRunners);
        raceCardTemp.details[data.raceNumber - 1]['runners'] = resultRunners;
        LocalStorageService.setItem('raceinfo', JSON.stringify(raceCardTemp));
        store.dispatch(setRaceCardChange());
    }
};

const changeRaceCard = async (data: any, field: string, status: string) => {
    let raceCardTemp: any = await RacingService.getLocalRaceData();
    raceCardTemp = JSON.parse(raceCardTemp);
    if (raceCardTemp === undefined || raceCardTemp === '' || raceCardTemp.details === undefined) {
        store.dispatch(getRacingData(data.action.raceCardId));
        return;
    }
    console.log(raceCardTemp.details, '===CARD DETAILS');
    console.log(data.races, '===RACE NUMBER');
    console.log(field, '===FIELD');
    console.log(status, '===STATUS');
    let races = data.races.split(',');
    console.log(races);
    races.forEach((race: any) => {
        raceCardTemp.details[race - 1][field] = status;
    });
    LocalStorageService.setItem('raceinfo', JSON.stringify(raceCardTemp));
    store.dispatch(setRaceCardChange());
    store.dispatch(setRaceCardEventChage());
};

const changeRunner = async (data: any) => {
    let raceCardTemp: any = await RacingService.getLocalRaceData();
    raceCardTemp = JSON.parse(raceCardTemp);
    if (raceCardTemp === undefined || raceCardTemp === '' || raceCardTemp.details === undefined) {
        store.dispatch(getRacingData(data.action.raceCardId));
        return;
    }
    let racecard = raceCardTemp.details;
    console.log('WITHDRAW ACTION', data);
    //let obj = { action: data.action, races: data.races, horses:any };
    if (data.action === 'withDraw') {
        const withdrawHorses = data.horses.split(',');
        let notifyMessage = `${data.venueCode} RACE ${data.races} : Horse(s) ${data.action} - ${withdrawHorses}`;
        // console.log(withdrawHorses);
        if (data.horses.length > 0) toast(notifyMessage);
        let runners = racecard[data.races - 1]['runners'];
        const resultRunners = runners?.map((item: any) => {
            item.scratched = 'N';
            if (withdrawHorses.includes(item.position)) {
                item.scratched = 'Y';
                return item;
            }
            return item;
        });
        raceCardTemp.details[data.races - 1]['runners'] = resultRunners;
        LocalStorageService.setItem('raceinfo', JSON.stringify(raceCardTemp));
        store.dispatch(setRaceCardChange());
    }
};
