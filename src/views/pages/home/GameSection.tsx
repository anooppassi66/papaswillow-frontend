// material-ui

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IconCards } from '@tabler/icons-react';
import { IconDeviceGamepad2 } from '@tabler/icons-react';
import { IconClubs } from '@tabler/icons-react';
import { IconFlame } from '@tabler/icons-react';
import { IconRocket } from '@tabler/icons-react';
import { IconPlayCard } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';

// project imports
import FadeInWhenVisible from 'views/pages/Animation';
import classicDice from 'assets/images/landing/crazytime.svg';
import Lucky from 'assets/images/landing/lightningroulette.svg';
import Bcgame from 'assets/images/landing/momoplay.svg';
import Kenneth from 'assets/images/landing/dealornodeal.svg';
import Roulette from 'assets/images/landing/craps.svg';
import Sugarrush from 'assets/images/landing/crazycoin.svg';

// types

import GameProviderSection from './GameProviderSection';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import GameModel from 'types/GameModel';
import { CardIconSvg, LiveIconSvg, ProvidersIconSvg, SlotIconSvg, SportIconSvg } from 'assets/svg';
import { apiGetGamesByMenuCategory, getGamesData } from 'api/GameApi';

interface GameBox {
    theme: Theme;
}

interface Game {
    name: string;
    image: string; // Assuming the images are imported paths or URLs as strings
}

// Define the type for a category object
interface Category {
    categoryName: string;
    categoryIcon: JSX.Element;
    games?: Game[];
}

const GameBoxStyle = styled(Box)(({ theme }: GameBox) => ({
    // backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.common.white,
    // background: '#1A654A',
    backgroundColor: theme.palette.dark[800],
    borderRadius: '0px'
}));

const categoryGames = [
    {
        categoryName: 'Providers',
        categoryIcon: <ProvidersIconSvg />
    },
    {
        categoryName: 'Cards',
        categoryIcon: <CardIconSvg />
    }
];

// =============================|| LANDING - FEATURE PAGE ||============================= //

const GameSection = () => {
    const theme = useTheme();
    const [catGames, setCatGames] = useState<Category[]>(categoryGames);
    const [categoryData] = useState<Category[]>(categoryGames);

    let [categoryTabIndex, setCategoryTabIndex] = useState<string>('Providers');
    const [loading, setLoading] = useState(false);

    const [providerGameList, setProviderGameList] = useState<null | Array<GameModel>>(null);
    const [menuCardsGameList, setMenuCardsGameList] = useState<null | Array<GameModel>>(null);
    const [menuSlotsGameList, setMenuSlotsGameList] = useState<null | Array<GameModel>>(null);
    const [menuLiveGameList, setMenuLiveGameList] = useState<null | Array<GameModel>>(null);
    const [menuSportsGameList, setMenuSportsGameList] = useState<null | Array<GameModel>>(null);

    // const category: Array<GameCategoryTabType> = [
    //     {
    //         label: 'Providers',
    //         icon: ProvidersIconSvg
    //     },
    //     {
    //         label: 'Cards',
    //         icon: CardIconSvg,
    //         types: ['RNG', 'CARD']
    //     },
    //     {
    //         label: 'Slots',
    //         icon: SlotIconSvg,
    //         types: ['SLOTS']
    //     },
    //     {
    //         label: `Live Games'}`,
    //         icon: LiveIconSvg,
    //         types: ['LIVE', 'LIVE-DEALER']
    //     },
    //     {
    //         label: `Sports Bet'}`,
    //         icon: SportIconSvg,
    //         types: ['SPORTS']
    //     }
    // ];

    const getCurrentGameList = (): null | Array<GameModel> => {
        let gameModels: null | Array<GameModel> = [];
        switch (categoryTabIndex) {
            case 'Providers':
                gameModels = providerGameList;
                break;
            case 'Cards':
                gameModels = menuCardsGameList;
                break;
        }
        return gameModels;
    };

    const getGamesList = async () => {
        switch (categoryTabIndex) {
            case 'Providers':
                if (!providerGameList) {
                    const response = await getGamesData();
                    setProviderGameList(response.data.data);
                }
                break;
            case 'Cards':
                if (!menuCardsGameList) {
                    const response = await apiGetGamesByMenuCategory('cards');
                    setMenuCardsGameList(response);
                }
                break;
            case 'slots':
                if (!menuSlotsGameList) {
                    const gameModels: null | Array<GameModel> = await apiGetGamesByMenuCategory('slots');
                    setMenuSlotsGameList(gameModels);
                }
                break;
            case 'live':
                if (!menuLiveGameList) {
                    const gameModels: null | Array<GameModel> = await apiGetGamesByMenuCategory('live');
                    setMenuLiveGameList(gameModels);
                }
                break;
            case 'sports':
                if (!menuSportsGameList) {
                    const gameModels: null | Array<GameModel> = await apiGetGamesByMenuCategory('sports');
                    setMenuSportsGameList(gameModels);
                }
                break;
        }
    };

    useEffect(() => {
        console.log('effect');
        getGamesList();
    }, [categoryTabIndex]);
    console.log(categoryTabIndex, 'categoryTabIndex');

    return (
        <GameBoxStyle sx={{ p: '15px 10px', mb: '20px', mt: '20px' }}>
            <Grid
                container
                justifyContent="flex-start"
                sx={{ gap: '10px', mb: '20px', display: 'flex', overflow: 'auto', flexWrap: 'nowrap' }}
            >
                {categoryData.map((category: Category) => (
                    <Button
                        sx={{
                            background: `${categoryTabIndex === category.categoryName ? '#00000069' : theme.palette.secondary.main}`,
                            borderRadius: '5px',
                            fontSize: '1rem',
                            color: '#fff',
                            fontWeight: '600',
                            fontFamily: 'Roboto',
                            padding: '.20rem 1.1rem',
                            gap: '5px',
                            minWidth: 'fit-content !important',
                            width: 'auto !important',
                            whiteSpace: 'nowrap',
                            ':hover': {
                                background: '#00000069'
                            }
                        }}
                        onClick={() => setCategoryTabIndex(category.categoryName)}
                    >
                        {loading ? (
                            <>
                                <Skeleton
                                    variant="rectangular"
                                    sx={{ mt: '2px', mb: '2px', background: '#18835D' }}
                                    width={60}
                                    height={34}
                                />
                            </>
                        ) : (
                            <>
                                {category.categoryIcon}
                                {category.categoryName}
                            </>
                        )}
                    </Button>
                ))}
            </Grid>
            <Grid container justifyContent="center" spacing={{ xs: 2, sm: 2 }}>
                {providerGameList?.length && (
                    <GameProviderSection headers={categoryTabIndex === 'Providers'} gameList={getCurrentGameList()} />
                )}
            </Grid>
        </GameBoxStyle>
    );
};

export default GameSection;
