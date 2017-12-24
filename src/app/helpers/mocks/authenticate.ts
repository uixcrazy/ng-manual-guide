
// admin - admin
export const LOGIN = {
  _SUCCESS: {
    request: {
      "username": "admin",
      "password": "4s5ZMvC2UUT9LYssL5Sckw=="
    },
    status: 200,
    response: {"access_token":"528a27b4-d4d0-4f1d-be0b-22a64a9573d2","expires_in":57671,"refresh_token":"262a7a99-84d8-4227-9073-8b8b3b6d3b8e","firstTime":false,"user":{"userId":1,"createdBy":null,"createdDate":null,"firstName":"Anh","lastName":"The","modifiedBy":"1","modifiedDate":1507100568000,"username":"admin","roleId":1}},
  },

  _ERROR: {
    request: {
      "username": "admin",
      "password": "wrongpassword"
    },
    status: 400,
    response: {
      "error": "Incorrect Username or Password"
    },
  },
}

export const REFRESH_TOKEN = {
  _SUCCESS: {
    request: {
      "username" : "admin",
      "refresh_token" : "07a4da63-7ee2-4adf-a6a3-1fea46eebd9c"
    },
    status: 200,
    response: {
      "access_token": "001e20ee-68b3-40cc-96fc-ca4b50a5d419",
      "expires_in": 86399,
      "refresh_token": "07a4da63-7ee2-4adf-a6a3-1fea46eebd9c",
      "user": {
          "userId": 1,
          "createdBy": null,
          "createdDate": null,
          "firstName": "dai",
          "lastName": "le",
          "modifiedBy": "1",
          "modifiedDate": 1507100568000,
          "username": "admin",
          "roleId": 1
      }
    }
  },
  _ERROR: {
    request: {

    },
    status: 500,
    response: {
        "error": "Invalid refresh token: 07a4da63-7ee2-4adf-a6a3-1fea46eebd9c"
    },
  },

}
