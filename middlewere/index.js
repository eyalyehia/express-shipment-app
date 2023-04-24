const admin = require('firebase-admin');
const serviceAccount = require('../firebase_config.json');
const { getAuth } = require('firebase-admin/auth')


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


exports.authListOfUsers = (req,res) => {
      getAuth()
      .listUsers(1000)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          userRecord.toJSON()
         })
         return res.status(200).send(listUsersResult)
      })
      .catch((error) => res.send(error))
  }

  exports.authDeleteUsers = (req,res) => {
    const users = req.body.users
    getAuth()
    .deleteUsers(users)
    .then((deleteUsersResult) => {
      console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
      console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
      deleteUsersResult.errors.forEach((err) => {
        console.log(err.error.toJSON());
      });
      return res.status(200).send(deleteUsersResult)
    })
    .catch((error) => {
    res.send('Error deleting users:', error)
    });
  }

exports.authDeleteSingleUser = (req,res) => {
  console.log()
  const user = req.params.id;
  getAuth()
  .deleteUser(user)
  .then(() => {
    console.log('Successfully deleted user');
    return res.status(200).send('Successfully deleted user')
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });
}

  exports.authUpdateUser = (req,res) => {
    const {uid , details} = req.body;
    const {displayName , email } = details

    getAuth()
  .updateUser(uid,{
    displayName,
   email
  })
  .then((userRecord) => {
    console.log('Successfully updated user', userRecord.toJSON());
   return res.status(200).send(userRecord)
  })
  .catch((error) => {
   return res.status(400).send('Error updating user:', error);
  });
  };

  exports.authGetSingleUser = (req,res) => {
    const uid = req.params.id;
   getAuth()
  .getUser(uid)
  .then((userRecord) => {
    console.log(userRecord)
   return res.status(200).send(userRecord)
  })
  .catch((error) => {
    res.status(400).send('Error fetching user data:', error);
  });
  }