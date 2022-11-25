
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const router = require('express').Router();
const Tutor = require('./controllers/become');
const Setting = require('./controllers/setting');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/avatar')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        // You could use the original name
        // cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage })



router.get('/protected_content', requireAuth, function (req, res) {
    res.send({ message: 'server response:  this GET request has been authorized for a user' });
});

router.get('/admin_area', requireAuth, function (req, res, next) {
    res.send({ message: 'server response:  this GET request has been authorized for an admin' });
});

router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);
router.post('/admin_activation', Authentication.admin_activation);

router.post('/become/about', Tutor.about);
router.post('/become/getdata', Tutor.getdata);
router.post('/become/experience', Tutor.experience);
router.post('/become/education', Tutor.education);
router.post('/become/description', Tutor.description);
router.post('/become/price', Tutor.price);
router.post('/become/availability', Tutor.availability);
router.post('/become/certification', Tutor.certification);
router.post('/become/done', Tutor.done);
router.post('/become/gettutors', Tutor.gettutors);


// setting
router.post('/uploadimage', upload.single('photo'), Setting.uploadPorfileImg)
router.post('/setting/getAccount', Setting.getAccount);
router.post('/setting/saveAccount', Setting.saveAccount);
router.post('/setting/changeAccount', Setting.changeAccount);

// Schedule
router.post('/setting/saveSchedule', Setting.saveSchedule);
router.post('/setting/getSchedule', Setting.getSchedule);
router.post('/setting/saveUserSchedule', Setting.saveUserSchedule);
router.post('/setting/getMySchedule', Setting.getMySchedule);
router.post('/setting/deleteMySchedule', Setting.deleteMySchedule);

router.post('/getTutorById', Setting.getTutorById);

module.exports = router;