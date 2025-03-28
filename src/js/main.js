document.addEventListener('DOMContentLoaded', () => {
	const mainPage = document.querySelector('.main-page')
	const nav = document.querySelector('.JSnav')

	if (mainPage) {
		window.addEventListener('scroll', () => {
			if (window.scrollY >= 100) {
				nav.classList.add('nav--bgc')
			} else {
				nav.classList.remove('nav--bgc')
			}
		})
	} else {
		nav.classList.add('nav--bgc')
	}

	const burgerBtn = document.querySelector('.nav__burger-btn')
    const burgerBtnX = document.querySelector('.nav__burger-btn-x')
    const mobileNav = document.querySelector('.nav__nav')
    const body = document.body

	burgerBtn.addEventListener('click', () => {
        nav.classList.toggle('nav--bgc')
        mobileNav.classList.toggle('nav__nav--active')
        burgerBtnX.classList.toggle('nav__burger-btn--active')
        burgerBtn.classList.toggle('nav__burger-btn--inactive')
        body.classList.toggle('body-overflow')
	})

	burgerBtnX.addEventListener('click', () => {
        nav.classList.toggle('nav--bgc')
        mobileNav.classList.toggle('nav__nav--active')
        burgerBtnX.classList.toggle('nav__burger-btn--active')
        burgerBtn.classList.toggle('nav__burger-btn--inactive')
        body.classList.toggle('body-overflow')
	})

	
}) //end
