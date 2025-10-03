package com.hansung.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansung.board_back.entity.FavoriteEntity;
import com.hansung.board_back.entity.primaryKey.FavoritePk;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
    
}
