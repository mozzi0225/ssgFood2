document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll("nav ul li");
    const contents = document.querySelectorAll("main > div > div");

    // 초기 상태 설정
    contents.forEach(content => {
        content.style.display = "none";
    });

    // 탭 클릭 이벤트
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            // 모든 콘텐츠 숨김
            contents.forEach(content => {
                content.style.display = "none";
            });

            // 선택한 콘텐츠 표시
            contents[index].style.display = "block";

            // 탭 스타일 변경
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    // 기본으로 첫 번째 탭 활성화
    if (tabs.length > 0) {
        tabs[0].click();
    }
});