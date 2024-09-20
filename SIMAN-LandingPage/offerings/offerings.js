const navLogo = document.getElementById('nav-logo');
const main = document.getElementById('main');
navLogo.addEventListener('click', () => {
   scrollToSection(main);
});

function navTo(idElement) {
   const sectionToNav = document.getElementById(idElement);
   scrollToSection(sectionToNav);
   navMenu.classList.remove('show-menu');
}
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () => {
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () => {
   navMenu.classList.remove('show-menu');
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
   loginBtn = document.getElementById('login-btn'),
   loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () => {
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () => {
   login.classList.remove('show-login')
})

/*=============== SUSCRIBE ===============*/
const suscribe = document.getElementById('suscribe'),
   sucribeBtn = document.getElementById('suscribe-btn'),
   sucribeClose = document.getElementById('suscribe-close'),
   rememberLaterBtn = document.getElementById('remember-later')
/* Suscribe show */
sucribeBtn.addEventListener('click', () => {
   suscribe.classList.add('show-suscribe')
});

/* Suscribe hidden */
sucribeClose.addEventListener('click', () => {
   suscribe.classList.remove('show-suscribe')
});

rememberLaterBtn.addEventListener('click', () => {
   suscribe.classList.remove('show-suscribe')
});

function scrollToSection(element) {
   element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
   });
}

document.addEventListener('DOMContentLoaded', function () {
   const welcomeBtn = document.getElementById('welcome-btn');

   const categoriesContainer = document.getElementById('categories-container');

   const categories = categoriesContainer.querySelectorAll('section');

   welcomeBtn.addEventListener('click', function () {
      let currentSectionIndex = -1;
      if (currentSectionIndex < categories.length - 1) {
         currentSectionIndex++; // Avanza a la siguiente sección
         scrollToSection(categories[currentSectionIndex]);
      }
   });
});
