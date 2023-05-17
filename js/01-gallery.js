import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
    gallery: document.querySelector(".gallery"),
    image: document.createElement("img"),
    image__box: document.createElement('div'),
};

refs.gallery.addEventListener("click", onGalleryClick);

const createGalleryItem = ({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href=${original}
        >
            <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}
            />
        </a>
    </li>`;
};

const createGalleryItems = () => {
    const galleryMarkup = galleryItems.reduce(
        (acc, item) => acc + createGalleryItem(item),
        ""
    )
    refs.gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
}

createGalleryItems();

function onGalleryClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    
    const lightbox = basicLightbox.create(`<img src="${e.target.dataset.source}" alt="e.target.alt" />`, {
        onShow: () => {window.addEventListener("keydown", clickKey);},
        onClose: () => {window.removeEventListener("kedown", clickKey);}
    });

    function clickKey(event) {
    if (event.code === "Escape") {
        lightbox.close();
    }
}

    lightbox.show();
}
