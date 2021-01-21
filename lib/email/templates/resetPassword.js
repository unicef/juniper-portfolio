module.exports = (host, token) => {
  return `<div>
  
  <p><a href="http://${host}/admin/signin?resetPassword=${token}">Please click this link to complete your registration!</a></p>
  
</div>`;
};
