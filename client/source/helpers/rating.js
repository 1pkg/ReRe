import { findIndex, head, last, map, sortBy } from 'lodash'

export default class {
    static build(alias, score, rating, total) {
        rating = sortBy(rating, ['score']).reverse()
        rating = map(rating, (row, index) => {
            return {
                index: index + 1,
                name: row.alias,
                score: row.score,
            }
        })

        let index = findIndex(rating, row => {
            return row.name == alias && row.score == score
        })
        if (index !== -1) {
            rating[index] = {
                index,
                name: `THIS IS YOU - ${alias}`,
                score,
            }
            if (total > rating.length) {
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: total, name: '...', score: '...' })
            }
        } else {
            let koef = (head(rating).score - last(rating).score) / rating.length
            let diff = head(rating).score - score
            index = Math.floor(diff / koef)
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({ index: '...', name: '...', score: '...' })
            rating.push({
                index,
                name: `THIS IS YOU - ${alias}`,
                score,
            })
            if (total > index) {
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: '...', name: '...', score: '...' })
                rating.push({ index: total, name: '...', score: '...' })
            }
        }
        return { rating, index }
    }
}
