const formatDate = (timestamp) => {
    const shortDate = timestamp.slice(8,10)+"/"+timestamp.slice(5,7)+"/"+timestamp.slice(0,4)
    const formattedDate = `${shortDate} at ${timestamp.slice(11,16)}`
    return formattedDate
}

const avatarPlaceholder = "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"


export { formatDate, avatarPlaceholder }
