import MobileDetect from 'mobile-detect'

export default class self {
    static detect = new MobileDetect(window.navigator.userAgent)
    static cached = null

    static mobile() {
        if (self.cached === null) {
            self.cached = self.detect.mobile()
        }
        return self.cached
    }
}
