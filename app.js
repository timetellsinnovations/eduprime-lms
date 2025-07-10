// Application Data
const appData = {
  courses: [
    {
      id: 1,
      title: "Introduction to JavaScript",
      instructor: "Sarah Johnson",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.8,
      enrolled: 1247,
      description: "Learn the fundamentals of JavaScript programming with hands-on projects and real-world examples.",
      modules: 12,
      progress: 75,
      category: "Programming"
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      instructor: "Michael Chen",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.6,
      enrolled: 892,
      description: "Master the basics of digital marketing including SEO, social media, and content marketing.",
      modules: 8,
      progress: 30,
      category: "Marketing"
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "Dr. Emily Rodriguez",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.9,
      enrolled: 654,
      description: "Comprehensive data science course covering pandas, numpy, matplotlib, and machine learning.",
      modules: 15,
      progress: 0,
      category: "Data Science"
    },
    {
      id: 4,
      title: "UX/UI Design Principles",
      instructor: "Alex Thompson",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.7,
      enrolled: 1034,
      description: "Learn user experience and interface design principles with practical design projects.",
      modules: 10,
      progress: 45,
      category: "Design"
    },
    {
      id: 5,
      title: "Project Management Essentials",
      instructor: "Jennifer Park",
      duration: "5 weeks",
      level: "Beginner",
      rating: 4.5,
      enrolled: 723,
      description: "Master project management methodologies, tools, and best practices for successful project delivery.",
      modules: 9,
      progress: 0,
      category: "Business"
    },
    {
      id: 6,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Robert Kim",
      duration: "12 weeks",
      level: "Advanced",
      rating: 4.8,
      enrolled: 445,
      description: "Deep dive into machine learning algorithms, neural networks, and AI applications.",
      modules: 18,
      progress: 0,
      category: "Data Science"
    }
  ],
  user: {
    name: "Jordan Smith",
    email: "jordan.smith@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    joinDate: "2024-01-15",
    totalPoints: 2450,
    learningStreak: 12,
    completedCourses: 3,
    level: "Advanced Learner",
    badges: [
      { name: "JavaScript Master", earned: "2024-03-15" },
      { name: "Quick Learner", earned: "2024-02-20" },
      { name: "Discussion Leader", earned: "2024-04-01" }
    ]
  },
  assessments: [
    {
      id: 1,
      courseId: 1,
      title: "JavaScript Fundamentals Quiz",
      questions: [
        {
          question: "What is the correct way to declare a variable in JavaScript?",
          options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
          correct: 0
        },
        {
          question: "Which method is used to add an element to the end of an array?",
          options: ["append()", "push()", "add()", "insert()"],
          correct: 1
        },
        {
          question: "What does DOM stand for?",
          options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
          correct: 0
        }
      ]
    }
  ],
  discussions: [
    {
      id: 1,
      courseId: 1,
      title: "Best practices for JavaScript functions",
      author: "Alex M.",
      replies: 23,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      courseId: 2,
      title: "SEO strategies that actually work",
      author: "Maria L.",
      replies: 15,
      lastActivity: "5 hours ago"
    }
  ],
  achievements: [
    {
      title: "First Course Completed",
      description: "Completed your first course successfully",
      icon: "🎓",
      unlocked: true
    },
    {
      title: "Quick Learner",
      description: "Completed 3 modules in one day",
      icon: "⚡",
      unlocked: true
    },
    {
      title: "Discussion Master",
      description: "Posted 50 helpful discussion comments",
      icon: "💬",
      unlocked: false
    }
  ],
  analytics: {
    totalTimeSpent: 87,
    averageSessionTime: 45,
    coursesInProgress: 3,
    completionRate: 78,
    weeklyGoal: 5,
    weeklyProgress: 3
  }
};

// Application State
let currentView = 'dashboard';
let currentCourse = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let filteredCourses = [...appData.courses];

// DOM Elements
const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('.nav-btn');

