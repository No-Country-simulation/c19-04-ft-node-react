import React from "react";
import AssignTableToWaiter from "../../components/AssignTableToWaiter/AssignTableToWaiter";

function Temporal() {
    return (
        <div className="h-[100dvh] w-[100dvw] bg-blue-400 flex">
            <div className="h-[80%] w-full sm:w-[70%] overflow-y-auto bg-orange-50 m-auto">
                <AssignTableToWaiter />
            </div>
        </div>
    );
}

export default Temporal;
