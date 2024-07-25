import React, { useState } from 'react';
import DetailModal from './DetailModal';

const DetailModalPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const product = {
        title: 'Gran Wilde',
        image: 'https://espanol.kingsford.com/wp-content/uploads/2017/02/KFD_SpicyBBQBaconRanchBurger35382_WEB.jpg', // Reemplaza con la ruta correcta de la imagen
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '9.000',
        rating: 4.7,
        time: '15 min',
        servings: '1 persona',
        type: 'Carnívoro'
    };

    return (
        <div>
            <DetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </div>
    );
};

export default DetailModalPage;
