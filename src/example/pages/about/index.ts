import './style.css'
export default function AboutPages() {
  return html`
    <div class="about-container">
      <section class="about-header">
        <h1>Tentang Kami</h1>
        <p>Mengenal lebih dekat siapa kami dan apa yang kami perjuangkan.</p>
      </section>

      <section class="about-content">
        <div class="about-image">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
            alt="Tim Kami" />
        </div>
        <div class="about-text">
          <h2>Cerita Kami</h2>
          <p>
            Dimulai dari sebuah garasi kecil pada tahun 2020, MyBrand tumbuh
            dengan visi untuk mendemokrasi teknologi bagi UMKM di seluruh dunia.
          </p>
          <br />
          <p>
            Kami percaya bahwa setiap bisnis berhak mendapatkan kehadiran
            digital yang elegan, cepat, dan fungsional tanpa harus menguras
            kantong.
          </p>
        </div>
      </section>

      <section class="mission-vision">
        <div class="card">
          <h3>Visi Kami</h3>
          <p>
            Menjadi mitra transformasi digital nomor satu yang dipercaya oleh
            jutaan pengusaha di Asia.
          </p>
        </div>
        <div class="card">
          <h3>Misi Kami</h3>
          <p>
            Memberikan layanan desain dan pengembangan web berkualitas tinggi
            dengan pendekatan yang manusiawi.
          </p>
        </div>
      </section>
    </div>
  `;
}
