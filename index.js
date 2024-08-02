var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// START
const upload = multer({ dest: 'uploads/'})

app.post('/api/fileanalyse', upload.single('upfile'), function(req,res,next){
  const upFile = req.file;
  if (!upFile)
  {
    return res.json({ error: 'No file uploaded'});
  }

  return res.json({
    name: upFile.originalname,
    type: upFile.mimetype,
    size: upFile.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
