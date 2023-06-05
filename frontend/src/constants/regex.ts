export const PWD_REGEX = /^\S+$/;
//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//setValidPwd(PWD_REGEX.test(pwd));
//  8 to 24 characters.<br />
// Must include uppercase and lowercase letters, a number and a special character.<br />
// Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//phone number
//pattern: {value: "[+][2][5][4][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]",