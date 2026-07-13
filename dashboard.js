// dashboard.js - Administration Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Sync with site preference) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  document.documentElement.setAttribute('data-theme', getInitialTheme());

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- 2. Mobile Menu (Hamburger) ---
  const hamburgerBtn = document.getElementById('hamburger-menu-btn');
  const navMenu = document.getElementById('nav-menu-list');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // --- 3. Notification Toast ---
  const successToast = document.getElementById('success-toast');
  const showToast = (message) => {
    const toastText = document.getElementById('toast-message-text');
    if (toastText) {
      toastText.textContent = message;
    }
    successToast.classList.add('show');
    setTimeout(() => {
      successToast.classList.remove('show');
    }, 3000);
  };

  // --- 4. Helper: HTML Escaping to prevent XSS ---
  const escapeHTML = (str) => {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  };

  // --- 5. Data Fetching and Rendering ---
  const loadingView = document.getElementById('loading-view');
  const emptyView = document.getElementById('empty-view');
  const tableView = document.getElementById('table-view');
  const tbody = document.getElementById('messages-tbody');
  
  const statTotal = document.getElementById('stat-total');
  const statToday = document.getElementById('stat-today');
  const refreshBtn = document.getElementById('refresh-btn');

  const updateStats = (messages) => {
    statTotal.textContent = messages.length;
    
    // Count submissions today
    const todayStr = new Date().toDateString();
    const todayCount = messages.filter(msg => {
      return new Date(msg.timestamp).toDateString() === todayStr;
    }).length;
    
    statToday.textContent = todayCount;
  };

  const fetchMessages = () => {
    loadingView.style.display = 'block';
    emptyView.style.display = 'none';
    tableView.style.display = 'none';
    tbody.innerHTML = '';

    fetch('/api/messages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to retrieve messages');
        }
        return response.json();
      })
      .then(messages => {
        loadingView.style.display = 'none';
        updateStats(messages);

        if (messages.length === 0) {
          emptyView.style.display = 'block';
          return;
        }

        messages.forEach(msg => {
          const tr = document.createElement('tr');
          tr.id = `row-${msg.id}`;
          
          const formattedDate = new Date(msg.timestamp).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          });

          tr.innerHTML = `
            <td class="message-date">${escapeHTML(formattedDate)}</td>
            <td style="font-weight: 600;">${escapeHTML(msg.name)}</td>
            <td><a href="mailto:${escapeHTML(msg.email)}">${escapeHTML(msg.email)}</a></td>
            <td style="max-width: 300px; word-wrap: break-word;">${escapeHTML(msg.message)}</td>
            <td style="text-align: right;">
              <button class="btn-delete" data-id="${msg.id}">Delete</button>
            </td>
          `;
          
          tbody.appendChild(tr);
        });

        // Add event listeners to delete buttons
        const deleteBtns = tbody.querySelectorAll('.btn-delete');
        deleteBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const messageId = btn.getAttribute('data-id');
            deleteMessage(messageId);
          });
        });

        tableView.style.display = 'block';
      })
      .catch(err => {
        loadingView.style.display = 'none';
        emptyView.style.display = 'block';
        showToast('Error loading messages from the server.');
        console.error(err);
      });
  };

  const deleteMessage = (id) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    fetch(`/api/messages/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast('Message deleted successfully.');
          // Re-fetch data to update UI and counters
          fetchMessages();
        } else {
          showToast(data.error || 'Failed to delete message.');
        }
      })
      .catch(err => {
        showToast('Error connecting to the server.');
        console.error(err);
      });
  };

  // Bind refresh click
  refreshBtn.addEventListener('click', fetchMessages);

  // Initial load
  fetchMessages();
});
