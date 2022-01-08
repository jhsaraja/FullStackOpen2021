import React from 'react'

// Component for header
const Header = ({ course }) => {
  console.log("Header props: ",course)
  return (
    <h1>{course.name}</h1>
  )
}

// Component for part
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}  
    </p>
  )
}

// Component for content
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>           
        <Part key={part.id} part={part} />        
      )}
    </div>
  )
}

// Component for total exercises
const Total = ({ parts }) => {
  return (
    <p>Total of exercises {parts.map(part => part.exercises).reduce((total, exercises) => total + exercises)}</p>
  )
}
  
const Course = ({ course }) => {
  console.log("Course props: ",course)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course