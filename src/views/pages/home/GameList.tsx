// material-ui
import { useEffect, useState } from 'react';
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

import Skeleton from '@mui/material/Skeleton';
import GameModel, { GAME_PROVIDERS } from 'types/GameModel';
import FadeInWhenVisible from '../Animation';
import { Link } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';

// =============================|| LANDING - CARD SECTION ||============================= //

type Props = {
    games: null | Array<GameModel>;
    providerId?: string;
    displayViewAllButton?: boolean;
    displaySearch?: boolean;
    isMenu?: boolean;
    headers?: boolean;
    onClick?: (gameId: string) => void;
};

interface GameProvider {
    theme: Theme;
}

const GameProviderBox = styled(Box)(({ theme }: GameProvider) => ({
    backgroundColor: theme.palette.dark.dark,
    // background: '#00492D',
    borderRadius: '5px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    width: '100%',
    border: '1px solid #008E5C'
}));

const GameList = ({ games, providerId, headers, onClick }: Props) => {
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    console.log(providerId, 'providerId');
    const gameProviderLabel = providerId ? GAME_PROVIDERS[providerId] : null;
    console.log(GAME_PROVIDERS, 'GAME_PROVIDERS');

    // const noImage = `https://arionplay-media.s3.ap-southeast-1.amazonaws.com/${gameModel.providerId}/${gameModel.id}/thumbnail_320x320.jpg`;
    return (
        <>
            <Grid item md={12} sm={12} xs={12}>
                {gameProviderLabel ? (
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.20rem',
                            pb: '10px',
                            color: '#fff',
                            fontFamily: 'Roboto'
                            // transition:'color cubic-bezier(.42,0,.03,1) .7s',
                        }}
                    >
                        {gameProviderLabel?.icon && (
                            <span style={{ paddingRight: '0.5rem' }}>
                                <gameProviderLabel.icon />
                            </span>
                        )}
                        {gameProviderLabel?.name}
                    </Typography>
                ) : (
                    <div></div>
                )}
                <FadeInWhenVisible>
                    <Grid container justifyContent="start" sx={{ textAlign: 'center' }} spacing={{ xs: 2, sm: 2 }}>
                        {games &&
                            games.map((game: any) => (
                                <Grid item md={2} sm={4} xs={4}>
                                    <GameProviderBox>
                                        {loading ? (
                                            <>
                                                <Skeleton
                                                    variant="rectangular"
                                                    sx={{ mt: '2px', mb: '2px', background: theme.palette.secondary.main }}
                                                    height={213}
                                                />
                                            </>
                                        ) : (
                                            <Stack sx={{ padding: '0px' }}>
                                                <CardActionArea
                                                    component={Link}
                                                    to={`/game/${game.providerId}/${game.id}/`}
                                                    onClick={() => {
                                                        onClick && onClick(game.id);
                                                    }}
                                                >
                                                    <img 
                                                        className="cover"
                                                        src={
                                                            game.thumbnailUrl ||
                                                            `https://arionplay-media.s3.ap-southeast-1.amazonaws.com/${game.providerId}/${game.id}/thumbnail_320x320.jpg` ||
                                                            `https://arionplay-media.s3.ap-southeast-1.amazonaws.com/${game.providerId}/noimage/${game.providerId}-no-image.svg`
                                                        }
                                                        alt=""
                                                        style={{ borderRadius: '0px', width:'100%' }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: '.85rem',
                                                            pt: '10px',
                                                            pb: '10px',
                                                            color: '#fff',
                                                            fontFamily: 'Roboto',
                                                            [theme.breakpoints.down(1023)]: {
                                                                fontSize: '0.7rem',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis',
                                                                overflow: 'hidden',
                                                              },
                                                        }}
                                                    >
                                                        {game.name}
                                                    </Typography>
                                                </CardActionArea>
                                            </Stack>
                                        )}
                                    </GameProviderBox>
                                </Grid>
                            ))}
                    </Grid>
                </FadeInWhenVisible>
            </Grid>
        </>
    );
};

export default GameList;