// Navigation System
function showView(viewName) {
  // Hide all views
  views.forEach(view => view.classList.add('hidden'));
  
  // Show target view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }
  
  // Update nav buttons
  navButtons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  currentView = viewName;
  
  // Load view-specific content
  switch (viewName) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'courses':
      loadCourses();
      break;
    case 'assessments':
      loadAssessments();
      break;
    case 'discussions':
      loadDiscussions();
      break;
    case 'analytics':
      loadAnalytics();
      break;
    case 'profile':
      loadProfile();
      break;
  }
}

// Dashboard Functions
function loadDashboard() {
  loadRecentCourses();
  loadRecentAchievements();
}

function loadRecentCourses() {
  const container = document.getElementById('recent-courses');
  const coursesInProgress = appData.courses.filter(course => course.progress > 0 && course.progress < 100);
  
  container.innerHTML = coursesInProgress.map(course => `
    <div class="course-progress-item">
      <div class="course-progress-header">
        <div>
          <h4 class="course-progress-title">${course.title}</h4>
          <p class="course-progress-meta">${course.instructor} • ${course.duration}</p>
        </div>
        <button class="btn btn--primary btn--sm continue-btn" onclick="startLearning(${course.id})">
          Continue
        </button>
      </div>
      <div class="course-progress-indicator">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${course.progress}%"></div>
        </div>
        <span class="progress-text">${course.progress}% Complete</span>
      </div>
    </div>
  `).join('');
}

function loadRecentAchievements() {
  const container = document.getElementById('recent-achievements');
  const unlockedAchievements = appData.achievements.filter(achievement => achievement.unlocked);
  
  container.innerHTML = unlockedAchievements.map(achievement => `
    <div class="achievement-item">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <h4>${achievement.title}</h4>
        <p>${achievement.description}</p>
      </div>
    </div>
  `).join('');
}

// Course Functions
function loadCourses() {
  renderCourses(filteredCourses);
  setupCourseFilters();
}

function renderCourses(courses) {
  const container = document.getElementById('courses-grid');
  
  container.innerHTML = courses.map(course => `
    <div class="course-card">
      <div class="course-card-header">
        <h3 class="course-title">${course.title}</h3>
        <p class="course-instructor">by ${course.instructor}</p>
      </div>
      <div class="course-card-body">
        <div class="course-meta">
          <span class="course-meta-item">📅 ${course.duration}</span>
          <span class="course-meta-item">📊 ${course.level}</span>
          <span class="course-meta-item">👥 ${course.enrolled} enrolled</span>
        </div>
        <p class="course-description">${course.description}</p>
        ${course.progress > 0 ? `
          <div class="course-progress-indicator">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <span class="progress-text">${course.progress}% Complete</span>
          </div>
        ` : ''}
      </div>
      <div class="course-card-footer">
        <div class="course-rating">
          <span>⭐ ${course.rating}</span>
        </div>
        <button class="btn btn--primary btn--sm" onclick="showCourseDetail(${course.id})">
          ${course.progress > 0 ? 'Continue' : 'View Details'}
        </button>
      </div>
    </div>
  `).join('');
}

function setupCourseFilters() {
  const searchInput = document.getElementById('course-search');
  const categoryFilter = document.getElementById('category-filter');
  const levelFilter = document.getElementById('level-filter');
  
  function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedLevel = levelFilter.value;
    
    filteredCourses = appData.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                           course.instructor.toLowerCase().includes(searchTerm) ||
                           course.description.toLowerCase().includes(searchTerm);
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
    
    renderCourses(filteredCourses);
  }
  
  searchInput.addEventListener('input', filterCourses);
  categoryFilter.addEventListener('change', filterCourses);
  levelFilter.addEventListener('change', filterCourses);
}

