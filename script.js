/**
 * SAZ SUISSE Gem & JEWELLERY — Production Client Engine
 * Features:
 * - Direct WhatsApp Product Price Inquiries (No shopping cart or public price tags)
 * - Exclusive LKR Sri Lankan Currency Context
 * - Dual Luxury Themes (Obsidian Gold / Champagne Ivory)
 * - Interactive Ring Size Finder & Universal Size Chart
 * - Custom Design Specification Builder with WhatsApp Dispatch
 * - Real-time WhatsApp Order Engine with Live Message Preview
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // Configuration & Business Details
  // --------------------------------------------------------------------------
  const BUSINESS = {
    name: "SAZ SUISSE Gem & JEWELLERY",
    phone: "94779108808",
    displayPhone: "0779108808",
    email: "info@sazsuisse.lk",
    address: "141/1 Pasyala Road, Mirigama, Sri Lanka"
  };

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById("siteHeader");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const siteNav = document.getElementById("siteNav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav .nav-link"));
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const catalogSearchInput = document.getElementById("catalogSearchInput");
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  const productCards = Array.from(document.querySelectorAll(".product-card"));

  // Guide Elements
  const ringSizeSlider = document.getElementById("ringSizeSlider");
  const diameterReadout = document.getElementById("diameterReadout");
  const usSizeReadout = document.getElementById("usSizeReadout");
  const outUS = document.getElementById("outUS");
  const outUK = document.getElementById("outUK");
  const outEU = document.getElementById("outEU");
  const visualRingCircle = document.getElementById("visualRingCircle");
  const circleMmText = document.getElementById("circleMmText");
  const btnApplyRingSize = document.getElementById("btnApplyRingSize");
  const ringSizeField = document.getElementById("ringSizeField");

  const estMetal = document.getElementById("estMetal");
  const estGem = document.getElementById("estGem");
  const estCarat = document.getElementById("estCarat");
  const caratVal = document.getElementById("caratVal");
  const btnSendEstToWhatsApp = document.getElementById("btnSendEstToWhatsApp");

  // Order Form Elements
  const orderForm = document.getElementById("orderForm");
  const customerName = document.getElementById("customerName");
  const contactNumber = document.getElementById("contactNumber");
  const emailAddress = document.getElementById("emailAddress");
  const orderType = document.getElementById("orderType");
  const budget = document.getElementById("budget");
  const details = document.getElementById("details");
  const waPreviewText = document.getElementById("waPreviewText");
  const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");
  const sendEmailBtn = document.getElementById("sendEmailBtn");
  const btnBookConsultation = document.getElementById("btnBookConsultation");

  // --------------------------------------------------------------------------
  // Header Sticky & Navigation
  // --------------------------------------------------------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }, { passive: true });

  if (menuToggleBtn && siteNav) {
    menuToggleBtn.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active Nav Link Observer
  const sections = Array.from(document.querySelectorAll("section[id]"));
  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { threshold: [0.25, 0.5], rootMargin: "-10% 0px -40% 0px" });

    sections.forEach(sec => navObserver.observe(sec));
  }

  // Reveal On Scroll Animation
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  // --------------------------------------------------------------------------
  // Theme Toggle: Obsidian Dark vs Champagne Ivory
  // --------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get("theme");
  const savedTheme = urlTheme || localStorage.getItem("saz_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const nextTheme = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("saz_theme", nextTheme);
    });
  }

  // --------------------------------------------------------------------------
  // Catalog Filtering & Search
  // --------------------------------------------------------------------------
  function filterCatalog() {
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeBtn ? activeBtn.getAttribute("data-category") : "all";
    const searchQuery = (catalogSearchInput?.value || "").toLowerCase().trim();

    productCards.forEach(card => {
      const cardCat = card.getAttribute("data-category") || "";
      const cardText = card.textContent.toLowerCase();

      const matchesCat = activeCategory === "all" || cardCat === activeCategory;
      const matchesSearch = !searchQuery || cardText.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterCatalog();
    });
  });

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener("input", filterCatalog);
  }

  // Category Cards in Showcase Click
  document.querySelectorAll(".category-card[data-filter]").forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCat = card.getAttribute("data-filter");
      const matchedFilterBtn = filterBtns.find(b => b.getAttribute("data-category") === targetCat);
      if (matchedFilterBtn) {
        filterBtns.forEach(b => b.classList.remove("active"));
        matchedFilterBtn.classList.add("active");
        filterCatalog();
      }
      const prodSec = document.getElementById("products");
      if (prodSec) {
        prodSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --------------------------------------------------------------------------
  // Direct WhatsApp Price Inquiry (No Cart)
  // --------------------------------------------------------------------------
  document.querySelectorAll(".btn-inquire-product").forEach(btn => {
    btn.addEventListener("click", () => {
      const prodName = btn.getAttribute("data-name") || "Jewellery Piece";
      const sku = btn.getAttribute("data-sku") || "";
      const message = [
        `Price & Availability Inquiry — ${BUSINESS.name}`,
        "----------------------------------------------",
        `Piece: ${prodName}`,
        `Atelier Reference: ${sku}`,
        "",
        "Hello, I am interested in this creation. Please share the price quotation and customization options."
      ].join("\n");

      const url = `https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  });

  // --------------------------------------------------------------------------
  // Interactive Ring Size Guide & Calculator
  // --------------------------------------------------------------------------
  const RING_SIZE_DATA = [
    { diameter: 14.1, us: 3.0, uk: "F", eu: 44 },
    { diameter: 14.5, us: 3.5, uk: "G", eu: 45 },
    { diameter: 14.9, us: 4.0, uk: "H", eu: 47 },
    { diameter: 15.3, us: 4.5, uk: "I", eu: 48 },
    { diameter: 15.7, us: 5.0, uk: "J 1/2", eu: 49 },
    { diameter: 16.1, us: 5.5, uk: "K 1/2", eu: 51 },
    { diameter: 16.5, us: 6.0, uk: "L 1/2", eu: 52 },
    { diameter: 16.9, us: 6.5, uk: "M 1/2", eu: 53 },
    { diameter: 17.3, us: 7.0, uk: "N 1/2", eu: 55 },
    { diameter: 17.7, us: 7.5, uk: "O 1/2", eu: 56 },
    { diameter: 18.1, us: 8.0, uk: "P 1/2", eu: 57 },
    { diameter: 18.5, us: 8.5, uk: "Q 1/2", eu: 58 },
    { diameter: 19.0, us: 9.0, uk: "R 1/2", eu: 60 },
    { diameter: 19.4, us: 9.5, uk: "S 1/2", eu: 61 },
    { diameter: 19.8, us: 10.0, uk: "T 1/2", eu: 62 },
    { diameter: 20.2, us: 10.5, uk: "U 1/2", eu: 64 },
    { diameter: 20.6, us: 11.0, uk: "V 1/2", eu: 65 },
    { diameter: 21.0, us: 11.5, uk: "W 1/2", eu: 66 },
    { diameter: 21.4, us: 12.0, uk: "X 1/2", eu: 67 },
    { diameter: 21.8, us: 12.5, uk: "Y 1/2", eu: 69 },
    { diameter: 22.2, us: 13.0, uk: "Z 1/2", eu: 70 }
  ];

  function getClosestRingSize(val) {
    let closest = RING_SIZE_DATA[0];
    let minDiff = Math.abs(val - closest.diameter);
    for (let i = 1; i < RING_SIZE_DATA.length; i++) {
      const diff = Math.abs(val - RING_SIZE_DATA[i].diameter);
      if (diff < minDiff) {
        minDiff = diff;
        closest = RING_SIZE_DATA[i];
      }
    }
    return closest;
  }

  function updateRingSizeDisplay() {
    if (!ringSizeSlider) return;
    const mm = parseFloat(ringSizeSlider.value);
    const size = getClosestRingSize(mm);

    if (diameterReadout) diameterReadout.textContent = `${mm.toFixed(1)} mm`;
    if (usSizeReadout) usSizeReadout.textContent = size.us.toFixed(1);
    if (outUS) outUS.textContent = size.us.toFixed(1);
    if (outUK) outUK.textContent = size.uk;
    if (outEU) outEU.textContent = size.eu;
    if (circleMmText) circleMmText.textContent = `${mm.toFixed(1)}mm`;

    if (visualRingCircle) {
      const scale = 50 + (mm - 14) * 4.5;
      visualRingCircle.style.width = `${scale}px`;
      visualRingCircle.style.height = `${scale}px`;
    }
  }

  if (ringSizeSlider) {
    ringSizeSlider.addEventListener("input", updateRingSizeDisplay);
    updateRingSizeDisplay();
  }

  if (btnApplyRingSize && ringSizeField) {
    btnApplyRingSize.addEventListener("click", () => {
      const mm = parseFloat(ringSizeSlider.value);
      const size = getClosestRingSize(mm);
      ringSizeField.value = `US ${size.us} (UK ${size.uk} / EU ${size.eu}, ${mm.toFixed(1)}mm)`;

      const ordersSection = document.getElementById("orders");
      if (ordersSection) {
        ordersSection.scrollIntoView({ behavior: "smooth" });
      }
      updateOrderPreview();
    });
  }

  // --------------------------------------------------------------------------
  // Custom Design Specification Builder
  // --------------------------------------------------------------------------
  function updateCustomSpecification() {
    if (!estCarat || !caratVal) return;
    const carat = parseFloat(estCarat.value);
    caratVal.textContent = carat.toFixed(2);
  }

  if (estCarat) {
    estCarat.addEventListener("input", updateCustomSpecification);
  }

  if (btnSendEstToWhatsApp) {
    btnSendEstToWhatsApp.addEventListener("click", () => {
      const metalName = estMetal ? estMetal.options[estMetal.selectedIndex].text : "22K Solid Gold";
      const gemName = estGem ? estGem.options[estGem.selectedIndex].text : "Ceylon Royal Blue Sapphire";
      const carat = estCarat ? parseFloat(estCarat.value).toFixed(2) : "1.50";

      const message = [
        `Custom Design Quotation Request — ${BUSINESS.name}`,
        "--------------------------------------------------",
        `Selected Metal: ${metalName}`,
        `Center Gemstone: ${gemName}`,
        `Carat Weight: ${carat} ct`,
        "",
        "Hello, I would like to consult on having this custom piece handcrafted and receive a price quotation."
      ].join("\n");

      window.open(`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(message)}`, "_blank");
    });
  }

  // --------------------------------------------------------------------------
  // Order Studio: Real-Time WhatsApp Message Preview
  // --------------------------------------------------------------------------
  function buildOrderMessage() {
    const name = (customerName?.value || "").trim() || "[Customer Name]";
    const phone = (contactNumber?.value || "").trim() || "[Phone Number]";
    const email = (emailAddress?.value || "").trim() || "Not specified";
    const type = (orderType?.value || "").trim() || "Custom Consultation";
    const bgt = (budget?.value || "").trim() || "Flexible / Not specified";
    const rSize = (ringSizeField?.value || "").trim() || "N/A";
    const det = (details?.value || "").trim() || "[Custom design details]";

    return [
      `New Order Request — ${BUSINESS.name}`,
      "==================================",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Order Scope: ${type}`,
      `Target Budget (LKR): ${bgt}`,
      `Ring Size: ${rSize}`,
      "",
      "Design & Stone Details:",
      det,
      "",
      `Atelier: ${BUSINESS.address}`
    ].join("\n");
  }

  function updateOrderPreview() {
    if (!waPreviewText) return;
    waPreviewText.textContent = buildOrderMessage();
  }

  [customerName, contactNumber, emailAddress, orderType, budget, ringSizeField, details].forEach(field => {
    if (field) {
      field.addEventListener("input", updateOrderPreview);
      field.addEventListener("change", updateOrderPreview);
    }
  });

  function validateOrderForm(channel = "whatsapp") {
    if (!orderForm) return false;

    const reqFields = [customerName, contactNumber, orderType, details].filter(Boolean);
    reqFields.forEach(f => f.setCustomValidity(""));
    if (emailAddress) emailAddress.setCustomValidity("");

    for (const f of reqFields) {
      if (!f.value.trim()) {
        f.setCustomValidity("Please complete this required specification field.");
        f.reportValidity();
        f.focus();
        return false;
      }
    }

    if (channel === "email" && emailAddress && !emailAddress.value.trim()) {
      emailAddress.setCustomValidity("Valid email address is required for official email submission.");
      emailAddress.reportValidity();
      emailAddress.focus();
      return false;
    }

    if (emailAddress && emailAddress.value.trim() && !emailAddress.checkValidity()) {
      emailAddress.reportValidity();
      emailAddress.focus();
      return false;
    }

    return true;
  }

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => {
      if (!validateOrderForm("whatsapp")) return;
      const message = buildOrderMessage();
      window.open(`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(message)}`, "_blank");
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", () => {
      if (!validateOrderForm("email")) return;
      const subject = encodeURIComponent(`Bespoke Jewellery Commission — ${customerName.value.trim()}`);
      const body = encodeURIComponent(buildOrderMessage());
      window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    });
  }

  if (btnBookConsultation) {
    btnBookConsultation.addEventListener("click", () => {
      if (orderType) {
        orderType.value = "Bridal Necklace & Suite";
      }
      updateOrderPreview();
    });
  }

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  updateOrderPreview();
  updateCustomSpecification();
});
