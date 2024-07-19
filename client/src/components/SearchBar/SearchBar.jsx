import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../state/store/slices/searchValue/searchSlice';
import filterIcon from "../../assets/images/filter.png";
import { useDebounce } from 'use-debounce';
import SearchResultBar from '../SearchBarResult/SearchBarResult';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.searchValue);
  const [debounceSearchValue] = useDebounce(searchValue, 1000);

  const handleInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const arraySearch = useSelector((state) => state.dataMenus.menus);
  const busquedaEnArray = arraySearch.filter((item) =>
    item.title.toLowerCase().includes(debounceSearchValue.toLowerCase())
  );

  return (
    <section className="min-h-24 flex flex-col items-center">
      <div className={`flex flex-row-reverse items-center py-2 w-[90%] sm:w-[60%] ${searchValue !== '' ? 'gap-6' : 'gap-5'}`}>
        <div className='bg-customLight w-16 h-[45px] flex place-content-center rounded-[20px]'>
          <img className="w-9" src={filterIcon} alt="filtros" />
        </div>
        <input
          className="w-full min-h-12 rounded-[20px] outline-none px-4 transition-all duration-300"
          placeholder="Buscar"
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`mt-2 w-[90%] sm:w-[60%] bg-white rounded-[20px] shadow-lg p-4 transition-all duration-300 overflow-hidden ${
          debounceSearchValue !== '' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } ${busquedaEnArray.length > 0 ? '' : 'hidden'}`}
      >
        {debounceSearchValue !== '' && (
          busquedaEnArray.length > 0 ? (
            busquedaEnArray.map((item) => (
              <SearchResultBar key={item._id} resultInput={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">No hay resultados para su búsqueda</p>
          )
        )}
      </div>
    </section>
  );
};

export default SearchBar;
