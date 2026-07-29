const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');

// Filter functionality
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    let visibleCount = 0;

    galleryItems.forEach((item) => {
      const category = item.dataset.category;
      const matches = filter === 'all' || category === filter;
      
      if (matches) {
        item.classList.remove('is-hidden');
        visibleCount++;
      } else {
        item.classList.add('is-hidden');
      }
    });

    // Update count
    document.getElementById('count').textContent = visibleCount;
  });
});

// Lightbox functionality
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const imageElement = item.querySelector('img');
    const title = item.dataset.title;
    const description = item.dataset.description;

    lightboxImage.src = imageElement.src.replace('w=500', 'w=1200');
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightboxModal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Close on background click
lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    closeLightbox();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Initialize count on page load
document.addEventListener('DOMContentLoaded', () => {
  const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('is-hidden')).length;
  document.getElementById('count').textContent = visibleItems || galleryItems.length;
});
