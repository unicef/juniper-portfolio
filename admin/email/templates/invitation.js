module.exports = (host, verification) => {
  return `<div>
  <p>Hi there! Welcome to Juniper Admin.</p>
  <p>Please click on <a href="http://${host}/admin/signin?verification=${verification}">this link to complete your registration!</a></p>
  
</div>`;
};
