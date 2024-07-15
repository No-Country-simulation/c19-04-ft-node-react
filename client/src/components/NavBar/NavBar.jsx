import questionImg from '../../assets/images/questionAnswers.png'
import waiterImg from '../../assets/images/waiter.png'
import arrowLeftImg from '../../assets/images/arrowLeft.png'
import { bgStyles } from '../../assets/other-assets/navBarDinamicBg'

const NavBar = ({ bgMain }) => {
	const navbarClass = bgStyles[bgMain]

	return (
		<div className='h-48 w-full flex justify-between items-center px-4 grow-0'>
			<img
				className='max-w-12 max-h-12'
				src={arrowLeftImg}
				alt='Volver Atras'
			/>
			<img className='max-h-14' src={waiterImg} alt='Mozo' />
			<img
				className={`max-w-[62] max-h-[50px] ${navbarClass} rounded-[20px]`}
				src={questionImg}
				alt='Preguntas y respuestas'
			/>
		</div>
	)
}
export default NavBar