function showCourseDetail(courseId) {
  const course = appData.courses.find(c => c.id === courseId);
  if (!course) return;
  
  currentCourse = course;
  
  const container = document.getElementById('course-detail-content');
  container.innerHTML = `
    <div class="course-detail">
      <div class="course-detail-header">
        <h1 class="course-detail-title">${course.title}</h1>
        <div class="course-detail-meta">
          <span>👨‍🏫 ${course.instructor}</span>
          <span>📅 ${course.duration}</span>
          <span>📊 ${course.level}</span>
          <span>⭐ ${course.rating}</span>
          <span>👥 ${course.enrolled} students</span>
        </div>
        <div class="course-detail-actions">
          ${course.progress > 0 ? 
            `<button class="btn btn--primary btn--lg" onclick="startLearning(${course.id})">Continue Learning</button>` :
            `<button class="btn btn--primary btn--lg" onclick="enrollInCourse(${course.id})">Enroll Now</button>`
          }
          <button class="btn btn--outline btn--lg" onclick="showView('courses')">Back to Courses</button>
        </div>
      </div>
      
      <div class="course-detail-content">
        <div class="course-info">
          <h3>Course Description</h3>
          <p>${course.description}</p>
          
          <h3>What You'll Learn</h3>
          <ul>
            <li>Master the core concepts and fundamentals</li>
            <li>Build practical projects and applications</li>
            <li>Develop problem-solving skills</li>
            <li>Connect with a community of learners</li>
          </ul>
          
          <h3>Requirements</h3>
          <ul>
            <li>Basic computer skills</li>
            <li>Internet connection</li>
            <li>Willingness to learn</li>
          </ul>
        </div>
        
        <div class="course-sidebar">
          <h3>Course Modules</h3>
          <div class="modules-list">
            ${Array.from({length: course.modules}, (_, i) => `
              <div class="module-item">
                <div class="module-number">${i + 1}</div>
                <div class="module-title">Module ${i + 1}</div>
                <div class="module-duration">45 min</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  showView('course-detail');
}

function enrollInCourse(courseId) {
  const course = appData.courses.find(c => c.id === courseId);
  if (course) {
    course.progress = 1;
    course.enrolled += 1;
    showCourseDetail(courseId);
  }
}

function startLearning(courseId) {
  const course = appData.courses.find(c => c.id === courseId);
  if (!course) return;
  
  currentCourse = course;
  loadLearningInterface();
  showView('learning');
}

function loadLearningInterface() {
  if (!currentCourse) return;
  
  const modulesList = document.getElementById('course-modules');
  modulesList.innerHTML = Array.from({length: currentCourse.modules}, (_, i) => `
    <div class="module-item ${i === 0 ? 'active' : ''}">
      <div class="module-number">${i + 1}</div>
      <div class="module-title">Module ${i + 1}: ${getModuleTitle(i)}</div>
      <div class="module-duration">45 min</div>
    </div>
  `).join('');
  
  // Update progress
  const progressFill = document.querySelector('.learning-interface .progress-fill');
  const progressText = document.querySelector('.learning-interface .progress-text');
  if (progressFill && progressText) {
    progressFill.style.width = `${currentCourse.progress}%`;
    progressText.textContent = `Module 1 of ${currentCourse.modules}`;
  }
}

function getModuleTitle(index) {
  const titles = [
    'Getting Started',
    'Basic Concepts',
    'Intermediate Topics',
    'Advanced Techniques',
    'Practical Applications',
    'Project Work',
    'Review and Practice',
    'Final Assessment'
  ];
  return titles[index % titles.length];
}

// Assessment Functions
function loadAssessments() {
  const container = document.getElementById('assessments-grid');
  
  container.innerHTML = appData.assessments.map(assessment => {
    const course = appData.courses.find(c => c.id === assessment.courseId);
    return `
      <div class="assessment-card">
        <div class="assessment-header">
          <div class="assessment-icon">📝</div>
          <div class="assessment-info">
            <h3>${assessment.title}</h3>
            <p>${course ? course.title : 'Course'}</p>
          </div>
        </div>
        <div class="assessment-stats">
          <span>${assessment.questions.length} questions</span>
          <span>⏱️ 15 minutes</span>
        </div>
        <button class="btn btn--primary btn--full-width" onclick="startQuiz(${assessment.id})">
          Start Quiz
        </button>
      </div>
    `;
  }).join('');
}

