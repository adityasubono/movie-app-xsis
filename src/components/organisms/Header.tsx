import React from 'react';
import useNavigations from "@/hooks/useNavigations.tsx";
import InputSearch from "@/components/molecules/InputSearch.tsx";
import {useSearchParams} from "react-router-dom";
import useSearchPageStore from "@/store/searchPageStore.ts";



const Header: React.FC = () => {
    const { navigations, location, handleClick } = useNavigations();
    const [, setSearchParams] = useSearchParams();

    // Note: Store
    const { search: searchStore} = useSearchPageStore((state) => state);
    const setSearchStore = useSearchPageStore((state) => state.setSearch);
    return (
        <header className="tw-backgdrop-filter tw-items-center tw-gap-4 tw-bg-slate-100 tw-bg-opacity-5 tw-p-2 tw-backdrop-blur-lg">
            <nav className="tw-mx-32 tw-flex tw-items-center tw-justify-between tw-p-6"
                 aria-label="Global">
                <div className="flex lg:flex-1">
                    <a  onClick={() => handleClick('/')} className="-m-1.5 p-1.5  tw-cursor-pointer">
                        <span className="tw-text-4xl tw-text-red-500">Netplix</span>
                    </a>

                    {navigations.map((navigation) => {
                        const isSelected = location.pathname === navigation.link;
                        return (
                            <a
                                key={navigation.name}
                                className={`tw-font-semibold tw-leading-6 tw-text-white tw-px-8  ${isSelected ? 'tw-text-yellow-500' : ''} tw-cursor-pointer`}
                                onClick={() => handleClick(navigation.link)}
                            >
                                {navigation.name}
                            </a>
                        );
                    })}


                </div>

                <div  onClick={() => handleClick('/search')}>
                    <InputSearch
                        search={searchStore}
                        btnHidden={true}
                        setSearch={(search: string) => {
                            setSearchParams({ query: search, page: '1' });
                            setSearchStore(search);

                        }}
                    />
                </div>

            </nav>
        </header>
    );
};

export default Header;

