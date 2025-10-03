package com.hansung.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hansung.board_back.entity.BoardListViewEntiry;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntiry, Integer> {
    
}
