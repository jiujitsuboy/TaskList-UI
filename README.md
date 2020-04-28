# TaskList-UI (Angular application for managing Users Task List)

This is a simple angular 9 with Boostrap application which offer the following funcionalities>

1. Autentication form (validate user/password credentials to a H2 BD).
2. Dashboard that list all the user task paginated and order by estimation date.
3. Form that allows task creating


# Features:
1. Angular Reactive Forms
2. Session managed by Cookies (ngx-cookie-service). This cookie is used to validate a login user, so is necessary to browse further the login page.
3. JWT injection on every external http request by using http interceptor. JWT is assign to Authorization http header on every request.
4. Use of confirmation windows (angular-confirmation-popover)

# Launch Application

* npm i && npm start

*npm start lunch the web server on port 8090*

**For proper function, it requieres TaskList-Bank app running**
