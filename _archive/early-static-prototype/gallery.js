document.querySelectorAll('[data-gallery-product]').forEach(button => {
  button.addEventListener('click', () => openProduct(button.dataset.galleryProduct));
});
