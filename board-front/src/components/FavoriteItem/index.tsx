import React from 'react';
import { favoriteListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import './style.css';

interface Props {
    favoriteListItem: favoriteListItem
}

//          component: FavoriteListItem 컴포넌트          //
export default function FavoriteItem({ favoriteListItem }: Props) {

    //          properties          //
    const { profileImage, nickname } = favoriteListItem;

    //          render: Favorite List Item 렌더링          //
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <div className='favorite-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
            </div>
            <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
    )
}
