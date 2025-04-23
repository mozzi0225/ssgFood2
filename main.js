document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach((carousel) => {
        const carouselSlider = carousel.querySelector('.carousel-slider');
        const articles = carouselSlider.querySelectorAll('article');
        const articleWidth = articles[0].offsetWidth + 20; // 슬라이드 너비 + 간격
        let currentIndex = 7; // 복제된 첫 번째 슬라이드 이후 위치에서 시작
        const slideInterval = 1500; // 3초마다 슬라이드 전환

        // 복제 슬라이드 추가 (양쪽 끝에 일곱 개씩 추가)
        const clonesToAdd = 7; // 추가할 복제 슬라이드 수
        const startClones = [];
        const endClones = [];

        for (let i = 0; i < clonesToAdd; i++) {
            startClones.push(articles[articles.length - 1 - i].cloneNode(true)); // 마지막에서부터 복제
            endClones.push(articles[i].cloneNode(true)); // 처음부터 복제
        }

        // 슬라이더에 복제 슬라이드 추가
        startClones.reverse().forEach(clone => carouselSlider.insertBefore(clone, articles[0]));
        endClones.forEach(clone => carouselSlider.appendChild(clone));

        // 초기 위치 설정 (복제된 첫 번째 슬라이드 이후 위치)
        carouselSlider.style.transform = `translateX(${-articleWidth * currentIndex}px)`;

        // 슬라이드 이동 함수
        const moveSlides = () => {
            currentIndex++;
            carouselSlider.style.transition = "transform 0.5s ease-in-out";
            carouselSlider.style.transform = `translateX(${-articleWidth * currentIndex}px)`;

            // 슬라이드 경계 처리 (무한 루프 구현)
            setTimeout(() => {
                if (currentIndex >= articles.length + clonesToAdd) {
                    currentIndex = clonesToAdd; // 복제된 첫 번째 슬라이드 뒤로 이동
                    carouselSlider.style.transition = "none";
                    carouselSlider.style.transform = `translateX(${-articleWidth * currentIndex}px)`;
                }
            }, 500);
        };

        // 이전 위치 처리 (필요한 경우 추가)
        carouselSlider.addEventListener("transitionend", () => {
            if (currentIndex < clonesToAdd) {
                currentIndex = articles.length + clonesToAdd - 1; // 복제된 마지막 슬라이드 앞으로 이동
                carouselSlider.style.transition = "none";
                carouselSlider.style.transform = `translateX(${-articleWidth * currentIndex}px)`;
            }
        });

        // 슬라이드 자동 재생을 위한 변수
        let slideIntervalId;

        // 슬라이드 자동 재생 시작
        const startCarousel = () => {
            slideIntervalId = setInterval(moveSlides, slideInterval);
        };

        // 슬라이드 자동 재생 멈추기
        const stopCarousel = () => {
            clearInterval(slideIntervalId);
        };

        // 슬라이드 호버 이벤트 처리
        carousel.addEventListener('mouseenter', startCarousel); // 호버 시 슬라이드 시작
        carousel.addEventListener('mouseleave', stopCarousel);  // 호버가 벗어나면 슬라이드 멈춤

        // 슬라이드가 처음에는 멈춰있도록 설정
        stopCarousel();

        // 초기화
        stopCarousel();
    });

    // top_arr 버튼
    window.onscroll = function () {
        let button = document.getElementById("scrollToTopBtn");
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            button.style.display = "block";
        } else {
            button.style.display = "none"; 
        }
    };

    // 클릭 시 상단으로 이동
    document.getElementById("scrollToTopBtn").onclick = function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});

window.addEventListener('resize', function () {
    const burgerInner = document.querySelector('.burger_inner');

    if (window.innerWidth <= 768) {
        burgerInner.style.width = "80vw";
    } else {
        burgerInner.style.width = "300px"; // 기본 크기 유지
    }
});
