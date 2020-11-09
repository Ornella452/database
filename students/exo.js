db.Students.insertMany([
{_id: '1', name: "Véronique", ville: "Paris"},
{_id: '2', name: "Steeven", ville: "Lyon"},
{_id: '3', name: "Marc", ville: "Marseille"},
{_id: '4', name: "Nour", ville: "Lyon"},
{_id: '5', name: "Romain", ville: "Paris"},
{_id: '6', name: "Sophie", ville: "Paris"}
])

db.Languages.insertMany(
[{_id: '1', name: "French"},
{_id: '2', name: "English"}, 
{_id: '3', name: "German"},
{_id: '4', name: "Spanish"},
{_id: '5', name: "Mandarin"}
])



db.Favorites.insertMany([
{_id: '1', class: "Math", sport: "Cricket", student_id: "2"},
{_id: '2', class: "Music", sport: "Hip-hop", student_id: "6"},
{_id: '3', class: "Arts", sport: "Boxing", student_id: "1"},
{_id: '4', class: "Literature", sport: "Tennis", student_id: "3"},
{_id: '5', class: "Computer science", sport: "Tennis", student_id: "5"},
{_id: '6', class: "Arts", sport: "Tennis", student_id: "4"},
])


db.Students_language.insertMany([
{_id: '1', students_id: "1", language_id: "1"},
{_id: '2', students_id: "1", language_id: "2"},
{_id: '3', students_id: "2", language_id: "1"},
{_id: '4', students_id: "2", language_id: "3"},
{_id: '5', students_id: "3", language_id: "1"},
{_id: '6', students_id: "4", language_id: "1"},
{_id: '7', students_id: "4", language_id: "2"},
{_id: '8', students_id: "4", language_id: "4"},
{_id: '9',students_id: "4", language_id: "5"},
{_id: '10',students_id: "5", language_id: "1"},
{_id: '11', students_id: "5", language_id: "5"},
{_id: '12', students_id: "6", language_id: "1"},
{_id: '13', students_id: "6", language_id: "2"},
{_id: '14', students_id: "6", language_id: "3"},
])





lvl1 {

1 => db.getCollection('Students').find({_id: '3'})
2 => db.getCollection('Students').find({_id: '6'})
3 => db.Students.find({name: "Véronique", ville: "Paris"}, {name: true, ville: true, _id: 0})


}
