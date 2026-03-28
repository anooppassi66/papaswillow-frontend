import React from 'react';

interface ImageViewerProps {
    imageSrc: string;
}

export const StoreView: React.FC<ImageViewerProps> = ({ imageSrc }) => {
    return (
        <div>
            <img src={imageSrc} alt="thumbnail" />
        </div>
    );
};
