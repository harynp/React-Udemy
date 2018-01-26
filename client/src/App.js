import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
class App extends Component {
  state = {
    persons: [
      { id: '001', name: 'Hary', age: '25' },
      { id: '002', name: 'Lita', age: '25' },
      { id: '003', name: 'Rafdi', age: '20' }
    ],
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const idx = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[idx]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[idx] = person

    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }
  
  tooglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const styles = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    let persons = null

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <ErrorBoundary key={person.id}><Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            changed={(event) => this.nameChangeHandler(event,person.id)}/>
            </ErrorBoundary>
          })}
        </div>
      )
      styles.backgroundColor = 'red';
    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red')
    } 
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    return (
        <div className="App">
          <h1>Hi. I'm React !</h1>
          <p className={classes.join(' ')}>This Really Working ! .</p>
          <button style={styles} onClick={this.tooglePersonHandler}>Toogle Persons</button>
          {persons}
        </div>
    );
  }
}

export default App;
