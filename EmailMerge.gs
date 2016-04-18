// Column1 == Name
// Column2 == Email

function sendEmails() {
  
  var enabled = false;
  
  // Uncomment this to allow the script to actually send email.
  // Leave it commented normally to avoid accidental use
  // enabled = true;

  // Pick / add subjects as required
  // Only uncomment one at a time
  var subject = "Welcome to SpaceApps Challenge 2016 Adelaide";
  // var subject = "SpaceApps Challenge 2016 Adelaide - A uniquely South Australian challenge";

  // Edit these to match the copy/paste from the SpaceAppChallenge manage location page
  // Defaults for EmailTest sheet
  var startRow = 2;  // First row of data to process
  var numRows = 1;   // Number of rows to process

  // Uncomment for real data
  // startRow = 9;  // First row of data to process
  // numRows = 1;   // Number of rows to process
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var me = Session.getActiveUser().getEmail();
  var aliases = GmailApp.getAliases();
  // Logger.log(aliases);
 
  // Change this as needed, depending on the email address for this year
  // In 2016, this was an alias for Andrew McDonnell gmail account being used to send the emails.
  // When used as an alias, is gets nicely set as the from and to,
  // but it relies on there bing an SMPT service available for it
  // https://support.google.com/a/answer/1710338?ctx=gmail&hl=en-GB&authuser=0&rd=1
  var fromEmail = "adlspaceapp2016@phaze.space";
  
  // This file must be in the same folder as the spreadsheet
  // Uncomment the needed one as required
  var files = DriveApp.getFilesByName("2016 Participant Onboarding Email 1");
  var body = "";
  var file_id = "";
  while (files.hasNext()) {
    // should only be one!
    var file = files.next();
    file_id = file.getId();
    var content = DocumentApp.openById(file_id).getBody().getText();
    body = content;
    break;
  }

  Logger.log("Sheet=" + sheet.getName() + " file_id=" + file_id);
  if (enabled) { Logger.log("Sending Emails!"); } else { Logger.log("Not Sending Emails."); }
  
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 2) // r, c, NR, NC
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  if (body != "") {
    for (i in data) {
      var row = data[i];
      var emailName = row[0];
      var emailAddress = row[1];
      var message = body;
      // Search / replace on ${name}
      message = message.replace("${name}", emailName);
      
      // noReply:true shows wrong from domain ...      
      // htmlBody:message doesnt work because getBody() has no getAsHtml() method
      //Logger.log("email=" + emailAddress + " name=" + emailName + " msg=" + message);
      Logger.log("email=" + emailAddress + " name=" + emailName + " subject=" + subject);
      if (enabled) {
        GmailApp.sendEmail(emailAddress, subject, message,
                        {name:"Space Apps Adelaide 2016 Team", 
                         from:fromEmail});
      }
    }
  }
}
