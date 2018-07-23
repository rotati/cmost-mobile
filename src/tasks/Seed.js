import Database from '../config/Database'

const Seed = () => {
  Database.write(() => {
    Database.create('Forms', {
      id: 'ad57a4ab-8de0-4332-9a1b-518a1aa84513',
      name: "Election Survey",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      questions: JSON.stringify({
        0: {
          type: 'Question',
          data: {
            id: '32fbbaf7-0b55-4983-9e9b-bddc90023576',
            title: 'GPS Location',
            hint: 'Please input Longitude and Latitude',
            type: 'location'
          }
        },
        1: {
          type: 'Group',
          name: 'Address',
          data: [
            {
              id: '8f19989f-9864-402b-9c59-43832a736e24',
              title: 'House Number',
              type: 'text'
            },
            {
              id: 'e7603943-9791-44ce-9d54-4c96a21cbc7b',
              title: 'Street Number',
              type: 'text'
            },
            {
              id: 'e5919ef2-afeb-4cf5-9959-85e6682dd84b',
              title: 'Sangkat',
              type: 'text'
            }
          ]
        },
        2: {
          type: 'Question',
          data: {
            id: '9dd51f09-2efc-435d-8921-d52b324e53ca',
            title: 'Oppinion on CPP',
            hint: 'How do you feel about CPP',
            type: 'emotional'
          }
        }
      })
    })
  })
}

export default Seed