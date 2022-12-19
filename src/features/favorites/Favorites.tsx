import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import RemoveBtn from '../../components/cards/removeBtn';
import { Spell } from '../../constants';
import { getFavoritesSpell } from '../../services/localstorage';
import './favorites.styles.scss';

const Favorites = () => {
    const [listFavoritesSpells, setListFavoritesSpell] = useState<Spell[]>([]);

    const numberOfFavorites = useAppSelector((state) => state.counterFavorite.value);

    useEffect(() => {
        const listLocalStorageSpells = getFavoritesSpell();
        setListFavoritesSpell(listLocalStorageSpells);
    }, [numberOfFavorites]);

    return (
        <div className="favorites-container">
            <div className="favorites-content">
                <div className="favorites-content__list">
                    {listFavoritesSpells.map((spell: Spell) => {
                        return (
                            <div key={spell.index} className="favorites-content__list--item">
                                <p>{spell.name}</p>
                                <RemoveBtn
                                    setListFavoritesSpell={setListFavoritesSpell}
                                    spell={spell}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
