
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        header.classList.add("show");
    } else {
        header.classList.remove("show");
    }
});

/* =============================
   ③ スクロールで TOP ボタン表示
============================= */
document.addEventListener("DOMContentLoaded", () => {
    const topBtn = document.querySelector(".top");

    if (!topBtn) {
        console.error("'.top' が見つかりません。");
        return;
    }

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const pageHeight = document.body.scrollHeight - window.innerHeight;

        if (scrollTop / pageHeight > 0.7) {
            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";
            topBtn.style.pointerEvents = "auto";
        } else {
            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";
            topBtn.style.pointerEvents = "none";
        }
    });
});


/* =============================
   ④ ハンバーガーメニュー
============================= */
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger_img");
    const menuOverlay = document.querySelector(".menu_overlay");
    const menuOverlayBg = document.getElementById("menuOverlayBg");

    if (!hamburger || !menuOverlay || !menuOverlayBg) return;

    function toggleMenu() {
        menuOverlay.classList.toggle("show");
        menuOverlayBg.classList.toggle("show");

        // アイコン切り替え（フェード）
        hamburger.classList.add("fade");
        setTimeout(() => {
            hamburger.src = menuOverlay.classList.contains("show")
                ? "./images/humb_open.png"
                : "./images/humb_close.png";
            hamburger.classList.remove("fade");
        }, 300);
    }

    hamburger.addEventListener("click", toggleMenu);

    menuOverlayBg.addEventListener("click", () => {
        menuOverlay.classList.remove("show");
        menuOverlayBg.classList.remove("show");

        hamburger.classList.add("fade");
        setTimeout(() => {
            hamburger.src = "./images/humb_close.png";
            hamburger.classList.remove("fade");
        }, 300);
    });
});

/*new*/
document.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector(".menu_newmenu");
    const newBadge = document.querySelector(".menu_yellow");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    newBadge.classList.add("active"); // ← 見えたら表示
                }
            });
        },
        {
            threshold: 0.6 // カードが60%見えたら作動
        }
    );

    observer.observe(target);
});

/*テキストフェードイン */
const aboutTextEl = document.querySelector('.about_text');

const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutTextEl.classList.add('is-show');
            aboutObserver.unobserve(aboutTextEl); // ←１回だけ発火
        }
    });
}, {
    threshold: 0.3   // 20% 見えたらフェードイン
});

aboutObserver.observe(aboutTextEl);


// ▼ メニュー項目を取得
const menuItems = document.querySelectorAll(".menu_item");

// ▼ 交差監視オプション（30% 見えたら発火）
const menuObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

        // 30% 以上見えたら
        if (entry.intersectionRatio >= 0.6) {
            entry.target.classList.add("active");

            // 一度だけの実行にするため監視を停止
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: [0, 0.3, 1]
});

// ▼ 各要素に Observer を適用
menuItems.forEach(item => menuObserver.observe(item));


const floorguide = document.querySelector(".floorguide");

const fgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.8) {
            floorguide.classList.add("show");
        }
    });
}, { threshold: [0, 0.4, 1] });

fgObserver.observe(floorguide);




const infomationMaps = document.querySelectorAll('.infomation_map');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal_image');
const modalBg = document.querySelector('.modal_background');

infomationMaps.forEach(img => {
    img.addEventListener('click', () => {
        modalImage.src = img.src;
        modal.classList.add('active');
    });
});

// 背景クリックで閉じる
modalBg.addEventListener('click', () => {
    modal.classList.remove('active');
});


// infomation menu line のフェードイン//
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.infomation_faded, .menu_faded, .line_faded');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.03 // 60%見えたら発火
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadein');
                observer.unobserve(entry.target); // 一度だけフェードイン
            }
        });
    }, options);

    sections.forEach(sec => observer.observe(sec));
});





document.addEventListener("DOMContentLoaded", function () {
    const target = document.querySelectorAll('.floorguide_story');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: [0, 0.1, 1] // 0%, 80%, 100%で監視
    });

    target.forEach(el => observer.observe(el));
});

