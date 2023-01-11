// import 키워드를 사용할 경우 html에 type="module" 옵션값 필수
import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector("header .basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation(); // 클릭할 때 윈도우까지 전파되는 것을 막음(화면클릭 x)
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

// 검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")]; // 전개 연산자(Spread Operator)
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch); // showSearch 함수를 내부적으로 실행
searchCloserEl.addEventListener("click", function (event) {
  // 데스크탑 레이아웃에서 클릭 이벤트가 버블링되어,
  // 모바일 레이아웃에서 searchTextFieldEl가 클릭된 상태로 변하는 것을 방지
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  // 검색바가 생기면 스크롤 고정
  stopScroll();
  // 메뉴 리스트 애니메이션
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  // 검색바 리스트 애니메이션
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  // 검색바 포커스
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}
function playScroll() {
  document.documentElement.classList.remove("fixed");
}
function stopScroll() {
  document.documentElement.classList.add("fixed"); // 문서의 최상위 요소 - html
}

// 헤더 메뉴 토글 [모바일]
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 헤더 검색 [모바일]
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", function () {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});
searchCancelEl.addEventListener("click", function () {
  headerEl.classList.remove("searching--mobile");
});

// 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리
window.addEventListener("resize", function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

// 네비게이션 메뉴 토글 [모바일]
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", function () {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
navMenuShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);
function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
}

// 요소의 가시성 관찰 (해당 요소 화면에 보임 여부)
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      // 보이지 않을 때는 처리하지 않음
      return;
    }
    entry.target.classList.add("show");
  });
});
const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

// 비디오 재생!
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// '당신에게 맞는 iPad는?' 랜더링 (Compare Section)
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color}"></li>`;
  });

  // itemEl.textContent = "<div>Hello</div>"; // 글자 내용으로 요소 내부 출력
  itemEl.innerHTML = `<div>${ipad.name}</div>`; // 실제 HTML 구조로 내용 입력

  // Comment tagged templates - 코드 하이라이팅 가능하게 해주는 확장 프로그램
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <!-- toLocaleString("en-US") - 숫자 1000단위 , 표시 999,000 -->
    <p class="price">₩${ipad.price.toLocaleString("en-US")}</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// 푸터 네비게이션 랜더링
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
 `;

  navigationsEl.append(mapEl);
});

// 올해 연도 자동 계산
const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();

// 푸터 active 토글 - 아코디언 메뉴(Accordion Menu)
const mapEls = document.querySelectorAll("footer .navigations .map");
mapEls.forEach(function (el) {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", function () {
    el.classList.toggle("active");
  });
});
