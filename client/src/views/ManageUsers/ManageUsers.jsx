import React from "react";
import AllUsersAdmin from "../../components/AllUsersAdmin/AllUsersAdmin";

function ManageUsers() {
    return (
        <div className="h-[100dvh] w-[100dvw] bg-blue-400 flex">
            <div className="h-[80%] w-full sm:w-[70%] overflow-y-auto bg-orange-50 m-auto">
                <AllUsersAdmin />
            </div>
        </div>
    );
}

export default ManageUsers;