/* =============================
   フェードイン・フェードアウト
============================= */
const staffTexts = document.querySelectorAll('.staff_text');

const fadeOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.4, 0.7, 1] // ← 40% と 70% を監視
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        // ★ 70% 以上見えたらフェードイン
        if (entry.intersectionRatio >= 0.7) {
            entry.target.classList.add('fadein');
        }

        // ★ 40% 以下になったらフェードアウト
        if (entry.intersectionRatio <= 0.4) {
            entry.target.classList.remove('fadein');
        }

    });
}, fadeOptions);

staffTexts.forEach(el => fadeObserver.observe(el));

const texts = document.querySelectorAll(".staff_text");

const imgBack = document.querySelector(".img-back");
const imgFront = document.querySelector(".img-front");

const images = [
    "./images/staffphoto1.jpg",
    "./images/staffphoto2.jpg",
    "./images/staffphoto1.jpg",
    "./images/staffphoto2.jpg"
];

let isSwitching = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const idx = Array.from(texts).indexOf(entry.target);

        if (entry.intersectionRatio >= 1) {

            if (!isSwitching && images[idx]) {
                isSwitching = true;

                // 次の画像をフロントへ
                imgFront.src = images[idx];

                // フェード開始
                imgFront.classList.add("fade-in");
                imgBack.classList.add("fade-out");

                // 両方のアニメーション終了を待つ
                const handleEnd = () => {
                    // 裏表入れ替え
                    imgBack.src = imgFront.src;

                    // フロントをまた非表示の位置に戻す
                    imgFront.classList.remove("fade-in");
                    imgBack.classList.remove("fade-out");

                    isSwitching = false;

                    // リスナー解除
                    imgFront.removeEventListener("transitionend", handleEnd);
                };

                imgFront.addEventListener("transitionend", handleEnd);
            }
        }
    });
}, { threshold: [0, 0.4, 0.7, 1] });

texts.forEach(text => observer.observe(text));



const overlay = document.querySelector('.white-fade-overlay');
const staff = document.querySelector('.staff');
const floor = document.querySelector('.floorguide');

window.addEventListener('scroll', () => {

    const scrollY = window.scrollY;

    const staffBottom = staff.offsetTop + staff.offsetHeight;
    const floorTop = floor.offsetTop;
    const floorBottom = floor.offsetTop + floor.offsetHeight;

    const fadeStart = staffBottom - window.innerHeight / 2;
    const fadeEnd = floorTop;

    // staff 中（透明）
    if (scrollY <= fadeStart) {
        overlay.style.opacity = 0;

        // floorguide に入っている間（真っ白）
    } else if (scrollY >= fadeEnd && scrollY <= floorBottom) {
        overlay.style.opacity = 1;

        // floorguide 終わったら白 → 透明に戻す
    } else if (scrollY > floorBottom) {
        const returnStart = floorBottom;
        const returnEnd = floorBottom + window.innerHeight * 0.4;

        if (scrollY >= returnEnd) {
            overlay.style.opacity = 0;
        } else {
            const returnProgress = 1 - (scrollY - returnStart) / (returnEnd - returnStart);
            overlay.style.opacity = returnProgress;
        }

        // staff → floorguide の途中で白くなる（0 → 1）
    } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        overlay.style.opacity = progress;
    }
});

const floorSection = document.querySelector('.floorguide');

const floorObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        // 40% 表示されたらフェードイン開始
        if (entry.intersectionRatio >= 0.4) {
            floorSection.classList.add('visible');
        }
    });
}, {
    threshold: [0, 0.4, 1]
});

// 監視開始
floorObserver.observe(floorSection);








document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".line_close").addEventListener("click", function () {
        const line = document.getElementById("lineBox");
        line.classList.add("hide");

        setTimeout(() => {
            line.style.display = "none";
        }, 300);
    });
});