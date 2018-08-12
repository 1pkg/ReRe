import MobileDetect from 'mobile-detect'

export default class self {
    static detect = new MobileDetect(window.navigator.userAgent)
    static cachedm = null
    static cachedt = null

    static NAME_DESKTOP = 'desktop'
    static NAME_TABLET = 'tablet'
    static NAME_MOBILE = 'mobile'

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

    static name() {
        if (self.tablet()) {
            return self.NAME_TABLET
        } else if (self.mobile()) {
            return self.NAME_MOBILE
        } else {
            return self.NAME_DESKTOP
        }
    }
}
