

(async () => {
    console.log("✅ CrunchySub Extension loaded");

    const res = await fetch(chrome.runtime.getURL("data/Scum.json"));
    const file = await res.json();
  
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
    const subs = file.events

    console.log(subs);
    
  
    // Style vùng phụ đề
/*     const text = document.createElement("div");
    text.id = "custom-sub";
    subLayer.appendChild(text); */
  
    // Render sub
    setInterval(() => {
      const time = video.currentTime;
    
      // Lọc các sub đang active
      const active = subs.filter(s => time >= s.start && time <= s.end);
    
      // Xoá phụ đề cũ (nếu có)
      const oldSubs = document.querySelectorAll(".custom-sub");
      oldSubs.forEach(el => el.remove());
    
      // Tạo lại từng dòng sub mới
      active.forEach(a => {
        const text = document.createElement("div");
        text.className = "custom-sub";
        text.textContent = a.text;
    
        // Style inline (nếu không dùng default)
        
        
        subLayer.appendChild(text);
      });
    }, 200);
    
  })();
  