const backgroundColor = (title) => {
    if (title === 'Cobranças Pagas') {
        return 'blue'
    } else if (title === 'Cobranças Vencidas') {
        return 'red'
    }
    return 'yellow'
}

export default backgroundColor