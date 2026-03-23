import styles from "./App.module.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [subjectList, setSubjectList] = useState([]);

  const [categoryType, setCategoryType] = useState(0); //0 : 모든 카테고리 / 1 : 프론트엔드 / 2 : 백엔드 / 3 : DB
  const [levelType, setLevelType] = useState(0); //0 : 모든 난이도 / 1 : 초급 / 2 : 중급 / 3 : 고급

  const [order, setOrder] = useState(1); //1 : 작성순 / 2 : 난이도 오름차순 / 3 : 난이도 내림차순 / 4 : 수강인원 오름차순 / 5 : 수강인원 내림차순

  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/subjects?categoryType=${categoryType}&levelType=${levelType}&order=${order}&searchKeyword=${searchKeyword}`,
      )
      .then((res) => {
        console.log(res);
        setSubjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [order, categoryType, levelType, searchKeyword]);

  return (
    <div>
      <header className={styles.header}>
        <div className="page-title">
          <h1>이영민의 과제세상</h1>
        </div>
      </header>
      <main>
        <h3 className={styles.main_title}>강의 목록</h3>
        <div className={styles.list_option_wrap}>
          <form
            className={styles.search_wrap}
            onSubmit={(e) => {
              e.preventDefault();
              setSearchKeyword(keyword);
            }}
          >
            <input
              className={styles.input}
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            ></input>
            <button type="submit" className={styles.button}>
              검색
            </button>
          </form>

          <select
            className={styles.select}
            value={categoryType}
            onChange={(e) => {
              setCategoryType(e.target.value);
            }}
          >
            <option value={0}>모든 카테고리</option>
            <option value={1}>프론트엔드</option>
            <option value={2}>백엔드</option>
            <option value={3}>DB</option>
          </select>

          <select
            className={styles.select}
            value={levelType}
            onChange={(e) => {
              setLevelType(e.target.value);
            }}
          >
            <option value={0}>모든 난이도</option>
            <option value={1}>초급</option>
            <option value={2}>중급</option>
            <option value={3}>고급</option>
          </select>

          <select
            className={styles.select}
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value={1}>작성순</option>
            <option value={2}>난이도 오름차순</option>
            <option value={3}>난이도 내림차순</option>
            <option value={4}>수강인원 오름차순</option>
            <option value={5}>수강인원 내림차순</option>
          </select>
        </div>

        <div className={styles.subject_list_wrap}>
          <ul className={`${styles.subject_info} ${styles.title_ul}`}>
            <li className={styles.subject_title}>과목 이름</li>
            <li className={styles.subject_instructor}>담당 강사</li>
            <li className={styles.subject_category}>과목 분류</li>
            <li className={styles.subject_level}>과목 난이도</li>
            <li className={styles.subject_count}>수강 정원</li>
          </ul>
          {subjectList.map((subject) => {
            return (
              <ul key={`${subject.subjectNo}`} className={styles.subject_item}>
                <li className={styles.subject_title}>{subject.subjectTitle}</li>
                <li className={styles.subject_instructor}>
                  {subject.subjectInstructor}
                </li>
                <li className={styles.subject_category}>
                  {subject.subjectCategory === 1
                    ? "백엔드"
                    : subject.subjectCategory === 2
                      ? "프론트엔드"
                      : "DB"}
                </li>
                <li className={styles.subject_level}>
                  {subject.subjectLevel === 1
                    ? "초급"
                    : subject.subjectLevel === 2
                      ? "중급"
                      : "고급"}
                </li>
                <li className={styles.subject_count}>{subject.subjectCount}</li>
              </ul>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
