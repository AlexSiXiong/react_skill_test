import React from "react"
import { createContext, useContext } from "react";
import './App.css';

import {IPersonProps, INameDictProps} from './interfaces'
import {familyDictTree} from "./data-processor";
import logo from './user1.svg'

function SinglePerson(props: {person: IPersonProps}) {
  return (
      <li>
        <div className={`box ${props.person.gender}`}><img src={logo} alt={'error'}/>{props.person.name}</div>
      </li>
  )
}


function Person(props: {data: number[]} ){
  const id_arr = props.data
  const personContext = useContext(familyContext);

  return (
      <React.Fragment>
        <ul>
          {
            id_arr.map((person_id)=> {
                const person = personContext[String(person_id)]
                if (person.couple) {
                  return (
                      <li key={person_id}>
                        <Couple couple_id_arr={[
                          person_id,
                          person.couple
                        ]}  key={person_id} />
                        <Person data={person.children}
                                key={person.couple}/>
                      </li>

                  )
                } else {
                  return (
                      <SinglePerson person={person}  key={person_id}/>
                  )
                }

            })

          }
        </ul>
      </React.Fragment>
  )
}

function Couple(props: {couple_id_arr: [number, number]}) {
  const name_dict = useContext(familyContext)!;

  const first_person = name_dict[props.couple_id_arr[0]]
  const second_person = name_dict[props.couple_id_arr[1]]

  return (
      <React.Fragment>
        <div className={`top couple`}>
          <div className={`box ${first_person.gender}`}><img src={logo} alt={'error'}/>{first_person.name}</div>
        </div>
        <div>
          <div className={`box ${second_person.gender}`}><img src={logo} alt={'error'}/>{second_person.name}</div>
        </div>
      </React.Fragment>
  )
}

const familyContext = createContext<INameDictProps>(familyDictTree)


const App: React.FC<{personIds: number[], family_dict: INameDictProps}> = (props) => {
  return (
      <familyContext.Provider value={props.family_dict}>

        <nav className="nav">
          <Person data={props.personIds}/>
        </nav>
      </familyContext.Provider>

  )
}


export default App;
