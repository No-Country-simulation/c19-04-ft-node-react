import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../state/store/slices/searchValue/searchSlice';
import filterIcon from "../../assets/images/filter.png";
import { useDebounce } from 'use-debounce';
import SearchBarResult from '../SearchBarResult/SearchBarResult'

const SearchBar = () => {

    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.searchValue);
    const [debounceSearchValue] = useDebounce(searchValue, 1000);

    const handleInputChange = (e) => {
        dispatch(setSearchValue(e.target.value));
    };

    return (
        <section className=" min-h-24 flex place-content-center">
            <div className={`flex flex-row-reverse items-center py-2 w-[90%] sm:w-[60%] ${searchValue !== '' ? 'gap-6' : ' gap-5'}`}>
                <div className=' bg-customLight w-16 h-[45px] flex place-content-center rounded-[20px]'>
                    <img className="w-9" src={filterIcon} alt="filtros" />
                </div>
                <input
                    className="w-full  min-h-12 rounded-[20px] outline-none px-4 "
                    placeholder="Buscar"
                    value={searchValue}
                    onChange={handleInputChange}
                />
            </div>
            <div>
               {debounceSearchValue !== '' ? console.log(searchValue) : null}
            </div>
        </section>
    );
};

export default SearchBar;
