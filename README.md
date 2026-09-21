# Switchers 🔄

**Switchers** adalah library TypeScript/JavaScript utilitas serbaguna yang dirancang untuk mempermudah manipulasi data, perhitungan finansial, serta formatting (mata uang, tanggal, dsb.) secara bertahap, ringan, dan modular.

---

## 🚀 Features

### 💰 Currency Formatting
- **`numberToIDR(value, options?)`**: Mengubah angka atau string numerik menjadi format mata uang Rupiah (`Rp.`) dengan opsi desimal, pemisah ribuan, dan penanganan nilai negatif yang fleksibel.

---

## 📦 Instalasi

```bash
npm install switchers
yarn add switchers
pnpm add switchers
```

---

## 🛠️ Penggunaan Singkat - Features 

### 1. Format ke Rupiah (`numberToIDR`)

```typescript
import { numberToIDR } from 'switchers';

// Contoh dasar (default menggunakan 2 digit sen / desimal)
console.log(numberToIDR(150000));
// Output: "Rp. 150.000,00"

// Tanpa sen (withCents: false)
console.log(numberToIDR(150000, { withCents: false }));
// Output: "Rp. 150.000"

// Menangani angka negatif
console.log(numberToIDR(-25000));
// Output: "-Rp. 25.000,00"

// Kustomisasi prefix atau separator
console.log(
  numberToIDR(1250000, {
    prefix: 'IDR ',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    withCents: true,
  })
);
// Output: "IDR 1,250,000.00"
```

### 2. Untuk kontributors.. edit disini
/////
////
////
////
////


### Silahkan isi data anda di  CONTRIBUTORS.md Terlebih dahulu




## 🗺️ Roadmap Pengembangan

Project ini akan terus dikembangkan secara bertahap untuk mencakup kebutuhan utilitas yang lebih kompleks, antara lain:


## 🤝 Panduan Kontributor (Contribution Guide & Rules)

Bagi siapa saja yang ingin berkontribusi pada pengembangan **Switchers**, silakan ikuti alur kerja berikut:

### 🍴 Langkah Berkontribusi (Fork & Clone)

1. **Fork Repository**
   - Klik tombol **Fork** di pojok kanan atas halaman GitHub repository ini: [https://github.com/alfiansakuragi-art/Switcher](https://github.com/alfiansakuragi-art/Switcher).

2. **Clone Hasil Fork ke Lokal**
   ```bash
   git clone https://github.com/alfiansakuragi-art/Switcher.git
   cd Switcher
   ```

3. **Install Dependensi**
   ```bash
   npm install
   ```

4. **Buat Branch Baru**
   - Buat branch fitur baru dengan nama yang jelas (contoh: `feat/margin-calculator` atau `fix/number-idr-cents`):
   ```bash
   git checkout -b feat/nama-fitur-kamu
   ```

5. **Kembangkan Fitur & Patuhi Rules**
   - Tulis kode utilitas di folder `src/`.
   - Update file [CONTRIBUTORS.md] dengan nama dan akun Instagram/GitHub Anda.
   - Catat log perubahan di file [teamLog.txt].
   - Update dokumentasi fitur baru di [README.md].

6. **Commit & Push Perubahan**
   ```bash
   git add .
   git commit -m "feat: menambahkan fitur kalkulator margin"
   git push origin feat/nama-fitur-kamu
   ```

7. **Buka Pull Request (PR)**
   - Kembali ke halaman repository utama [Switcher](https://github.com/alfiansakuragi-art/Switcher).
   - Klik **Compare & pull request**, lalu jelaskan perubahan yang Anda buat.

---

### 📋 Aturan Kontribusi (Rules)

1. **Bahasa Kode & Dokumentasi**:
   - Kode sumber utama ditulis menggunakan **TypeScript**.
   - Nama fungsi, variabel, parameter, dan komentar kode utama ditulis dalam bahasa Inggris / standar industri (atau istilah teknis yang konsisten).
   - Dokumentasi umum [README.md] menggunakan **Bahasa Indonesia**.

2. **Konvensi Penamaan (Naming Conventions)**:
   - Gunakan gaya **`camelCase`** untuk penamaan fungsi, variabel, file utilitas, dan properti/opsi objek (contoh: `numberToIDR.ts`, `calculateMargin`, `withCents`).
   - Gunakan **`PascalCase`** untuk penamaan tipe data, interface, dan class (contoh: `NumberToIDROptions`).

3. **Manajemen Dependensi**:
   - Jika membutuhkan pustaka/paket tambahan, **wajib** mendaftarkannya ke dalam [package.json] (sebagai `dependencies` atau `devDependencies`).
   - Hindari dependensi berlebih yang tidak diperlukan agar library tetap ringan.

4. **Pencatatan Log Tim (`teamLog.txt`)**:
   - Setiap kali melakukan perubahan, penambahan fitur, atau refactoring, kontributor **wajib** mencatat ringkasan aktivitas di file [teamLog.txt].
   - Format penulisan:
     ```text
     Nama Anda - <DD-MM-YYYY>: <deskripsi singkat kontribusi/perubahan>
     ```
     Contoh:
     ```text
     Nama Anda - <DD-MM-YYYY>: create repository and setup core library
     ```

5. **Wajib update README.md untuk feature yang ditambahkan**:
   - Setiap kali menambahkan fitur baru, kontributor **wajib** mendokumentasikan fungsi dan contoh penggunaannya di file [README.md].

6. **Wajib isi CONTRIBUTORS.md**:
   - Kontributor baru wajib menambahkan data diri pada file [CONTRIBUTORS.md].

---



