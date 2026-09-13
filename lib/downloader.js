const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');

/**
 * 
 * @param {string} fileId 
 * @returns {Promise}
 */
function downloadFile(fileId) {

  //Une bibliotheque tiré de l'api de google pour contacter google drive
  const auth = new GoogleAuth({

    //C'est l'api Key pour la récupération des fichiers depuis drive
    apiKey : "AIzaSyD30SsbTtApTvYLT4rSphBfQl0PiDkDcNM",
    scopes: 'https://www.googleapis.com/auth/drive'
  });

  // Create a new Drive API client (v3).
  const service = google.drive({version: 'v3', auth});

  // Download the file.
  const file = service.files.get({
    fileId,
    alt: 'media'
  },{responseType : "stream"});

  // Print the status of the download.

  return file;
}

module.exports = downloadFile 