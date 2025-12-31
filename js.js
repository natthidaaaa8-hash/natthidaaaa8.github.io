const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

// ฟังก์ชัน เปลี่ยนวินาทีเป็นรูปแบบ 00:00
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// กดปุ่ม Play/Pause
playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.innerText = "⏸️"; // เปลี่ยนเป็นปุ่ม Pause
    } else {
        music.pause();
        playBtn.innerText = "▶️"; // เปลี่ยนเป็นปุ่ม Play
    }
});

// อัปเดตแถบ Progress ขณะเพลงเล่น
music.addEventListener('timeupdate', () => {
    const progress = (music.currentTime / music.duration) * 100;
    progressBar.value = progress;
    currentTimeDisplay.innerText = formatTime(music.currentTime);
});

// เมื่อกดเลื่อนแถบเพลงเอง
progressBar.addEventListener('input', () => {
    const time = (progressBar.value * music.duration) / 100;
    music.currentTime = time;
});

// แสดงความยาวเพลงเมื่อโหลดไฟล์เสร็จ
music.addEventListener('loadedmetadata', () => {
    durationDisplay.innerText = formatTime(music.duration);
});

// ระบบตรวจสอบรหัสผ่าน (Memories Zone)
const otps = document.querySelectorAll('.otp');
const hiddenContent = document.getElementById('hiddenContent');
const correctCode = "020147";

otps.forEach((input, index) => {
    input.addEventListener('input', (e) => { // ใช้ 'input' แทน 'keyup' จะเสถียรกว่า
        if (input.value && index < otps.length - 1) {
            otps[index + 1].focus();
        }

        // ตรวจสอบรหัส
        let currentCode = "";
        otps.forEach(i => currentCode += i.value);

        if (currentCode.length === 6) { // เช็คว่าใส่ครบ 6 หลักหรือยัง
            if (currentCode === correctCode) {
                // แสดงเฉพาะกล่องของขวัญ
                hiddenContent.classList.remove('hidden');
                hiddenContent.scrollIntoView({ behavior: 'smooth' });
            } else {
                // ถ้ารหัสผิด อาจจะล้างค่า (ตัวเลือกเสริม)
                otps.forEach(i => i.value = "");
                otps[0].focus();
            }
        }
    });
});

// ฟังก์ชันสำหรับ "คลิกที่กล่อง" แล้วค่อยเด้งข้อความ
const giftBox = document.getElementById('giftBox');
const messagePopup = document.getElementById('messagePopup');
const closePopup = document.querySelector('.close-popup');

if (giftBox) {
    giftBox.addEventListener('click', () => {
        // ข้อความจะเด้งออกมาเมื่อมีการ "คลิก" ที่กล่องของขวัญเท่านั้น
        messagePopup.classList.remove('hidden');
    });
}

// ฟังก์ชันปิดป๊อปอัพ
if (closePopup) {
    closePopup.addEventListener('click', () => {
        messagePopup.classList.add('hidden');
    });
}


function createFloatingElements() {
    const bg = document.getElementById('floatingBg');
    const photos = [
        'image/n11.jpg', 
        'image/n12.jpg', 
        'image/n13.jpg',
        'image/n14.jpg',
        'image/n15.jpg',
        'image/n16.jpg'
    ];
    
    setInterval(() => {
        const container = document.createElement('div');
        
        // สุ่มว่ารอบนี้จะสร้าง "หัวใจที่มีรูป" หรือ "ไอคอน ✨"
        const isPhoto = Math.random() > 0.8; // 50% เป็นรูปภาพ
        
        if (isPhoto) {
            container.classList.add('floating-heart-photo');
            const img = document.createElement('img');
            // สุ่มหยิบรูปจาก Array
            img.src = photos[Math.floor(Math.random() * photos.length)];
            container.appendChild(img);
        } else {
            container.classList.add('floating-item');
            const icons = ['✨', '🌸', '💖'];
            container.innerText = icons[Math.floor(Math.random() * icons.length)];
        }
        
        // สุ่มตำแหน่งและความเร็ว
        container.style.left = Math.random() * 100 + 'vw';
        const duration = (Math.random() * 10 + 10) + 's';
        container.style.animationDuration = duration;
        
        bg.appendChild(container);
        
        // ลบออกเมื่อลอยพ้นจอ
        setTimeout(() => {
            container.remove();
        }, 20000);
    }, 2000); // สร้างทุกๆ 2 วินาที (ไม่ให้เยอะจนเกินไป)
}

// เริ่มทำงานเมื่อโหลดหน้าเว็บ
window.addEventListener('load', createFloatingElements);