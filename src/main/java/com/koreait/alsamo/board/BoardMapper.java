package com.koreait.alsamo.board;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    int insBoard(BoardEntity param);
    List<BoardDTO> selBoardCategory();
    List<BoardDomain> selBoardList(BoardDTO param);
}