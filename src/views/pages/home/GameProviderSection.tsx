// material-ui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';

// assets

// types
import { ThemeMode } from 'types/config';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import GameModel from 'types/GameModel';
import GameList from './GameList';

// =============================|| LANDING - CARD SECTION ||============================= //

const GameProviderSection = ({ gameList, headers }: { gameList: Array<GameModel> | null; headers: boolean }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an API call or data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
        // const downMD = useMediaQuery(theme.breakpoints.down('md'));
    }, []);

    console.log(gameList, 'games');

    //filter ans sort by desc order
    const groupByCategory = (gameList || [])
        .filter((game: any) => game.displayOrder > 0)
        .sort((x: any, y: any) => {
            return x.displayOrder - y.displayOrder;
        })
        .reduce((group: any, game: any) => {
            const { providerId } = game;
            group[providerId] = group[providerId] ?? [];
            game.image = 'thumbnail_320x320.jpg';
            game.infoUrl = ``;
            group[providerId].push(game);
            return group;
        }, {});

    return (
        <>
            {groupByCategory &&
                ['evo', 'rtg', 'we', 'jili'].map((providerId: string) =>
                    groupByCategory[providerId] ? (
                        <GameList
                            key={providerId}
                            headers={headers}
                            providerId={providerId}
                            games={groupByCategory[providerId].slice(0, 11)}
                            displayViewAllButton={true}
                        />
                    ) : null
                )}
        </>
    );
};

export default GameProviderSection;
