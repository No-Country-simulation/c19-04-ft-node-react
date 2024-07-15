import { useNavigateHelper } from '../../utils/hooks/useNavigations'

const NavigateBackButton = () => {
	const { navigateBack } = useNavigateHelper()

	return (
		<div className='bg-red-700 '>
			<button onClick={navigateBack}> VOLVER ATRAS </button>
		</div>
	)
}

export default NavigateBackButton
