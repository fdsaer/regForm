(function () {
  const registrationButton = document.querySelector('.page-main__registration_button');
  const popupFormSection = document.querySelector('.popup-form');
  const popupForm = document.querySelector('.popup-form__form');
  const closeFormButton = popupFormSection.querySelector('.popup-form__close-button');
  const formInputs = popupForm.querySelectorAll('input');
  const invalidMessage = popupForm.querySelector('.popup-form__input-invalid-message');
  const submitButton = popupForm.querySelector('.popup-form__submit-button');
  const ESC_KEYCODE = 27;
  const passwordLengthPointer = popupForm.querySelector('.popup-form__password-rules--length');
  const passwordNumericPointer = popupForm.querySelector('.popup-form__password-rules--numeric');
  const passwordCasePointer = popupForm.querySelector('.popup-form__password-rules--case');
  let anyPopupOpened = false;
  let onceChangedField = [];


  function checkValidity() {
    for (let i = 0; i < formInputs.length; i++) {
      console.log('проверяю' + formInputs[i]);
      if (!formInputs[i].validity.valid) {
        console.log('невалидное' + formInputs[i]);
        return false;
      }
    }
    return true;
  }
  
  function getClass(str) {
    return str.slice(str.lastIndexOf('--') + 2);
  }
  
  function checkForNumbers(str) {
    for (let symbol of str) {
      if (symbol.charCodeAt(0) > 47 && symbol.charCodeAt(0) < 58) {
        return true;
      }
    }
  }
  
  function checkForUppercase(str) {
    for (let symbol of str) {
      if (symbol.charCodeAt(0) > 64 && symbol.charCodeAt(0) < 91 || symbol.charCodeAt(0) > 1039 && symbol.charCodeAt(0) < 1072) {
        return true;
      }
    }
  }
  
  function checkForLowercase(str) {
    for (let symbol of str) {
      if (symbol.charCodeAt(0) > 96 && symbol.charCodeAt(0) < 123 || symbol.charCodeAt(0) > 1071 && symbol.charCodeAt(0) < 1104) {
        return true;
      }
    }
  }
  
  function putErrorMessage(wrongField) {
    popupForm.querySelector('.popup-form__input-invalid-message--' + getClass(wrongField.className)).innerText = wrongField.validationMessage;
  }
  
  function eraseErrorMessage(rightField) {
    const messageContainer = document.querySelector('.popup-form__input-invalid-message--' + getClass(rightField.className));
    if (messageContainer.textContent) {
      console.log('Очищаю ' + rightField.className);
      messageContainer.innerText = '';
    }
  }
  
  function fieldValidator(fieldToValid) {
    switch (getClass(fieldToValid.className)) {
      case 'email':
        if (fieldToValid.value.length < 5) {
          fieldToValid.setCustomValidity('У тебя слишком короткий!');
          console.log(fieldToValid.value);
        } else {
        fieldToValid.setCustomValidity('');
        console.log('Емейл ок');
        }
        break;
      case 'nick':
        if (fieldToValid.validity.patternMismatch) {
          fieldToValid.setCustomValidity('Нужно пользоваться шаблоном!');
        } else {
        fieldToValid.setCustomValidity('');
        }
        break;
      case 'password':
        let loginValue = popupForm.querySelector('.popup-form__input--nick').value;
        let emailValue = popupForm.querySelector('.popup-form__input--email').value;
        let passwordLength = fieldToValid.value.length > 5 && fieldToValid.value.length < 10 ? true : false;
        let passwordNumeric = checkForNumbers(fieldToValid.value) ? true : false;
        let passwordCase = checkForUppercase(fieldToValid.value) && checkForLowercase(fieldToValid.value) ? true : false;
        if (passwordLength) {
          passwordLengthPointer.classList.add('popup-form__password-rules--perfomed');
          passwordLengthPointer.classList.remove('popup-form__password-rules--failed');
        } else {
          passwordLengthPointer.classList.add('popup-form__password-rules--failed');
          passwordLengthPointer.classList.remove('popup-form__password-rules--perfomed');
        }
        if (passwordNumeric) {
          passwordNumericPointer.classList.add('popup-form__password-rules--perfomed');
          passwordNumericPointer.classList.remove('popup-form__password-rules--failed');
        
        } else {
          passwordNumericPointer.classList.add('popup-form__password-rules--failed');
          passwordNumericPointer.classList.remove('popup-form__password-rules--perfomed');
        }
        if (passwordCase) {
          passwordCasePointer.classList.add('popup-form__password-rules--perfomed');
          passwordCasePointer.classList.remove('popup-form__password-rules--failed');
        } else {
          passwordCasePointer.classList.add('popup-form__password-rules--failed');
          passwordCasePointer.classList.remove('popup-form__password-rules--perfomed');
        }
        if (!passwordLength || !passwordNumeric || !passwordCase) {
          fieldToValid.setCustomValidity('Пароль не соответствует требованиям');
        } else if (fieldToValid.value.length > 0 && fieldToValid.value === loginValue) {
          fieldToValid.setCustomValidity('Пароль не должен совпадать с Никнеймом');
        } else if (fieldToValid.value.length > 0 && fieldToValid.value === emailValue) {
          console.log('совпадает с почтой');
          fieldToValid.setCustomValidity('Пароль не должен совпадать с адресом почты');
        } else {
          fieldToValid.setCustomValidity('');
        }
        break;
      case 'password-again': 
        let passwordValue = popupForm.querySelector('.popup-form__input--password').value;
        if (fieldToValid.value !== passwordValue) {
          fieldToValid.setCustomValidity('Введенные пароли не совпадают');
        } else {
          fieldToValid.setCustomValidity('');
        }
    }
  }
  
  function onSomeInputChange() {
    console.log('change' + onceChangedField);
    for (let i = 0; i < onceChangedField.length; i += 1) {
      fieldValidator(onceChangedField[i]);
      if (onceChangedField[i].validity.valid) {
        eraseErrorMessage(onceChangedField[i])
      } else {
        putErrorMessage(onceChangedField[i]);
      }
    }
    if (checkValidity()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  
  function onSomeInputEnter(evt) {
    if (!onceChangedField.includes(evt.target)) {
      onceChangedField.push(evt.target);
    }
    console.log('ввод' + onceChangedField);
    for (let i = 0; i < onceChangedField.length; i += 1) {
      fieldValidator(onceChangedField[i]);
      if (!onceChangedField[i].validity.valid) {
        putErrorMessage(onceChangedField[i]);
      } else {
        eraseErrorMessage(onceChangedField[i]);
      }
    }
    if (checkValidity()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
    evt.target.addEventListener('input', onSomeInputChange);
  }
  
  for (let i = 0; i < formInputs.length; i += 1) {
    formInputs[i].addEventListener('blur', onSomeInputEnter);
    formInputs[i].addEventListener('change', onSomeInputEnter);
  }

  function toggleLinkButton() {
    anyPopupOpened ? registrationButton.classList.add('page-main__registration_button--disabled') : registrationButton.classList.remove('page-main__registration_button--disabled');
  }
  
  function resetForm() {
    for (let i = 0; i < onceChangedField.length; i += 1) {
      eraseErrorMessage(onceChangedField[i]);
      onceChangedField[i].setCustomValidity('');
    }
    onceChangedField = [];
    popupForm.reset();
  }
  
  function closePopupForm() {
    resetForm();
    popupFormSection.classList.add('popup-form--hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    closeFormButton.removeEventListener('click', closePopupForm);
    anyPopupOpened = false;
    toggleLinkButton();
    onceChangedField = [];
  }
  
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopupForm();
    }
  }

  function openPopupForm() {
    popupForm.reset();
    popupFormSection.classList.remove('popup-form--hidden');
    anyPopupOpened = true;
    toggleLinkButton();
    document.addEventListener('keydown', onPopupEscPress);
    closeFormButton.addEventListener('click', closePopupForm);
  };

  registrationButton.addEventListener('click', function(evt) {
    evt.preventDefault;
    openPopupForm();
  });
  
  popupForm.addEventListener('submit', function (evt) {
    formData = new FormData(popupForm);
    let dataObject = {};
    evt.preventDefault();
    submitButton.disabled = true;
    submitButton.blur();
    formData.forEach(function(value, key){
      dataObject[key] = value;
    });
    console.log(JSON.stringify(dataObject));
  });
  

})();