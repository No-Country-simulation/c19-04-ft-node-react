import React, { useState, useRef, useEffect } from 'react';
import CardSearch from '../CardSearch/CardSearch';

const ContainerCardsFilter = ({ dataFilter }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const contentWidth = containerRef.current.scrollWidth;
            const extraSpace = 390;
            // Ajuste para el efecto continuo
            const maxScroll = contentWidth + extraSpace;

            // Ajusta el scrollPosition para crear un efecto continuo con espacio extra
            if (scrollPosition < 0) {
                setScrollPosition(maxScroll - containerWidth);
            } else if (scrollPosition > maxScroll) {
                setScrollPosition(0);
            }
        }
    }, [scrollPosition]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPosition(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newScrollPosition = scrollPosition - (e.clientX - startPosition);
        setScrollPosition(newScrollPosition);
        setStartPosition(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartPosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const newScrollPosition = scrollPosition - (e.touches[0].clientX - startPosition);
        setScrollPosition(newScrollPosition);
        setStartPosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={containerRef}
            className="w-full overflow-hidden py-3 relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex flex-nowrap gap-8 transition-transform ease-out duration-300 pl-4"
                style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
                <div className="flex-shrink-0" style={{ width: '30px' }}></div>
                {dataFilter.map((element) => (
                    <CardSearch 
                        _id = {element._id}
                        description={element.descriptionBONITA}
                        price={element.price}
                        timePreparation={element.estimatedTimeToDeliver}
                        title={element.title}
                        imgUrl={element.imgUrl} />
                ))}

            </div>
        </div>
    );
};

export default ContainerCardsFilter;
