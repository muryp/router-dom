interface User {
  nama: string;
  username: string;
  listPost: { url: string; title: string }[];
  email: string;
}

const dummyUser: User[] = [
  {
    nama: 'Rizki Pratama',
    username: 'rizkip',
    listPost: [
      {
        url: '/blog/5-tips-menulis-artikel-seo-friendly',
        title: '5 Tips Menulis Artikel SEO Friendly',
      },
      {
        url: '/blog/cara-membuat-logo-dengan-photoshop',
        title: 'Cara Membuat Logo dengan Photoshop',
      },
      {
        url: '/blog/review-buku-the-power-of-habit',
        title: 'Review Buku The Power of Habit',
      },
    ],
    email: 'rizki.pratama@gmail.com',
  },
  {
    nama: 'Dewi Sartika',
    username: 'dewis',
    listPost: [
      {
        url: '/blog/cara-mengurus-perizinan-usaha-online',
        title: 'Cara Mengurus Perizinan Usaha Online',
      },
      {
        url: '/blog/tips-memilih-nama-domain-untuk-bisnis',
        title: 'Tips Memilih Nama Domain untuk Bisnis',
      },
      {
        url: '/blog/keuntungan-menggunakan-wordpress-untuk-website',
        title: 'Keuntungan Menggunakan WordPress untuk Website',
      },
    ],
    email: 'dewi.sartika@yahoo.com',
  },
  {
    nama: 'Andi Setiawan',
    username: 'andis',
    listPost: [
      {
        url: '/blog/belajar-react-native-dari-nol-hingga-mahir',
        title: 'Belajar React Native dari Nol hingga Mahir',
      },
      {
        url: '/blog/mengenal-firebase-sebagai-backend-as-a-service',
        title: 'Mengenal Firebase sebagai Backend as a Service',
      },
      {
        url: '/blog/tutorial-membuat-aplikasi-chat-dengan-socket-io',
        title: 'Tutorial Membuat Aplikasi Chat dengan Socket.io',
      },
    ],
    email: 'andi.setiawan@gmail.com',
  },
  {
    nama: 'Siti Nurhaliza',
    username: 'sitin',
    listPost: [
      {
        url: '/blog/resep-kue-lapis-legit-enak-dan-mudah',
        title: 'Resep Kue Lapis Legit Enak dan Mudah',
      },
      {
        url: '/blog/cara-membuat-es-krim-rumahan-tanpa-mesin',
        title: 'Cara Membuat Es Krim Rumahan Tanpa Mesin',
      },
      {
        url: '/blog/tips-menjaga-kesehatan-kulit-wajah-dari-paparan-sinar-matahari',
        title: 'Tips Menjaga Kesehatan Kulit Wajah dari Paparan Sinar Matahari',
      },
    ],
    email: 'siti.nurhaliza@outlook.com',
  },
  {
    nama: 'Budi Santoso',
    username: 'budis',
    listPost: [
      {
        url: '/blog/ulasan-film-spider-man-no-way-home-spoiler-free',
        title: 'Ulasan Film Spider-Man No Way Home (Spoiler Free)',
      },
      {
        url: '/blog/daftar-film-marvel-yang-akan-rilis-di-tahun-2022',
        title: 'Daftar Film Marvel yang Akan Rilis di Tahun 2022',
      },
      {
        url: '/blog/cara-menonton-film-di-netflix-gratis-selama-sebulan-penuh',
        title:
          'Cara Menonton Film di Netflix Gratis Selama Sebulan Penuh',
      },
    ],
    email:'budisantoso@gmail.com',
  },
  {
    nama: 'Rina Wati',
    username: 'rinaw',
    listPost: [
      {
        url: '/blog/cara-mengatur-keuangan-rumah-tangga-dengan-baik',
        title: 'Cara Mengatur Keuangan Rumah Tangga dengan Baik',
      },
      {
        url: '/blog/tips-memilih-asuransi-kesehatan-yang-tepat-untuk-keluarga',
        title: 'Tips Memilih Asuransi Kesehatan yang Tepat untuk Keluarga',
      },
      {
        url: '/blog/ide-bisnis-rumahan-yang-menguntungkan-dan-mudah-dijalankan',
        title: 'Ide Bisnis Rumahan yang Menguntungkan dan Mudah Dijalankan',
      },
    ],
    email: 'rina.wati@yahoo.com',
  },
  {
    nama: 'Adi Prasetyo',
    username: 'adip',
    listPost: [
      {
        url: '/blog/cara-bermain-gitar-untuk-pemula-dalam-30-hari',
        title: 'Cara Bermain Gitar untuk Pemula dalam 30 Hari',
      },
      {
        url: '/blog/daftar-lagu-gampang-dipelajari-untuk-pemula',
        title: 'Daftar Lagu Gampang Dipelajari untuk Pemula',
      },
      {
        url: '/blog/review-gitar-akustik-yang-bagus-dan-murah',
        title: 'Review Gitar Akustik yang Bagus dan Murah',
      },
    ],
    email: 'adi.prasetyo@outlook.com',
  },
  {
    nama: 'Lia Anggraini',
    username: 'liaa',
    listPost: [
      {
        url: '/blog/cara-membuat-hiasan-dinding-dari-kertas-origami',
        title: 'Cara Membuat Hiasan Dinding dari Kertas Origami',
      },
      {
        url: '/blog/inspirasi-desain-interior-minimalis-untuk-kamar-tidur',
        title: 'Inspirasi Desain Interior Minimalis untuk Kamar Tidur',
      },
      {
        url: '/blog/tips-menata-rumah-sempit-menjadi-luas-dan-nyaman',
        title: 'Tips Menata Rumah Sempit Menjadi Luas dan Nyaman',
      },
    ],
    email: 'lia.anggraini@gmail.com',
  },
]
