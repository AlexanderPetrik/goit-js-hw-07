import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
    gallery: document.querySelector(".gallery"),
    image: document.createElement("img"),
    image__box: document.createElement('div'),
};

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

refs.image__box.append(refs.image);

const lightbox = basicLightbox.create(refs.image__box);

refs.gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    
    refs.image.src = e.target.getAttribute("data-source");
    refs.image.alt = e.target.alt;

    lightbox.show();
}

window.addEventListener("keyup", clickKey);

function clickKey(event) {
    if (event.code === "Escape") {
        lightbox.close();
    }
}

console.log(galleryItems);
