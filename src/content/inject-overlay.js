(async () => {
    console.log("✅ CrunchySub Extension loaded");
  
    const waitForVideo = () => new Promise(resolve => {
      const check = setInterval(() => {
        const video = document.querySelector("video");
        if (video) {
          clearInterval(check);
          resolve(video);
        }
      }, 300);
    });
  
    const waitForContainer = () => new Promise(resolve => {
      const check = setInterval(() => {
        const container = document.getElementById("vilosVttJs");
        if (container) {
          console.log("✅ find vilosVttJs");
          clearInterval(check);
          resolve(container);
        }
      }, 300);
    });
  
    const video = await waitForVideo();
    const subLayer = await waitForContainer();
  
    // Sub sample (bạn có thể load từ API hoặc file)
    const subs = [
      { start: 1, end: 3, text: "chú nigg code lỏ chửi Lập già" },
      { start: 5, end: 10 , text: "Chúc bạn xem vui vẻ." }
    ];
  
    // Style vùng phụ đề
    const text = document.createElement("div");
    text.id = "custom-sub";
    subLayer.appendChild(text);
  
    // Render sub
    setInterval(() => {
      const time = video.currentTime;
      const active = subs.find(s => time >= s.start && time <= s.end);
      text.textContent = active ? active.text : "";
    }, 200);
  })();
  