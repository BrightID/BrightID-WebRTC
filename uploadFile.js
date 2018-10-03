const uuid = require('uuid/v4');
const fs = require('fs');

const uploadFile = (socket) => (req, res) => {
  const name = uuid();
  const {
    rtcId,
    userAvatar: { uri },
  } = req.body;
  const imageData = uri.split(',');
  const mime = imageData[0].includes('png') ? 'png' : 'jpg';
  const data = Buffer.from(imageData[1], 'base64');
  const avatarName = `${name}.${mime}`;
  fs.writeFile(`images/${avatarName}`, data, (err) => {
    if (err) console.log(err);
    console.log(`${avatarName} saved`);
  });
  socket.to(rtcId).emit('avatar ready', { avatarName });
  res.json({
    msg: 'recievedididy',
    avatarName,
  });
};

module.exports = uploadFile;
