// Footer.jsx
import React from "react";
import "../../styles/footer.css";

function Footer() {
    const group = [
        {
            name: "Anthony Mendoza",
            link: "https://github.com/Anthonytrader",
            role: "frontend",
        },
        {
            name: "Augusto Iphar",
            link: "https://github.com/Augustofrx",
            role: "teamLeader",
        },
        {
            name: "Blas Pachano",
            link: "https://github.com/Blaschu",
            role: "frontend",
        },
        {
            name: "Carlos Canabal",
            link: "https://github.com/canabaldev1",
            role: "frontend",
        },
        {
            name: "Martin Alba",
            link: "https://github.com/Martin-Alba",
            role: "backend",
        },
        {
            name: "Paolo Suarez",
            link: "https://github.com/PSuarez18",
            role: "frontend",
        },
        {
            name: "Rocio Tellez",
            link: "https://github.com/RocioTellezLopez",
            role: "frontend",
        },
        {
            name: "Sofía Pérez",
            link: "https://github.com/esedesofia",
            role: "frontend",
        },
        {
            name: "Thiago Salaberry",
            link: "https://github.com/thiagoSalaberry",
            role: "backend",
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-sm font-bold text-center mb-2">
                        Team Leader
                    </h3>
                    {group
                        .filter((member) => member.role === "teamLeader")
                        .map((member, index) => (
                            <p
                                key={index}
                                className="text-center mb-2 animate-slide-up"
                            >
                                <a
                                    className="border-b-2 border-transparent hover:border-white transition duration-300"
                                    href={member.link}
                                    title={`Link a GitHub de ${member.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {member.name}
                                </a>
                            </p>
                        ))}
                </div>
                <div>
                    <h3 className="text-sm font-bold text-center mb-2">
                        Desarrolladores Frontend
                    </h3>
                    {group
                        .filter((member) => member.role === "frontend")
                        .map((member, index) => (
                            <p
                                key={index}
                                className="text-center  mb-2 animate-slide-up"
                            >
                                <a
                                    className="border-b-2 border-transparent hover:border-white transition duration-300"
                                    href={member.link}
                                    title={`Link a GitHub de ${member.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {member.name}
                                </a>
                            </p>
                        ))}
                </div>
                <div>
                    <h3 className="text-sm font-bold text-center mb-2">
                        Desarrolladores Backend
                    </h3>
                    {group
                        .filter((member) => member.role === "backend")
                        .map((member, index) => (
                            <p
                                key={index}
                                className="text-center mb-2 animate-slide-up"
                            >
                                <a
                                    className="border-b-2 border-transparent hover:border-white transition duration-300"
                                    href={member.link}
                                    title={`Link a GitHub de ${member.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {member.name}
                                </a>
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;
