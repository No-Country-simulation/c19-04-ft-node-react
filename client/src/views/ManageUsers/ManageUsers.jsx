import React from "react";
import AllUsersAdmin from "../../components/AllUsersAdmin/AllUsersAdmin";

function ManageUsers() {
    return (
        <div className="h-[100dvh] w-[100dvw] bg-red-50 flex">
            <div className="bg-customGray- w-[70vw] min-w-[70vw] max-h-[80vh] h-[80vh] border border-gray-300 rounded-lg overflow-y-scroll custom-scrollbar scroll-smooth mx-auto my-auto">
                <AllUsersAdmin />
            </div>
        </div>
    );
}

export default ManageUsers;
