# Switchers 🔄

**Switchers** adalah library TypeScript/JavaScript utilitas serbaguna yang dirancang untuk mempermudah manipulasi data, perhitungan finansial, serta formatting (mata uang, tanggal, dsb.) secara bertahap, ringan, dan modular.

---

## 🚀 Features

### 💰 Currency Formatting
- **`numberToIDR(value, options?)`**: Mengubah angka atau string numerik menjadi format mata uang Rupiah (`Rp.`) dengan opsi desimal, pemisah ribuan, dan penanganan nilai negatif yang fleksibel.
- **`parseIDR(value)`**: Membaca teks Rupiah berformat Indonesia menjadi angka.

### 📊 Perhitungan Harga
- **`calculateMarginDetails(sellingPrice, costPrice, options?)`**: Menghasilkan laba, persentase margin, total biaya, dan status dalam bentuk objek.
- **`calculateMargin(sellingPrice, costPrice, options?)`**: Keluaran teks lama untuk kompatibilitas.
- **`calculateSellingPrice(costPrice, targetMarginPercent, options?)`**: Menghitung harga jual dari target margin dan biaya.
- **`calculateDiscount(originalPrice, discountPercent)`**: Menghitung nilai diskon dan harga akhir.

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

Input string untuk `numberToIDR` harus berupa angka desimal biasa, misalnya `"125000.50"`. Fungsi menolak input parsial seperti `"12abc"`, nilai kosong, `NaN`, dan `Infinity`. `withCents: false` membulatkan ke Rupiah utuh.

### 2. Baca Teks Rupiah (`parseIDR`)

```typescript
import { parseIDR } from 'switchers';

parseIDR('Rp. 1.250.000,50'); // 1250000.5
parseIDR('-Rp. 25.000,00');   // -25000
parseIDR('125000');           // 125000
```

Prefix `Rp`/`Rp.` bersifat opsional. Pemisah ribuan harus berupa titik dalam kelompok tiga digit, desimal memakai koma dengan maksimal dua digit. Format ambigu seperti `"1.00"` atau `"1,000.50"` ditolak. Prefix dan pemisah kustom dari `numberToIDR` tidak otomatis dikenali oleh `parseIDR`.

### 3. Kalkulasi Margin Keuntungan (`calculateMarginDetails` dan `calculateMargin`)

Fungsi untuk menghitung keuntungan (profit) dan persentase margin laba bersih berdasarkan harga jual, harga modal, serta biaya tambahan opsional (pajak, biaya operasional, dan biaya lainnya).

```typescript
import { calculateMargin, calculateMarginDetails } from 'switchers';

calculateMarginDetails(150000, 100000, {
  tax: 5000,
  operationalCost: 10000,
  otherCost: 5000,
});
// { profit: 30000, marginPercent: 20, totalCost: 120000, status: 'profit' }

// API lama tetap menghasilkan teks
console.log(calculateMargin(100000, 80000));
// Output:
// profit profit: 20000,
// margin: 20.00%

// Dengan opsi biaya tambahan (tax, operationalCost, otherCost)
console.log(
  calculateMargin(150000, 100000, {
    tax: 5000,
    operationalCost: 10000,
    otherCost: 5000,
  })
);
// Output:
// profit profit: 30000,
// margin: 20.00%

// Contoh kondisi rugi (unprofit)
console.log(calculateMargin(50000, 70000));
// Output:
// unprofit profit: -20000,
// margin: -40.00%

// Contoh kondisi impas / balik modal (breakEven)
console.log(calculateMargin(50000, 50000));
// Output:
// breakEven profit: 0,
// margin: 0.00%
```

`calculateMarginDetails` memakai status `'profit'`, `'loss'`, atau `'breakEven'`. `marginPercent` adalah angka mentah yang belum dibulatkan; `calculateMargin` tetap membulatkan tampilan ke dua desimal dan mempertahankan label lama `unprofit` untuk kerugian. Harga jual harus lebih besar dari nol.

### 4. Harga Jual dari Target Margin (`calculateSellingPrice`)

```typescript
import { calculateSellingPrice } from 'switchers';

calculateSellingPrice(100000, 20, {
  tax: 5000,
  operationalCost: 10000,
  otherCost: 5000,
});
// 150000, karena total biaya 120000 dan margin 20% dari harga jual
```

Target margin harus mulai dari `0` dan kurang dari `100`; total biaya harus positif. Fungsi mengembalikan angka tanpa pembulatan, sehingga aplikasi dapat memilih aturan pembulatan harga jual sendiri.

### 5. Diskon (`calculateDiscount`)

```typescript
import { calculateDiscount } from 'switchers';

calculateDiscount(200000, 25);
// { discountAmount: 50000, finalPrice: 150000 }
```

Persentase diskon harus berada antara `0` dan `100`. Semua perhitungan menggunakan `number` JavaScript; untuk nominal sangat besar atau kebutuhan akuntansi dengan presisi desimal ketat, terapkan strategi presisi uang sesuai kebutuhan aplikasi.


### Silahkan isi data anda di  CONTRIBUTORS.md Terlebih dahulu




## 🗺️ Roadmap Pengembangan

Project ini akan terus dikembangkan secara bertahap untuk mencakup kebutuhan utilitas yang lebih kompleks, antara lain:

- Opsi pembulatan harga jual ke kelipatan Rupiah tertentu.
- Strategi presisi desimal yang eksplisit untuk perhitungan uang.


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



