import React, { useState } from 'react';
import Image from 'next/image';

interface MagnifyProps {
    imageProps: {
        src: string;
        alt: string;
        width: number;
        height: number
    };
    magnificationFactor?: number;
    lenseSize: number
}

const Magnify: React.FC<MagnifyProps> = ({
    imageProps,
    magnificationFactor = 2,
    lenseSize
}) => {
    const [isMagnified, setIsMagnified] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
        setIsMagnified(true);
    };

    const handleMouseLeave = () => {
        setIsMagnified(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const image = e.currentTarget;
        const bounds = image.getBoundingClientRect();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        // Calculate the lens position within the image boundaries
        const lensX = Math.min(Math.max(x, lenseSize / 2), bounds.width - lenseSize / 2);
        const lensY = Math.min(Math.max(y, lenseSize / 2), bounds.height - lenseSize / 2);

        setPosition({ x: lensX, y: lensY });
    };

    const style = {
        transform: `scale(${magnificationFactor})`,
        transformOrigin: `${position.x}px ${position.y}px`,
    };

    return (
        <div className="relative inline-block">
            <div className="relative overflow-hidden">
                <Image
                    src={imageProps.src}
                    alt={imageProps.alt}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    width={imageProps.width}
                    height={imageProps.height}
                    priority
                    className="w-full h-auto cursor-crosshair rounded"
                />
                {isMagnified &&
                    <div className="bg-black bg-opacity-60 rounded absolute pointer-events-none" style={{ top: `${position.y - lenseSize / 2}px`, left: `${position.x - lenseSize / 2}px`, width: `${lenseSize}px`, height: `${lenseSize}px` }} />
                }
            </div>
            {isMagnified &&
                <div className="absolute left-full top-0 w-[500px] h-full overflow-hidden ml-4 rounded z-30">
                    <Image
                        src={imageProps.src}
                        alt="Magnified"
                        fill
                        className="w-full h-full rounded"
                        style={style}
                        priority
                    />
                </div>
            }
        </div>
    );
};

export default Magnify;
