// Column1 == Name
// Column2 == Email

function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 1;   // Number of rows to process

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
  var subject = "Welcome to SpaceApps Challenge 2016 Adelaide";
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
      GmailApp.sendEmail(emailAddress, subject, message,
                        {name:"Space Apps Adelaide 2016 Team", 
                         from:"adlspaceapp2016@phaze.space"});
    }
  }
}
