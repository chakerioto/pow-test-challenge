import { Spell } from '../constants';

export const getFavoritesSpell = (): Spell[] => {
    const item = localStorage.getItem('favoritesSpell');
    if (typeof item === 'string') {
        const parse = JSON.parse(item); // ok
        return parse;
    }
    return [];
};

export const addFavoritesSpell = (spell: Spell): boolean => {
    const spells = getFavoritesSpell();

    const isFound = spells.some((element: Spell) => {
        if (element.index === spell.index) {
            return true;
        }
        return false;
    });

    if (!isFound) {
        spells.push(spell);
        localStorage.setItem('favoritesSpell', JSON.stringify(spells));
        return true;
    }
    return false;
};

export const removeFavoritesSpell = (spell: Spell): Spell[] => {
    const items = getFavoritesSpell();
    const newItesm = items.filter((el: Spell) => el.index !== spell.index);
    localStorage.setItem('favoritesSpell', JSON.stringify(newItesm));
    return newItesm;
};
