import { useState, useEffect, useRef } from 'react'
import './App.css'

// Olympian Data
const olympians = [
  { name: 'Usain Bolt', sport: 'Sprinting', stats: { squat: 200, bench: 150, deadlift: 280, run100m: 9.58 } },
  { name: 'Simone Biles', sport: 'Gymnastics', stats: { squat: 120, bench: 80, deadlift: 160, run100m: 12.5 } },
  { name: 'Michael Phelps', sport: 'Swimming', stats: { squat: 180, bench: 140, deadlift: 220, run100m: 10.8 } },
  { name: 'Caitlin Jenner', sport: 'Decathlon', stats: { squat: 220, bench: 170, deadlift: 300, run100m: 10.2 } },
  { name: 'Katie Ledecky', sport: 'Swimming', stats: { squat: 140, bench: 90, deadlift: 180, run100m: 13.0 } },
]

// Equipment Database with images
const equipmentDatabase = {
  pullupBar: { name: 'Pull-up Bar', icon: '单杠', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400' },
  kettlebell: { name: 'Kettlebell', icon: '🔔', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400' },
  yogaMat: { name: 'Yoga Mat', icon: '🧘', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400' },
  dumbbells: { name: 'Dumbbells', icon: '🏋️', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
  resistanceBands: { name: 'Resistance Bands', icon: '➰', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400' },
  bench: { name: 'Weight Bench', icon: '🪑', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400' },
  jumpRope: { name: 'Jump Rope', icon: '⚡', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400' },
  foamRoller: { name: 'Foam Roller', icon: '🧊', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400' }
}

// Exercise Database with images and equipment requirements
const exerciseDatabase = {
  home: {
    beginner: [
      { name: 'Push-ups', sets: 3, reps: '10-15', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Classic push-up targeting chest, shoulders, and triceps' },
      { name: 'Squats', sets: 3, reps: '15-20', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Bodyweight squat for quads and glutes' },
      { name: 'Lunges', sets: 3, reps: '10 each', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400', description: 'Walking lunges for leg strength and balance' },
      { name: 'Plank', sets: 3, reps: '30-60 sec', rest: '45s', equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400', description: 'Core stabilization exercise' },
      { name: 'Burpees', sets: 3, reps: '10-15', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Full body cardio and strength exercise' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '45s', equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Dynamic core and cardio exercise' }
    ],
    intermediate: [
      { name: 'Diamond Push-ups', sets: 3, reps: '12-15', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Close-grip push-up targeting triceps' },
      { name: 'Jump Squats', sets: 3, reps: '12-15', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Explosive squat variation' },
      { name: 'Pistol Squats', sets: 3, reps: '5-10', rest: '90s', equipment: [], image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400', description: 'Single-leg squat requiring balance' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '10-15', rest: '60s', equipment: ['pullupBar'], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', description: 'Advanced core exercise' },
      { name: 'Jump Lunges', sets: 3, reps: '10 each', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400', description: 'Explosive lunge variation' }
    ],
    advanced: [
      { name: 'Muscle-ups', sets: 3, reps: '3-6', rest: '120s', equipment: ['pullupBar'], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', description: 'Advanced pull-up to dip movement' },
      { name: 'Handstand Push-ups', sets: 3, reps: '5-10', rest: '90s', equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Inverted pushing exercise' },
      { name: 'Dragon Flags', sets: 3, reps: '8-12', rest: '90s', equipment: ['bench'], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Advanced core exercise' },
      { name: 'Front Lever', sets: 3, reps: '10-30 sec', rest: '120s', equipment: ['pullupBar'], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', description: 'Isometric pull-up hold' }
    ]
  },
  gym: {
    beginner: [
      { name: 'Bench Press', sets: 4, reps: '8-12', rest: '90s', equipment: ['bench'], image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Classic chest exercise' },
      { name: 'Squat', sets: 4, reps: '8-12', rest: '120s', equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Fundamental leg exercise' },
      { name: 'Deadlift', sets: 4, reps: '6-10', rest: '120s', equipment: [], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Full body compound lift' },
      { name: 'Lat Pulldown', sets: 3, reps: '10-15', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Back width exercise' },
      { name: 'Leg Press', sets: 3, reps: '12-15', rest: '90s', equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Leg isolation exercise' },
      { name: 'Cable Rows', sets: 3, reps: '10-15', rest: '60s', equipment: [], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Mid-back thickness exercise' }
    ],
    intermediate: [
      { name: 'Incline Bench Press', sets: 4, reps: '8-12', rest: '90s', equipment: ['bench'], image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Upper chest focused press' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', equipment: [], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Hamstring focused deadlift' },
      { name: 'Front Squat', sets: 3, reps: '8-12', rest: '90s', equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Quad dominant squat variation' },
      { name: 'Weighted Pull-ups', sets: 3, reps: '6-10', rest: '90s', equipment: ['pullupBar'], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', description: 'Advanced back exercise' },
      { name: 'Barbell Rows', sets: 3, reps: '8-12', rest: '90s', equipment: [], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Back thickness builder' }
    ],
    advanced: [
      { name: 'Weighted Dips', sets: 4, reps: '6-10', rest: '90s', equipment: [], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Heavy chest and tricep exercise' },
      { name: 'Pause Squats', sets: 3, reps: '5-8', rest: '120s', equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Squat with pause at bottom' },
      { name: 'Sumo Deadlift', sets: 3, reps: '5-8', rest: '120s', equipment: [], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Wide-stance deadlift variation' },
      { name: 'Barbell Snatch', sets: 3, reps: '3-6', rest: '120s', equipment: [], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Olympic lift for power' }
    ]
  }
}

// Pre-built Workouts
const preBuiltWorkouts = {
  Push: {
    description: 'Chest, shoulders, and triceps',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-12', rest: 90, equipment: ['bench', 'dumbbells'], image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Lie on bench and press weight up from chest' },
      { name: 'Overhead Press', sets: 3, reps: '10-12', rest: 60, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Press weight overhead from shoulder height' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: 60, equipment: ['bench', 'dumbbells'], image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Press on inclined bench targeting upper chest' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: 45, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Raise arms to sides to target deltoids' },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: 45, equipment: ['resistanceBands'], image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', description: 'Push down on resistance band for triceps' },
      { name: 'Push-ups', sets: 3, reps: 'AMRAP', rest: 60, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Classic bodyweight chest and tricep exercise' }
    ]
  },
  Pull: {
    description: 'Back and biceps',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '5-8', rest: 120, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Lift weight from ground with straight back' },
      { name: 'Pull-ups', sets: 3, reps: '8-12', rest: 90, equipment: ['pullupBar'], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', description: 'Hang from bar and pull chin over bar' },
      { name: 'Barbell Rows', sets: 3, reps: '8-12', rest: 90, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Bend over and row weight to torso' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: 45, equipment: ['resistanceBands'], image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', description: 'Pull resistance toward face for rear delts' },
      { name: 'Dumbbell Curls', sets: 3, reps: '10-12', rest: 45, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Curl weights to target biceps' },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: 45, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Neutral grip curl for biceps and forearms' }
    ]
  },
  Legs: {
    description: 'Quads, hamstrings, and calves',
    exercises: [
      { name: 'Squat', sets: 4, reps: '6-10', rest: 120, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Lower body by bending knees with weight' },
      { name: 'Romanian Deadlift', sets: 3, reps: '8-12', rest: 90, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Hip hinge movement for hamstrings' },
      { name: 'Leg Press', sets: 3, reps: '10-15', rest: 90, equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Machine exercise for leg development' },
      { name: 'Leg Curls', sets: 3, reps: '10-12', rest: 60, equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Machine exercise for hamstrings' },
      { name: 'Calf Raises', sets: 4, reps: '12-15', rest: 45, equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Rise onto toes to target calves' },
      { name: 'Lunges', sets: 3, reps: '10 each', rest: 60, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400', description: 'Step forward and lower for leg strength' }
    ]
  },
  Upper: {
    description: 'Full upper body workout',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', rest: 90, equipment: ['bench', 'dumbbells'], image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Press weight from chest lying on bench' },
      { name: 'Pull-ups', sets: 3, reps: '6-10', rest: 90, equipment: ['pullupBar'], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', description: 'Pull chin over bar for back width' },
      { name: 'Overhead Press', sets: 3, reps: '8-12', rest: 90, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Press weight overhead for shoulders' },
      { name: 'Barbell Rows', sets: 3, reps: '8-12', rest: 90, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Row weight to torso for back thickness' },
      { name: 'Dumbbell Curls', sets: 3, reps: '10-12', rest: 45, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Curl weights for bicep development' },
      { name: 'Tricep Dips', sets: 3, reps: '10-15', rest: 45, equipment: ['bench'], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Lower body between parallel bars' }
    ]
  },
  Lower: {
    description: 'Full lower body workout',
    exercises: [
      { name: 'Squat', sets: 4, reps: '6-10', rest: 120, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Fundamental leg exercise with weight' },
      { name: 'Deadlift', sets: 3, reps: '6-10', rest: 120, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Full body compound lift from ground' },
      { name: 'Leg Press', sets: 3, reps: '10-15', rest: 90, equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Machine exercise for legs' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: 90, equipment: ['dumbbells'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Hip hinge for hamstring focus' },
      { name: 'Leg Extensions', sets: 3, reps: '12-15', rest: 60, equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Machine exercise for quadriceps' },
      { name: 'Calf Raises', sets: 4, reps: '15-20', rest: 45, equipment: [], image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', description: 'Standing calf raise for calf development' }
    ]
  },
  Cardio: {
    description: 'Heart-pumping endurance',
    exercises: [
      { name: 'Warm-up Jog', sets: 1, reps: '5 min', rest: 0, equipment: [], image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400', description: 'Light jogging to warm up the body' },
      { name: 'High Knees', sets: 3, reps: '45 sec', rest: 15, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Run in place bringing knees high' },
      { name: 'Burpees', sets: 3, reps: '30 sec', rest: 30, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', description: 'Full body explosive exercise' },
      { name: 'Jump Rope', sets: 3, reps: '2 min', rest: 30, equipment: ['jumpRope'], image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400', description: 'Classic cardio jump rope exercise' },
      { name: 'Mountain Climbers', sets: 3, reps: '45 sec', rest: 15, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Dynamic plank movement for cardio' },
      { name: 'Sprint Intervals', sets: 6, reps: '30 sec', rest: 60, equipment: [], image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400', description: 'High intensity sprint intervals' },
      { name: 'Cool-down Walk', sets: 1, reps: '5 min', rest: 0, equipment: [], image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400', description: 'Light walking to cool down' }
    ]
  },
  Stretching: {
    description: 'Flexibility and recovery',
    exercises: [
      { name: 'Neck Rolls', sets: 1, reps: '30 sec each', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Gentle neck circles for mobility' },
      { name: 'Shoulder Stretch', sets: 1, reps: '30 sec each', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Cross-body shoulder stretch' },
      { name: 'Chest Opener', sets: 1, reps: '30 sec', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Open chest with arms behind back' },
      { name: 'Cat-Cow Stretch', sets: 1, reps: '1 min', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Flowing spine mobility exercise' },
      { name: 'Hip Flexor Stretch', sets: 1, reps: '30 sec each', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Lunge position hip flexor stretch' },
      { name: 'Hamstring Stretch', sets: 1, reps: '30 sec each', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Seated hamstring stretch' },
      { name: 'Quad Stretch', sets: 1, reps: '30 sec each', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Standing quad stretch' },
      { name: "Child's Pose", sets: 1, reps: '1 min', rest: 0, equipment: ['yogaMat'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', description: 'Resting pose for back and hips' }
    ]
  }
}

// AI Insights Generator
const generateAIInsights = (workouts, water, streaks, prs) => {
  const insights = []
  
  if (workouts.length === 0) {
    insights.push({ type: 'motivation', text: '🏃 Start your fitness journey today! Every workout counts.' })
    return insights
  }
  
  const recentWorkouts = workouts.slice(-7)
  const avgDuration = recentWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / recentWorkouts.length
  
  if (avgDuration > 45) {
    insights.push({ type: 'achievement', text: '🔥 Impressive! Your average workout is over 45 minutes. Keep pushing!' })
  }
  
  if (streaks.current >= 7) {
    insights.push({ type: 'streak', text: `⭐ You're on a ${streaks.current} day streak! Consistency is key to success.` })
  }
  
  if (water < 8) {
    insights.push({ type: 'warning', text: '💧 Remember to stay hydrated! Aim for at least 8 glasses of water.' })
  }
  
  if (prs.length > 0) {
    const recentPR = prs[prs.length - 1]
    insights.push({ type: 'pr', text: `🎉 New PR: ${recentPR.exercise} - ${recentPR.value} ${recentPR.unit}!` })
  }
  
  const workoutTypes = {}
  recentWorkouts.forEach(w => {
    w.exercises.forEach(e => {
      workoutTypes[e.name] = (workoutTypes[e.name] || 0) + 1
    })
  })
  
  const mostCommon = Object.entries(workoutTypes).sort((a, b) => b[1] - a[1])[0]
  if (mostCommon) {
    insights.push({ type: 'tip', text: `💡 You've done ${mostCommon[0]} ${mostCommon[1]} times this week. Try varying your routine!` })
  }
  
  return insights
}

// Components
function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'workout', icon: '💪', label: 'Workout' },
    { id: 'water', icon: '💧', label: 'Water' },
    { id: 'timer', icon: '⏱️', label: 'Timer' },
    { id: 'olympians', icon: '🏅', label: 'Athletes' },
    { id: 'programs', icon: '📋', label: 'Set Workouts' },
    { id: 'recommendations', icon: '🎯', label: 'Routines' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ]
  
  return (
    <nav className="nav">
      <div className="nav-logo">
        <span className="logo-icon">🔥</span>
        <span className="logo-text">FlexFit</span>
      </div>
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

function Dashboard({ workouts, water, streaks, prs, userStats, onStartWorkout }) {
  const totalWorkouts = workouts.length
  const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0)
  const currentStreak = streaks.current
  const longestStreak = streaks.longest
  
  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>Welcome Back! 👋</h1>
        <p className="subtitle">Track your progress and crush your goals</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-value">{totalWorkouts}</div>
          <div className="stat-label">Workouts</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{totalMinutes}</div>
          <div className="stat-label">Minutes</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💧</div>
          <div className="stat-value">{water}/12</div>
          <div className="stat-label">Glasses Today</div>
        </div>
      </div>
      
      <div className="quick-action-card" onClick={onStartWorkout}>
        <div className="quick-action-icon">📋</div>
        <div className="quick-action-content">
          <h3>Start Set Workout</h3>
          <p>Choose from pre-built workouts tailored to your equipment</p>
        </div>
        <div className="quick-action-arrow">→</div>
      </div>
      
      <div className="dashboard-sections">
        <div className="section-card">
          <h3>🏆 Personal Records</h3>
          {prs.length === 0 ? (
            <p className="empty-state">No PRs yet. Start lifting! 💪</p>
          ) : (
            <div className="pr-list">
              {prs.slice(-5).reverse().map((pr, i) => (
                <div key={i} className="pr-item">
                  <span className="pr-exercise">{pr.exercise}</span>
                  <span className="pr-value">{pr.value} {pr.unit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="section-card">
          <h3>📅 Recent Activity</h3>
          {workouts.length === 0 ? (
            <p className="empty-state">No workouts yet. Let's get started!</p>
          ) : (
            <div className="activity-list">
              {workouts.slice(-5).reverse().map((workout, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-date">{new Date(workout.date).toLocaleDateString()}</div>
                  <div className="activity-details">
                    <span>{workout.exercises.length} exercises</span>
                    <span>{workout.duration} min</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="streak-display">
        <div className="streak-flame">🔥</div>
        <div className="streak-info">
          <div className="streak-current">{currentStreak} Day Streak</div>
          <div className="streak-best">Best: {longestStreak} days</div>
        </div>
        <div className="streak-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min((currentStreak / 30) * 100, 100)}%` }}></div>
          </div>
          <span className="progress-text">{30 - currentStreak} days to monthly goal</span>
        </div>
      </div>
    </div>
  )
}

function WorkoutTracker({ workouts, setWorkouts, setStreaks, setPrs }) {
  const [selectedExercises, setSelectedExercises] = useState([])
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState([{ reps: '', weight: '' }])
  const [workoutDuration, setWorkoutDuration] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef(null)
  
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setWorkoutDuration(d => d + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isActive])
  
  const addExercise = () => {
    if (!exerciseName.trim()) return
    setSelectedExercises([...selectedExercises, { 
      name: exerciseName, 
      sets: sets.filter(s => s.reps || s.weight),
      timestamp: new Date().toISOString()
    }])
    setExerciseName('')
    setSets([{ reps: '', weight: '' }])
  }
  
  const addSet = () => {
    setSets([...sets, { reps: '', weight: '' }])
  }
  
  const updateSet = (index, field, value) => {
    const newSets = [...sets]
    newSets[index][field] = value
    setSets(newSets)
  }
  
  const saveWorkout = () => {
    if (selectedExercises.length === 0) return
    
    const workout = {
      id: Date.now(),
      date: new Date().toISOString(),
      exercises: selectedExercises,
      duration: workoutDuration
    }
    
    setWorkouts([...workouts, workout])
    
    // Check for PRs
    selectedExercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.weight) {
          const existingPR = prs.find(p => p.exercise === ex.name)
          if (!existingPR || parseFloat(set.weight) > parseFloat(existingPR.value)) {
            setPrs(prev => [...prev, {
              exercise: ex.name,
              value: set.weight,
              unit: 'lbs',
              date: new Date().toISOString()
            }])
          }
        }
      })
    })
    
    // Update streak
    const today = new Date().toDateString()
    const lastWorkout = workouts.length > 0 ? new Date(workouts[workouts.length - 1].date).toDateString() : null
    
    setStreaks(prev => {
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      let newStreak = prev.current
      
      if (lastWorkout !== today) {
        if (lastWorkout === yesterday || prev.current === 0) {
          newStreak = prev.current + 1
        } else if (lastWorkout !== yesterday) {
          newStreak = 1
        }
      }
      
      return {
        current: newStreak,
        longest: Math.max(prev.longest, newStreak)
      }
    })
    
    setSelectedExercises([])
    setWorkoutDuration(0)
    setIsActive(false)
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="workout-tracker fade-in">
      <div className="workout-header">
        <h2>💪 Workout Logger</h2>
        <div className="timer-display">
          <span className="timer-icon">⏱️</span>
          <span className="timer-value">{formatTime(workoutDuration)}</span>
          <button 
            className={`timer-btn ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? '⏸️ Pause' : '▶️ Start'}
          </button>
        </div>
      </div>
      
      <div className="exercise-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Exercise name (e.g., Bench Press)"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addExercise()}
          />
          <button className="btn-primary" onClick={addExercise}>Add Exercise</button>
        </div>
        
        <div className="sets-form">
          <h4>Sets</h4>
          {sets.map((set, i) => (
            <div key={i} className="set-row">
              <span className="set-number">Set {i + 1}</span>
              <input
                type="number"
                placeholder="Reps"
                value={set.reps}
                onChange={(e) => updateSet(i, 'reps', e.target.value)}
              />
              <input
                type="number"
                placeholder="Weight (lbs)"
                value={set.weight}
                onChange={(e) => updateSet(i, 'weight', e.target.value)}
              />
            </div>
          ))}
          <button className="btn-secondary add-set-btn" onClick={addSet}>
            + Add Set
          </button>
        </div>
      </div>
      
      {selectedExercises.length > 0 && (
        <div className="selected-exercises">
          <h3>Current Workout</h3>
          {selectedExercises.map((ex, i) => (
            <div key={i} className="exercise-card">
              <div className="exercise-name">{ex.name}</div>
              <div className="exercise-sets">
                {ex.sets.map((set, j) => (
                  <span key={j} className="set-badge">
                    {set.reps} reps × {set.weight} lbs
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button 
        className="btn-primary save-workout-btn"
        onClick={saveWorkout}
        disabled={selectedExercises.length === 0}
      >
        💾 Save Workout
      </button>
    </div>
  )
}

function WaterTracker({ water, setWater }) {
  const [goal] = useState(12)
  
  const addGlass = () => {
    if (water < goal) setWater(water + 1)
  }
  
  const removeGlass = () => {
    if (water > 0) setWater(water - 1)
  }
  
  const percentage = (water / goal) * 100
  
  return (
    <div className="water-tracker fade-in">
      <h2>💧 Water Intake</h2>
      
      <div className="water-display">
        <div className="water-circle">
          <svg viewBox="0 0 100 100" className="water-svg">
            <circle cx="50" cy="50" r="45" className="water-bg" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="water-fill"
              style={{ 
                strokeDasharray: `${percentage * 2.83} 283`,
                strokeDashoffset: 70
              }}
            />
          </svg>
          <div className="water-text">
            <span className="water-count">{water}</span>
            <span className="water-goal">/ {goal}</span>
          </div>
        </div>
        
        <p className="water-message">
          {water === 0 ? 'Start drinking!' : 
           water < 4 ? 'Keep going!' : 
           water < 8 ? 'Great progress!' : 
           water < goal ? 'Almost there!' : 
           '🎉 Goal reached!'}
        </p>
      </div>
      
      <div className="water-controls">
        <button className="water-btn remove" onClick={removeGlass}>-</button>
        <button className="water-btn add" onClick={addGlass}>+</button>
      </div>
      
      <div className="water-tips">
        <h4>💡 Hydration Tips</h4>
        <ul>
          <li>Drink a glass first thing in the morning</li>
          <li>Drink before, during, and after workout</li>
          <li>Keep a water bottle at your desk</li>
        </ul>
      </div>
    </div>
  )
}

function WorkoutTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('stopwatch')
  const [countdownTime, setCountdownTime] = useState(60)
  const [customTime, setCustomTime] = useState(60)
  const intervalRef = useRef(null)
  
  useEffect(() => {
    if (isRunning && mode === 'stopwatch') {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    } else if (isRunning && mode === 'countdown') {
      intervalRef.current = setInterval(() => {
        setTime(t => {
          if (t <= 0) {
            setIsRunning(false)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, mode])
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const reset = () => {
    setIsRunning(false)
    setTime(mode === 'countdown' ? countdownTime : 0)
  }
  
  const setPresetTime = (seconds) => {
    setCustomTime(seconds)
    setCountdownTime(seconds)
    setTime(seconds)
    setMode('countdown')
  }
  
  return (
    <div className="timer-page fade-in">
      <h2>⏱️ Workout Timer</h2>
      
      <div className="timer-modes">
        <button 
          className={`mode-btn ${mode === 'stopwatch' ? 'active' : ''}`}
          onClick={() => { setMode('stopwatch'); setTime(0); setIsRunning(false); }}
        >
          ⏱️ Stopwatch
        </button>
        <button 
          className={`mode-btn ${mode === 'countdown' ? 'active' : ''}`}
          onClick={() => { setMode('countdown'); setTime(countdownTime); }}
        >
          ⏳ Countdown
        </button>
      </div>
      
      <div className="timer-display-large">
        <span className={`timer-digits ${isRunning ? 'running' : ''}`}>
          {formatTime(time)}
        </span>
      </div>
      
      <div className="timer-controls">
        <button 
          className={`timer-control-btn ${isRunning ? 'stop' : 'start'}`}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button className="timer-control-btn reset" onClick={reset}>
          🔄 Reset
        </button>
      </div>
      
      {mode === 'countdown' && (
        <div className="preset-times">
          <h4>Quick Presets</h4>
          <div className="preset-btns">
            {[30, 60, 90, 120, 180, 300].map(sec => (
              <button 
                key={sec}
                className={`preset-btn ${customTime === sec ? 'active' : ''}`}
                onClick={() => setPresetTime(sec)}
              >
                {sec < 60 ? `${sec}s` : `${sec/60}m`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function OlympianComparison({ userStats }) {
  const [selectedOlympian, setSelectedOlympian] = useState(olympians[0])
  const [userValues, setUserValues] = useState({
    squat: '',
    bench: '',
    deadlift: '',
    run100m: ''
  })
  
  const compareStats = (user, olympian) => {
    const comparisons = []
    const exercises = ['squat', 'bench', 'deadlift', 'run100m']
    
    exercises.forEach(ex => {
      const userVal = parseFloat(user[ex])
      const olyVal = olympian.stats[ex]
      
      if (userVal) {
        if (ex === 'run100m') {
          comparisons.push({
            exercise: ex,
            user: userVal,
            olympian: olyVal,
            better: userVal < olyVal,
            diff: ((olyVal - userVal) / olyVal * 100).toFixed(1)
          })
        } else {
          comparisons.push({
            exercise: ex,
            user: userVal,
            olympian: olyVal,
            better: userVal > olyVal,
            diff: ((userVal - olyVal) / olyVal * 100).toFixed(1)
          })
        }
      }
    })
    
    return comparisons
  }
  
  const comparisons = compareStats(userValues, selectedOlympian)
  
  return (
    <div className="olympian-page fade-in">
      <h2>🏅 Compare with Olympians</h2>
      <p className="page-subtitle">See how you stack up against elite athletes</p>
      
      <div className="olympian-selector">
        {olympians.map((oly, i) => (
          <button
            key={i}
            className={`olympian-btn ${selectedOlympian.name === oly.name ? 'active' : ''}`}
            onClick={() => setSelectedOlympian(oly)}
          >
            <span className="oly-name">{oly.name}</span>
            <span className="oly-sport">{oly.sport}</span>
          </button>
        ))}
      </div>
      
      <div className="comparison-card">
        <div className="oly-info">
          <div className="oly-avatar">🏅</div>
          <h3>{selectedOlympian.name}</h3>
          <p>{selectedOlympian.sport}</p>
        </div>
        
        <div className="user-inputs">
          <h4>Enter Your Stats</h4>
          <div className="input-grid">
            {['squat', 'bench', 'deadlift', 'run100m'].map(ex => (
              <div key={ex} className="input-group">
                <label>{ex.charAt(0).toUpperCase() + ex.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="number"
                  placeholder={selectedOlympian.stats[ex]}
                  value={userValues[ex]}
                  onChange={(e) => setUserValues({...userValues, [ex]: e.target.value})}
                />
                <span className="unit">{ex === 'run100m' ? 'seconds' : 'lbs'}</span>
              </div>
            ))}
          </div>
        </div>
        
        {comparisons.length > 0 && (
          <div className="comparison-results">
            <h4>Comparison Results</h4>
            {comparisons.map((comp, i) => (
              <div key={i} className={`comparison-row ${comp.better ? 'winning' : ''}`}>
                <span className="comp-exercise">
                  {comp.exercise.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="comp-values">
                  <span className="user-val">{comp.user}</span>
                  <span className="vs">vs</span>
                  <span className="oly-val">{comp.olympian}</span>
                </div>
                <span className={`comp-diff ${comp.better ? 'better' : 'worse'}`}>
                  {comp.better ? '↑' : '↓'} {Math.abs(comp.diff)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Recommendations() {
  const [equipment, setEquipment] = useState('home')
  const [level, setLevel] = useState('beginner')
  
  const exercises = exerciseDatabase[equipment][level]
  
  return (
    <div className="recommendations-page fade-in">
      <h2>🎯 Personalized Programs</h2>
      <p className="page-subtitle">Exercise recommendations based on your setup</p>
      
      <div className="filter-options">
        <div className="filter-group">
          <label>Equipment:</label>
          <div className="filter-btns">
            <button 
              className={`filter-btn ${equipment === 'home' ? 'active' : ''}`}
              onClick={() => setEquipment('home')}
            >
              🏠 Home
            </button>
            <button 
              className={`filter-btn ${equipment === 'gym' ? 'active' : ''}`}
              onClick={() => setEquipment('gym')}
            >
              🏋️ Gym
            </button>
          </div>
        </div>
        
        <div className="filter-group">
          <label>Level:</label>
          <div className="filter-btns">
            {['beginner', 'intermediate', 'advanced'].map(lvl => (
              <button 
                key={lvl}
                className={`filter-btn ${level === lvl ? 'active' : ''}`}
                onClick={() => setLevel(lvl)}
              >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="exercise-grid">
        {exercises.map((ex, i) => (
          <div key={i} className="exercise-recommendation">
            <div className="exercise-number">{i + 1}</div>
            <div className="exercise-details">
              <h4>{ex}</h4>
              <p>{equipment === 'home' ? 'Bodyweight exercise' : 'Equipment-based exercise'}</p>
            </div>
            <div className="exercise-difficulty">
              {level === 'beginner' && '⭐'}
              {level === 'intermediate' && '⭐⭐'}
              {level === 'advanced' && '⭐⭐⭐'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="program-tips">
        <h4>💡 Pro Tips</h4>
        <ul>
          <li>Start with proper form before adding weight</li>
          <li>Rest 60-90 seconds between sets</li>
          <li>Stay consistent - progress takes time!</li>
        </ul>
      </div>
    </div>
  )
}

function Programs() {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const workoutTypes = Object.keys(preBuiltWorkouts)
  
  return (
    <div className="programs-page fade-in">
      <h2>📋 Pre-Built Workouts</h2>
      <p className="page-subtitle">Choose a workout type to see the full routine</p>
      
      {!selectedWorkout ? (
        <div className="workout-types-grid">
          {workoutTypes.map(type => (
            <div 
              key={type} 
              className="workout-type-card"
              onClick={() => setSelectedWorkout(type)}
            >
              <div className="workout-type-icon">
                {type === 'Push' && '💪'}
                {type === 'Pull' && '🔙'}
                {type === 'Legs' && '🦵'}
                {type === 'Upper' && '🏋️'}
                {type === 'Lower' && '🦶'}
                {type === 'Cardio' && '🏃'}
                {type === 'Stretching' && '🧘'}
              </div>
              <h3>{type}</h3>
              <p>{preBuiltWorkouts[type].description}</p>
              <span className="exercise-count">{preBuiltWorkouts[type].exercises.length} exercises</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="workout-detail fade-in">
          <button className="back-btn" onClick={() => setSelectedWorkout(null)}>
            ← Back to Workouts
          </button>
          
          <div className="workout-header">
            <h3>{selectedWorkout} Day</h3>
            <p>{preBuiltWorkouts[selectedWorkout].description}</p>
          </div>
          
          <div className="workout-exercises-list">
            <table className="workout-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Rest</th>
                </tr>
              </thead>
              <tbody>
                {preBuiltWorkouts[selectedWorkout].exercises.map((ex, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ex.name}</td>
                    <td>{ex.sets}</td>
                    <td>{ex.reps}</td>
                    <td>{ex.rest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="workout-summary">
            <div className="summary-stat">
              <span className="stat-value">{preBuiltWorkouts[selectedWorkout].exercises.length}</span>
              <span className="stat-label">Exercises</span>
            </div>
            <div className="summary-stat">
              <span className="stat-value">{preBuiltWorkouts[selectedWorkout].exercises.reduce((sum, ex) => sum + ex.sets, 0)}</span>
              <span className="stat-label">Total Sets</span>
            </div>
            <div className="summary-stat">
              <span className="stat-value">~{selectedWorkout === 'Cardio' ? '20' : selectedWorkout === 'Stretching' ? '15' : '45'} min</span>
              <span className="stat-label">Est. Time</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Analytics({ workouts, streaks, prs }) {
  const [timeRange, setTimeRange] = useState('week')
  
  const getWorkoutStats = () => {
    const now = new Date()
    let startDate = new Date()
    
    if (timeRange === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else if (timeRange === 'month') {
      startDate.setMonth(now.getMonth() - 1)
    } else {
      startDate.setFullYear(now.getFullYear() - 1)
    }
    
    const filtered = workouts.filter(w => new Date(w.date) >= startDate)
    
    return {
      total: filtered.length,
      totalMinutes: filtered.reduce((sum, w) => sum + (w.duration || 0), 0),
      avgDuration: filtered.length > 0 ? Math.round(filtered.reduce((sum, w) => sum + (w.duration || 0), 0) / filtered.length) : 0,
      exercises: new Set(filtered.flatMap(w => w.exercises.map(e => e.name))).size
    }
  }
  
  const stats = getWorkoutStats()
  
  const getStreakData = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()
      const hasWorkout = workouts.some(w => new Date(w.date).toDateString() === dateStr)
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        hasWorkout
      })
    }
    return days
  }
  
  const streakData = getStreakData()
  
  return (
    <div className="analytics-page fade-in">
      <h2>📈 Analytics</h2>
      <p className="page-subtitle">Track your progress and performance</p>
      
      <div className="time-range-selector">
        {['week', 'month', 'year'].map(range => (
          <button
            key={range}
            className={`range-btn ${timeRange === range ? 'active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-icon">💪</div>
          <div className="analytics-value">{stats.total}</div>
          <div className="analytics-label">Workouts</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">⏱️</div>
          <div className="analytics-value">{stats.totalMinutes}</div>
          <div className="analytics-label">Total Minutes</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">📊</div>
          <div className="analytics-value">{stats.avgDuration}</div>
          <div className="analytics-label">Avg Duration</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">🎯</div>
          <div className="analytics-value">{stats.exercises}</div>
          <div className="analytics-label">Exercises</div>
        </div>
      </div>
      
      <div className="streak-analytics">
        <h3>🔥 Weekly Streak</h3>
        <div className="streak-days">
          {streakData.map((day, i) => (
            <div key={i} className={`streak-day ${day.hasWorkout ? 'active' : ''}`}>
              <span className="day-label">{day.date}</span>
              <span className="day-icon">{day.hasWorkout ? '✅' : '⭕'}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pr-analytics">
        <h3>🏆 Personal Records</h3>
        {prs.length === 0 ? (
          <p className="empty-state">No PRs set yet. Start lifting heavy!</p>
        ) : (
          <div className="pr-chart">
            {prs.map((pr, i) => (
              <div key={i} className="pr-bar-container">
                <div className="pr-bar" style={{ height: `${Math.min((pr.value / 300) * 100, 100)}%` }}>
                  <span className="pr-bar-value">{pr.value}</span>
                </div>
                <span className="pr-bar-label">{pr.exercise.substring(0, 8)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AIInsights({ workouts, water, streaks, prs }) {
  const insights = generateAIInsights(workouts, water, streaks, prs)
  
  return (
    <div className="ai-insights fade-in">
      <div className="ai-header">
        <span className="ai-icon">🤖</span>
        <h3>AI Workout Insights</h3>
      </div>
      
      {insights.length === 0 ? (
        <p className="empty-state">Start logging workouts to get personalized insights!</p>
      ) : (
        <div className="insights-list">
          {insights.map((insight, i) => (
            <div key={i} className={`insight-card ${insight.type}`}>
              <p>{insight.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [workouts, setWorkouts] = useState([])
  const [water, setWater] = useState(0)
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 })
  const [prs, setPrs] = useState([])
  const [userStats, setUserStats] = useState({})
  const [userEquipment, setUserEquipment] = useState([])
  const [exerciseWeights, setExerciseWeights] = useState({})
  
  const handleStartWorkout = () => {
    setActiveTab('programs')
  }
  
  return (
    <div className="app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <Dashboard 
              workouts={workouts} 
              water={water} 
              streaks={streaks} 
              prs={prs} 
              userStats={userStats}
              onStartWorkout={handleStartWorkout}
            />
            <AIInsights workouts={workouts} water={water} streaks={streaks} prs={prs} />
          </>
        )}
        
        {activeTab === 'workout' && (
          <WorkoutTracker 
            workouts={workouts} 
            setWorkouts={setWorkouts}
            setStreaks={setStreaks}
            setPrs={setPrs}
          />
        )}
        
        {activeTab === 'water' && (
          <WaterTracker water={water} setWater={setWater} />
        )}
        
        {activeTab === 'timer' && (
          <WorkoutTimer />
        )}
        
        {activeTab === 'olympians' && (
          <OlympianComparison userStats={userStats} />
        )}
        
        {activeTab === 'programs' && (
          <Programs 
            userEquipment={userEquipment} 
            setUserEquipment={setUserEquipment}
            exerciseWeights={exerciseWeights}
            setExerciseWeights={setExerciseWeights}
            setWorkouts={setWorkouts}
            setStreaks={setStreaks}
            setPrs={setPrs}
          />
        )}
        
        {activeTab === 'recommendations' && (
          <Recommendations userEquipment={userEquipment} />
        )}
        
        {activeTab === 'analytics' && (
          <Analytics workouts={workouts} streaks={streaks} prs={prs} />
        )}
      </main>
    </div>
  )
}

export default App
