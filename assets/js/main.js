/* ==========================================================================
   Doce Uva Verde — site scripts
   --------------------------------------------------------------------------
   ÚNICO PONTO DE CONFIGURAÇÃO: troque o número abaixo pelo WhatsApp real da
   marca (formato internacional, só dígitos: 55 + DDD + número).
   ========================================================================== */

const BRAND = {
  whatsapp: "5511969677316",
  whatsappLabel: "(11) 96967-7316",
  instagram: "https://www.instagram.com/doceuvaverde/",
};

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Doce Uva Verde e gostaria de fazer uma encomenda. 🍇";

function waLink(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

function initWhatsApp() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const custom = el.getAttribute("data-wa-msg");
    el.setAttribute("href", waLink(custom || DEFAULT_MESSAGE));
  });

  document.querySelectorAll("[data-wa-label]").forEach((el) => {
    el.textContent = BRAND.whatsappLabel;
  });

  document.querySelectorAll("[data-ig]").forEach((el) => {
    el.setAttribute("href", BRAND.instagram);
  });
}

/* ------------------------------ mobile nav ------------------------------ */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) close();
  });
}

/* ---------------------------- scroll reveal ----------------------------- */

function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.revealDelay || 0);
        window.setTimeout(() => entry.target.classList.add("is-in"), delay);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => io.observe(el));

  // rede de segurança: revela tudo que ainda não apareceu
  window.setTimeout(() => {
    items.forEach((el) => {
      if (!el.classList.contains("is-in")) el.classList.add("is-in");
    });
  }, 2500);
}

/* ------------------------------ menu filters ---------------------------- */

function initFilters() {
  const filters = document.querySelectorAll(".filter[data-filter]");
  const items = document.querySelectorAll("[data-category]");
  if (!filters.length || !items.length) return;

  const apply = (btn) => {
    const value = btn.dataset.filter;

    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

    items.forEach((item) => {
      const match = value === "todos" || item.dataset.category === value;
      item.hidden = !match;
      item.classList.add("is-in");
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      apply(btn);
      history.replaceState(null, "", `#${btn.dataset.filter}`);
    });
  });

  // deep links such as cardapio.html#tradicional
  const hash = window.location.hash.replace("#", "");
  const initial = hash && document.querySelector(`.filter[data-filter="${hash}"]`);
  if (initial) apply(initial);
}

/* ------------------------------- accordion ------------------------------ */

function initAccordion() {
  const buttons = document.querySelectorAll(".faq__q");

  buttons.forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      buttons.forEach((other) => {
        if (other === btn) return;
        other.setAttribute("aria-expanded", "false");
        const otherPanel = document.getElementById(
          other.getAttribute("aria-controls")
        );
        if (otherPanel) otherPanel.style.height = "0px";
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.height = isOpen ? "0px" : `${panel.firstElementChild.offsetHeight}px`;
    });
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll('.faq__q[aria-expanded="true"]').forEach((btn) => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (panel) panel.style.height = `${panel.firstElementChild.offsetHeight}px`;
    });
  });
}

/* -------------------------------- form ---------------------------------- */

function initOrderForm() {
  const form = document.querySelector("[data-order-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const get = (key) => (data.get(key) || "").toString().trim();

    const lines = [
      "Olá! Vim pelo site da Doce Uva Verde e gostaria de fazer uma encomenda. 🍇",
      "",
      `Nome: ${get("nome")}`,
      `WhatsApp: ${get("telefone")}`,
      `Ocasião: ${get("ocasiao") || "não informada"}`,
      `Data desejada: ${get("data") || "a combinar"}`,
      `Pessoas: ${get("pessoas") || "a combinar"}`,
      get("mensagem") ? `Detalhes: ${get("mensagem")}` : "",
    ].filter(Boolean);

    window.open(waLink(lines.join("\n")), "_blank", "noopener");

    const msg = form.querySelector(".form__msg");
    if (msg) {
      msg.textContent =
        "Tudo pronto! Abrimos o WhatsApp com o resumo do seu pedido — só enviar a mensagem. 🍇";
      msg.classList.add("is-visible");
    }
  });
}

/* --------------------------------- misc --------------------------------- */

function initMisc() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // encomendas precisam de 3 dias de antecedência
  const dateField = document.querySelector('input[name="data"]');
  if (dateField) {
    const min = new Date();
    min.setDate(min.getDate() + 3);
    dateField.min = min.toISOString().slice(0, 10);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsApp();
  initNav();
  initReveal();
  initFilters();
  initAccordion();
  initOrderForm();
  initMisc();
});
