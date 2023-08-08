//* --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
//* --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
//* --------------------------------------------------------------------------

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

const updateCourses = [...courses];
// 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
for (let i = 0, l = updateCourses.length; i < l; i++) {
  const course = { ...updateCourses[i] };
  course.name = course.name.trim();
  updateCourses[i] = course;
}

// 2. 과정 배열을 순환하여 각 과정 이름 대문자화
for (let i = 0, l = updateCourses.length; i < l; i++) {
  const course = updateCourses[i];
  course.name = course.name.toLocaleUpperCase();
}

// 3. 배열 원소의 name 속성의 공백을 밑줄로 변경하는 기능 추가
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
//~ JavaScript 프로그래밍 패러다임
//~ → 함수(function)를 사용해 구현합니다.

function createCountUpButton(
  container,
  { count: initialCount = 0, step = 1, max = 20 } = {} // 매개변수를 받음과 동시에 구조분해할당과 기본 옵션을 합성
) {
  if (!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error("container는 문서의 요소가 아닙니다.");
  }

  let count = initialCount;

  const countUpButton = document.createElement("button");

  const render = (newCount) => {
    countUpButton.textContent = String(newCount);
  };

  const stopCount = () => {
    render(max);
    countUpButton.disabled = true;
    alert("최대 값입니다. 더이상 버튼을 누를 수 없습니다");
  };

  const handleCountUp = (e) => {
    count += step;
    count >= max ? stopCount() : render(count);
  };

  countUpButton.setAttribute("type", "button");
  countUpButton.classList.add("CountUpButton");
  countUpButton.addEventListener("click", handleCountUp);

  render(count);

  container.append(countUpButton);
}

const demoContainer = document.getElementById("demo");

// createCountUpButton(demoContainer);
// createCountUpButton(demoContainer, { count: 1, max: 14 });
// createCountUpButton(demoContainer, { count: 2 });
// createCountUpButton(demoContainer, { count: 3, step: 5 });

//* --------------------------------------------------------------------------
//~ JavaScript 프로그래밍 패러다임
//~ → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

//^ 붕어빵 틀 -> 붕어빵 (객체)
//^ 붕어빵틀(생성자함수: 클래스)
// class CountUpButton {
//   #config; // 클래스의 비공개(private) 필드(private field) - 클래스 내부에서만 접근 가능

//   constructor(userOptions) {
//     // 클래스의 생성자(constructor) - 클래스를 통해 인스턴스가 생성될 때 1회 실행되는 함수
//     /*
//     userOptions 매개변수를 받아 기본 설정(defaultProps)과 사용자 지정 옵션을 결합하여
//     '#config'에 저장
//     defaultProps에 정의된 기본값은 count: 0, step: 1
//     */
//     this.#config = { ...CountUpButton.defaultProps, ...userOptions };
//     // 인스턴스 생성 후, 초기화 진행
//     this.init();
//   }

//   init() {
//     // 생성된 인스턴스가 초기화될 때 호출되는 함수
//     console.log(this.#config);
//   }

//   //% static field
//   //% 인스턴스 생성 과정 없이 바로 사용 가능한 클래스 멤버
//   //% CountUpButton.defaultOptions로 접근가능
//   //% 여기서는 기본 옵션을 정의하는데 사용 됨
//   static defaultProps = {
//     count: 0,
//     step: 1,
//   };
// }
class CountUpButton {
  // static field
  static version = "0.0.1-alpha";

  static defaultProps = {
    count: 0,
    step: 1,
    max: 10,
  };

  // private field
  // must be declared
  #count;
  #props = {};
  #button = null;

  // 라이프 사이클 메서드
  //~ 생성(constructor) 시점
  constructor(props) {
    // console.log("생성 시점");
    // 클래스가 생성한 인스턴스의 상태
    this.#count = props.count ?? 0;
    // 인스턴스가 사용할 데이터 (외부에서 사용자가 전달한 데이터와 내부의 기본 데이터가 병합)
    this.#props = { ...CountUpButton.defaultProps, ...props };
    // this.render(); //render 함수가 객체 안에 있어서 this로 접근해야 render메서드를 쓸 수 있다
  }

  //~ render (HTMLElement node)
  render() {
    const button = document.createElement("button"); //버튼요소 생성
    button.setAttribute("type", "button"); // 타입 추가
    button.textContent = String(this.#count); // 숫자 값을 문자 값으로 넣어줌 - 지금은 안바꿔줘도 되지만 타입스크립트에선 필수임!
    this.#button = button;
    this.bindEvents();
    return button;
  }

  //~ 랜더(HTML String)
  renderHTML() {
    return `
    <button type="button">${String(this.#count)}</button>
    `;
  }

  bindEvents() {
    this.#button.addEventListener("click", (e) => {
      console.log(e.target);
    });
  }

  //~ 마운트(mount) 시점
  mount(container) {
    // console.log(typeof this.render()); // object
    // container?.append?.(this.render()); 앨리먼트로 삽입
    // console.log(typeof this.renderHTML()); // string
    container?.insertAdjacentHTML("beforeend", this.renderHTML()); // html 코드로 삽입
  }

  //~ 소멸시점
  unmount() {
    console.log("소멸시점");
  }
}

// 새로운(new) 붕어빵(객체: 인스턴스) 생성
const firstCountUp = new CountUpButton({ count: 1 });
const secondCountUp = new CountUpButton({ count: 2, step: 6 });
const thirdCountUp = new CountUpButton({ count: 3, max: 100 });

globalThis.firstCountUp = firstCountUp;
// firstCountUp.mount(demoContainer);
// secondCountUp.mount(demoContainer);
// thirdCountUp.mount(demoContainer);

//* --------------------------------------------------------------------------
//# 웹 컴포넌트(Web Components) API
//# → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)

class CountUpButtonComponent extends HTMLElement { // extends 해줘야 함
  constructor() {
    // 자신이 상속받은 부모의 생성자를 호출하는 메소드 super()
    super() // 슈퍼 무조건 명시 안하면 에러
    this.innerHTML = `
    <button type="button">9</button>
    `
  }
}
// 커스텀 앨리먼트 등록
customElements.define('count-up-button', CountUpButtonComponent) // 무조건 케밥케이스! (표준)