/* ===== Data kontak: email, nomor WhatsApp, dan username Instagram dapat diisi di sini ===== */
const CONTACT = { email:"maliktrader063@gmail.com", whatsapp:"081225964103", instagram:"4_d_3_k_54p4h", linkedin:"", github:"" };

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => [...p.querySelectorAll(s)];

  // 1. Navbar berubah saat digulir + menu aktif
  const header = $("header");
  const links = $$("#menu a");
  addEventListener("scroll", () => {
    header.classList.toggle("scrolled", scrollY > 30);
    const pos = scrollY + 120;
    links.forEach(a => { const s = $(a.hash); a.classList.toggle("active", s && s.offsetTop <= pos && s.offsetTop + s.offsetHeight > pos); });
  });

  // 2. Menu hamburger (mobile)
  const menu = $("#menu");
  $("#menuBtn").onclick = () => menu.classList.toggle("open");
  links.forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

  // 3. Scroll reveal dengan IntersectionObserver
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));

  // 4. Gambar proyek/bisnis: pakai foto jika file ada, jika tidak tetap placeholder
  $$(".thumb[data-img]").forEach(box => {
    const img = new Image();
    img.onload = () => { img.alt = ""; box.prepend(img); const s = $("small", box); if (s) s.remove(); };
    img.src = box.dataset.img;
  });

  // 5. Tombol Detail Proyek
  $$("[data-detail]").forEach(b => b.onclick = () => { const [t, d] = b.dataset.detail.split("|"); alert(t + "\n\n" + d); });

  // 6. Tombol kontak: aktif hanya jika alamat sudah diisi
  const makeHref = (k, v) => {
    if (k === "email") return "mailto:" + v;
    if (k === "whatsapp") {
      const digits = v.replace(/\D/g, "");
      const international = digits.startsWith("0") ? "62" + digits.slice(1) : digits;
      return "https://wa.me/" + international;
    }
    if (k === "instagram") return "https://www.instagram.com/" + v.replace(/^@/, "") + "/";
    return v;
  };
  $$("[data-contact]").forEach(a => {
    const k = a.dataset.contact, v = CONTACT[k];
    if (v) {
      a.href = makeHref(k, v);
      a.target = "_blank";
      a.rel = "noopener";
      const s = $("small", a);
      if (s) s.textContent = k === "instagram" ? "@" + v.replace(/^@/, "") : v;
    }
    else { a.addEventListener("click", e => { e.preventDefault(); alert("Kontak " + k + " belum diisi. Isi pada objek CONTACT di js/script.js."); }); }
  });

  // 7. Lightbox galeri
  const lb = $("#lb");
  $$(".gallery img").forEach(i => i.onclick = () => { $("img", lb).src = i.src; lb.classList.add("on"); });
  lb.onclick = () => lb.classList.remove("on");

  // 8. Tahun copyright otomatis
  $("#year").textContent = new Date().getFullYear();
});
