import MobileDetect from 'mobile-detect'

export default class self {
    static detect = new MobileDetect(window.navigator.userAgent)
    static cachedm = null
    static cachedt = null

    static mobile() {
        if (self.cachedm === null) {
            self.cachedm = !!self.detect.mobile()
        }
        return self.cachedm
    }

    static tablet() {
        if (self.cachedt === null) {
            self.cachedt = !!self.detect.tablet()
        }
        return self.cachedt
    }
}
