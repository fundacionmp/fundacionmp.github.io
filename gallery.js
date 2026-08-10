document.addEventListener('DOMContentLoaded', () => {
    const items = [...document.querySelectorAll('.gallery-item')];
    const photos = items.filter((item) => item.dataset.type === 'photo');
    const filters = [...document.querySelectorAll('.filter-btn')];
    const count = document.getElementById('gallery-count');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    let currentIndex = 0;

    filters.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            let visible = 0;

            filters.forEach((filterButton) => {
                const active = filterButton === button;
                filterButton.classList.toggle('active', active);
                filterButton.setAttribute('aria-pressed', String(active));
            });

            items.forEach((item) => {
                const show = filter === 'all' || item.dataset.type === filter;
                item.hidden = !show;
                if (show) visible += 1;
                if (!show && item.dataset.type === 'video') item.querySelector('video')?.pause();
            });

            count.textContent = visible;
        });
    });

    const showPhoto = (index) => {
        currentIndex = (index + photos.length) % photos.length;
        const photo = photos[currentIndex];
        const image = photo.querySelector('img');
        lightboxImage.src = photo.dataset.src;
        lightboxImage.alt = image.alt;
        caption.textContent = `${currentIndex + 1} de ${photos.length}`;
    };

    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            showPhoto(index);
            lightbox.showModal();
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.close();
        document.body.style.overflow = '';
    };

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentIndex + 1));

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target.classList.contains('lightbox-inner')) closeLightbox();
    });

    lightbox.addEventListener('close', () => {
        document.body.style.overflow = '';
        lightboxImage.src = '';
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.open) return;
        if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
        if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });
});
