import application from './application'

const _ = () => {
    StatusBar.hide()
    application()
}
document.addEventListener('deviceready', _, { once: true })
