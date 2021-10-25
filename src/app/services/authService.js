const fakeUser = {
  username: 'oen',
  fullName: 'Oen Oen',
  password: '123456',
  role: 'shop'
}

const authService = {
  login(user) {
    // const url = '/login'
    // return axiosClient.post(url, user)

    // Fake login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user.username === fakeUser.username && user.password === fakeUser.password){
          resolve(fakeUser)
        }
        reject(new Error("Username or password is invalid"))
      }, 1000)
    })
  },
}

export default authService
