import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import chImage1 from './files/ch1.webp';
import chImage2 from './files/ch2.webp';
import WorkoutModal from './components/WorkoutModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const [workouts, setWorkouts] = useState([
    { status: 'completed', text: '완료', date: '3/12' },
    { status: 'completed', text: '완료', date: '3/14' },
    { status: 'pending', text: '운동 하기' },
    { status: 'pending', text: '운동 하기' }
  ]);

  const openModal = (index) => {
    if (workouts[index].status === 'pending') {
      setSelectedWorkoutIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleSelectWorkout = (workoutText) => {
    const today = new Date();
    const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
    
    const updatedWorkouts = [...workouts];
    updatedWorkouts[selectedWorkoutIndex] = {
      status: 'completed',
      text: workoutText,
      date: dateStr
    };
    
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <div className="stats-container">
        <div className="stat-item">
          <h3>성실도</h3>
          <div className="stat-level medium">
            <span className="level-icon">🥉</span>
            <span className="level-text">중급</span>
          </div>
        </div>
        
        <div className="stat-item">
          <h3>근력</h3>
          <div className="stat-level beginner">
            <span className="level-icon">💪</span>
            <span className="level-text">초급</span>
          </div>
        </div>
        
        <div className="stat-item">
          <h3>지구력</h3>
          <div className="stat-level expert">
            <span className="level-icon">🏆</span>
            <span className="level-text">전문가</span>
          </div>
        </div>
      </div>
      <div className="image-container">
        {/* <img src={chImage1} alt="CH 이미지" className="responsive-image" /> */}
        <img src={chImage2} alt="CH 이미지" className="responsive-image" />
      </div>
      
      <div className="workout-container">
        <h3 className="workout-title">Weekly Mission</h3>
        <div className="workout-tracker">
          {workouts.map((workout, index) => (
            <div 
              key={index} 
              className={`workout-item ${workout.status === 'completed' ? 'completed' : ''}`}
              onClick={() => openModal(index)}
            >
              <span className="workout-text">{workout.text}</span>
              {workout.date && <span className="completion-date">{workout.date}</span>}
            </div>
          ))}
        </div>
      </div>

      <WorkoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSelectWorkout={handleSelectWorkout}
      />
    </div>
  );
}

export default App;
