const menuBtn = document.querySelector(".menu-btn");
const siteNav = document.querySelector(".site-nav");
const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

if (sectionLinks.length) {
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = (id) => {
    sectionLinks.forEach((link) => {
      const match = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", match);
    });
  };

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      setActiveLink(id);
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveLink(visible.target.id);
        }
      },
      { threshold: [0.2, 0.4, 0.65], rootMargin: "-20% 0px -55% 0px" }
    );

    sections.forEach((section) => navObserver.observe(section));
  }
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const form = document.getElementById("orderForm");
const emailButton = document.getElementById("sendEmailBtn");
const whatsappButton = document.getElementById("sendWhatsappBtn");
const businessName = "SAZ SUISSE Gem & JEWELLERY";
const businessEmail = "info@sazsuisse.lk";

function getOrderMessage() {
  if (!form) {
    return "";
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const name = (data.customerName || "").trim();
  const phone = (data.contactNumber || "").trim();
  const email = (data.emailAddress || "").trim();
  const type = (data.orderType || "").trim();
  const budget = (data.budget || "").trim() || "Not specified";
  const details = (data.details || "").trim();

  return [
    `New Order Request - ${businessName}`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Order Type: ${type}`,
    `Budget: ${budget}`,
    "",
    "Details:",
    details
  ].join("\n");
}

function validateForm(channel) {
  if (!form) {
    return false;
  }

  const nameInput = document.getElementById("customerName");
  const phoneInput = document.getElementById("contactNumber");
  const emailInput = document.getElementById("emailAddress");
  const typeInput = document.getElementById("orderType");
  const detailsInput = document.getElementById("details");

  const requiredFields = [nameInput, phoneInput, typeInput, detailsInput].filter(Boolean);

  requiredFields.forEach((field) => field.setCustomValidity(""));
  if (emailInput) {
    emailInput.setCustomValidity("");
  }

  for (const field of requiredFields) {
    if (!field.value.trim()) {
      field.setCustomValidity("Please fill out this field.");
      field.reportValidity();
      return false;
    }
  }

  if (channel === "email" && emailInput && !emailInput.value.trim()) {
    emailInput.setCustomValidity("Email is required to send this request by email.");
    emailInput.reportValidity();
    return false;
  }

  if (emailInput && emailInput.value.trim() && !emailInput.checkValidity()) {
    emailInput.reportValidity();
    return false;
  }

  return true;
}

if (emailButton) {
  emailButton.addEventListener("click", () => {
    if (!validateForm("email")) {
      return;
    }

    const subject = encodeURIComponent(`Order Request - ${businessName}`);
    const body = encodeURIComponent(getOrderMessage());
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
  });
}

if (whatsappButton) {
  whatsappButton.addEventListener("click", () => {
    if (!validateForm("whatsapp")) {
      return;
    }

    const text = encodeURIComponent(getOrderMessage());
    window.open(`https://wa.me/94779108808?text=${text}`, "_blank");
  });
}
