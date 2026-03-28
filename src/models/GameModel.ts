import BaseModel from './BaseModel';

// SVG
import { RealTimeGamesSvg, WEGamesSvg, EvolutionGamesSvg } from 'assets/svg';

export const GAME_PROVIDERS: Record<string, any> = {
    evo: {
        name: 'Evolution Games',
        icon: EvolutionGamesSvg
    },
    rtg: {
        name: 'Real Time Games',
        icon: RealTimeGamesSvg
    },
    we: {
        name: 'World Platinum Entertainment Games',
        icon: WEGamesSvg
    },
    jili: {
        name: 'Jili Games',
        icon: WEGamesSvg
    }
};

type Props = {
    providerId: string;
};

export default interface GameModel extends BaseModel {
    name: string;
    priority: number;
    operatorGameName?: string;
    operatorGameType?: string;
    backgroundImage?: string;
    category: string;
    type: string;
    tableId?: null | string;
    description?: null | string;
    status: string;
    providerId: string;
    subOperatorGameName?: null | string;
    taxId?: null | string;
    uri?: null | string;
    liveOpenFrom?: null | string;
    liveOpenTo?: null | string;
    isSupportDemo?: null | boolean;
    isSupportPlayForFun?: null | boolean;
    thumbnailUrl?: null | string;
}
