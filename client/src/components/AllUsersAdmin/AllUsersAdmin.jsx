import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../state/store/slices/users/actionUsers/getAllUsersAction";
import UpdateWaiter from "../UpdateWaiter/UpdateWaiter";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import handleDeleteUser from "../../utils/functions/handleDeleteUser";

function AllUsersAdmin() {
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState("all");

    const dispatch = useDispatch();

    const { allUsers } = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(getAllUsersAction(filter));
    }, [dispatch, filter]);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const [showUpdateWaiter, setShowUpdateWaiter] = useState(false);

    const handleShowUpdateWaiter = (event) => {
        setShowUpdateWaiter(!showUpdateWaiter);
    };

    return (
        <div className={loading ? "disable-mouse" : ""}>
            <div className="flex flex-nowrap flex-col justify-center items-center gap-2 mx-4">
                <h1 className="text-[18px] block text-customRed-400">
                    Administración de usuarios
                </h1>
                <div className="flex gap-2 mb-4">
                    <label htmlFor="type_of_user_selection">
                        Filtrado por rol:
                    </label>
                    <select
                        onChange={handleFilter}
                        value={filter}
                        name="type_of_user_selection"
                        id="type_of_user_selection"
                        className="bg-customGray-50 border-2 rounded-lg font-bold shadow-md gap-1 btn-secondary text-customRed-400 border-customRed-400 hover:text-customRed-700 hover:border-customRed-700  active:text-customRed-700 active:border-custom-600 text-center"
                    >
                        <option value="all">Todos</option>
                        <option value="admin">Administrador</option>
                        <option value="waiter">Mesero</option>
                        <option value="kitchen">Cocina</option>
                    </select>
                </div>
            </div>

            <div className="overflow-y-auto scrollbar-container text-[14px] custom-scrollbar-x scroll-smooth">
                <table className="min-w-full bg-white shadow-xl border-separate border-spacing-0">
                    <thead className="bg-customRed-400 text-white">
                        <tr>
                            <th className="px-4 py-2 border border-transparent">
                                ID
                            </th>
                            <th className="px-4 py-2 border border-transparent">
                                Nombre de usuario
                            </th>
                            <th className="px-4 py-2 border border-transparent">
                                Rol del usuario
                            </th>
                            <th className="px-4 py-2 border border-transparent">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`hover:bg-customRed-100 ${
                                    index === allUsers.length - 1
                                        ? "last:rounded-b-3xl"
                                        : ""
                                }`}
                            >
                                <td
                                    className={`px-4 py-2 border border-white break-all ${
                                        index === allUsers.length - 1
                                            ? "rounded-l-3xl"
                                            : ""
                                    }`}
                                >
                                    {user._id}
                                </td>
                                <td className="px-4 py-2 border border-white">
                                    {user.username}
                                </td>
                                <td className="px-4 py-2 break-keep border border-white">
                                    {
                                        {
                                            admin: "Administrador",
                                            kitchen: "Cocina",
                                            waiter: "Mesero",
                                        }[user.role]
                                    }
                                </td>
                                <td
                                    className={`px-2 py-2 rounded-sm border border-white flex justify-center ${
                                        index === allUsers.length - 1
                                            ? "rounded-r-3xl"
                                            : ""
                                    }`}
                                >
                                    <SecondaryButton
                                        onClick={async () => {
                                            await handleDeleteUser(user._id);
                                            dispatch(getAllUsersAction(filter));
                                        }}
                                        classNameSize="px-2"
                                    >
                                        Eliminar
                                    </SecondaryButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showUpdateWaiter && (
                <UpdateWaiter handleShowUpdateWaiter={handleShowUpdateWaiter} />
            )}
        </div>
    );
}

export default AllUsersAdmin;
