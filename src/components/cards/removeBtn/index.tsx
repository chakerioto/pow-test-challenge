import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../../app/hooks';
import { Spell } from '../../../constants';
import { decrement } from '../../../features/favorites/favoritesSlide';
import { removeFavoritesSpell } from '../../../services/localstorage';

interface RemoveBtnProps {
    setListFavoritesSpell: React.Dispatch<React.SetStateAction<Spell[]>>;
    spell: Spell;
}

const RemoveBtn = ({ setListFavoritesSpell, spell }: RemoveBtnProps) => {
    const dispatch = useAppDispatch();

    const onRemoveItemStorage = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        const items = removeFavoritesSpell(spell);
        dispatch(decrement());
        setListFavoritesSpell(items);
        toast.success('Remove item successfully!', { theme: 'dark' });
    };

    return <span onClick={onRemoveItemStorage}>Remove</span>;
};

export default RemoveBtn;
