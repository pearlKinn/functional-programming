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
  course.name = course.name.replace(/\s+/g, "_");
}

// console.log("변형된 데이터\n", updateCourses);

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
  const newO = { ...object };
  newO.name = newO.name.trim();
  return newO;
}

// 2. 객체 이름(name) 속성 대문자화 함수 선언
function toUpperCase(object) {
  const newO = { ...object };
  newO.name = newO.name.toLocaleUpperCase();
  return newO;
}

function convertSpaceToUnderScore(object) {
  const newO = { ...object };
  newO.name = newO.name.replace(/\s+/g, "_");
  return newO;
}
// 3. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성
/* 
//^ const updateSubjects = subjects.map((subject) => { 
//^   const copySubject = toTrim(subject) 
//^   return copySubject 
//^  }).map(subject => { 
//^   const copySubject = toUpperCase(subject) 
//^   return copySubject 
//^  });  
 */
const updateSubjects = subjects
  .map(toTrim)
  .map(toUpperCase)
  .map(convertSpaceToUnderScore);
// console.log(updateSubjects);
//* --------------------------------------------------------------------------
//# JavaScript 프로그래밍 패러다임
//# → 함수(function)를 사용해 구현합니다.

function createCountUpButton(
  container,
  { count: initialCount = 0, step = 1, max = 20 } = {}
) {
  if (!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error("container는 문서의 요소가 아닙니다.");
  }

  let count = initialCount;

  const countUpButton = document.createElement("button");

  const render = (newCount) => {
    countUpButton.textContent = String(newCount);
  };

  const handleCountUp = (e) => {
      count += step;
    
    if (count >= max) {
      count = max;
      render(count);
      countUpButton.disabled = true
    }else {
      render(count);
    }
    
  };

  countUpButton.setAttribute("type", "button");
  countUpButton.classList.add("CountUpButton");
  countUpButton.addEventListener("click", handleCountUp);

  render(count);

  container.append(countUpButton);
}

const demoContainer = document.getElementById("demo");

createCountUpButton(demoContainer);
createCountUpButton(demoContainer, { count: 1, max: 14 });
createCountUpButton(demoContainer, { count: 2 });
createCountUpButton(demoContainer, { count: 3, step: 5 });
//* --------------------------------------------------------------------------
//# JavaScript 프로그래밍 패러다임
//# → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

// 붕어빵 틀 -> 붕어빵 (객체)
// 붕어빵틀(생성자함수: 클래스)
class CountUpButton {
  #config; // 클래스의 비공개(private) 필드(private field) - 클래스 내부에서만 접근 가능

  constructor(userOptions) {
    // 클래스의 생성자(constructor)
    /* 
    userOptions 매개변수를 받아 기본 설정(defaultProps)과 사용자 지정 옵션을 결합하여 
    '#config'에 저장
    defaultProps에 정의된 기본값은 count: 0, step: 1 
    */
    this.#config = { ...CountUpButton.defaultProps, ...userOptions };
    this.init();
  }

  init() {
    // 생성된 인스턴스가 초기화될 때 호출되는 함수
    console.log(this.#config);
  }

  // static field
  static defaultProps = {
    count: 0,
    step: 1,
  };
}

// 새로운(new) 붕어빵(객체: 인스턴스) 생성
const firstCountUp = new CountUpButton({
  step: 3,
});

// const demoContainer = document.getElementById('demo');

// demoContainer.append(firstCountUp.render())

//* --------------------------------------------------------------------------
//# 웹 컴포넌트(Web Components) API
//# → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)
