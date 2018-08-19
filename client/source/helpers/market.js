export default class {
    static rateapp(result, feedback) {
        AppRate.preferences = {
            useLanguage: 'en',
            displayAppName: APPLICATION_NAME,
            storeAppURL: {
                ios: APP_STORE_ID,
                android: GOOGLE_PLAY_ID,
            },
            callbacks: {
                done: result,
                handleNegativeFeedback: feedback,
            },
        }
        AppRate.promptForRating()
    }
}
