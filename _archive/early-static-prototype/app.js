const designOptions = {
  detaillab: { label: "แนวคิด 08 · DETAIL LAB", title: "DETAIL LAB · ใกล้ขึ้นอีกนิด" },
  sidebyside: { label: "แนวคิด 09 · SIDE BY SIDE", title: "SIDE BY SIDE · คู่ไหนที่เป็นคุณ" },
  lineup: { label: "แนวคิด 10 · THE LINEUP", title: "THE LINEUP · เลือกจังหวะของคุณ" },
  gallery: { label: "PRODUCT GALLERY · GAMBOL", title: "แค่เดิน ก็เด่นแล้ว" },
  studio: { label: "แนวคิด 04 · PRODUCT STUDIO", title: "PRODUCT STUDIO · คู่โปรดในระยะใกล้" },
  playground: { label: "แนวคิด 05 · PLAYGROUND", title: "PLAYGROUND · สนุกได้ทุกคู่" },
  dayfinder: { label: "แนวคิด 06 · DAY FINDER", title: "DAY FINDER · วันนี้จะไปไหน" },
  redline: { label: "แนวคิด 01 · REDLINE", title: "REDLINE · แดงให้สุด" },
  colorclub: { label: "แนวคิด 02 · COLOR CLUB", title: "COLOR CLUB · สีที่มีจังหวะ" },
  nightshift: { label: "แนวคิด 03 · NIGHT SHIFT", title: "NIGHT SHIFT · สนามของทุกวัน" }
};
const requestedDesign = new URLSearchParams(window.location.search).get("design") || document.body.dataset.design;
const activeDesign = designOptions[requestedDesign] ? requestedDesign : "redline";
document.body.dataset.design = activeDesign;
document.title = "GAMBOL | " + designOptions[activeDesign].title;
const conceptLabel = document.querySelector("[data-concept-label]");
if (conceptLabel) conceptLabel.textContent = designOptions[activeDesign].label;

const products = [
  {
    id: "iconic",
    name: "ICONIC",
    code: "GM/GW11267",
    category: "flip",
    categoryLabel: "รองเท้าแตะหนีบ",
    tag: "รุ่นซิกเนเจอร์",
    price: 465,
    minSize: 36,
    maxSize: 46,
    image: "assets/product-iconic-clean.jpg",
    alt: "รองเท้าแตะหนีบ Gambol รุ่น ICONIC สีม่วง",
    description: "รองเท้าแตะหนีบทรงเรียบ ใส่ง่าย และเป็นหนึ่งในรุ่นซิกเนเจอร์ของ Gambol",
    feature: "พื้น EVA และ G-BOLD Technology™ ช่วยให้รองเท้านุ่ม เบา และทนทานต่อการใช้งาน",
    storeUrl: "https://shop.gambol.co.th/product/ICONIC/24052218857"
  },
  {
    id: "bold",
    name: "BOLD",
    code: "GM/GW43121",
    category: "slide",
    categoryLabel: "รองเท้าแตะสวม",
    tag: "สายคาดปรับได้",
    price: 405,
    minSize: 36,
    maxSize: 44,
    image: "assets/product-bold.jpg",
    alt: "รองเท้าแตะสวม Gambol รุ่น BOLD สายคาดคู่",
    description: "รองเท้าแตะสวมสายคาดคู่ มีแถบตีนตุ๊กแกสำหรับปรับให้กระชับกับหน้าเท้า",
    feature: "ใช้วัสดุ Phylon ที่มีน้ำหนักเบา และออกแบบด้วย G-BOLD Technology™",
    storeUrl: "https://shop.gambol.co.th/product/bold/24052218528"
  },
  {
    id: "tofu",
    name: "TOFU",
    code: "GW41141",
    category: "flip",
    categoryLabel: "รองเท้าแตะหนีบ",
    tag: "เบา ทำความสะอาดง่าย",
    price: 235,
    minSize: 36,
    maxSize: 39,
    image: "assets/product-tofu-clean.jpg",
    alt: "รองเท้าแตะหนีบ Gambol รุ่น TOFU สีดำ",
    description: "รองเท้าแตะหนีบทรงเรียบ ใส่สบาย และดูแลทำความสะอาดได้ง่าย",
    feature: "ผลิตด้วย GBOLD Technology™ เน้นความเบาและนุ่มสบาย",
    storeUrl: "https://shop.gambol.co.th/product/tofu/24052220552"
  },
  {
    id: "twist",
    name: "TWIST",
    code: "GM/GW11276",
    category: "flip",
    categoryLabel: "รองเท้าแตะหนีบ",
    tag: "สีสันใส่ง่าย",
    storeAvailability: "sold-out",
    price: 445,
    minSize: 36,
    maxSize: 44,
    image: "assets/product-twist-clean.jpg",
    alt: "รองเท้าแตะหนีบ Gambol รุ่น TWIST",
    description: "รองเท้าแตะหนีบดีไซน์คลาสสิก มีสีให้เลือกสำหรับวันสบาย ๆ",
    feature: "วัสดุ EVA ให้สัมผัสนุ่ม เบา และรองรับการใช้งานในชีวิตประจำวัน",
    storeUrl: "https://shop.gambol.co.th/product/twist/24052223219"
  },
  {
    id: "cozy",
    name: "ICONIC COZY",
    code: "GM11465",
    category: "flip",
    categoryLabel: "รองเท้าแตะหนีบ",
    tag: "สายสัมผัสนุ่ม",
    price: 499,
    minSize: 40,
    maxSize: 44,
    image: "assets/product-cozy-clean.jpg",
    alt: "รองเท้าแตะหนีบ Gambol รุ่น ICONIC COZY สีเขียว",
    description: "รุ่น ICONIC ในดีเทลสายหนังนิ่ม ให้ลุคสบายที่ต่างจากคู่พื้นฐาน",
    feature: "G-BOLD Technology™ และพื้นยางพาราที่ช่วยเพิ่มความทนทานและการยึดเกาะ",
    storeUrl: "https://shop.gambol.co.th/product/iconic-cozy/26051825161"
  },
  {
    id: "slip-on",
    name: "SLIP-ON",
    code: "GB82087 / GB82087A",
    category: "sneaker",
    categoryLabel: "รองเท้าผ้าใบ",
    tag: "สวมง่าย",
    storeAvailability: "sold-out",
    price: 595,
    minSize: 40,
    maxSize: 46,
    image: "assets/product-slip-on-clean.jpg",
    alt: "รองเท้าผ้าใบ Gambol รุ่น SLIP-ON สีเขียวเข้ม",
    description: "รองเท้าผ้าใบแบบสวม ทำจากผ้าหนังนิ่ม Ultrasuede ใส่เข้ากับลุคประจำวันได้ง่าย",
    feature: "พื้นด้านใน EVA พร้อม G-BOLD Technology™ และพื้นยางพาราด้านล่าง",
    storeUrl: "https://shop.gambol.co.th/product/slip-on/24052220672"
  }
];

