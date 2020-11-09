db.Students.insertMany([
    { _id: '1', name: "Véronique", ville: "Paris" },
    { _id: '2', name: "Steeven", ville: "Lyon" },
    { _id: '3', name: "Marc", ville: "Marseille" },
    { _id: '4', name: "Nour", ville: "Lyon" },
    { _id: '5', name: "Romain", ville: "Paris" },
    { _id: '6', name: "Sophie", ville: "Paris" }
])

db.Languages.insertMany(
    [{ _id: '1', name: "French" },
    { _id: '2', name: "English" },
    { _id: '3', name: "German" },
    { _id: '4', name: "Spanish" },
    { _id: '5', name: "Mandarin" }
    ])



db.Favorites.insertMany([
    { _id: '1', class: "Math", sport: "Cricket", student_id: "2" },
    { _id: '2', class: "Music", sport: "Hip-hop", student_id: "6" },
    { _id: '3', class: "Arts", sport: "Boxing", student_id: "1" },
    { _id: '4', class: "Literature", sport: "Tennis", student_id: "3" },
    { _id: '5', class: "Computer science", sport: "Tennis", student_id: "5" },
    { _id: '6', class: "Arts", sport: "Tennis", student_id: "4" },
])


db.Students_language.insertMany([
    { _id: '1', students_id: "1", language_id: "1" },
    { _id: '2', students_id: "1", language_id: "2" },
    { _id: '3', students_id: "2", language_id: "1" },
    { _id: '4', students_id: "2", language_id: "3" },
    { _id: '5', students_id: "3", language_id: "1" },
    { _id: '6', students_id: "4", language_id: "1" },
    { _id: '7', students_id: "4", language_id: "2" },
    { _id: '8', students_id: "4", language_id: "4" },
    { _id: '9', students_id: "4", language_id: "5" },
    { _id: '10', students_id: "5", language_id: "1" },
    { _id: '11', students_id: "5", language_id: "5" },
    { _id: '12', students_id: "6", language_id: "1" },
    { _id: '13', students_id: "6", language_id: "2" },
    { _id: '14', students_id: "6", language_id: "3" },
])





lvl1 {

    1 => db.getCollection('Students').find({ _id: '3' })
    2 => db.getCollection('Students').find({ _id: '6' })
    3 => db.Students.find({ _id: "1" }, { _id: 0 })
    4 => db.Students.find({ _id: "2" }, { name: true, _id: 0 })
    5 => db.Students.find({ ville: "Paris" }, { _id: 0 })
    6 => db.Students.find({ ville: "Lyon" }, { ville: false, _id: 0 })
    // db.students.find({ city:"Lyon"},{name:true, _id:0}) 

}


lvl2: {
    1 => db.Students.aggregate([
        { $match: { "_id": '5' } },
        {
            $lookup: {
                from: "Favorites",
                localField: "_id",
                foreignField: "student_id",
                as: "result"
            }
        },
        { $unwind: "$result" },
        {
            $project: {
                "result.class": 1, "result.sport": 1, 'name': 1, 'ville': 1, '_id': 0,
            }
        }
    ])

    2 => db.Students.aggregate([
        { $match: { "_id": '4' } },
        {
            $lookup: {
                from: "Favorites",
                localField: "_id",
                foreignField: "student_id",
                as: "result"
            }
        },
        { $unwind: "$result" },
        {
            $project: {
                "result.sport": 1, 'name': 1, '_id': 0
            }
        }
    ])


    3 => db.Students.aggregate([
        { $match: { "_id": '1' } },
        {
            $lookup: {
                from: "Favorites",
                localField: "_id",
                foreignField: "student_id",
                as: "result"
            }
        },
        { $unwind: "$result" },
        {
            $project: {
                "result.class": 1, 'name': 1, '_id': 0
            }
        }
    ])

    4 => db.Favorites.aggregate([
        { $match: { "class": "Music" } },
        {
            $lookup: {
                from: "Students",
                localField: "student_id",
                foreignField: "_id",
                as: "result"
            }
        },
        { $unwind: "$result" },
        {
            $project: {
                "result.name": 1, "result.ville": 1, 'class': 1, '_id': 0
            }
        }
    ])

    5 => db.Favorites.aggregate([
        { $match: { "sport": "Tennis" } },
        {
            $lookup: {
                from: "Students",
                localField: "student_id",
                foreignField: "_id",
                as: "result"
            }
        },
        { $unwind: "$result" },
        {
            $project: {
                "result.name": 1, 'class': 1, '_id': 0
            }
        }
    ])

    6 => db.Favorites.aggregate([
        { $match: { "class": "Arts" } },
        {
            $lookup: {
                from: "Students",
                localField: "student_id",
                foreignField: "_id",
                as: "result"
            }
        },
        { $unwind: "$result" },
        {
            $project: {
                "result.name": 1, 'class': 1, '_id': 0
            }
        }
    ])

    7 => db.Students.find({ ville: "Paris" }).count()



}



lvl3 = {
    1 => db.Students_language.aggregate([
        {
            $match: {
                "students_id": "1"
            }
        },
        {
            $lookup:
            {
                from: "Students",
                localField: "students_id",
                foreignField: "_id",
                as: "newStud"
            }
        },
        { $unwind: "$newStud" },

        {
            $lookup:
            {
                from: "Languages",
                localField: "language_id",
                foreignField: "_id",
                as: "newLang"
            }
        },
        { $unwind: "$newLang" },

        {
            $project: {
                "newStud._id": 1, "newStud.name": 1,
                "newStud.ville": 1, "newLang.name": 1
            }
        }

    ])

        

    2 => db.Students_language.aggregate([
        {
            $match: {
                "students_id": "4"
            }
        },
        {
            $lookup:
            {
                from: "Students",
                localField: "students_id",
                foreignField: "_id",
                as: "newStud"
            }
        },
        { $unwind: "$newStud" },

        {
            $lookup:
            {
                from: "Languages",
                localField: "language_id",
                foreignField: "_id",
                as: "newLang"
            }
        },
        { $unwind: "$newLang" },

        {
            $project: {
                "newStud._id": 1, "newStud.name": 1,
                "newStud.ville": 1, "newLang.name": 1
            }
        }

    ])

3 =>  db.Students_language.aggregate([
    {
        $match: {
            "students_id": "5"
        }
    },
    {
        $lookup:
        {
            from: "Students",
            localField: "students_id",
            foreignField: "_id",
            as: "result"
        }
    },
    { $unwind: "$result" },
    
    {
        $lookup:
        {
            from: "Languages",
            localField: "language_id",
            foreignField: "_id",
            as: "result2"
        }
    },
    { $unwind: "$result2" },
    
    { $project: {"result.name": 1,"result2.name":1 }}

])

4 =>  



}









