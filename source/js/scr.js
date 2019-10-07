'use strict';

(function () {
  const menuButton = document.querySelector('.page-header__menu-toggle');
  const menu = document.querySelector('.page-header__menu');
  const callbackButton = document.querySelector('.page-header__callback-button');
  const callbackForm = document.querySelector('.callback-popup');
  const closeFormButton = callbackForm.querySelector('.callback-popup__close-button');
  const overlay = document.querySelector('.overlay');
  const permissionCheckbox = callbackForm.querySelector('.callback-popup__checkbox');
  const submitButton = callbackForm.querySelector('.callback-popup__submit');
  const ESC_KEYCODE = 27;

  let callbackFormIsClosed = true;
  let menuIsClosed = true;

  let closeModal =function () {
    callbackButton.classList.remove('page-header__callback-button--opened');
    overlay.classList.add('overlay--hidden');
    callbackForm.classList.add('callback-popup--hidden');
    callbackFormIsClosed = true;
    document.removeEventListener('keydown', onPopupEscPress);
  };

  let onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  let openModal = function () {
    callbackButton.classList.add('page-header__callback-button--opened');
    callbackForm.classList.remove('callback-popup--hidden');
    overlay.classList.remove('overlay--hidden');
    callbackFormIsClosed = false;
    document.addEventListener('keydown', onPopupEscPress);
    closeFormButton.addEventListener('click', closeModal);
  };

  permissionCheckbox.addEventListener('change', function () {
    if (permissionCheckbox.checked == true) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });
console.log('Очищаю ' + rightField.className);
  callbackButton.addEventListener('click', function () {
    if (callbackFormIsClosed) {
      openModal();
    }
    closeFormButton.addEventListener('click', closeModal);
  });

  menuButton.addEventListener('click', function () {
    if (menuIsClosed) {
      menuButton.classList.add('page-header__menu-toggle--opened');
      menu.classList.remove('page-header__menu--hidden');
      menuIsClosed = false;
    } else {
      menuButton.classList.remove('page-header__menu-toggle--opened');
      menu.classList.add('page-header__menu--hidden');
      menuIsClosed = true;
    }
  });
})();