function startQuiz(assessmentId) {
  const assessment = appData.assessments.find(a => a.id === assessmentId);
  if (!assessment) return;
  
  currentQuiz = assessment;
  currentQuestionIndex = 0;
  userAnswers = [];
  
  document.getElementById('quiz-title').textContent = assessment.title;
  loadQuestion();
  showView('quiz');
}

function loadQuestion() {
  if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) return;
  
  const question = currentQuiz.questions[currentQuestionIndex];
  const totalQuestions = currentQuiz.questions.length;
  
  // Update progress
  document.getElementById('question-counter').textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
  document.getElementById('quiz-progress-bar').style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;
  
  // Load question content
  document.getElementById('question-text').textContent = question.question;
  
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = question.options.map((option, index) => `
    <button class="option-button" onclick="selectAnswer(${index})" data-option="${index}">
      ${option}
    </button>
  `).join('');
  
  // Update controls
  document.getElementById('prev-question').style.display = currentQuestionIndex === 0 ? 'none' : 'block';
  document.getElementById('next-question').style.display = currentQuestionIndex === totalQuestions - 1 ? 'none' : 'block';
  document.getElementById('submit-quiz').style.display = currentQuestionIndex === totalQuestions - 1 ? 'block' : 'none';
}

function selectAnswer(optionIndex) {
  // Clear previous selections
  document.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
  
  // Mark selected option
  document.querySelector(`[data-option="${optionIndex}"]`).classList.add('selected');
  
  // Store answer
  userAnswers[currentQuestionIndex] = optionIndex;
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function submitQuiz() {
  if (!currentQuiz) return;
  
  // Calculate score
  let correctAnswers = 0;
  currentQuiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      correctAnswers++;
    }
  });
  
  const totalQuestions = currentQuiz.questions.length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const pointsEarned = correctAnswers * 10;
  
  // Update user points
  appData.user.totalPoints += pointsEarned;
  
  // Show results
  document.getElementById('final-score').textContent = correctAnswers;
  document.querySelector('.score-total').textContent = `/ ${totalQuestions}`;
  document.getElementById('correct-count').textContent = correctAnswers;
  document.getElementById('accuracy-percentage').textContent = `${accuracy}%`;
  document.getElementById('points-earned').textContent = pointsEarned;
  
  showView('quiz-results');
}

function retakeQuiz() {
  if (currentQuiz) {
    startQuiz(currentQuiz.id);
  }
}

