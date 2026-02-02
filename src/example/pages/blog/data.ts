export interface Blog {
    id: number;
    title: string;
    excerpt: string;  // Untuk tampilan ringkasan di List
    content: string;  // Untuk tampilan lengkap di Detail
    date: string;
    category: string;
    author: string;
}

// 2. Data List yang sudah diperbaiki agar sesuai dengan Detail
export const blogData: Blog[] = [
    {
        id: 1,
        title: "Panduan Belajar CSS Grid",
        excerpt: "Pelajari cara membuat layout kompleks dengan mudah menggunakan CSS Grid...",
        content: "CSS Grid adalah sistem tata letak dua dimensi yang kuat untuk web. Dengan Grid, Anda dapat menyelaraskan konten ke dalam kolom dan baris dengan cara yang jauh lebih mudah daripada metode sebelumnya. Ini memungkinkan desain yang lebih fleksibel dan responsif.",
        date: "10 Jan 2026",
        category: "Tutorial",
        author: "Admin"
    },
    {
        id: 2,
        title: "Tips Produktivitas Developer",
        excerpt: "Rahasia tetap fokus dan efisien saat coding di tengah gangguan...",
        content: "Produktivitas bukan tentang bekerja lebih lama, tapi bekerja lebih cerdas. Gunakan teknik Pomodoro, kurangi gangguan notifikasi, dan pastikan Anda memiliki lingkungan kerja yang ergonomis untuk menjaga fokus dalam jangka panjang.",
        date: "15 Jan 2026",
        category: "Productivity",
        author: "Budi"
    },
    {
        id: 3,
        title: "Apa yang baru di TypeScript 5.0?",
        excerpt: "Eksplorasi fitur terbaru yang membuat coding makin aman dan cepat...",
        content: "TypeScript 5.0 membawa banyak perubahan besar termasuk optimasi kecepatan kompilasi, dekorator baru, dan peningkatan pada konstanta tipe. Ini membuat pengalaman pengembangan aplikasi skala besar menjadi jauh lebih ringan.",
        date: "01 Feb 2026",
        category: "Tech",
        author: "Santi"
    }
];

