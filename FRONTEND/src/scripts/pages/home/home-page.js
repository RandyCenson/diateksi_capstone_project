import { addCheck } from '../../data/api.js'; // pastikan ini tersedia
import { showRiskResult } from './home-presenter.js';

export default class HomePage {
  async render() {
    return `
    <div class="hero-background">
    <div class="hero-container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-icon">
          <svg
            class="hero-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
            />
          </svg>
        </div>
        <h1 class="hero-title">Diabetes Risk Checker</h1>
        <p class="hero-description">
          Dapatkan prediksi risiko terhadap risiko diabetes Anda berdasarkan
          indikator kesehatan. Alat kami menggunakan kriteria medis yang telah
          terbukti untuk memberikan wawasan berharga tentang kesehatan Anda.
        </p>
      </div>
  
  
  
  <!-- Features Grid -->
  <div class="features-grid">
      <!-- Feature Card 1 -->
      <div class="feature-card">
        <svg class="feature-icon blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
        <h3>Prediksi Akurat</h3>
        <p>Hasil prediksi berdasarkan algoritma <em>Machine Learning</em></p>
      </div>
    
      <!-- Feature Card 2 -->
      <div class="feature-card">
        <svg class="feature-icon green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3>Hasil Dalam Sekejap</h3>
        <p>Dapatkan hasil prediksi anda dengan cepat</p>
      </div>
    
      <!-- Feature Card 3 -->
      <div class="feature-card">
        <svg class="feature-icon purple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3>Menyimpan <em>History</em></h3>
        <p>Buat akun untuk menyimpan penilaian Anda dan melacak perubahan</p>
      </div>
    </div>
    
  
          <!-- Main Form -->
          <div
            style="
              background-color: rgb(255, 255, 255);
              border-color: rgb(226, 232, 240);
              border-radius: 8px;
              border-width: 0.666667px;
              box-shadow:
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
              font-weight: 400;
              pointer-events: auto;
            "
          >
            <!-- Form Header -->
            <div class="health-info-section">
              <h3 class="section-title">Informasi Kesehatan</h3>
              <p class="section-description">
                Masukkan data kesehatan untuk memprediksi risiko Anda terhadap
                diabetes. Semua kolom wajib diisi untuk penilaian yang akurat.
              </p>
            </div>
            
  
            <!-- Form Content -->
            <div style="padding: 24px">
              <form id="diabetes-form">
                <div
                  style="
                    display: grid;
                    gap: 16px;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                  "
                  class="sm-grid-cols-1"
                >
                  <!-- Personal Information -->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Umur</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="Masukkan umur Anda dalam tahun"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="age"
                          max="100"
                          required
                          placeholder="30"
                          class="form-input"
                        />
                        <span class="field-unit">tahun</span>
                      </div>
                    </div>
                    
                    
  
                  <!--Fungsi Keturunan Diabetes-->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Fungsi Keturunan Diabetes</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="info-icon"
                          title="Jumlah kehamilan sebelumnya"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="diabetesPedigree"
                          min="0"
                          max="10"
                          value="0"
                          step="0.01"
                          placeholder="0"
                          class="form-input"
                        />
                        <span class="field-unit">skor</span>
                      </div>
                    </div>
                  
                    
          
                  <!-- Physical Measurements -->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Indeks Massa Tubuh (BMI)</label>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="bmi"
                          min="10"
                          max="200"
                          required
                          step="0.01"
                          placeholder="berat badan/(tinggi badan(m))²"
                          class="form-input"
                        />
                        <span class="field-unit">kg/m2</span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Jumlah Kehamilan</label>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="pregnancies"
                          min="0"
                          max="100"
                          required
                          placeholder="0"
                          class="form-input"
                        />
                        <span class="field-unit">kali</span>
                      </div>
                    </div>
                    
  
                  <!-- Medical Measurements -->
                  <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Kadar Glukosa</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="help-icon"
                          title="Glukosa darah puasa"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="glucose"
                          min="10"
                          max="300"
                          required
                          placeholder="100"
                          class="form-input"
                        />
                        <span class="field-unit">mg/dL</span>
                      </div>
                      <p class="field-help-text">Normal: 70-99 mg/dL (setelah makan)</p>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Tekanan Darah Sistolik</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="help-icon"
                          title="Tekanan darah atas/sistolik"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="bloodPressure"
                          min="40"
                          max="250"
                          required
                          placeholder="120"
                          class="form-input"
                        />
                        <span class="field-unit">mmHg</span>
                      </div>
                      <p class="field-help-text">Normal: 90-120 mmHg</p>
                    </div>
                    
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Ketebalan kulit</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="help-icon"
                          title="Ketebalan lipatan kulit di triceps"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="skinThickness"
                          min="0"
                          max="99"
                          required
                          placeholder="20"
                          class="form-input"
                        />
                        <span class="field-unit">mm</span>
                      </div>
                      <p class="field-help-text">Diukur di bagian belakang lengan atas</p>
                    </div>
                    
  
                    <div class="form-group">
                      <div class="label-wrapper">
                        <label class="input-label">Kadar Insulin</label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="help-icon"
                          title="Insulin serum 1-2 jam setelah makan"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div class="input-wrapper">
                        <input
                          type="number"
                          name="insulin"
                          min="0"
                          max="846"
                          required
                          placeholder="100"
                          class="form-input"
                        />
                        <span class="field-unit">μU/mL</span>
                      </div>
                      <p class="field-help-text">Normal: 60-90 μU/mL (setelah makan)</p>
                    </div>
                    
  
                <!-- Submit Button -->
                <div class="button-wrapper">
                  <button type="submit" class="submit-button">
                    Periksa Risiko Diabetes Saya
                  </button>
                </div>
              </form>
            </div>
          </div>
  
          <!-- Result Card (shown after assessment) -->
          <div class="result-container" style="display: none;">
              <!-- Result Header -->
              <div class="result-header">
                <h3 class="result-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="result-icon-green"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Penilaian Risiko Diabetes Anda</span>
                </h3>
              </div>
            
              <!-- Result Content -->
              <div class="result-content">

                <div class="result-summary">
                  <div class="result-percentage">25%</div>
                  <div class="result-risk-label">Risiko Rendah</div>
                </div>
            
                <!-- Important Notice -->
                <div class="important-notice">
                  <div class="notice-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="notice-icon-blue"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div class="notice-text">
                      <p>
                        <strong>Penting:</strong> Ini adalah penilaian risiko perkiraan berdasarkan data yang Anda masukkan. Silakan konsultasikan dengan profesional kesehatan untuk nasihat medis dan diagnosis yang tepat. Masuk untuk menyimpan hasil ini ke riwayat Anda.
                      </p>
                    </div>
                  </div>
                </div>
            
                <!-- Save Confirmation (if authenticated) -->
                <div class="save-confirmation">
                  <div class="confirmation-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="confirmation-icon-green"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="confirmation-text">
                      <p>
                        Penilaian ini telah disimpan ke riwayat Anda. Anda dapat melihat semua penilaian masa lalu di bagian Riwayat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div> <!--start of home page-->
    `;
  }

  async afterRender() {
    const form = document.querySelector('#diabetes-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const data = {
        Pregnancies: Number(formData.get('pregnancies')),
        Glucose: Number(formData.get('glucose')),
        BloodPressure: Number(formData.get('bloodPressure')),
        SkinThickness: Number(formData.get('skinThickness')),
        Insulin: Number(formData.get('insulin')),
        BMI: Number(formData.get('bmi')),
        DiabetesPedigreeFunction: Number(formData.get('diabetesPedigree')),
        Age: Number(formData.get('age')),
      };

      // Validasi cepat
      if (Object.values(data).some(value => isNaN(value))) {
        alert('Harap isi semua kolom dengan benar.');
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Login dahulu untuk mengecek");
          return;
        }
        const response = await addCheck(data); // Panggil API Anda
        alert(`Prediksi berhasil!!`);
        showRiskResult(response);
        // form.reset();
      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengirim dataa.');
      }
      
    });

    
  }
}