const getDate = (dateObject: Date = new Date()) => {
    let day = dateObject.getDate()
    let month = dateObject.getMonth()
    let months = ['January', 'February', 'March', 'Aril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return ` ${day} ${months[month]}`
}
export default getDate