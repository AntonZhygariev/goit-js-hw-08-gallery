import imageRef from "./gallery-items.js";

//console.log(imageRef);

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createImageCardsMarkup(imageRef);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

const modalOpenImage = document.querySelector('.lightbox__image');
const containerModalOpen = document.querySelector('div.lightbox');
const buttonModalClick = document.querySelector('button[data-action="close-lightbox"]');
const containerModalClose = document.querySelector('.lightbox__overlay');

buttonModalClick.addEventListener('click', onCloseModal);
containerModalClose.addEventListener('click', onBackdropClick)


function createImageCardsMarkup(imageRef) {
  return imageRef
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const isImageSwatchEl = evt.target.nodeName === 'IMG';

  if (!isImageSwatchEl) {
    return;
  }
  console.log('target', evt.target)
  console.log('currentTarget', evt.currentTarget)

  onOpenModalClick()
  onAddModalImage(evt)

  // const swatchEl = evt.target;
  // const parentImageCard = swatchEl.closest('gallery__item');
  //removeActiveCardClass();
  //addActiveCardClass(parentImageCard);
  //setBodyBgColor(swatchEl.dataset.source);
}

function onOpenModalClick() {
  containerModalOpen.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPress);
  // document.body.classList.add('show-modal');
}

function onAddModalImage(evt) {
  modalOpenImage.src = evt.target.dataset.source;
  modalOpenImage.alt = evt.target.alt;
}

function onCloseModal(evt) {
  //galleryContainer.removeEventListener('click', onGalleryContainerClick);
  containerModalOpen.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
  modalOpenImage.src = '';
  modalOpenImage.alt = '';
  document.body.classList.remove('show-modal');
}

function onBackdropClick(evt) {
  if (evt.target === containerModalClose) {
    console.log('Кликнули именно в бекдроп!!!!');
    onCloseModal();
  }
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

// function setBodyBgColor(source) {
//   document.body.style.backgroundColor = source;
// }

// function removeActiveCardClass() {
//   const currentActiveCard = document.querySelector('.gallery__item.is-active');

//   if (currentActiveCard) {
//     currentActiveCard.classList.remove('is-active');
//   }
// }

// function addActiveCardClass(card) {
//   card.classList.add('is-active');
// }