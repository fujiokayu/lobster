import axios from 'axios'
import fileDownload from 'js-file-download'

const Download = (props) => {
  async function onSubmit(event) {
    event.preventDefault()

    const response = await fetch("/api/download", {
      method: 'GET',
      headers: new Headers({ 
        'token': props.token, 
        'fileName': props.file}),
      credentials: 'same-origin',
      // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
    })
    if (!response.ok) {
      //needs error handling
    }
    const base64String = await response.text()
    const decodeString = atob(base64String)
    let array = new Uint8Array(decodeString.length);
    for (let i = 0; i < decodeString.length; i++){
        array[i] = decodeString.charCodeAt(i);
    }
    const blob = new Blob([array], {type: 'application/octet-stream'});

    fileDownload(blob, props.file);
  }

  return (
    <form onSubmit={onSubmit}>
      <button class="siimple-btn siimple-btn--light" type="submit">download</button>
    </form>
  )
}

export default Download
