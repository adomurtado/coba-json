const baseUrl = 'https://json-server--3000.local.webcontainer.io/datas';

// Fungsi untuk menampilkan semua data dari server
async function fetchAndDisplayGreetings() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Gagal memuat data: ${response.statusText}`);
    }

    const data = await response.json();
    const greetingDisplay = document.getElementById("greetingDisplay");

    // Tambahkan setiap ucapan ke tampilan
    data.forEach(item => {
      addGreetingToDisplay(item);
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat memuat data:", error);
  }
}

// Fungsi untuk menambahkan ucapan baru ke tampilan tanpa mengganti elemen lainnya
function addGreetingToDisplay({ name, guests, message }) {
  const newGreeting = document.createElement("p");
  newGreeting.innerHTML = `<strong>${name}</strong> (${guests} tamu): ${message}`;
  document.getElementById("greetingDisplay").appendChild(newGreeting);
}

// Panggil fungsi fetchAndDisplayGreetings saat halaman dimuat
window.addEventListener("DOMContentLoaded", fetchAndDisplayGreetings);

// Kirim data form dan tambahkan langsung ke tampilan
document.querySelector(".rsvp__form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitButton = document.querySelector(".rsvp__form button[type='submit']");
  submitButton.disabled = true; // Nonaktifkan tombol submit sementara

  const name = document.querySelector("input[name='name']").value;
  const guests = document.querySelector("input[name='guests']").value;
  const message = document.querySelector("textarea[name='message']").value;

  const formData = { name, guests, message };

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Gagal menyimpan data: ${response.statusText}`);
    }

    const newGreeting = await response.json();

    // Tampilkan ucapan baru langsung di bawah tanpa mengosongkan kontainer
    addGreetingToDisplay(newGreeting);
    document.querySelector(".rsvp__form").reset();
  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim data:", error);
  } finally {
    // Aktifkan kembali tombol submit setelah 2 detik
    setTimeout(() => {
      submitButton.disabled = false;
    }, 15000);
  }
});



// fuction hide navbar and music
window.onload = function() {
    if (localStorage.getItem('contentVisible') === 'true') {
      document.querySelector('.container').classList.add('visible');
      document.getElementById('navbarBottom').style="opacity: 50"; // Show navbar
      document.body.style.overflow = 'auto';
      document.getElementById('backgroundMusic').play();
    }
  };

  document.getElementById('showContent').addEventListener('click', function() {
    document.querySelector('.container').classList.add('visible');
    document.getElementById('navbarBottom').style="opacity: 50"; // Show navbar
    document.body.style.overflow = 'auto';
    localStorage.setItem('contentVisible', 'true');
    document.getElementById('backgroundMusic').play();
  });
  document.getElementById('musicControl').addEventListener('click', function() { const music = document.getElementById('backgroundMusic'); 
  if (music.paused) { music.play(); } else { music.pause(); } 
  });

// function copy clip board
function copyToClipboard() {
    const accountNumber = document.getElementById('account-number').innerText;
navigator.clipboard.writeText(accountNumber).then(() => {
        alert('Nomor rekening disalin ke clipboard!');
    });
}

// Tanggal dan tahun saat ini
document.getElementById("year").textContent = new Date().getFullYear();

// animasi
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, img');
  
    function checkVisibility() {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.opacity = 1;
          el.style.transform = 'translate(0)';
        }
      });
    }
  
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Untuk memeriksa elemen pada load pertama kali
  });

  // fungsi countdwon
  // Set target date for the wedding
  const targetDate = new Date("2025-01-08T08:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft >= 0) {
      // Calculate remaining time
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update the countdown elements
      document.getElementById("days").innerText = days.toString().padStart(2, "0");
      document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
      document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
      document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    } else {
      // When countdown ends
      document.getElementById("countdown").innerHTML = "<h2>Selamat Hari Pernikahan!</h2>";
    }
  }

  // Run the countdown function every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Run immediately

// link nama 
  function getParameterByName(name, url = window.location.href) {
          name = name.replace(/[\[\]]/g, '\\$&');
          const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`), 
                results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }

    const nama = getParameterByName('p');
      if (nama) {
          document.getElementById('namaPenerima').textContent = nama;
      }


// JavaScript untuk salin ke clipboard
  document.querySelectorAll('.copy-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const copyText = e.target.getAttribute('data-copy');
    
            navigator.clipboard.writeText(copyText).then(() => {
              alert('Teks berhasil disalin: ' + copyText);
            }).catch((err) => {
              console.error('Gagal menyalin teks: ', err);
            });
          });
    });