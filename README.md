# Switchers 🔄

**Switchers** adalah library TypeScript/JavaScript utilitas serbaguna yang dirancang untuk mempermudah manipulasi data, perhitungan finansial, serta formatting (mata uang, tanggal, dsb.) secara bertahap, ringan, dan modular.

---

## 🚀 Features

### 💰 Currency Formatting & Terbilang
- **`numberToIDR(value, options?)`**: Mengubah angka atau string numerik menjadi format mata uang Rupiah (`Rp.`) dengan opsi desimal, pemisah ribuan, dan penanganan nilai negatif yang fleksibel.
- **`parseIDR(value)`**: Membaca teks Rupiah berformat Indonesia menjadi angka.
- **`numberToWordsIDR(value, options?)`**: Mengubah angka menjadi kalimat terbilang Bahasa Indonesia (e.g. `"Seratus lima puluh ribu rupiah"`).

### 📊 Perhitungan Harga & Pajak
- **`calculateMarginDetails(sellingPrice, costPrice, options?)`**: Menghasilkan laba, persentase margin, total biaya, dan status dalam bentuk objek.
- **`calculateMargin(sellingPrice, costPrice, options?)`**: Keluaran teks lama untuk kompatibilitas.
- **`calculateSellingPrice(costPrice, targetMarginPercent, options?)`**: Menghitung harga jual dari target margin dan biaya (mendukung opsi pembulatan Rupiah).
- **`calculateDiscount(originalPrice, discountPercent)`**: Menghitung nilai diskon dan harga akhir.
- **`roundIDR(value, options?)`**: Membulatkan nominal ke kelipatan Rupiah tertentu (100, 500, 1000) dengan mode `nearest`, `up`, atau `down`.
- **`calculateTax(amount, options?)` / `calculatePPN(...)`**: Menghitung nominal pajak/PPN untuk skenario *Tax Exclusive* atau *Tax Inclusive*.
- **`calculateMarkupPrice(costPrice, markupPercent, options?)`**: Menghitung harga jual dan margin dari target persentase markup biaya modal.
- **`calculateMarkupDetails(sellingPrice, costPrice, options?)`**: Menganalisis persentase markup dan margin laba dari harga jual dan biaya modal.

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

Prefix `Rp`/`Rp.` bersifat opsional. Pemisah ribuan harus berupa titik dalam kelompok tiga digit, desimal memakai koma dengan maksimal dua digit. Format ambigu seperti `"1.00"` atau `"1,000.50"` ditolak.

### 3. Terbilang Rupiah (`numberToWordsIDR`)

Mengubah nominal angka menjadi teks terbilang Bahasa Indonesia standar akuntansi/kuitansi.

```typescript
import { numberToWordsIDR } from 'switchers';

numberToWordsIDR(150000);
// "Seratus lima puluh ribu rupiah"

numberToWordsIDR(1001000);
// "Satu juta seribu rupiah"

numberToWordsIDR(-25000);
// "Minus dua puluh lima ribu rupiah"

// Kustomisasi casing dan akhiran
numberToWordsIDR(150000, { caseType: 'uppercase' });
// "SERATUS LIMA PULUH RIBU RUPIAH"

numberToWordsIDR(150000, { suffix: '' });
// "Seratus lima puluh ribu"
```

### 4. Kalkulasi Margin Keuntungan (`calculateMarginDetails` dan `calculateMargin`)

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
```

### 5. Harga Jual dari Target Margin (`calculateSellingPrice`)

```typescript
import { calculateSellingPrice } from 'switchers';

calculateSellingPrice(100000, 20, {
  tax: 5000,
  operationalCost: 10000,
  otherCost: 5000,
});
// 150000, karena total biaya 120000 dan margin 20% dari harga jual

// Dengan opsi pembulatan otomatis ke kelipatan Rupiah tertentu
calculateSellingPrice(100000, 15, { roundUnit: 500, roundMode: 'up' });
// 118000
```

### 6. Pembulatan Rupiah (`roundIDR`)

Membulatkan nominal uang ke kelipatan Rupiah tertentu (misal: 100, 500, 1.000) untuk mempermudah transaksi kasir/kembalian.

```typescript
import { roundIDR } from 'switchers';

// Default: kelipatan 100 terdekat ('nearest')
roundIDR(15420); // 15400
roundIDR(15460); // 15500

// Mode pembulatan ke atas ('up') atau ke bawah ('down')
roundIDR(15420, { unit: 100, mode: 'up' }); // 15500
roundIDR(15480, { unit: 100, mode: 'down' }); // 15400

