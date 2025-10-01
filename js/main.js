// Hàm khởi tạo chung cho mỗi lần chuyển trang (Barba)
function initAll() {
  // Audio nền
  const audio = document.getElementById('bgMusic');
  const toggle = document.getElementById('audioToggle');
  if (toggle && audio) {
    toggle.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        toggle.textContent = 'Tắt nhạc';
      } else {
        audio.pause();
        toggle.textContent = 'Bật nhạc';
      }
    });
  }

  // Hiệu ứng đánh máy (Trang chủ)
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    // Tải lời chúc từ file data
    fetch('data/greetings.json')
      .then(res => res.json())
      .then(data => {
        new Typed('#typed', {
          strings: data.greetings,
          typeSpeed: 100,
          backSpeed: 50,
          loop: false
        });
      });
    // Pháo giấy sau 1 giây
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);
  }

  // Khởi tạo lightbox (trong trang memory.html)
  if (typeof GLightbox === 'function') {
    GLightbox({ selector: '.glightbox' });
  }

  // Khởi tạo TimelineJS (trong trang timeline.html)
  const timelineEl = document.getElementById('timeline-embed');
  if (timelineEl) {
    new TL.Timeline('timeline-embed', 'data/timeline.json');
  }
}

// Khởi tạo Barba.js cho chuyển trang mượt mà
barba.init({
  sync: true,
  transitions: [
    {
      name: 'fade',
      // Khi lần đầu load trang
      once(data) {
        initAll();
      },
      // Khi rời trang
      leave(data) {
        return new Promise(resolve => {
          // Fade out current container
          data.current.container.style.opacity = 1;
          data.current.container.style.transition = 'opacity 0.5s';
          data.current.container.style.opacity = 0;
          setTimeout(resolve, 500);
        });
      },
      // Khi vào trang mới
      enter(data) {
        initAll();
        // Fade in container mới
        data.next.container.style.opacity = 0;
        data.next.container.style.transition = 'opacity 0.5s';
        setTimeout(() => {
          data.next.container.style.opacity = 1;
        }, 50);
      }
    }
  ]
});
