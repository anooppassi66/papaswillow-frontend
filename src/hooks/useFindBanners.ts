import { useMemo } from 'react';
import { useSelector as useAppSelector } from 'react-redux';

type Banner = {
    id: number;
    bannerName: string;
    bannerDesc: string | null;
    bannerLink: string;
    bannerImages: string;
    bannerPositions: string;
    bannerStatus: string;
    createdAt: string;
    createdBy: string;
    updateAt: string | null;
    updateBy: string | null;
};

const useBannerByFindPosition = (position: string): Banner => {
    const { slides } = useAppSelector((state: any) => state.store.banners);
    console.log(slides, 'bannersbannersbanners');
    const filteredBanners = useMemo(() => {
        return slides?.find((banner: Banner) => banner.bannerPositions === position && banner.bannerStatus === 'active');
    }, [slides, position]);

    return filteredBanners;
};

export default useBannerByFindPosition;
