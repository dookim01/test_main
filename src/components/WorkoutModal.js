import React, { useState } from 'react';
import '../styles/WorkoutModal.css';

const WorkoutModal = ({ isOpen, onClose, onSelectWorkout }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const workoutCategories = [
    { id: 'chest', emoji: '🏋️', name: '가슴 (Chest)' },
    { id: 'back', emoji: '💪', name: '등 (Back)' },
    { id: 'legs', emoji: '🦵', name: '하체 (Legs)' },
    { id: 'arms', emoji: '💪', name: '팔 (Arms)' },
    { id: 'shoulders', emoji: '🏋️‍♂️', name: '어깨 (Shoulders)' },
    { id: 'abs', emoji: '🧱', name: '복근 (Abs)' }
  ];
  
  const workoutExercises = {
    chest: ['벤치프레스', '인클라인 벤치프레스', '딥스', '푸쉬업'],
    back: ['턱걸이 (풀업)', '바벨 로우', '랫풀다운', '데드리프트'],
    legs: ['스쿼트', '레그 프레스', '런지', '힙 스러스트'],
    arms: ['바벨 컬', '덤벨 컬', '딥스', '푸쉬다운'],
    shoulders: ['오버헤드 프레스', '레터럴 레이즈', '숄더 프레스'],
    abs: ['크런치', '레그 레이즈', '플랭크']
  };
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleExerciseSelect = (exercise) => {
    onSelectWorkout(`${workoutCategories.find(cat => cat.id === selectedCategory).emoji} ${exercise}`);
    setSelectedCategory(null);
    onClose();
  };
  
  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">
          {selectedCategory 
            ? `${workoutCategories.find(cat => cat.id === selectedCategory).emoji} ${workoutCategories.find(cat => cat.id === selectedCategory).name} 운동 선택` 
            : "오늘의 운동을 선택하세요!"}
        </h2>
        
        {selectedCategory ? (
          <>
            <div className="exercise-list">
              {workoutExercises[selectedCategory].map((exercise, index) => (
                <button 
                  key={index} 
                  className="exercise-button"
                  onClick={() => handleExerciseSelect(exercise)}
                >
                  {exercise}
                </button>
              ))}
            </div>
            <button className="back-button" onClick={handleBackToCategories}>
              ← 카테고리로 돌아가기
            </button>
          </>
        ) : (
          <div className="category-list">
            {workoutCategories.map((category) => (
              <button 
                key={category.id} 
                className="category-button"
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.emoji} {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutModal; 