// Discussion Functions
function loadDiscussions() {
  const container = document.getElementById('discussions-list');
  
  container.innerHTML = appData.discussions.map(discussion => {
    const course = appData.courses.find(c => c.id === discussion.courseId);
    return `
      <div class="discussion-item">
        <div class="discussion-header">
          <h3 class="discussion-title">${discussion.title}</h3>
          <span class="discussion-course">${course ? course.title : 'General'}</span>
        </div>
        <div class="discussion-meta">
          <span>👤 ${discussion.author}</span>
          <span>💬 ${discussion.replies} replies</span>
          <span>🕒 ${discussion.lastActivity}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Analytics Functions
function loadAnalytics() {
  const container = document.getElementById('course-progress-analytics');
  
  container.innerHTML = appData.courses.filter(course => course.progress > 0).map(course => `
    <div class="progress-item">
      <div class="progress-item-header">
        <span class="progress-item-title">${course.title}</span>
        <span class="progress-percentage">${course.progress}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${course.progress}%"></div>
      </div>
    </div>
  `).join('');
}

// Profile Functions
function loadProfile() {
  // Profile data is already in HTML, could add dynamic loading here
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Navigation event listeners
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const viewName = this.getAttribute('data-view');
      showView(viewName);
    });
  });
  
  // Profile button in header
  document.querySelector('[data-view="profile"]').addEventListener('click', function() {
    showView('profile');
  });
  
  // Quiz navigation
  document.getElementById('next-question').addEventListener('click', nextQuestion);
  document.getElementById('prev-question').addEventListener('click', prevQuestion);
  document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
  document.getElementById('retake-quiz').addEventListener('click', retakeQuiz);
  
  // Learning interface controls
  document.getElementById('next-module').addEventListener('click', function() {
    if (currentCourse && currentCourse.progress < 100) {
      currentCourse.progress = Math.min(100, currentCourse.progress + 10);
      loadLearningInterface();
    }
  });
  
  document.getElementById('prev-module').addEventListener('click', function() {
    if (currentCourse && currentCourse.progress > 0) {
      currentCourse.progress = Math.max(0, currentCourse.progress - 10);
      loadLearningInterface();
    }
  });
  
  document.getElementById('back-to-course').addEventListener('click', function() {
    if (currentCourse) {
      showCourseDetail(currentCourse.id);
    }
  });
  
  // Video mock play button
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('play-button')) {
      e.target.textContent = e.target.textContent === '▶️' ? '⏸️' : '▶️';
    }
  });
  
  // New discussion button
  document.getElementById('new-discussion').addEventListener('click', function() {
    alert('New discussion feature coming soon!');
  });
  
  // Profile form save
  document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Save Changes') {
      e.preventDefault();
      const name = document.getElementById('profile-name').value;
      const email = document.getElementById('profile-email').value;
      
      // Update user data
      appData.user.name = name;
      appData.user.email = email;
      
      // Update header
      document.querySelector('.user-name').textContent = name;
      
      alert('Profile updated successfully!');
    }
  });
  
  // Mobile menu toggle (basic implementation)
  let mobileMenuOpen = false;
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('user-avatar') && window.innerWidth <= 768) {
      const navMenu = document.querySelector('.nav-menu');
      if (mobileMenuOpen) {
        navMenu.style.display = 'none';
        mobileMenuOpen = false;
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--color-surface)';
        navMenu.style.border = '1px solid var(--color-border)';
        navMenu.style.borderRadius = 'var(--radius-base)';
        navMenu.style.padding = 'var(--space-8)';
        navMenu.style.zIndex = '1000';
        mobileMenuOpen = true;
      }
    }
  });
  
  // Initialize app
  showView('dashboard');
});

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }
  
  if (halfStar) {
    stars += '⭐';
  }
  
  return stars;
}

// PWA Features (Basic Service Worker Registration)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('SW registered: ', registration);
    }).catch(function(registrationError) {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
  // Escape key to close modals or go back
  if (e.key === 'Escape') {
    if (currentView === 'course-detail') {
      showView('courses');
    } else if (currentView === 'learning') {
      if (currentCourse) {
        showCourseDetail(currentCourse.id);
      }
    } else if (currentView === 'quiz' || currentView === 'quiz-results') {
      showView('assessments');
    }
  }
  
  // Arrow keys for quiz navigation
  if (currentView === 'quiz') {
    if (e.key === 'ArrowRight' && currentQuestionIndex < currentQuiz.questions.length - 1) {
      nextQuestion();
    } else if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
      prevQuestion();
    }
  }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  if (currentView === 'quiz' && Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0 && currentQuestionIndex > 0) {
      // Swipe right - previous question
      prevQuestion();
    } else if (swipeDistance < 0 && currentQuestionIndex < currentQuiz.questions.length - 1) {
      // Swipe left - next question
      nextQuestion();
    }
  }
}

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth Scrolling
function smoothScrollTo(element) {
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.course-card, .stat-card, .achievement-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Export functions for global access
window.showView = showView;
window.showCourseDetail = showCourseDetail;
window.enrollInCourse = enrollInCourse;
window.startLearning = startLearning;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.submitQuiz = submitQuiz;
window.retakeQuiz = retakeQuiz;