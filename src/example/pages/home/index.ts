import { addScript } from '../../../package/module/addScript';
import { $id } from '../../../package/module/id';
import './style.css';

export default function HomePage() {
  const idBtn = $id();
  addScript(() => {
    const BtnEl = document.getElementById(idBtn);
    BtnEl!.onclick = () => alert('hello');
  });
  return html`
    <section class="hero">
      <h1>Selamat Datang di Website Kami</h1>
      <p>Solusi digital terbaik untuk masa depan bisnis Anda.</p>
      <button id="${idBtn}" class="btn">ujicoba btn di pages</button>
    </section>

    <section class="features">
      <div class="feature-box">
        <h3>Cepat</h3>
        <p>Performa website yang optimal dan ringan saat diakses.</p>
      </div>
      <div class="feature-box">
        <h3>Aman</h3>
        <p>Keamanan data adalah prioritas utama kami.</p>
      </div>
      <div class="feature-box">
        <h3>Responsif</h3>
        <p>Tampilan tetap cantik di HP, Tablet, maupun Laptop.</p>
      </div>
    </section>
  `;
}
