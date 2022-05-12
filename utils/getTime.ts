const getTime = (dateObject: Date = new Date()) => {
    let hour = dateObject.getHours()
    let minutes = dateObject.getMinutes()
    let ampm = "a.m."
    if (hour > 12) {
        hour -= 12
        ampm = "p.m."
    }
    if (hour == 0) hour = 12

    return `${hour}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`
}
export default getTime