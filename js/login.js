var Login = function(elem, activateElm) {

  var self = this;

  self.overlay       = $("body").find(".container-overlay");
  self.dialogElem    = $(elem);
  self.dialogClose   = $(elem).find(".close");
  self.formElem      = $(elem).find("form");
  self.loginElem     = $(elem).find("form").find("input[type=text]");
  self.submitButton  = $(elem).find("form").find("button");
  self.passwordElem  = $(elem).find("form").find("input[type=password]");
  self.activateElem  = $(activateElm);
  self.url           = "http://api.yoursite.com/login";
  self.isOpen        = false;

  // keep track of open dialogs
  Login.openDialogs  = Login.openDialogs || 0;

  self.validate = function() {
    if (self.loginElem.val().length > 0 && 
        self.passwordElem.val().length > 0) { 
      return true;
    } else {
      return false;
    }
  };
  
  self.sendLogin = function() {
    return $.ajax({
      url: self.url,
      method: "POST",
      data: self.formElem.serialize(),
      dataType: "json",
      timeout: 1000,
      async: true,
      cache: false
    });
  };
  
  self.authenticate = function() {
    if (self.validate() === true) {
      var promise = self.sendLogin();
      promise.success(function(data) {
        console.log('login succeded');
        self.close();
      }).error(function(e,r,t) {
        console.log('login failed');
      });
    } else {
      alert('validation error');
    }
  };

  self.toggleOverlay = function() {
    if (Login.openDialogs < 1) {
      self.overlay.fadeOut('fast');
    } else if (Login.openDialogs === 1) {
      self.overlay.fadeIn('slow');
    }
  }

  self.open = function() {
    self.isOpen = true;
    Login.openDialogs += 1;
    self.toggleOverlay();
    self.dialogElem.fadeIn('slow');
  }

  self.close = function() {
    self.isOpen = false;
    Login.openDialogs -= 1;
    self.toggleOverlay();
    self.dialogElem.fadeOut('fast');
  }
  
  self.submitButton.on('click', function(e) {
    e.preventDefault();
    self.authenticate();
  });

  self.activateElem.on('click', function() {
    if (!self.isOpen) 
      self.open();
  });

  self.dialogClose.on('click', function() {
    if (self.isOpen)
      self.close();
  });

};