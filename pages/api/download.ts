import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { downloadFile } from '../../utils/storage/downloadFile'
import * as admin from 'firebase-admin'

const download = async (req, res) => {
  const token: string = req.headers.token
  const fileName: string = req.headers.filename

  try {
    const verifiedToken = await verifyIdToken(token)
    const user = await admin.auth().getUser(verifiedToken.uid)

    const parent = fileName.replace(/\/[^\/]+$/, '')

    // customClaims.admin、もしくは uid がフォルダ名と一致した時はダウンロードを許可する
    if (!(user.customClaims && user.customClaims.admin === true || parent === verifiedToken.uid)) {
      return res.status(401).send('You are unauthorised')
    }

    const file = fileName.replace(/^.*[\\\/]/, '')

    const filePath = parent + '/' + file
    console.log(filePath)
    const data = await downloadFile(filePath)
    const base64String = data.toString()

    console.log(base64String.length)
    // Todo: res.setHeader(Proper Content-Type)
    return res.status(200).send(base64String)
  } catch (error) {
    console.log(error)
    return res.status(500).send('download error: ', error.massage)
  }
}

export default download
