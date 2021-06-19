package com.koreait.alsamo.board;

import com.koreait.alsamo.MyUtils;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.jws.WebParam;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/board")
public class BoardController {
    @Autowired
    BoardService service;

    @GetMapping("/list")
    public String list(Model model, BoardDTO param){
        model.addAttribute("boardList", service.selBoardList(param));
        return "board/list";
    }

    @GetMapping("/write")
    public String write(Model model,BoardDTO param){
        if(param.getIboard() == 0){ //원글 작성시
            model.addAttribute("categoryList",service.selBoardCategory());
        }else if(param.getEdit() == 1){ //수정버튼 클릭시
            model.addAttribute("board",service.selBoard(param));
        }else {// 답글 작성시
            model.addAttribute("board",service.selBoard(param));
        }
        return "board/write";
    }

    @PostMapping("/write")
    public String write(BoardEntity param) {
        if(param.getGroup_idx() == 0){
            service.insBoard(param);
        }else{
            service.updReBoard(param);
            service.insReBoard(param);
        }
        return "redirect:list?bcode="+param.getBcode();
    }

    @GetMapping("/detail")
    public String detail(Model model, BoardDTO param){
        model.addAttribute("board", service.selBoard(param));
        return "board/detail";
    }

    @PostMapping("/delete")
    public String delete(BoardEntity param){
        int result = service.delBoard(param);
        if(result == 0){
            return "redirect:/errpage?code="+result;
        }
        return "redirect:list?bcode="+param.getBcode();
    }

    @PostMapping("/edit")
    public String update(BoardEntity param){
        int result = service.updBoard(param);
        if(result == 0){
            return "redirect:/errpage?code="+result;
        }
        return "redirect:detail?bcode="+param.getBcode()+"&iboard="+param.getIboard();
    }


}
