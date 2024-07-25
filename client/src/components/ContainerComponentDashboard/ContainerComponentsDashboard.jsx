import "../../styles/scrollbarContainerDashboard.css"
import MenuManager from "../MenuManager/MenuManager";
const ContainerComponentsDashboard = () => {
    return (
        <div className="bg-customBgMain w-[70vw] min-w-[70vw] max-h-[80vh] h-[80vh] border border-gray-300 rounded-lg overflow-y-scroll custom-scrollbar scroll-smooth mx-auto my-auto">
            <MenuManager />
        </div>
    );
}

export default ContainerComponentsDashboard;