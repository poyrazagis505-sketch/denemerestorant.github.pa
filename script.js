/* =========================================================
   EMBER SOFRASI — MENÜ ETKİLEŞİMLERİ
   1) Kategori butonuna tıklayınca ilgili bölüme smooth scroll
   2) Sayfa kaydırılırken hangi kategoride olunduğunu takip edip
      üstteki menüde o kategoriyi otomatik aktif hale getirme
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const sections = document.querySelectorAll(".category-section");

  if (!categoryButtons.length || !sections.length) return; // menu.html değilse (ör. index.html) çık

  /* ---- 1) Butona tıklanınca ilgili bölüme kaydır ---- */
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Tıklanan butonu hemen aktif göster (kullanıcı geri bildirimi)
      setActiveButton(targetId);
    });
  });

  /* ---- 2) Kaydırma sırasında görünen bölüme göre aktif butonu güncelle ---- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveButton(entry.target.id);
        }
      });
    },
    {
      // Ekranın üst kısmına yakın bir bölge kesişimi tetiklesin
      // (sticky kategori barının yüksekliğini hesaba katar)
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  function setActiveButton(id) {
    categoryButtons.forEach((btn) => {
      const isMatch = btn.getAttribute("data-target") === id;
      btn.classList.toggle("is-active", isMatch);
    });

    // Aktif butonu mobilde yatay menü içinde görünür alana kaydır
    const activeBtn = document.querySelector(`.category-btn[data-target="${id}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }
});
