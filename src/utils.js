const formatDate = (timestamp) => {
    const shortDate = timestamp.slice(8,10)+"/"+timestamp.slice(5,7)+"/"+timestamp.slice(0,4)
    const formattedDate = `${shortDate} at ${timestamp.slice(11,16)}`
    return formattedDate
}

export { formatDate }
