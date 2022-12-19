import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useDisableBodyScroll } from '../../services/hooks';
import { getFavoritesSpell } from '../../services/localstorage';
import Favorites from '../favorites/Favorites';
import { updateNumber } from '../favorites/favoritesSlide';
import './header.styles.scss';

const Header = () => {
    const [isViewFavorites, setIsViewFavorites] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const favotiesSpellsCount = useAppSelector((state) => state.counterFavorite.value);

    useDisableBodyScroll(isViewFavorites);

    useEffect(() => {
        const listSpell = getFavoritesSpell();
        dispatch(updateNumber(listSpell.length));
    }, [dispatch]);

    const onCloseCartModal = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setIsViewFavorites(!isViewFavorites);
    };

    return (
        <header className="header-container">
            <div className="header-content">
                <p>Spells</p>
                <button
                    onClick={() => setIsViewFavorites(!isViewFavorites)}
                    className="header-content__cta">
                    View favorites ({favotiesSpellsCount})
                </button>
            </div>

            <div
                className={`header-favorites ${isViewFavorites ? 'visible' : 'hidden'}`}
                onClick={onCloseCartModal}
                data-testid="header-modal">
                <Favorites />
            </div>
        </header>
    );
};

export default Header;
