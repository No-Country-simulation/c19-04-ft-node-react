import React, { useState, useRef } from 'react';
import CardSearch from '../CardSearch/CardSearch';
import SkeletonComponent from '../SkeletonComponente/SkeletonComponent';

const ContainerCardsFilter = ({ dataFilter, isLoading }) => {
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        containerRef.current.startX = e.pageX;
        containerRef.current.scrollLeft = containerRef.current.scrollLeft;
        containerRef.current.isDragging = true;
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current.isDragging) return;

        const dx = e.pageX - containerRef.current.startX;
        containerRef.current.scrollLeft -= dx;
        containerRef.current.startX = e.pageX;
    };

    const handleMouseUp = () => {
        containerRef.current.isDragging = false;
    };

    const handleTouchStart = (e) => {
        containerRef.current.startX = e.touches[0].pageX;
        containerRef.current.scrollLeft = containerRef.current.scrollLeft;
        containerRef.current.isDragging = true;
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current.isDragging) return;

        const dx = e.touches[0].pageX - containerRef.current.startX;
        containerRef.current.scrollLeft -= dx;
        containerRef.current.startX = e.touches[0].pageX;
    };

    const handleTouchEnd = () => {
        containerRef.current.isDragging = false;
    };

    return (
        <div
            ref={containerRef}
            className="w-full overflow-hidden py-3 relative cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex flex-nowrap gap-8 pl-8 pr-20">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonComponent key={index} />
                    ))
                    : dataFilter.map((element, index) => (
                        <CardSearch
                            key={index}
                            _id={element._id}
                            description={element.description}
                            price={element.price}
                            timePreparation={element.estimatedTimeToDeliver}
                            title={element.title}
                            imgUrl={element.imgUrl}
                        />
                    ))}
                <div className="flex-shrink-0 w-5"></div>
            </div>
        </div>
    );
};

export default ContainerCardsFilter;
