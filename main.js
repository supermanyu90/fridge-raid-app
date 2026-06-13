// State
let appState = {
  budget: 0,
  spent: 0,
  groceryList: [],
  mealPlan: [],
  todoList: []
};

// DOM Elements
const inputSection = document.getElementById('input-section');
const loader = document.getElementById('loader');
const resultsSection = document.getElementById('results-section');
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');

// Input fields
const ingredientsInput = document.getElementById('ingredients-input');
const budgetInput = document.getElementById('budget-input');
const scheduleInput = document.getElementById('schedule-input');

// Results containers
const mealPlanContainer = document.getElementById('meal-plan-container');
const groceryListContainer = document.getElementById('grocery-list');
const todoListContainer = document.getElementById('todo-list');

// Budget elements
const budgetTotalEl = document.getElementById('budget-total');
const budgetSpentEl = document.getElementById('budget-spent');
const progressBar = document.getElementById('progress-bar');

// Mock AI Logic
function generateMockPlan(ingredients, budget, schedule) {
  const plan = {
    mealPlan: [
      {
        time: 'Breakfast',
        title: schedule === 'high' ? 'Quick Oat Bowl' : 'Fluffy Scrambled Eggs',
        desc: schedule === 'high' ? 'Overnight oats grab-and-go. Minimal cleanup.' : 'Warm breakfast using any leftover veggies.'
      },
      {
        time: 'Lunch',
        title: 'Fridge Raid Salad',
        desc: `A hearty salad utilizing your expiring ${ingredients || 'greens and veggies'}.`
      },
      {
        time: 'Dinner',
        title: 'One-Pan Skillet',
        desc: 'Minimal cleanup. Uses remaining ingredients and pantry staples for a complete meal.'
      }
    ],
    groceryList: [
      { id: 1, name: 'Fresh Spinach (250g)', price: 65, sub: 'Frozen Spinach', subPrice: 35, isSubstituted: false },
      { id: 2, name: 'Cherry Tomatoes (200g)', price: 85, sub: 'Local Tomatoes', subPrice: 40, isSubstituted: false },
      { id: 3, name: 'Chicken Breast (250g)', price: 160, sub: 'Soya Chunks', subPrice: 45, isSubstituted: false },
      { id: 4, name: 'Avocado (1 pc)', price: 120, sub: 'Skip (Use Pantry Oil)', subPrice: 0, isSubstituted: false },
      { id: 5, name: 'Feta Cheese (200g)', price: 195, sub: 'Malai Paneer', subPrice: 80, isSubstituted: false }
    ],
    todoList: [
      { id: 1, text: 'Wash and chop all vegetables for lunch and dinner.', done: false },
      { id: 2, text: 'Prep overnight oats if you have an early morning.', done: false },
      { id: 3, text: 'Marinate protein (if using) in the morning.', done: false }
    ]
  };

  return plan;
}

// Event Listeners
generateBtn.addEventListener('click', () => {
  const budget = parseFloat(budgetInput.value) || 500;
  const ingredients = ingredientsInput.value;
  const schedule = scheduleInput.value;

  appState.budget = budget;
  budgetTotalEl.textContent = budget.toFixed(0);

  // Show loader, hide inputs
  inputSection.classList.add('hidden');
  loader.classList.remove('hidden');

  // Simulate API delay
  setTimeout(() => {
    const plan = generateMockPlan(ingredients, budget, schedule);
    appState.mealPlan = plan.mealPlan;
    appState.groceryList = plan.groceryList;
    appState.todoList = plan.todoList;

    renderApp();

    loader.classList.add('hidden');
    resultsSection.classList.remove('hidden');
  }, 1500);
});

resetBtn.addEventListener('click', () => {
  resultsSection.classList.add('hidden');
  inputSection.classList.remove('hidden');
  appState = {
    budget: 0,
    spent: 0,
    groceryList: [],
    mealPlan: [],
    todoList: []
  };
});

// Rendering logic
function renderApp() {
  renderMealPlan();
  renderGroceryList();
  renderTodoList();
  updateBudget();
}

function renderMealPlan() {
  mealPlanContainer.innerHTML = '';
  appState.mealPlan.forEach(meal => {
    const mealEl = document.createElement('div');
    mealEl.className = 'meal-item';
    mealEl.innerHTML = `
      <div class="meal-time">${meal.time}</div>
      <div class="meal-title">${meal.title}</div>
      <div class="meal-desc">${meal.desc}</div>
    `;
    mealPlanContainer.appendChild(mealEl);
  });
}

