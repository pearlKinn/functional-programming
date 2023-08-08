//* --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
//* --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
//* --------------------------------------------------------------------------

//* --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 함수(function)를 사용해 구현합니다.

function createCounterButton(
  element,
  { count = 0, step = 1, update = null } = {}
) {
  if (!element) {
    throw new Error("element가 문서에 존재하지 않습니다.");
  }

  const setCount = (newCount) => { 
    // 버튼의 텍스트 내용과 내부 상태를 업데이트하는 함수입니다. setCount 함수는 클로저로서 count 변수에 접근
    count = newCount;
    element.textContent = count;
  };

  element.addEventListener("click", () => {
    setCount(count + step);
    update?.(count);
  });

  setCount(count);

  return element;
}

const counter = createCounterButton( 
  document.createElement('button'), 
  {
    count: 1,
    update(count) {//?
      document.querySelector('.functional').textContent = String(count);
    }
  }
);
document.getElementById("demo")?.append(counter);

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

class CounterButton {
  #element = null;
  #config = {};
  #updateCallback = null;
  #clearIntervalId = 0;

  static defaultOptions = {
    count: 0,
    step: 1,
  };

  constructor(element, props = {}) {
    if (!element) {
      throw new Error("element가 문서에 존재하지 않습니다.");
    }

    this.#element = element;
    this.#init(props);
  }

  #init(props) {
    this.setConfig(props);
    this.#updateDOM();
    this.#bindEvent();
  }

  #bindEvent() {
    this.#element.addEventListener("click", () => {
      this.setCount();
      this.#updateCallback?.(this.#config.count);
    });
  }

  #updateDOM() {
    const { count } = this.#config;
    this.#element.textContent = count;
  }

  setConfig(userConfig = {}) {
    this.#config = { ...CounterButton.defaultOptions, ...userConfig };
  }

  setCount(newCount) {
    const { count, step } = this.#config;

    this.setConfig({
      ...this.#config,
      count: newCount ?? count + step,
    });

    this.#updateDOM();
  }

  update(callback) {
    this.#updateCallback = callback;
  }

  play(fps = 1000 / 1) {
    this.#clearIntervalId = setInterval(() => {
      const { count, step } = this.#config;
      this.setCount(count + step);
      this.#updateDOM();
    }, fps);
  }

  stop() {
    clearInterval(this.#clearIntervalId);
  }

  mount(container) {
    container.append(this.#element);
  }
}

const counterButton = new CounterButton(document.createElement("button"), {
  count: 2,
  step: 2,
});

// counterButton.play()

counterButton.update((count) => {
  document.querySelector(".object-oriented").textContent = String(count);
});

counterButton.mount(document.getElementById("demo"));

//* --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)

class CounterButtonComponent extends HTMLElement {
  #config = {
    count: 0,
    step: 1,
  };

  constructor() {
    super();
    this.#init();
  }

  #init() {
    const userConfig = {
      count: Number(this.getAttribute("count")),
      step: Number(this.getAttribute("step")) || 1,
    };

    this.#config = { ...this.#config, ...userConfig };
  }

  // 버튼 클릭 이벤트를 처리하고, 카운트 값을 증가시키고 컴포넌트를 다시 렌더링하며, update 이벤트를 발생시킵니다
  /* 
   dispatchEvent()를 사용하여 "update"라는 이름의 커스텀 이벤트를 발생시키고, this.#config.count 값을 이벤트의 detail 속성에 전달
   "update" 이벤트를 리스닝하는 다른 요소에서 해당 값을 사용하여 UI나 상태를 업데이트 할 수 있음
  */
  #bindEvent(e) {
    if (e.target.matches("button")) {
      this.#setCount();
      this.render();
      // 참고: https://developer.mozilla.org/ko/docs/Web/Events/Creating_and_triggering_events
      this.dispatchEvent( //  DOM 요소에 이벤트를 발생시키기 위해 사용되는 메서드
        new CustomEvent("update", { detail: this.#config.count }) // (update라는 이름의 커스텀 이벤트를 생성 , 이벤트에 전달할 추가 정보를 담고 있는 객체 { detail: ... } 형태로 전달)
      );
    }
  }

  #setCount() {
    const { count, step } = this.#config;
    this.#config.count = count + step;
  }

  connectedCallback() { // 컴포넌트가 DOM에 연결될 때 호출되는 메서드로, 초기 렌더링을 수행하고 클릭 이벤트를 등록
    // console.log('connected');
    this.render();
    this.addEventListener("click", (e) => this.#bindEvent(e));
  }

  disconnectedCallback() { // 컴포넌트가 DOM에서 연결이 끊어질 때 호출되는 메서드로, 클릭 이벤트를 제거
    // console.log('disconnected');
    this.removeEventListener("click", (e) => this.#bindEvent(e));
  }

  render() {
    const { count } = this.#config;
    this.innerHTML = `<button type="button">${count}</button>`;
  }
}

customElements.define("counter-button", CounterButtonComponent);
const counterButtonEl = document.querySelector("counter-button");
/* 
counterButtonEl.addEventListener("update", ...): counter-button 요소에 대한 update 이벤트를 처리합니다. 
해당 이벤트가 발생하면 카운트 값이 변경된 내용을 .web-component 클래스를 가진 요소의 텍스트로 업데이트합니다.

이 코드를 실행하면 <counter-button> 요소가 등록되어 웹 컴포넌트로 사용됩니다. 이 버튼을 클릭하면 카운트 값이 증가하며, update 이벤트가 발생하여 다른 요소의 텍스트가 업데이트됩니다.
*/
counterButtonEl.addEventListener("update", (e) => { // update -> 사용자 정의 이벤트 사용
  document.querySelector('.web-component').textContent = String(e.detail);
});


