import React from "react";

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
        <div className="flex-grow flex flex-col">
            <h2 className="text-center text-[20px]">
                Proyecto de demostración del programa de prácticas y aprendizaje
                de No Country
            </h2>
            <p className="text-center">
                No nos basamos en ninguna empresa real. Las marcas que aparecen
                en nuestro proyecto no tienen relacion comercial con nosotros.
            </p>
            <h2 className="text-center text-[20px] mt-2">Creditos</h2>
            {group.map((member) => (
                <p className="text-center">
                    <a
                        className="border-b-2"
                        href={member.link}
                        title={`Link a github de ${member.name}`}
                    >
                        {member.name}
                    </a>
                </p>
            ))}
        </div>
    );
}

export default Footer;
