export default id => {
    admob.banner.config({
        id,
        bannerAtTop: true,
        isTesting: false,
        autoShow: true,
        overlap: true,
        size: admob.AD_SIZE.SMART_BANNER,
    })
    admob.banner.prepare()
}

document.addEventListener('admob.banner.events.LOAD_FAIL', event => {})
