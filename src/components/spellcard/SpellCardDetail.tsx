import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { Spell } from '../../constants';
import { increment } from '../../features/favorites/favoritesSlide';
import { addFavoritesSpell } from '../../services/localstorage';
import { useGetSpellByIndexQuery } from '../../services/spells';
import DamageTable from '../damageTable/DamageTable';
import './spellcard.styles.scss';

interface SpellProps {
    spell: Spell;
}

const SpellCardDetail = ({ spell }: SpellProps) => {
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const {
        data: spellDetail,
        isFetching: isFetchingSpellDetail,
        isSuccess: isSuccessSpellDetail,
        isError: isErrorSpellDetails,
        error
    } = useGetSpellByIndexQuery(spell.index, {
        skip: !isShowDetail
    });

    const onAddtoFavorites = () => {
        const isSuccess = addFavoritesSpell(spellDetail);
        if (isSuccess) {
            dispatch(increment());
            toast.success('Add to your favorites successfully', {
                theme: 'dark'
            });
        } else {
            toast('Already in your favorites', {
                theme: 'dark'
            });
        }
    };

    let content;

    if (isFetchingSpellDetail) {
        content = <div>Loading....</div>;
    } else if (isSuccessSpellDetail) {
        content = (
            <>
                <p>Name: {spellDetail.name}</p>
                <p>Level: {spellDetail.level}</p>
                <p>School: {spellDetail.school.name}</p>
                <p>Casting time: {spellDetail.casting_time}</p>
                {spellDetail.attack_type ? <p>Attack type: {spellDetail.attack_type}</p> : null}
                {spellDetail.damage?.damage_at_slot_level ? (
                    <div className="spelldetail__table">
                        <DamageTable damage={spellDetail.damage?.damage_at_slot_level || {}} />
                    </div>
                ) : null}
                <p>Duration: {spellDetail.duration}</p>
                <p>School: {spellDetail.school.name}</p>
                <p>Components: {spellDetail.components.toString()}</p>
                <p>{spellDetail.desc[0]}</p>

                <button onClick={onAddtoFavorites} className="cta-favorite">
                    Add to Favorites
                </button>
            </>
        );
    } else if (isErrorSpellDetails) {
        <div>{error.toString()}</div>;
    }

    return (
        <>
            <div className="spellcard-container">
                <p>{spell.name}</p>
                <div
                    title="View spell detail"
                    className={`${isShowDetail ? 'minus-transform' : ''} spellcard-cross`}
                    onClick={() => setIsShowDetail(!isShowDetail)}></div>
            </div>
            <div className={`spellcard-card__detail ${isShowDetail ? 'visible' : 'hidden'}`}>
                {content}
            </div>
        </>
    );
};

export default SpellCardDetail;