// Kelipatan 500
roundIDR(15230, { unit: 500, mode: 'nearest' }); // 15000
roundIDR(15100, { unit: 500, mode: 'up' });      // 15500
```

### 7. Pajak & PPN (`calculateTax` / `calculatePPN`)

Menghitung pajak pertambahan nilai (PPN) dengan tarif standar (default 11%) atau kustom.

```typescript
import { calculateTax, calculatePPN } from 'switchers';

// Tax Exclusive (harga sebelum pajak)
calculateTax(100000);
// { netAmount: 100000, taxAmount: 11000, totalAmount: 111000, rate: 11, inclusive: false }

// Tax Inclusive (harga sudah termasuk pajak)
calculatePPN(111000, { inclusive: true });
// { netAmount: 100000, taxAmount: 11000, totalAmount: 111000, rate: 11, inclusive: true }

// Tarif kustom (contoh 12%)
calculateTax(100000, { rate: 12 });
// { netAmount: 100000, taxAmount: 12000, totalAmount: 112000, ... }
```

### 8. Kalkulasi Markup Harga (`calculateMarkupPrice` & `calculateMarkupDetails`)

Berbeda dari margin (yang dihitung dari harga jual), markup dihitung langsung dari total biaya modal.

```typescript
import { calculateMarkupPrice, calculateMarkupDetails } from 'switchers';

// Hitung harga jual dari markup 25% atas modal 100.000 + biaya lain
calculateMarkupPrice(100000, 25, {
  tax: 5000,
  operationalCost: 10000,
  otherCost: 5000,
});
// { sellingPrice: 150000, profit: 30000, totalCost: 120000, markupPercent: 25, marginPercent: 20 }

// Analisis persentase markup dari harga jual yang sudah ada
calculateMarkupDetails(150000, 100000, { operationalCost: 20000 });
// { profit: 30000, markupPercent: 25, marginPercent: 20, totalCost: 120000, status: 'profit' }
```

### 9. Diskon (`calculateDiscount`)

```typescript
import { calculateDiscount } from 'switchers';

calculateDiscount(200000, 25);
// { discountAmount: 50000, finalPrice: 150000 }
```

---

## 🗺️ Roadmap Pengembangan

Project ini akan terus dikembangkan secara bertahap untuk mencakup kebutuhan utilitas yang lebih kompleks, antara lain:

- [x] Opsi pembulatan harga jual ke kelipatan Rupiah tertentu (`roundIDR`).
- [x] Kalkulasi pajak PPN inclusive dan exclusive (`calculateTax`).
- [x] Utilitas markup harga modal (`calculateMarkupPrice`, `calculateMarkupDetails`).
- [x] Konversi angka ke kalimat terbilang Rupiah (`numberToWordsIDR`).
- [ ] Strategi presisi desimal yang eksplisit untuk perhitungan uang sangat besar / akuntansi ketat.

---

## 🤝 Panduan Kontributor (Contribution Guide & Rules)

Bagi siapa saja yang ingin berkontribusi pada pengembangan **Switchers**, silakan ikuti alur kerja berikut:

### 🍴 Langkah Berkontribusi (Fork & Clone)

1. **Fork Repository**
   - Klik tombol **Fork** di repository GitHub ini: [https://github.com/alfiansakuragi-art/Switcher](https://github.com/alfiansakuragi-art/Switcher).

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
   git commit -m "feat: deskripsi perubahan"
   git push origin feat/nama-fitur-kamu
   ```

7. **Buka Pull Request (PR)**
   - Kembali ke halaman repository utama [Switcher](https://github.com/alfiansakuragi-art/Switcher).
   - Klik **Compare & pull request**, lalu jelaskan perubahan yang Anda buat.

---

### 📋 Aturan Kontribusi (Rules)

1. **Bahasa Kode & Dokumentasi**:
   - Kode sumber utama ditulis menggunakan **TypeScript**.
   - Nama fungsi, variabel, parameter, dan komentar kode utama ditulis dalam bahasa Inggris / standar industri.
   - Dokumentasi umum [README.md] menggunakan **Bahasa Indonesia**.

2. **Konvensi Penamaan (Naming Conventions)**:
   - Gunakan gaya **`camelCase`** untuk penamaan fungsi, variabel, file utilitas, dan properti/opsi objek.
   - Gunakan **`PascalCase`** untuk penamaan tipe data, interface, dan class.

3. **Manajemen Dependensi**:
   - Hindari dependensi eksternal berlebih agar library tetap ringan (*zero dependency runtime*).

4. **Pencatatan Log Tim (`teamLog.txt`)**:
   - Format: `Nama Anda - <DD-MM-YYYY>: <deskripsi singkat kontribusi/perubahan>`

5. **Wajib update README.md & CONTRIBUTORS.md**:
   - Dokumentasikan fungsi baru beserta contohnya.