function renderGroceryList() {
  groceryListContainer.innerHTML = '';
  appState.groceryList.forEach(item => {
    const li = document.createElement('li');
    li.className = 'grocery-item';
    
    const currentPrice = item.isSubstituted ? item.subPrice : item.price;
    const btnText = item.isSubstituted ? 'Revert' : 'Substitute';

    let nameHtml = `<div class="item-name">${item.name}</div>`;
    if (item.isSubstituted) {
      nameHtml = `
        <div class="item-name substituted">${item.name}</div>
        <div class="item-name new-sub">↳ ${item.sub}</div>
      `;
    }

    li.innerHTML = `
      <div class="item-info">
        ${nameHtml}
        <div class="item-price">₹${currentPrice.toFixed(0)}</div>
      </div>
      <button class="sub-btn" data-id="${item.id}">${btnText}</button>
    `;
    groceryListContainer.appendChild(li);
  });

  // Attach event listeners to sub buttons
  document.querySelectorAll('.sub-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      toggleSubstitution(id);
    });
  });
}

function renderTodoList() {
  todoListContainer.innerHTML = '';
  appState.todoList.forEach(item => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <label class="todo-label">
        <input type="checkbox" class="todo-checkbox" data-id="${item.id}" ${item.done ? 'checked' : ''}>
        <span class="todo-text">${item.text}</span>
      </label>
    `;
    todoListContainer.appendChild(li);
  });

  // Attach event listeners
  document.querySelectorAll('.todo-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      toggleTodo(id);
    });
  });
}

function updateBudget() {
  appState.spent = appState.groceryList.reduce((acc, item) => {
    return acc + (item.isSubstituted ? item.subPrice : item.price);
  }, 0);

  budgetSpentEl.textContent = `₹${appState.spent.toFixed(0)}`;

  let percentage = (appState.spent / appState.budget) * 100;
  if (percentage > 100) percentage = 100;
  
  progressBar.style.width = `${percentage}%`;

  // Update colors based on budget status
  budgetSpentEl.classList.remove('over-budget', 'warning');
  progressBar.style.backgroundColor = 'var(--success-color)';

  if (appState.spent > appState.budget) {
    budgetSpentEl.classList.add('over-budget');
    progressBar.style.backgroundColor = 'var(--danger-color)';
  } else if (appState.spent > appState.budget * 0.8) {
    budgetSpentEl.classList.add('warning');
    progressBar.style.backgroundColor = 'var(--warning-color)';
  }
}

function toggleSubstitution(id) {
  const item = appState.groceryList.find(i => i.id === id);
  if (item) {
    item.isSubstituted = !item.isSubstituted;
    renderGroceryList();
    updateBudget();
  }
}

function toggleTodo(id) {
  const item = appState.todoList.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
  }
}

// --- Modal Logic ---
const helpFab = document.getElementById('help-fab');
const faqModal = document.getElementById('faq-modal');
const closeModalBtn = document.getElementById('close-modal');

if (helpFab && faqModal && closeModalBtn) {
  helpFab.addEventListener('click', () => {
    faqModal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    faqModal.classList.add('hidden');
  });

  // Close modal when clicking outside of the content box
  faqModal.addEventListener('click', (e) => {
    if (e.target === faqModal) {
      faqModal.classList.add('hidden');
    }
  });
}

// --- Mascot Interactivity ---
const mascotSpeech = document.getElementById('mascot-speech');
const zeroWasteTips = [
  "Hi! I'm Chef Fridge. Let's save money and prevent food waste!",
  "Did you know? Planning meals around what you already have saves an average of ₹1,000 a week!",
  "Got limp veggies? They're perfect for soups or stir-fries!",
  "If your budget is tight, substitute meat for beans or lentils. They are cheap and healthy!",
  "Don't throw away broccoli stalks; peel and chop them for a crunchy snack!",
  "I'm here to help! Tell me what's about to expire, and I'll find a use for it."
];

let tipIndex = 0;
if (mascotSpeech) {
  setInterval(() => {
    tipIndex = (tipIndex + 1) % zeroWasteTips.length;
    // Fade out
    mascotSpeech.style.opacity = 0;
    
    setTimeout(() => {
      mascotSpeech.textContent = zeroWasteTips[tipIndex];
      // Fade in
      mascotSpeech.style.opacity = 1;
    }, 500); // Wait for fade out to complete before changing text
  }, 8000); // Change every 8 seconds

  // Add transition to speech bubble for smooth fading
  mascotSpeech.style.transition = 'opacity 0.5s ease-in-out';
}
