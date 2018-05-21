import MobileDetect from 'mobile-detect'

export default class self {
    static detect = new MobileDetect(window.navigator.userAgent)

    static mobile() {
        return self.detect.mobile()
    }
}
