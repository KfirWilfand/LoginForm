const ErrorMessage="Validation Rules are :"+ "\n Email field should contain only email address"+
"\nPassword field : \n Minimun 6 Characters"+
"\n Must Include an Uppercase Char"+
"\n Must Include an Lowercase Char"+
"\n Must Include a Number"+
"\n Must Include a Special Char(!, @, #, etc)";

function verifyEmailPassword(userName,password){
let passwordLength=5;
let usernameLength=8;

//must have upper
let upperCaseLetterPassword =/[A-Z]/.test(password);
//must have lower
let lowerCaseLetterPassword =/[a-z]/.test(password);
//min 6 char
let lengthOfPassword=(password.length>passwordLength);
//includes com/org/ru
let includesDotNotationUsername=/(.com|.ru|.org|.co.il)/.test(userName);
//includes @
let includesAtUsername=userName.includes("@");
//username length at least 7
let usernameLengthUsername=(userName.length>usernameLength);
//must include number
let numberIncludedPassword =/[0-9]/.test(password);
//must include special char
let includeSpecialCharsPassword=/(!|@|#|"$"|%|"^"|&| "*"|"("| ")"|"-"| _|=| +| \| | | "[" | "]"| {| }| ;| :| \/ | ?| .| >|<|)/.test(password.value);


if(upperCaseLetterPassword
    &&lowerCaseLetterPassword
    &&lengthOfPassword
    &&includesDotNotationUsername
    &&includesAtUsername
    &&usernameLengthUsername
    &&numberIncludedPassword
    &&includeSpecialCharsPassword)
{
    return true;
}else{
    return ErrorMessage;
}

}




module.exports.verifyEmailPassword = verifyEmailPassword;