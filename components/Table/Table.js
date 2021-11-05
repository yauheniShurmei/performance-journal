import classes from "./Table.module.scss";
import { useEffect, useState } from "react";
import { MONTHS, YEARS } from "./DATE";
import AddStudentFromList from "../AddStudentFromList/AddStudentFromList";
import Students from "../Students/Students";
import StudentInfoPage from "../StudentInfoPage/StudentInfoPage";
import { useContext } from "react/cjs/react.development";
import AuthContext from "../store/auth-context";

const Table = (props) => {
  console.log("[TABLE.JS]");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().getMonth() > 8
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`
  );
  const [data, setData] = useState();
  const [isOpenStudentInfo, setIsOpenStudentInfo] = useState(false);
  const [selectedStudentForChange, setSelectedStudentForChange] = useState();
  const [sumaLekcji, setSumaLekcji] = useState([0, 0]);
  const authCtx = useContext(AuthContext);

  const changeMonthHandler = (event) => {
    setMonth(event.target.value);
  };
  const changeYearHandler = (event) => {
    setYear(event.target.value);
  };

  function getDataFromServer() {
    console.log("[TABLE][FUNC] GET_DATA_FROM_SERVER");
    fetch(
      "https://performance-lessons-default-rtdb.firebaseio.com/students.json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const dataArray = Object.keys(data).map((key) => {
            data[key].key = key;
            return data[key];
          });
          //--------------szukamy studentów z wybranogo miesiąca-------------------
          const filteredStudents = [];
          let sumaLekcji = [0, 0];
          dataArray.map((student) => {
            if (typeof student.lessons[month + "-" + year] != "undefined") {
              let filteredStudent = {};
              filteredStudent.key = student.key;
              filteredStudent.lessons = student.lessons[month + "-" + year];
              filteredStudent.name = student.name;
              filteredStudent.lessonDuration = student.lessonDuration;
              //-------liczymy sume lekcji--------
              const sumOf35MinutLesson = student.lessons[
                month + "-" + year
              ].reduce((prev, curr) => {
                return curr !== 0 &&
                  curr !== "-" &&
                  student.lessonDuration === 30
                  ? prev + 1
                  : prev + 0;
              }, 0);
              const sumOf45MinutLesson = student.lessons[
                month + "-" + year
              ].reduce((prev, curr) => {
                return curr !== 0 &&
                  curr !== "-" &&
                  student.lessonDuration === 45
                  ? prev + 1
                  : prev + 0;
              }, 0);
              sumaLekcji[0] += sumOf35MinutLesson;
              sumaLekcji[1] += sumOf45MinutLesson;
              //-------------------------------------//
              if (
                typeof student.lessons[
                  Number(month) < 11
                    ? `0${Number(month) - 1}-${year}`
                    : `${Number(month) - 1}-${year}`
                ] != "undefined"
              ) {
                filteredStudent.leftFromLastMonth = student.lessons[
                  Number(month) < 11
                    ? `0${Number(month) - 1}-${year}`
                    : `${Number(month) - 1}-${year}`
                ].reduce((prev, curr) => {
                  return curr !== 0 && prev - 1 >= 0 ? prev - 1 : prev - 0;
                }, 4);
              }
              filteredStudents.push(filteredStudent);
            }
          });
          console.log(filteredStudents.leftFromLastMonth);
          setData(filteredStudents);
          setSumaLekcji(sumaLekcji);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.dir(err.message);
      });
  }
  useEffect(() => {
    console.log("[USE EFFECT IN TABLE] [GET DATA FROM SERVER FUNC]");
    getDataFromServer();
  }, [month, year]);

  const openAndChangeStudentInfoHandler = (student) => {
    setIsOpenStudentInfo(!isOpenStudentInfo);
    setSelectedStudentForChange(student);
  };

  const salaryCounter = () => {
    return sumaLekcji[0] * 20 + sumaLekcji[1] * 35;
  };

  return (
    <>
      <table className={classes.table_main}>
        <thead>
          <tr>
            <th colSpan={11}>PERFORMANCE STUDIO</th>
          </tr>
          <tr>
            <th>
              <select
                value={year}
                id="year-select"
                onChange={changeYearHandler}
              >
                {YEARS.map((year) => {
                  return (
                    <option key={year.value} value={year.value}>
                      {year.year}
                    </option>
                  );
                })}
              </select>
              <select
                value={month}
                id="month-select"
                onChange={changeMonthHandler}
              >
                {MONTHS.map((month) => {
                  return (
                    <option key={month.value} value={month.value}>
                      {month.month}
                    </option>
                  );
                })}
              </select>
            </th>

            <th colSpan={8}>LEKCJE</th>
            <th>DO NADRABIANIA Z ZESZŁYCH MIESĘCY</th>
            <th>LEKCJI ZOSTAŁO</th>
          </tr>
        </thead>
        <tbody>
          <Students
            students={data}
            date={month + "-" + year}
            openAndChangeStudentInfoHandler={openAndChangeStudentInfoHandler}
            dataIsChange={() => getDataFromServer()}
          />
        </tbody>
        <tfoot>
          <tr>
            <th>SUMA LEKCJI</th>
            <td colSpan={8}>{sumaLekcji[0] + sumaLekcji[1]}</td>
            <th>WYPŁATA</th>
            <td>{salaryCounter()}</td>
          </tr>
        </tfoot>
      </table>
      <StudentInfoPage
        isOpen={isOpenStudentInfo}
        selectedStudentForChange={selectedStudentForChange}
        openAndChangeStudentInfoHandler={openAndChangeStudentInfoHandler}
        dataIsChange={() => getDataFromServer()}
      />
      <AddStudentFromList
        date={month + "-" + year}
        onStudentAdd={() => getDataFromServer()}
      />
    </>
  );
};

export default Table;
