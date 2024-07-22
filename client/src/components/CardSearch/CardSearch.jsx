import Rating from '../Rating/Rating'
import hearthImg from '../../assets/images/corazon.png'
import hamburguesaImg from '../../assets/images/imgHamburgesa.png'

const CardSearch = () => {
    return (
        <div className='w-[270px] h-[563px] bg-customGray-50 flex flex-col items-center rounded-[20px] shadow-custom-light-focushovered p-5 '>
            <div className='inline-flex justify-between w-full '>
                <Rating />
                <img className="w-6 h-[22.5px]" src={hearthImg} alt="favorite" />
            </div>
            <img className='w-[243px] h-[244px] -translate-y-[10%]' src={hamburguesaImg} alt="" />
            <article className='-translate-y-[50%]'>
                <h2 className='text-2xl font-bold leading-[30.24px] '>Gran Wilde</h2>
                <p className='text-sm leading-[17.64px] text-gray-600 text-wrap line-clamp-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint ea impedit, soluta repudiandae doloribus vel architecto fugit.
                    Culpa rem nam qui assumenda, eum ratione suscipit odit sapiente eius nihil laboriosam?
                </p>

            </article>


        </div>
    )
}

export default CardSearch