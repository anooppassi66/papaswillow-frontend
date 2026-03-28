import React, { useState } from 'react';
import ShareOnSocial from 'react-share-on-social';
import { IconShare } from '@tabler/icons-react';
import {
    FacebookShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
    LinkedinShareButton,
  } from 'react-share';
export const ShareProduct = ({ productName }: { productName: string }) => {
    console.log(productName);

    const link = window.location.href;
    const textShare = productName;
    const linkTitle = productName;
    const image = 'https://papaswillow.com/uploads/28ec5f3a400ae8b13a7d0eb928994ed2.png';
    
    const [isHovered, setIsHovered] = useState<boolean>(false);
   

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      <button style={{ cursor: 'pointer' }}><IconShare/></button>

      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '35px',
            left: '0',
            display: 'flex',
            gap: '10px',
            background:'#eaeaea',
            padding:'10px',
            height:'50px',
            borderRadius:'5px',
          }}
        >
          <FacebookShareButton url={link}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <WhatsappShareButton url={link} title={linkTitle}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          {/* {/ Instagram sharing link /} */}
          <a
            href={`https://www.instagram.com/PapasWillow/?u=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Share on Instagram"
              style={{ width: '32px', borderRadius: '50%' }}
            />
          </a>
        </div>
      )}
    </div>
  );
    
};
