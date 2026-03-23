package kr.co.iei.subject.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ListItem {

	private Integer categoryType;
	private Integer levelType;
	private Integer order;
	private String searchKeyword;
}