const productGrid = document.querySelector("#product-grid");
const resultsLine = document.querySelector("#results-line");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#product-search");
const sortSelect = document.querySelector("#product-sort");
const productDialog = document.querySelector("#product-dialog");
const cartDialog = document.querySelector("#cart-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogPrice = document.querySelector("#dialog-price");
const dialogDescription = document.querySelector("#dialog-description");
const dialogFeature = document.querySelector("#dialog-feature");
const dialogNote = document.querySelector("#dialog-note");
const dialogSize = document.querySelector("#dialog-size");
const addToBagButton = document.querySelector("#add-to-bag");
const officialProductLink = document.querySelector("#official-product-link");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const cartTotal = document.querySelector("#cart-total");
const toast = document.querySelector("#toast");
const nav = document.querySelector("#main-nav");
const menuToggle = document.querySelector(".menu-toggle");

let activeCategory = "all";
let searchTerm = "";
let sortOrder = "recommended";
let selectedProduct = null;
let toastTimer = 0;

function formatPrice(price) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(price);
}

function loadBag() {
  try {
    const saved = JSON.parse(localStorage.getItem("gambol-demo-bag") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) => products.some((product) => product.id === item.id) && item.size);
  } catch {
    return [];
  }
}

let bag = loadBag();

function saveBag() {
  try {
    localStorage.setItem("gambol-demo-bag", JSON.stringify(bag));
  } catch {
    showToast("เพิ่มสินค้าแล้ว แต่เบราว์เซอร์บันทึกรายการนี้ไว้ไม่ได้");
  }
}

function getVisibleProducts() {
  const needle = searchTerm.trim().toLocaleLowerCase("th-TH");
  let visible = products.filter((product) => {
    const categoryMatches = activeCategory === "all" || product.category === activeCategory;
    const searchable = [
      product.name,
      product.code,
      product.categoryLabel,
      product.description,
      product.tag
    ].join(" ").toLocaleLowerCase("th-TH");
    return categoryMatches && (!needle || searchable.includes(needle));
  });

  if (sortOrder === "price-asc") visible = [...visible].sort((a, b) => a.price - b.price);
  if (sortOrder === "price-desc") visible = [...visible].sort((a, b) => b.price - a.price);
  return visible;
}

