import MobileDetect from 'mobile-detect'

let detect = new MobileDetect(window.navigator.userAgent)
export default class {
    static mobile() {
        return detect.mobile()
    }
}
