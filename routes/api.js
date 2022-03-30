const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/public')));

router.get('/:uid', (req, res) => {
  const user = req.params.uid;
  Exercise.find({ uid: user }, { _id: 0, username: 0, __v: 0 })
    // .limit(5)
    .sort({ date: 'descending' })
    .exec((err, data) => {
      if (err) {
        return console.log(err);
      } else {
        res.json(data);
      }
    });
});
router.get('/name', (req, res) => {
  const data = {
    username: 'petersen',
    age: 21,
  };
  res.json(data);
});

router.post('/exercises', (req, res) => {
  const { username, uid, description, duration, date } = req.body;
  const newExercise = new Exercise({
    username: username,
    uid: uid,
    description: description,
    duration: duration,
  });

  if (date) {
    newExercise.date = new Date(date.replace(/-/g, '/')).valueOf();
  } else newExercise.date = Date.now();

  newExercise.save((error) => {
    if (error) {
      res.status(500).json({ msg: 'server error' });
    } else {
      res.json({ msg: 'data has been saved' });
    }
  });
});

// All other GET requests not handled before will return our React app
// router.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

module.exports = router;
