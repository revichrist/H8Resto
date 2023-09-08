async function authorization(request, response, next) {
  try {
    const {role} = request.user

    if(role !== "Admin") throw {name: "Forbidden"}

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authorization };
