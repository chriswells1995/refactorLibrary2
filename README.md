# refactorLibrary2

I commented each file to explain what was going on. 
In short, the MVC format allows all the SQL language to 
go one one ORM file, whose methods are called by the models.

Meanwhile, the controllers are in between the client and the Models.
They declare the routes, and call the Models' methods. 