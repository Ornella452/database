CREATE TABLE school (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30),
    ville VARCHAR(30)
   
    
);


INSERT INTO school (id, name, ville) VALUES
(1, "Véronique", "Paris"),
(2, "Steeven", "Lyon")
(3, "Marc", "Marseille")
(4, "Nour", "Lyon"),
(5, "Romain", "Paris"),
(6, "Sophie", "Paris")


// déjà fait languages


CREATE TABLE favorites (
    id INT PRIMARY KEY NOT NULL,
    class VARCHAR(30),
    sport VARCHAR(30),
    student_id VARCHAR(30)
   
    
);


INSERT INTO favorites (id, class, sport, student_id) VALUES
(1,	"Maths",	"Cricket",	2),
(2, "Music", "Hip-hop",	6),
(3, "Arts", "Boxing", 1),
(4, "Literature", "Tennis", 3),
(5,"Computer science", "Tennis", 5),
(6, "Arts", "Baseball", 4)
