export default class {
    static rateapp(result, feedback) {
        AppRate.preferences = {
            useLanguage: 'en',
            displayAppName: 'rect.io',
            storeAppURL: {
                ios: '',
                android: 'market://details?id=com.facebook.katana',
            },
            callbacks: {
                done: result,
                handleNegativeFeedback: feedback,
            },
        }
        AppRate.promptForRating()
    }
}
