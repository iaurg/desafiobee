describe('sign in page', function() {
  it('should display form to login', function() {
    browser.ignoreSynchronization = true;
    browser.get('/login');

    var usernameBtn = element(by.model('SignIn.loginData.username'));
    var passwordBtn = element(by.model('SignIn.loginData.password'));

    usernameBtn.sendKeys('admin');
    passwordBtn.sendKeys('admin');

    element(by.buttonText('Entrar')).click();

    expect(browser.getLocationAbsUrl()).toContain('app/index');
  });
});
