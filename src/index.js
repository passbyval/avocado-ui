import './index.scss'

const SHOW_CLASS = 'show'
const BOUNCE_MS = 450

const getAllButtons = () => document.querySelectorAll('.btn')
const getAllInputs = () => document.querySelectorAll('.select, .input')
const getDropdownButtons = () => document.querySelectorAll('.dropdown > .btn')

document.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('btn')) {
    getDropdownButtons().forEach((button) => {
      button.parentElement.classList.remove(SHOW_CLASS)
      button.setAttribute('aria-expanded', 'false')
    })
  }
})

getAllInputs().forEach((input) => {
  input.addEventListener('click', ({ target: input }) => {
    input.classList.add('bounce')
    setTimeout(() => input.classList.remove('bounce'), BOUNCE_MS)
  })
})

getAllButtons().forEach((button) => {
  const isDropdownButton = button.parentElement.classList.contains('dropdown')
  const isLink = button.classList.contains('link')

  button.setAttribute('role', isLink ? 'link' : 'button')

  if (isDropdownButton) {
    button.setAttribute('aria-haspopup', 'true')
    button.setAttribute('aria-expanded', 'false')
  }

  button.addEventListener('click', (event) => {
    const { target: button } = event

    button.classList.add('bounce')

    setTimeout(() => button.classList.remove('bounce'), BOUNCE_MS)

    if (isDropdownButton) {
      const { parentElement: dropdown } = button

      if (dropdown.classList.contains(SHOW_CLASS)) {
        dropdown.classList.remove(SHOW_CLASS)
        button.setAttribute('aria-expanded', 'false')
      } else {
        dropdown.classList.add(SHOW_CLASS)
        button.setAttribute('aria-expanded', 'true')
      }
    }
  })
})
