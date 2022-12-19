import SpellCardDetail from '../../components/spellcard/SpellCardDetail';
import { useGetAllSpellsQuery } from '../../services/spells';
import { useState } from 'react';

import './spellslist.styles.scss';
import { Spell } from '../../constants';

const SpellsList = () => {
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpenViewMorePopUp, setIsOpenViewMorePopUp] = useState<boolean>(false);
    const lastSpellIndex = currentPage * perPage;
    const firstSpellIndex = lastSpellIndex - perPage;

    const {
        data: spells,
        isFetching: isFetchingSpells,
        isSuccess: isSuccessSpells,
        isError: isErrorSpells,
        error
    } = useGetAllSpellsQuery('');

    let content;

    const onNextListPage = (_maxPage: number) => {
        currentPage < _maxPage ? setCurrentPage((state) => state + 1) : setCurrentPage(currentPage);
    };

    const onPrevListPage = () => {
        currentPage > 1 ? setCurrentPage((state) => state - 1) : setCurrentPage(1);
    };

    const onSetItemPerPage = (_num: number) => {
        setPerPage(_num);
        setCurrentPage(1);
    };

    if (isFetchingSpells) {
        content = <p>Loading</p>;
    } else if (isErrorSpells) {
        content = <div data-testid="data-err">{error.toString()}</div>;
    } else if (isSuccessSpells) {
        content = (
            <>
                <div data-testid="data-ss" className="spells-nav">
                    <button
                        className={`spells-lp ${currentPage <= 1 ? 'disable' : ``}`}
                        onClick={onPrevListPage}>
                        {' '}
                        &lt;
                    </button>
                    <span className="spells-mp">
                        {' '}
                        {currentPage} /{Math.ceil(spells.count / perPage)}{' '}
                    </span>
                    <button
                        className={`spells-rp ${
                            currentPage >= Math.ceil(spells.count / perPage) ? `disable` : ``
                        }`}
                        onClick={() => onNextListPage(Math.ceil(spells.count / perPage))}>
                        {' '}
                        &gt;
                    </button>
                    <div
                        className="spells-vmore"
                        onClick={() => setIsOpenViewMorePopUp(!isOpenViewMorePopUp)}>
                        <p>View more</p>
                        <div
                            className={`spells-vmore__content ${
                                isOpenViewMorePopUp ? 'visible' : 'hidden'
                            }`}>
                            <span onClick={() => onSetItemPerPage(10)}>10</span>
                            <span onClick={() => onSetItemPerPage(20)}>20</span>
                            <span onClick={() => onSetItemPerPage(50)}>50</span>
                            <span onClick={() => onSetItemPerPage(100)}>100</span>
                        </div>
                    </div>
                </div>
                {spells.results.slice(firstSpellIndex, lastSpellIndex).map((el: Spell) => (
                    <SpellCardDetail spell={el} key={el.index} />
                ))}
            </>
        );
    }
    return <div className="spells-container">{content}</div>;
};

export default SpellsList;
