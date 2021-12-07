import React from 'react'

// Component for header
const Header = (props) => {
  console.log("Header props: ",props)
  return (
    <h1>{props.course.name}</h1>
  )
}

// Component for part
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}  
    </p>
  )
}

// Component for content
const Content = (props) => {

  //const result = props.parts.map(note => note.name)
  //console.log(result)

  return (
    <div>
      {props.parts.map(part =>           
        <Part key={part.id} part={part} />        
      )}
    </div>
  )
}
  
const Course = (props) => {
  console.log("Course props: ",props)
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
    </div>
  )
}

export default Course