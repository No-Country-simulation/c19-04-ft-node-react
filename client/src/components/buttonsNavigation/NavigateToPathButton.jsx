import { useNavigateHelper } from "../../utils/hooks/useNavigations"

const NavigateToPathButton = () => {

    const { navigateTo } = useNavigateHelper()

    return (
        <div>
            <button className="bg-red-300" onClick={() => {
                navigateTo('/notfound')
            }}>
                NAVEGAR HACIA HOME
            </button>
        </div>
    )
}

export default NavigateToPathButton