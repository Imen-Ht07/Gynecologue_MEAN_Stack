/* ******DICOM FILE******* */
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DICOM = require('dicom-parser');
// Configurer multer pour télécharger des fichiers DICOM
const storage = multer.diskStorage({
  destination: './dicom_files',
  filename: function (req,file, cb) {
    cb(null, file.originalname);
  }
});



// Middleware de gestion de fichiers DICOM
const dicomFileMiddleware = (req,res,next) => {
  const dicomFile = req.file;
  const filePath = path.join('./dicom_files/', dicomFile.filename);
  const fileContent = fs.readFileSync(filePath);

  // Convertir le contenu du fichier en tableau de bytes
  const byteArray = new Uint8Array(fileContent);
  // Parser le fichier DICOM
 DICOM.parseDicom(byteArray);
  next();
};
// checking file type
const fileFilter = (req,file, cb) => {
  if ( file.mimetype === "application/dicom" ||
  file.mimetype === "application/octet-stream") {
      cb(null, true);
  } else {
      cb(new Error('Not a DICOM file! Please upload a DICOM file.', 400), false);
  }
};
exports.upload = multer({ storage: storage,
  dicomFileMiddleware:dicomFileMiddleware,
  fileFilter:fileFilter,
});


