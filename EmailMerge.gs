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
  var startRow = 2;  // First row of data to process
  var numRows = 24;   // Number of rows to process
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var me = Session.getActiveUser().getEmail();
  var aliases = GmailApp.getAliases();
  Logger.log(aliases);
 
  var files = DriveApp.getFilesByName("Onboard EMail Message Body 1");
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
      Logger.log("email=" + emailAddress + " name=" + emailName + " msg=" + message);
      if (enabled) {
        GmailApp.sendEmail(emailAddress, subject, message,
                        {name:"Space Apps Adelaide 2016 Team", 
                         from:"adlspaceapp2016@phaze.space"});
      }
    }
  }
}
