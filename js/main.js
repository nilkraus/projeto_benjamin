const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

const popupModal = document.querySelector("#pix-modal");
const popupTitle = document.querySelector("#pix-title");
const popupImage = document.querySelector("#pix-modal-image");
const defaultPopup = {
  src: "assets/images/pop-up-pix.png",
  title: "Sua doação transforma vidas"
};

function openPopup(src = defaultPopup.src, title = defaultPopup.title) {
  popupTitle.textContent = title;
  popupImage.src = src;
  popupImage.alt = title;
  popupModal.classList.add("open");
  popupModal.setAttribute("aria-hidden", "false");
}

function closePopup() {
  popupModal.classList.remove("open");
  popupModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".js-open-pix").forEach((button) => {
  button.addEventListener("click", () => openPopup());
});

document.querySelectorAll("[data-close-pix]").forEach((button) => {
  button.addEventListener("click", closePopup);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup();
    closeMediaModal();
  }
});

window.addEventListener("load", () => {
  setTimeout(() => openPopup(), 450);
});

document.querySelectorAll(".help-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".help-option").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (button.dataset.popup) {
      openPopup(button.dataset.popup, button.dataset.popupTitle || button.textContent.trim());
      return;
    }

    showToast(button.dataset.help);
  });
});

const galleryItems = [
  { type: "image", src: "assets/images/galeria-aula.png", alt: "Crianças em atividade escolar" },
  { type: "image", src: "assets/images/galeria-grupo.png", alt: "Grupo de crianças do projeto" },
  { type: "image", src: "assets/images/galeria-roda.png", alt: "Crianças em roda de conversa" },
  { type: "video", src: "assets/video/Vídeo_Gerado_Pronto_Para_Visualizar.mp4", alt: "Vídeo de momentos do projeto" },
  { type: "image", src: "assets/images/galeria-livros.png", alt: "Crianças com livros e materiais" },
  { type: "image", src: "assets/images/galeria-inclusiva.png", alt: "Atividade inclusiva do projeto" },
  { type: "image", src: "assets/images/galeria-aula.png", alt: "Momento de aula no projeto" },
  { type: "image", src: "assets/images/galeria-grupo.png", alt: "Crianças reunidas" },
  { type: "image", src: "assets/images/galeria-roda.png", alt: "Atividade em grupo" },
  { type: "image", src: "assets/images/galeria-livros.png", alt: "Crianças apresentando materiais" },
  { type: "image", src: "assets/images/galeria-inclusiva.png", alt: "Participação das crianças" },
  { type: "image", src: "assets/images/galeria-aula.png", alt: "Reforço escolar" },
  { type: "image", src: "assets/images/galeria-grupo.png", alt: "Turma do projeto" },
  { type: "image", src: "assets/images/galeria-roda.png", alt: "Roda de conversa" },
  { type: "image", src: "assets/images/galeria-livros.png", alt: "Livros e atividades" },
  { type: "image", src: "assets/images/galeria-inclusiva.png", alt: "Cuidado e inclusão" }
];

const galleryRow = document.querySelector("[data-gallery-row]");
const dots = [...document.querySelectorAll(".dot")];
let galleryPage = 0;
let galleryTimer;

function renderGallery(page) {
  const start = page * 4;
  const visibleItems = galleryItems.slice(start, start + 4);

  galleryRow.innerHTML = visibleItems.map((item, index) => {
    const absoluteIndex = start + index;
    if (item.type === "video") {
      return `<article class="photo-card" data-media-index="${absoluteIndex}"><video src="${item.src}" muted playsinline loop autoplay preload="metadata" aria-label="${item.alt}"></video></article>`;
    }

    return `<article class="photo-card" data-media-index="${absoluteIndex}"><img src="${item.src}" alt="${item.alt}"></article>`;
  }).join("");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === page);
  });
}

function goToGalleryPage(page) {
  galleryPage = page;
  renderGallery(galleryPage);
}

function startGalleryAutoPlay() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => {
    goToGalleryPage((galleryPage + 1) % 4);
  }, 4200);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToGalleryPage(index);
    startGalleryAutoPlay();
  });
});

const mediaModal = document.querySelector("#media-modal");
const mediaContent = document.querySelector(".media-modal__content");

function openMediaModal(item) {
  clearInterval(galleryTimer);

  if (item.type === "video") {
    mediaContent.innerHTML = `<video src="${item.src}" controls autoplay playsinline aria-label="${item.alt}"></video>`;
  } else {
    mediaContent.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
  }

  mediaModal.classList.add("open");
  mediaModal.setAttribute("aria-hidden", "false");
}

function closeMediaModal() {
  if (!mediaModal) return;
  mediaModal.classList.remove("open");
  mediaModal.setAttribute("aria-hidden", "true");
  mediaContent.innerHTML = "";
  startGalleryAutoPlay();
}

galleryRow.addEventListener("click", (event) => {
  const card = event.target.closest(".photo-card");
  if (!card) return;

  const item = galleryItems[Number(card.dataset.mediaIndex)];
  if (item) openMediaModal(item);
});

document.querySelectorAll("[data-close-media]").forEach((button) => {
  button.addEventListener("click", closeMediaModal);
});

renderGallery(galleryPage);
startGalleryAutoPlay();

document.querySelector(".js-share-page").addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "Conheça o Projeto Social Benjamin Monteiro da Silva.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link da página copiado.");
  } catch {
    showToast("Compartilhe copiando o endereço da página.");
  }
});

const form = document.querySelector(".contact-form");
const note = document.querySelector(".form-note");
const projectEmail = "contato@projetobenjamim.org.br";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    note.textContent = "Preencha nome, e-mail e mensagem para continuar.";
    note.style.color = "#c0392b";
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent("Contato pelo site - Projeto Social Benjamin");
  const body = encodeURIComponent(
    `Nome: ${data.get("nome")}\n` +
    `E-mail: ${data.get("email")}\n` +
    `Telefone / WhatsApp: ${data.get("telefone") || "Não informado"}\n\n` +
    `Mensagem:\n${data.get("mensagem")}\n\n` +
    "Responsável: Pastor Linaldo Guerra - Igreja Batista de Pilar"
  );

  window.location.href = `mailto:${projectEmail}?subject=${subject}&body=${body}`;
  note.textContent = "Seu aplicativo de e-mail foi aberto com a mensagem preenchida.";
  note.style.color = "var(--green-2)";
});

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href")));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach((section) => observer.observe(section));
