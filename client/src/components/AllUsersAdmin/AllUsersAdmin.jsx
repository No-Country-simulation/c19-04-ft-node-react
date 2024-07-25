import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../state/store/slices/users/actionUsers/getAllUsersAction";

function AllUsersAdmin() {
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState("all");

    const dispatch = useDispatch();

    const { allUsers } = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(getAllUsersAction(filter));
    }, [filter]);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className={loading ? "disable-mouse" : ""}>
            <h1 className="text-[18px] mb-4 block">
                Administración de usuarios
            </h1>
            <label htmlFor="type_of_user_selection">Filtro por rol:</label>
            <select
                onChange={handleFilter}
                value={filter}
                name="type_of_user_selection"
                id="type_of_user_selection"
            >
                <option value="all">Todos</option>
                <option value="admin">Administrador</option>
                <option value="waiter">Mesero</option>
                <option value="kitchen">Cocina</option>
            </select>
            <div className="w-full border bg-slate-400 grid grid-cols-5 gap-2 min-h-[3em] place-content-center text-[14px]">
                <div className="text-center col-start-1 break-words">ID</div>
                <div className="text-center col-start-2 break-words">
                    Nombre de usuario
                </div>
                <div className="text-center col-start-3 break-words">
                    Rol del usuario
                </div>
                <div className="text-center col-start-4 col-span-full break-words">
                    Acciones
                    {/* <button>Editar</button>
                    <button>Eliminar</button>
                    <button>Desactivar</button> */}
                </div>
            </div>
            {allUsers &&
                allUsers.map((user) => (
                    <div
                        key={`userid${user._id}`}
                        className="w-full my-4 grid grid-cols-5 gap-2 min-h-[3em]"
                    >
                        <div className="col-start-1 w-full flex items-center px-2">
                            <h4 className="break-all h-min text-[12px]">
                                {user._id}
                            </h4>
                        </div>
                        <div className="col-start-2 w-full flex items-center px-2">
                            <h4 className="break-all h-min text-[12px]">
                                {user.username}
                            </h4>
                        </div>
                        <div className="col-start-3 w-full flex items-center px-2">
                            <h4 className="break-all h-min text-[12px]">
                                {user.role}
                            </h4>
                        </div>
                        <div className="text-center col-start-4 col-span-full break-words flex flex-wrap items-center justify-center gap-1">
                            <button className="border border-red-500 rounded-[10px] px-4">
                                Editar
                            </button>
                            <button className="border border-red-500 rounded-[10px] px-4">
                                Eliminar
                            </button>
                            <button className="border border-red-500 rounded-[10px] px-4">
                                Desactivar
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default AllUsersAdmin;
