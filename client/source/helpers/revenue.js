import { Analytic, Env } from './'

export default class self {
    static initialized = false

    static pause() {
        if (self.initialize()) {
            if (Env.cordova()) {
                admob.banner.remove()
            }
        }
    }

    static resume() {
        if (self.initialize()) {
            if (Env.cordova()) {
                admob.banner.prepare()
            }
        }
    }

    static initialize() {
        if (Env.production()) {
            if (!self.initialized) {
                if (Env.cordova()) {
                    document.addEventListener(
                        'admob.banner.events.LOAD_FAIL',
                        error => Analytic.error(error),
                    )
                    admob.banner.config({
                        id: ADMOB_CODE,
                        bannerAtTop: true,
                        isTesting: false,
                        autoShow: true,
                        overlap: true,
                        size: admob.AD_SIZE.SMART_BANNER,
                    })
                } else {
                    let script = document.createElement('script')
                    script.onload = () => {
                        window.adsbygoogle = (window.adsbygoogle || []).push({
                            google_ad_client: ADSENSE_CODE,
                            enable_page_level_ads: true,
                        })
                    }
                    script.src =
                        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                    document.head.appendChild(script)
                }
                self.initialized = true
            }
            return true
        }
        return false
    }
}
