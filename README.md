# PruebaTrez
books.sql is the DB used, .env.example contains the environment variables used on this code.



GET: URL: http://localhost:3001/books
    The request is done by accesding the URL, or sending the id through the URL with: http://localhost:3001/books/1 
    
    
POST: BODY OF THE REQUEST
        {
			
			"title": "LOTR",
			"isbn": "9780007124015",
			"genre": "Fantasy",
			"author": "JRR Tolkien"
		}

PUT: The id is sent through the url as with the GET, the body of the request is: 
            {
            "title": "LOTR",
			"isbn": "9780007124015",
			"genre": "Fantasy",
			"author": "JRR Tolkien"
            }

DELETE: The id is sent through the url as with the GET
