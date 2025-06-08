# Laporan Proyek Machine Learning - Randy Censon

## Domain Proyek

Penyakit diabetes merupakan salah satu masalah kesehatan global yang terus meningkat setiap tahunnya. Deteksi dini terhadap risiko diabetes sangat penting untuk mencegah komplikasi serius dan meningkatkan kualitas hidup pasien. Dengan kemajuan teknologi, analisis data kesehatan menggunakan metode machine learning seperti logistic regression dapat membantu memprediksi kemungkinan seseorang menderita diabetes berdasarkan data medis mereka, seperti kadar glukosa, tekanan darah, dan indeks massa tubuh (BMI). Proyek ini bertujuan untuk membangun model prediksi diabetes berbasis regresi logistik yang mampu mengklasifikasikan pasien secara efektif berdasarkan data fitur kesehatan.

**Rubrik/Kriteria Tambahan (Opsional)**:

Diabetes adalah penyakit kronis yang berisiko fatal bagi penderitanya. Kondisi ini terjadi akibat kadar gula darah yang tinggi dalam tubuh. Glukosa sendiri merupakan sumber energi utama bagi sel-sel tubuh manusia. Namun, pada penderita diabetes, tubuh tidak mampu menyerap dan memanfaatkan glukosa secara optimal [1]. cara menyelesaikan masalah ini dengan memanfaatkan model Logistic Regression, serta melalui proses prapemrosesan seperti transformasi log dan normalisasi data, sistem ini dapat memprediksi kemungkinan seseorang mengidap diabetes. Model ini kemudian dievaluasi menggunakan metrik seperti akurasi dan confusion matrix, dan dapat digunakan untuk memprediksi pasien baru sebagai alat bantu keputusan dalam dunia medis.

referensi:
[1] A. YUSUP, I. M. ADITAMA dan R. NURSANIA, “IMPLEMENTASI ALGORITMA REGRESI LOGISTIK,” UNIVERSITAS NUSA PUTRA SUKABUMI , Sukabumi, 2024.

## Business Understanding

Problem Statements:

-   Banyak pasien diabetes tidak terdiagnosis sejak awal, sehingga mereka datang ke fasilitas kesehatan ketika kondisi sudah cukup parah dan memerlukan penanganan intensif. Hal ini memperburuk prognosis dan meningkatkan beban biaya pengobatan.

-   Tidak semua masyarakat memiliki akses langsung ke fasilitas medis berkualitas, sehingga deteksi dini diabetes menjadi sangat menantang terutama di wilayah terpencil atau kurang berkembang.

Goals:

-   Membuat model prediksi berbasis data yang dapat memperkirakan kemungkinan seseorang menderita diabetes berdasarkan data medis dasar seperti usia, kadar glukosa, tekanan darah, dan indeks massa tubuh.

-   Memberikan akses awal terhadap informasi risiko diabetes, terutama bagi masyarakat yang tidak memiliki akses mudah ke fasilitas kesehatan, sehingga dapat meningkatkan kesadaran dan pencegahan dini.

**Rubrik/Kriteria Tambahan (Opsional)**:

-   Melakukan eksperimen dengan beberapa algoritma lain seperti Random Forest dan XGBoost untuk membandingkan performa dan meningkatkan akurasi prediksi. Model dengan performa terbaik berdasarkan metrik evaluasi akan dipilih sebagai model final.

-   Melakukan hyperparameter tuning menggunakan GridSearchCV untuk mengoptimalkan performa model terbaik. Tuning ini bertujuan meningkatkan metrik evaluasi seperti recall untuk kelas diabetes, agar model lebih sensitif dalam mendeteksi kasus positif (penderita diabetes).

## Data Understanding

Dataset Diabetes memuat informasi tentang individu yang didiagnosis menderita diabetes, mencakup atribut demografis, riwayat medis, dan hasil pengukuran klinis. Dataset ini menjadi sumber data yang berharga untuk mempelajari manajemen diabetes, faktor-faktor risiko, serta pembuatan model prediktif terhadap hasil penyakit.

dataset ini memiliki 2768 baris dan baris kosong (null) seperti berikut: 1. Glucose: 18 2. BloodPressure: 128 3. SkinThickness: 810 4. Insulin: 1333 5. BMI: 35

setelah dataset yang memiliki null dibersihkan (drop), terdapat jumlah 1424 baris dan 9 kolom tersisa

