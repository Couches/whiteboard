
export function approach(val, target, max_move) {
    if (val > target) {
        return Math.max(val - max_move, target)
    } else {
        return Math.min(val + max_move, target)
    }
}