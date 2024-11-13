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