const getRecipientEmail = (users: string[], currentUser: any) => {
    return users.filter(email => email !== currentUser.email)[0]
}
export default getRecipientEmail