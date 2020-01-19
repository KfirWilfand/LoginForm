
let isVerifyEmail = false;
let isVerifyPassword = false;
let isVerifyRePassword = false;

function updateSubmitBtn() {
  $( "#btnSubmit" ).prop( "disabled", !(isVerifyEmail & isVerifyPassword & isVerifyRePassword) );
}

function verifyPassword() {
  var password = document.getElementById("password").value;
  let passwordLength = 5;

  //must have upper
  let upperCaseLetterPassword = /[A-Z]/.test(password);
  //must have lower
  let lowerCaseLetterPassword = /[a-z]/.test(password);
  //min 6 char
  let lengthOfPassword = password.length > passwordLength;
  //must include number
  let numberIncludedPassword = /[0-9]/.test(password);
  //must include special char
  let includeSpecialCharsPassword = /(!|@|#|"$"|%|"^"|&| "*"|"("| ")"|"-"| _|=| +| \| | | "[" | "]"| {| }| ;| :| \/ | ?| .| >|<|)/.test(
    password.value
  );

  if (
    upperCaseLetterPassword &&
    lowerCaseLetterPassword &&
    lengthOfPassword &&
    numberIncludedPassword &&
    includeSpecialCharsPassword
    ) {
      $(".ver-item-password").addClass( "display-none" )
      document.getElementById("password").classList.remove("box_red");
      isVerifyPassword = true;
    } else {
      $(".ver-item-password.display-none").removeClass( "display-none" )
      document.getElementById("password").classList.add("box_red");
      isVerifyPassword = false;
    }

    updateSubmitBtn(); 
    verifyRePassword();
}

function verifyRePassword() {
  var password = document.getElementById("password").value;
  var rePassword = document.getElementById("re-password").value;

  if(password == rePassword){
    $(".ver-item-re-password").addClass( "display-none" )
    document.getElementById("re-password").classList.remove("box_red");
    isVerifyRePassword = true;
  }else{
    $(".ver-item-re-password.display-none").removeClass( "display-none" )
    document.getElementById("re-password").classList.add("box_red");
    isVerifyRePassword = false;
  }

  updateSubmitBtn(); 
}

function verifyEmail() {
  var email = document.getElementById("email").value;
  let usernameLength = 8;

  //includes com/org/ru
  let includesDotNotationUsername = /(.com|.ru|.org|.co.il)/.test(email);
  //includes @
  let includesAtUsername = email.includes("@");
  //username length at least 7
  let usernameLengthUsername = email.length > usernameLength;

  if (
    includesDotNotationUsername &&
    includesAtUsername &&
    usernameLengthUsername
  ) {
    $(".ver-item-email").addClass( "display-none" )
    document.getElementById("email").classList.remove("box_red");
    isVerifyEmail = true;
  } else {
    $(".ver-item-email.display-none").removeClass( "display-none" )
    document.getElementById("email").classList.add("box_red");
    isVerifyEmail = false;
  }
  updateSubmitBtn(); 
}
