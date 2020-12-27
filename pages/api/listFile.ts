import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { getFiles } from '../../utils/storage/getFiles'
import * as admin from 'firebase-admin'

const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla']

const listFile = async (req, res) => {
  const token = req.headers.token

  try {
    await verifyIdToken(token)
    const [files] = await getFiles()
    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });

    return res.status(200).json({
      food: favoriteFoods[Math.floor(Math.random() * favoriteFoods.length)]
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default listFile