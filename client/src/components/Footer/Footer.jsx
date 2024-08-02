import React from "react";
import "../../styles/footer.css"
function Footer() {
    const group = [
        { name: "Anthony Mendoza", link: "https://github.com/Anthonytrader" },
        { name: "Augusto Iphar", link: "" },
        { name: "Carlos Canabal", link: "https://github.com/canabaldev1" },
        { name: "Martin Alba", link: "https://github.com/Martin-Alba" },
        { name: "Paolo Suarez", link: "https://github.com/PSuarez18" },
        { name: "Rocio Tellez", link: "https://github.com/RocioTellezLopez" },
        {
            name: "Thiago Salaberry",
            link: "https://github.com/thiagoSalaberry",
        },
    ];

    return (
        <div className="flex-grow flex flex-col items-center text-white py-6">
            <h2 className="text-center text-2xl mb-4 animate-fade-in">
                Proyecto de demostración del programa de prácticas y aprendizaje
                de No Country
            </h2>
            <p className="text-center text-lg mb-4 animate-fade-in">
                No nos basamos en ninguna empresa real. Las marcas que aparecen
                en nuestro proyecto no tienen relación comercial con nosotros.
            </p>
            <h2 className="text-center text-2xl mt-4 mb-4 animate-fade-in">
                Créditos
            </h2>
            {group.map((member, index) => (
                <p key={index} className="text-center text-lg mb-2 animate-slide-up">
                    <a
                        className="border-b-2 border-transparent hover:border-white transition duration-300"
                        href={member.link}
                        title={`Link a GitHub de ${member.name}`}
                    >
                        {member.name}
                    </a>
                </p>
            ))}
        </div>
    );
}

export default Footer;
