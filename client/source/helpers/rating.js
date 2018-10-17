import { findIndex, head, last, map, sortBy } from 'lodash'

export default class {
    static build(alias, score, rating) {
        rating = sortBy(rating, ['score']).reverse()
        rating = map(rating, (row, index) => {
            return {
                index: index + 1,
                name: row.alias,
                score: row.score,
            }
        })

        let index = 0
        if (score < last(rating).score) {
            let koef = (head(rating).score - last(rating).score) / rating.length
            let diff = head(rating).score - score
            index = Math.floor(diff / koef)
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({
                index,
                name: `YOU - ${alias}`,
                score,
            })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
        } else {
            index = findIndex(rating, row => {
                return row.name == alias && row.score == score
            })
            if (index != -1) {
                rating[index] = {
                    index: ++index,
                    name: `YOU - ${alias}`,
                    score,
                }
            } else {
                index = findIndex(rating, row => {
                    return row.score <= score
                })
                rating.splice(index, 0, {
                    index: ++index,
                    name: `YOU - ${alias}`,
                    score,
                })
                rating = map(rating, (row, index) => {
                    return {
                        index: index + 1,
                        name: row.name,
                        score: row.score,
                    }
                })
            }
        }
        return { rating, index }
    }

    static rate(result, feedback) {
        AppRate.preferences = {
            useLanguage: 'en',
            displayAppName: APPLICATION_NAME,
            storeAppURL: {
                android: GOOGLE_PLAY_URL,
            },
            callbacks: {
                done: result,
                handleNegativeFeedback: feedback,
            },
        }
        AppRate.promptForRating()
    }
}
