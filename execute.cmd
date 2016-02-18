@ECHO OFF
CLS
ECHO.
ECHO WebLinter
ECHO www.drjonnicholson.com
ECHO.
ECHO.
ECHO Remember to set the "site" property (in package.json) to your website
ECHO For example, if your site is located at:
ECHO     W:\CI262\assignment2
ECHO then change the site property to read:
ECHO     "site": "W:\\CI262\\assignment2"
ECHO.
ECHO.
ECHO Checking all required files are installed:
CALL npm install
ECHO.
ECHO ---
ECHO.
ECHO Executing code quality checks:
CALL grunt
PAUSE