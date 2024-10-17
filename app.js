const baseUrl = 'https://json-server--3000.local.webcontainer.io/datas';

// Fungsi untuk melakukan Create atau Update data
async function saveData(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const no_hp = document.getElementById('no_hp').value;
    const dataId = document.getElementById('dataId').value;

    const data = {
        nama: nama,
        alamat: alamat,
        no_hp: no_hp
    };

    const method = dataId ? 'PUT' : 'POST'; // PUT jika ada dataId, POST jika tidak ada
    const url = dataId ? `${baseUrl}/${dataId}` : baseUrl;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert(`Data berhasil ${dataId ? 'diperbarui' : 'ditambahkan'}`);
            clearForm();
            fetchData(); // Segarkan data di tabel setelah operasi
        } else {
            alert('Gagal menyimpan data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menyimpan data');
    }
}

// Fungsi untuk mengambil dan menampilkan data dalam tabel
async function fetchData() {
    try {
        const response = await fetch(baseUrl);
        if (response.ok) {
            const data = await response.json();
            const tbody = document.querySelector('#dataTable tbody');
            tbody.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data

            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nama}</td>
                    <td>${item.alamat}</td>
                    <td>${item.no_hp}</td>
                    <td>
                        <button onclick="editData(${item.id})">Edit</button>
                        <button onclick="deleteData(${item.id})">Hapus</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        } else {
            alert('Gagal mengambil data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengambil data');
    }
}

// Fungsi untuk menghapus data
async function deleteData(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Data berhasil dihapus');
            fetchData(); // Segarkan data di tabel setelah penghapusan
        } else {
            alert('Gagal menghapus data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus data');
    }
}

// Fungsi untuk mengisi form saat mengedit data
async function editData(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        if (response.ok) {
            const data = await response.json();

            document.getElementById('nama').value = data.nama;
            document.getElementById('alamat').value = data.alamat;
            document.getElementById('no_hp').value = data.no_hp;
            document.getElementById('dataId').value = data.id; // Set ID untuk update
        } else {
            alert('Gagal mengambil data untuk diedit');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengambil data');
    }
}

// Fungsi untuk membersihkan form
function clearForm() {
    document.getElementById('nama').value = '';
    document.getElementById('alamat').value = '';
    document.getElementById('no_hp').value = '';
    document.getElementById('dataId').value = ''; // Hapus ID setelah menyimpan
}

// Event listeners
document.getElementById('dataForm').addEventListener('submit', saveData);
document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

// Panggil fetchData saat halaman dimuat
window.onload = fetchData;
