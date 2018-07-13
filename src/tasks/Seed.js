import Database from '../config/Database'

const Seed = () => {
  Database.write(() => {
    Database.create('BlankForm', {
      id: 'election-form',
      name: "Election Survey",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      questions: JSON.stringify({
        0: {
          id: 'q1',
          title: 'GPS Location',
          hint: 'Please input Longitude and Latitude',
          type: 'Text',
        },
        1: {
          id: 'q2',
          title: 'Address',
          hint: 'Please input House number, street and Sangkat',
          type: 'Long Text',
        },
        2: {
          id: 'q3',
          title: 'Oppinion on CPP',
          hint: 'How do you feel about CPP',
          type: 'Select',
          options: {
            option1: 'Very Happy',
            option2: 'Happy',
            option3: 'Not Happy'
          }
        }
      })
    })
  })
}

export default Seed