[Diabetes] Link: [https://www.kaggle.com/datasets/ehababoelnaga/diabetes-dataset/data](https://www.kaggle.com/datasets/ehababoelnaga/diabetes-dataset/data).

### Variabel-variabel pada dataset adalah sebagai berikut:

-   Pregnancies: Jumlah kehamilan

-   Glucose Kadar: glukosa darah

-   BloodPressure: Tekanan darah diastolik

-   SkinThickness: Ketebalan lipatan kulit triceps

-   Insulin: Kadar insulin

-   BMI: Body Mass Index

-   DiabetesPedigreeFunction: Riwayat diabetes dalam keluarga

-   Age: Umur

-   Outcome: 0 = tidak diabetes, 1 = diabetes

**Rubrik/Kriteria Tambahan (Opsional)**:
Boxplot (Diagram Kotak)

-   Tujuan: Mengidentifikasi outlier dan melihat sebaran nilai fitur seperti Glucose, BMI, Insulin, dll.

-   Manfaat: Boxplot membantu melihat distribusi data, median, kuartil, serta nilai ekstrem (outlier) yang bisa memengaruhi performa model.

Heatmap Korelasi

-   Tujuan: Menunjukkan hubungan atau korelasi antar fitur numerik dalam dataset.

-   Manfaat: Dengan heatmap, kita dapat mengidentifikasi fitur-fitur yang memiliki korelasi tinggi terhadap Outcome (hasil diagnosis diabetes), sehingga bisa menjadi indikator penting untuk pemodelan.

Distribusi Data (Histogram atau KDE Plot)

-   Tujuan: Melihat apakah distribusi data normal atau tidak.

-   Manfaat: Informasi distribusi membantu dalam memilih teknik preprocessing (misalnya, normalisasi atau log transform) yang sesuai untuk meningkatkan kinerja model.

## Data Preparation

Dalam tahap ini, dilakukan beberapa teknik persiapan data secara berurutan agar data siap digunakan untuk membangun model machine learning. Adapun teknik-teknik yang diterapkan dalam notebook dan laporan ini adalah sebagai berikut:

1. Import Data
   Dataset dibaca menggunakan pandas dan dimuat ke dalam DataFrame untuk memudahkan proses analisis dan manipulasi data.

2. Pemeriksaan Missing Values
   Data diperiksa apakah terdapat nilai kosong (missing values) menggunakan .isnull().sum(). Jika ditemukan, baris atau kolom yang relevan dibersihkan atau diisi ulang (imputasi). imputasi menggunakan fungsi "dropna()" untuk menghapus baris (drop) pada baris yang terdapat nilai 0. Alasan karena Kolom tersebut secara klinis tidak mungkin memiliki nilai nol (misalnya tekanan darah tidak mungkin 0)

3. Pemeriksaan dan Penghapusan Outlier (IQR Method)
   Untuk menjaga kualitas data dan menghilangkan data ekstrem yang dapat memengaruhi hasil analisis, dilakukan penghapusan outlier menggunakan metode IQR (Interquartile Range). IQR dihitung dengan mencari selisih antara kuartil ke-3 (Q3) dan kuartil ke-1 (Q1), lalu data di luar rentang [Q1 - 1.5*IQR, Q3 + 1.5*IQR] dihapus.

4. Transformasi Logaritmik (log1p)
   Untuk mengurangi efek sebaran yang sangat lebar (skewed) dan memperhalus nilai ekstrem pada fitur tertentu, dilakukan transformasi logaritmik terhadap beberapa kolom, yaitu Insulin, DiabetesPedigreeFunction, Age, Pregnancies. Fungsi np.log1p() digunakan agar nilai nol tetap dapat diproses tanpa error, karena log1p(x) = log(1 + x).

5. Scaling dengan RobustScaler
   Data kemudian dinormalisasi menggunakan RobustScaler dari sklearn, yang mentransformasi data berdasarkan median dan IQR. Teknik ini dipilih karena lebih tahan terhadap outlier dibandingkan scaler lain seperti StandardScaler atau MinMaxScaler.

6. Split Data (Train-Test Split)
   Dataset dibagi menjadi data pelatihan dan data pengujian menggunakan train_test_split dari sklearn, biasanya dengan rasio 80:20. Tujuannya adalah untuk melatih model dan menguji performanya secara adil pada data yang belum pernah dilihat.

## Modeling

Pada tahap ini, dilakukan pemodelan menggunakan algoritma Logistic Regression yang disediakan oleh library scikit-learn. Logistic Regression dipilih karena cocok untuk permasalahan klasifikasi biner, dalam hal ini untuk memprediksi apakah seseorang berpotensi mengidap diabetes (Outcome = 1) atau tidak (Outcome = 0).

1. Penjelasan Algoritma

Logistic Regression bekerja dengan cara:

-   Menghitung kombinasi linier dari fitur-fitur input, yaitu z=w0+w1x1+w2x2+⋯+wnxnz=w0​+w1​x1​+w2​x2​+⋯+wn​xn​

-   Mengaplikasikan fungsi sigmoid untuk mengubah hasil perhitungan menjadi probabilitas antara 0 dan 1:
    P(y=1∣x)=1/(1+e−z1​)

-   Klasifikasi berdasarkan threshold seperti Probabilitas ≥ 0.5 adalah kelas 1 dan Probabilitas < 0.5 adalah kelas 0. Namun dalam implementasi ini, model tidak langsung digunakan untuk klasifikasi. Sebagai gantinya, hasil probabilitas ditampilkan agar pengguna dapat melihat peluang persentase secara langsung.

2. Inisialisasi Model
   Model diinisialisasi menggunakan sintaks berikut:

"from sklearn.linear_model import LogisticRegression
model = LogisticRegression()"

Model menggunakan parameter default, dengan rincian sebagai berikut:

-   penalty='l2': Menggunakan regularisasi L2 untuk mengurangi overfitting.

-   C=1.0: Parameter pengatur kekuatan regularisasi (nilai yang lebih kecil menunjukkan regularisasi yang lebih kuat).

-   solver='lbfgs': Algoritma optimasi default yang digunakan untuk dataset berukuran kecil hingga sedang.

3. Pelatihan Model

Setelah model dibuat, model dilatih menggunakan fungsi .fit() dengan dua parameter utama:

-   X_train: Dataset input fitur, terdiri dari variabel numerik seperti Pregnancies, Glucose, BMI, Age, dll (kecuali Outcome).

-   y_train: Dataset target atau label, yaitu kolom Outcome.

Model kemudian siap digunakan untuk memprediksi probabilitas pada data uji menggunakan " model.fit(X_train, y_train) "

## Evaluation

Model dievaluasi menggunakan metrik:

-   Accuracy

-   Confusion Matrix

-   Classification Report (precision, recall, f1-score)

hasil evaluasi:

Akurasi: 0.7838983050847458
[[152   7]
 [ 44  33]]
| Class | Precision | Recall | F1-Score | Support |
|----------|-----------|--------|----------|---------|
| 0 | 0.78 | 0.96 | 0.86 | 159 |
| 1 | 0.82 | 0.43 | 0.56 | 77 |
| Accuracy | | | 0.78 | 236 |

macro avg 0.80 0.69 0.71 236
weighted avg 0.79 0.78 0.76 236

penjelasan:
Akurasi pada Model memprediksi dengan benar sekitar 78% dari seluruh data uji.

penjelasan Confusion Matrix:

-   152: Benar prediksi tidak diabetes (True Negative)

-   33: Benar prediksi diabetes (True Positive)

-   7: Salah prediksi menjadi diabetes padahal tidak (False Positive)

-   44: Salah prediksi tidak diabetes padahal sebenarnya diabetes (False Negative)

penjelasan classification report:

Kelas 0 (Tidak Diabetes):

-   Precision: 0.78 → 78% dari prediksi "tidak diabetes" benar.

-   Recall: 0.96 → Hampir semua yang benar-benar tidak diabetes berhasil dikenali.

-   F1-Score: 0.86 → Keseimbangan precision & recall cukup baik.

Kelas 1 (Diabetes):

-   Precision: 0.82 → 82% dari prediksi "diabetes" benar.

-   Recall: 0.43 → Hanya 43% kasus diabetes yang berhasil terdeteksi (rendah).

-   F1-Score: 0.56 → Kinerja untuk deteksi diabetes masih kurang optimal.

mencoba input untuk prediksi:

-   data 1: {'Pregnancies': 3, 'Glucose': 78, 'BloodPressure': 50, 'SkinThickness': 32, 'Insulin': 88, 'BMI': 31.0, 'DiabetesPedigreeFunction': 0.848, 'Age': 26},

-   data 2: {'Pregnancies': 1, 'Glucose': 165, 'BloodPressure': 69, 'SkinThickness': 8, 'Insulin': 68, 'BMI': 23.9, 'DiabetesPedigreeFunction': 0.66, 'Age': 22},

-   data 3: {'Pregnancies': 5, 'Glucose': 115, 'BloodPressure': 72, 'SkinThickness': 35, 'Insulin': 130, 'BMI': 36.2, 'DiabetesPedigreeFunction': 0.35, 'Age': 40},

-   data 4: {'Pregnancies': 0, 'Glucose': 92, 'BloodPressure': 60, 'SkinThickness': 28, 'Insulin': 0, 'BMI': 28.5, 'DiabetesPedigreeFunction': 2.2, 'Age': 19},

-   data 5: {'Pregnancies': 4, 'Glucose': 180, 'BloodPressure': 85, 'SkinThickness': 29, 'Insulin': 150, 'BMI': 34.3, 'DiabetesPedigreeFunction': 0.2, 'Age': 33},

Hasil prediksi:

-   Data ke-1 -> Probabilitas Tidak Diabetes (0): 90.72%, Diabetes (1): 9.28%

-   Data ke-2 -> Probabilitas Tidak Diabetes (0): 75.47%, Diabetes (1): 24.53%

-   Data ke-3 -> Probabilitas Tidak Diabetes (0): 56.93%, Diabetes (1): 43.07%

-   Data ke-4 -> Probabilitas Tidak Diabetes (0): 95.97%, Diabetes (1): 4.03%

-   Data ke-5 -> Probabilitas Tidak Diabetes (0): 27.45%, Diabetes (1): 72.55%

    **---Ini adalah bagian akhir laporan---**
