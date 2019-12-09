import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent'

class App extends Component {

  state = {
    persons: [
      {id: '1', name: 'Max', age: 28},
      {id: '2', name: 'Jaimes', age: 22},
      {id: '3', name: 'Arturo', age: 23}
    ],
    showPersons: true,
    wordLength: 0,
    listOfCharacters: []
  }

  nameChangedHandler = (event, id)=>{
    const indexOfPersonToChange = this.state.persons.findIndex(p =>{
      return p.id === id
    })
    
    const personToChange = {
      ...this.state.persons[indexOfPersonToChange]
    }

    personToChange.name = event.target.value

    const newArrayOfPersons = [...this.state.persons]
    newArrayOfPersons[indexOfPersonToChange] = personToChange

    this.setState({persons: newArrayOfPersons})
  }

  hideTheNames = ()=>{
    this.state.showPersons === true ? this.setState({showPersons: false}) : this.setState({showPersons: true})
  }

  deletePersonHandler = (personId)=>{
    // Delete using index
    // const persons = [...this.state.persons]
    // persons.splice(personIndex, 1)
    // this.setState({
    //   persons: persons
    // })

    //Delete using filter and id
    const copyOfPersons = this.state.persons.filter((person)=>{
      return person.id !== personId
    })

    this.setState({
      persons: copyOfPersons
    })

  }

  countLetters = async(event)=>{

    let temporaryListOfCharacters = [...this.state.listOfCharacters]
    temporaryListOfCharacters = event.target.value.split('')

    await this.setState({
      wordLength: event.target.value.length,
      listOfCharacters: temporaryListOfCharacters
    })
  }

  deleteLetter = (event, key)=>{
    let index = key

    let temporaryListOfCharacters = [...this.state.listOfCharacters]
    temporaryListOfCharacters.splice(index, 1)

    console.log(temporaryListOfCharacters)

    document.getElementById('inputMeeter').value = temporaryListOfCharacters.join('')
    // console.log(temporaryListOfCharacters.join(''))


    this.setState({
      listOfCharacters: temporaryListOfCharacters
    })


  }


  render() {

    let peopleContainer;
    if(this.state.showPersons){
      peopleContainer = (      
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              click={()=>this.deletePersonHandler(person.id)}
              key={person.id}
              changed={(event)=>this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>)
    } else {
      peopleContainer = null;
    }

    let lengthMessage;
    if(this.state.wordLength < 5){
      lengthMessage = (
        <ValidationComponent text="Text is too short!" />
      )
    } else {
      lengthMessage = (
        <ValidationComponent text="Text is long enough" />
      )
    }

    let charContainer = (
      <div className="charContainer">
        {this.state.listOfCharacters.map((char, index)=>{
          return <CharComponent
            letter={char}
            click={(event)=>this.deleteLetter(event, index)}
            key={index}
          />
        })}
      </div>
    )

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working</p>
        <button onClick={this.hideTheNames}>Hide the cards</button>
        {peopleContainer}
        <div>
          <label htmlFor="inputMeeter">Calculate the total length of the word written:</label>
          <input id="inputMeeter" type="text" onChange={(event)=>this.countLetters(event)}/>
          <p>The total length is: <span id="inputMeeterSpan">{this.state.wordLength}</span></p>
        </div>
        {lengthMessage}
        {charContainer}
      </div>
    );
    // return React.createElement('div', null, React.createElement('h1', {className: "App"}, 'Hi, I am actually a React App'))
  }
}

export default App;