function renderProducts() {
  const visible = getVisibleProducts();
  productGrid.innerHTML = visible.map((product) => {
    return '<article class="product-card">' +
      '<div class="product-art">' +
        '<img src="' + product.image + '" alt="' + product.alt + '" loading="lazy">' +
        '<span class="product-tag">' + product.tag + '</span>' +
        (product.storeAvailability === "sold-out" ? '<span class="product-stock">หมดที่ร้านทางการ ณ วันที่ตรวจ</span>' : '') +
        '<button class="quick-view" type="button" data-open-product="' + product.id + '" aria-label="ดูรายละเอียดรุ่น ' + product.name + '">ดูรายละเอียด <span aria-hidden="true">↗</span></button>' +
      '</div>' +
      '<div class="product-information">' +
        '<h3 class="product-name">' + product.name + '<span class="product-code">' + product.code + '</span></h3>' +
        '<p class="product-category">' + product.categoryLabel + '</p>' +
        '<p class="product-price">' + formatPrice(product.price) + '</p>' +
      '</div>' +
    '</article>';
  }).join("");

  resultsLine.textContent = "พบ " + visible.length + " รุ่น";
  emptyState.hidden = visible.length > 0;
  productGrid.hidden = visible.length === 0;
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll("[data-category]").forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function openProduct(productId) {
  selectedProduct = products.find((product) => product.id === productId);
  if (!selectedProduct) return;

  dialogImage.src = selectedProduct.image;
  dialogImage.alt = selectedProduct.alt;
  dialogCategory.textContent = selectedProduct.categoryLabel;
  dialogTitle.textContent = selectedProduct.name;
  dialogPrice.textContent = formatPrice(selectedProduct.price);
  dialogDescription.textContent = selectedProduct.description;
  dialogFeature.textContent = selectedProduct.feature;
  const isSoldOut = selectedProduct.storeAvailability === "sold-out";
  dialogNote.textContent = isSoldOut
    ? "หน้าร้านทางการแจ้งสินค้าหมด ณ วันที่ตรวจ โปรดเช็กสถานะล่าสุดกับร้าน"
    : "ราคา ไซซ์ และสต็อกอาจเปลี่ยนแปลง โปรดตรวจสอบข้อมูลล่าสุดที่ร้านทางการ";
  addToBagButton.disabled = isSoldOut;
  addToBagButton.textContent = isSoldOut ? "สินค้าหมดที่ร้าน" : "เพิ่มใส่ถุง";
  officialProductLink.href = selectedProduct.storeUrl;
  dialogSize.innerHTML = Array.from(
    { length: selectedProduct.maxSize - selectedProduct.minSize + 1 },
    (_, index) => selectedProduct.minSize + index
  ).map((size) => '<option value="' + size + '">' + size + '</option>').join("");
  productDialog.showModal();
}

function addToBag(product, size) {
  const existing = bag.find((item) => item.id === product.id && item.size === size);
  if (existing) existing.quantity += 1;
  else bag.push({ id: product.id, size: size, quantity: 1 });
  saveBag();
  renderBag();
  showToast("เพิ่ม " + product.name + " ไซซ์ " + size + " ในถุงแล้ว");
}

function renderBag() {
  const itemCount = bag.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-bag-count]").forEach((count) => {
    count.textContent = String(itemCount);
  });

  cartItems.innerHTML = bag.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return '<article class="cart-row">' +
      '<img src="' + product.image + '" alt="">' +
      '<div class="cart-row-copy">' +
        '<strong>' + product.name + '</strong>' +
        '<small>ไซซ์ ' + item.size + ' · ' + item.quantity + ' คู่</small>' +
        '<button type="button" data-remove-item="' + product.id + '" data-remove-size="' + item.size + '">นำออกจากถุง</button>' +
      '</div>' +
      '<span class="cart-row-price">' + formatPrice(product.price * item.quantity) + '</span>' +
    '</article>';
  }).join("");

  cartEmpty.hidden = bag.length > 0;
  cartSummary.hidden = bag.length === 0;
  cartTotal.textContent = formatPrice(bag.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return total + product.price * item.quantity;
  }, 0));
}

document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.category));
});

document.querySelectorAll("[data-shortcut-category]").forEach((button) => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.shortcutCategory);
    document.querySelector("#products").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value;
  renderProducts();
});

sortSelect.addEventListener("change", () => {
  sortOrder = sortSelect.value;
  renderProducts();
});

document.querySelector("[data-reset-filters]").addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "recommended";
  searchTerm = "";
  sortOrder = "recommended";
  setCategory("all");
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-product]");
  if (button) openProduct(button.dataset.openProduct);
});

addToBagButton.addEventListener("click", () => {
  if (!selectedProduct || selectedProduct.storeAvailability === "sold-out") return;
  addToBag(selectedProduct, dialogSize.value);
  productDialog.close();
});

document.querySelectorAll("[data-close-product]").forEach((button) => {
  button.addEventListener("click", () => productDialog.close());
});

document.querySelector("[data-open-cart]").addEventListener("click", () => {
  renderBag();
  cartDialog.showModal();
});

document.querySelectorAll("[data-close-cart]").forEach((button) => {
  button.addEventListener("click", () => cartDialog.close());
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-item]");
  if (!button) return;
  const index = bag.findIndex((item) => item.id === button.dataset.removeItem && String(item.size) === button.dataset.removeSize);
  if (index >= 0) bag.splice(index, 1);
  saveBag();
  renderBag();
});

productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});

cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "เปิดเมนู" : "ปิดเมนู");
  nav.classList.toggle("is-open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "เปิดเมนู");
  });
});

renderProducts();
renderBag();
