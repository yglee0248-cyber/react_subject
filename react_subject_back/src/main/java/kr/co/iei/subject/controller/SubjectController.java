package kr.co.iei.subject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.subject.model.service.SubjectService;
import kr.co.iei.subject.model.vo.ListItem;
import kr.co.iei.subject.model.vo.Subject;

@CrossOrigin(value="*")
@RestController
@RequestMapping(value="/subjects")
public class SubjectController {

	@Autowired
	private SubjectService subjectService;
	
	@GetMapping
	public ResponseEntity<?> selectSubjectList(@ModelAttribute ListItem request){
		List<Subject> subjectList = subjectService.selectSubjectList(request);
		return ResponseEntity.ok(subjectList);
	}
}
