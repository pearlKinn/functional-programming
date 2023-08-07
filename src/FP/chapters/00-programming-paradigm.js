//* --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
//* --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
// --------------------------------------------------------------------------

//* --------------------------------------------------------------------------
// 명령형 프로그래밍

const courses = [
  {
    id: 1,
    name: " imperative programming",
  },
  {
    id: 2,
    name: "declarative programming ",
  },
];

// console.log("원본데이터\n", courses);

// 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
// 2. 과정 배열을 순환하여 각 과정 이름 대문자화
// 3. 배열 원소의 name 속성의 공백을 밑줄로 변경하는 기능 추가
const updateCourses = [...courses];

for (let i = 0, l = updateCourses.length; i < l; i++) {
  const course = { ...updateCourses[i] };
  course.name = course.name.trim();
  updateCourses[i] = course;
}

for (let i = 0, l = updateCourses.length; i < l; i++) {
  const course = updateCourses[i];
  course.name = course.name.toLocaleUpperCase();
}

for (let i = 0, l = updateCourses.length; i < l; i++) {
  const course = updateCourses[i];
  course.name = course.name.replace(/\s+/g, '_');
}

console.log("변형된 데이터\n", updateCourses);

//* --------------------------------------------------------------------------
// 선언형 프로그래밍

const subjects = [
  {
    id: 1,
    name: " imperative programming",
  },
  {
    id: 2,
    name: "declarative programming ",
  },
];

// 1. 객체 이름(name) 속성 좌우 공백 제거 함수 선언
function toTrim(object) {
  const newO = {...object}
  newO.name = newO.name.trim()
  return newO
}

// 2. 객체 이름(name) 속성 대문자화 함수 선언
function toUpperCase(object) {
  const newO = {...object}
  newO.name = newO.name.toLocaleUpperCase()
  return newO
}


function convertSpaceToUnderScore(object) {
  const newO = {...object}
  newO.name = newO.name.replace(/\s+/g, '_')
  return newO
}
// 3. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성
/* 
const updateSubjects = subjects.map((subject) => {
  const copySubject = toTrim(subject)
  return copySubject
 }).map(subject => {
  const copySubject = toUpperCase(subject)
  return copySubject
 }); 
 */
const updateSubjects = subjects.map(toTrim).map(toUpperCase).map(convertSpaceToUnderScore)
console.log(updateSubjects);
// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 함수(function)를 사용해 구현합니다.

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)
