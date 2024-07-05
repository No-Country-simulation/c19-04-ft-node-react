const USERNAMEREGEXP = /^[a-zA-Z0-9]{6,8}$/
const PASSWORDREGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?['#'?!@$%^&*-]).{8,}$/
const NAMEREGEXP = /^[a-zA-Z0-9]+$/
const SURNAMEREGEXP = /^[a-zA-Z0-9]+$/

export default { USERNAMEREGEXP, PASSWORDREGEXP, NAMEREGEXP, SURNAMEREGEXP }