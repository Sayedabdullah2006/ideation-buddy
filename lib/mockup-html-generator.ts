/**
 * DGA Mockup HTML Generator - Working MVP System
 * Generates functional HTML files following the DGA Unified Design System (Platforms Code)
 * Creates a working MVP prototype with navigation, forms, and interactivity
 */

import { ScreenMockup, MockupData } from '@/types';

/**
 * DGA Design System Configuration
 */
const DGA_CONFIG = {
  colors: {
    primary: '#25935F',
    primaryHover: '#1e7a4d',
    neutral: '#6C737F',
    error: '#F04438',
    warning: '#F79009',
    gold: '#F5BD02',
    lavender: '#80519F',
    white: '#FFFFFF',
    black: '#000000',
    lightBg: '#f8f9fa',
    cardBg: '#ffffff',
  },
  fonts: {
    family: 'IBM Plex Sans Arabic, sans-serif',
  },
};

/**
 * Generate the complete CSS for DGA Design System
 */
function generateDGAStyles(): string {
  return `
    :root {
      --dga-primary: ${DGA_CONFIG.colors.primary};
      --dga-primary-hover: ${DGA_CONFIG.colors.primaryHover};
      --dga-neutral: ${DGA_CONFIG.colors.neutral};
      --dga-error: ${DGA_CONFIG.colors.error};
      --dga-warning: ${DGA_CONFIG.colors.warning};
      --dga-gold: ${DGA_CONFIG.colors.gold};
      --dga-lavender: ${DGA_CONFIG.colors.lavender};
      --dga-light-bg: ${DGA_CONFIG.colors.lightBg};
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: ${DGA_CONFIG.fonts.family};
      font-weight: 400;
      color: var(--dga-neutral);
      background-color: var(--dga-light-bg);
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }

    /* Typography */
    h1, h2, h3 { font-weight: 700; color: #000; margin-bottom: 1rem; }
    h4, h5, h6 { font-weight: 600; color: #000; margin-bottom: 0.75rem; }
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    p { line-height: 1.6; }

    /* Links */
    a {
      color: var(--dga-primary);
      text-decoration: none;
      transition: color 0.2s;
    }
    a:hover {
      color: var(--dga-primary-hover);
      text-decoration: underline;
    }

    /* DGA Buttons */
    .dga-btn {
      font-family: ${DGA_CONFIG.fonts.family};
      font-weight: 500;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 1rem;
    }

    .dga-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .dga-btn.dga-primary {
      background-color: var(--dga-primary);
      border-color: var(--dga-primary);
      color: white;
    }

    .dga-btn.dga-primary:hover:not(:disabled) {
      background-color: var(--dga-primary-hover);
      border-color: var(--dga-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 147, 95, 0.3);
    }

    .dga-btn.dga-secondary-outline {
      background-color: transparent;
      border: 2px solid var(--dga-primary);
      color: var(--dga-primary);
    }

    .dga-btn.dga-secondary-outline:hover:not(:disabled) {
      background-color: var(--dga-primary);
      color: white;
    }

    .dga-btn.dga-danger {
      background-color: var(--dga-error);
      border-color: var(--dga-error);
      color: white;
    }

    .dga-btn.dga-danger:hover:not(:disabled) {
      background-color: #d63030;
      border-color: #d63030;
    }

    .dga-btn.dga-ghost {
      background-color: transparent;
      border-color: transparent;
      color: var(--dga-primary);
    }

    .dga-btn.dga-ghost:hover:not(:disabled) {
      background-color: rgba(37, 147, 95, 0.1);
    }

    .dga-btn.btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .dga-btn.btn-lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    .dga-btn.w-full {
      width: 100%;
    }

    /* DGA Header */
    .dga-header {
      background-color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .dga-header .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .dga-header .logo {
      font-weight: 700;
      color: var(--dga-primary);
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dga-header .nav-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .dga-header .nav-link {
      color: var(--dga-neutral);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }

    .dga-header .nav-link:hover,
    .dga-header .nav-link.active {
      color: var(--dga-primary);
      background-color: rgba(37, 147, 95, 0.1);
      text-decoration: none;
    }

    .dga-header .header-actions {
      display: flex;
      gap: 0.75rem;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--dga-neutral);
    }

    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }
      .dga-header .nav-menu,
      .dga-header .header-actions {
        display: none;
        width: 100%;
        flex-direction: column;
      }
      .dga-header .nav-menu.show,
      .dga-header .header-actions.show {
        display: flex;
      }
      .dga-header .nav-link {
        width: 100%;
        text-align: center;
      }
    }

    /* DGA Cards */
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      background-color: white;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .card-body {
      padding: 1.5rem;
    }

    .card-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      background-color: #fafafa;
    }

    .card-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      background-color: #fafafa;
    }

    .card-title {
      font-weight: 600;
      color: #000;
      margin-bottom: 0.5rem;
    }

    .card-text {
      color: var(--dga-neutral);
      font-size: 0.9375rem;
    }

    /* DGA Footer */
    .dga-footer {
      background-color: #1a1a2e;
      color: white;
      padding: 3rem 0 1.5rem;
      margin-top: auto;
    }

    .dga-footer a {
      color: #9ca3af;
    }

    .dga-footer a:hover {
      color: var(--dga-primary);
    }

    .dga-footer h5 {
      color: white;
      margin-bottom: 1rem;
    }

    /* Hero Section */
    .dga-hero {
      background: linear-gradient(135deg, var(--dga-primary) 0%, #1e7a4d 100%);
      color: white;
      padding: 5rem 0;
      text-align: center;
    }

    .dga-hero h1 {
      color: white;
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .dga-hero p {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto 2rem;
    }

    /* Form Controls */
    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-label .required {
      color: var(--dga-error);
    }

    .form-control {
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      border: 1px solid #e5e7eb;
      font-family: inherit;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--dga-primary);
      box-shadow: 0 0 0 3px rgba(37, 147, 95, 0.15);
    }

    .form-control.error {
      border-color: var(--dga-error);
    }

    .form-control.error:focus {
      box-shadow: 0 0 0 3px rgba(240, 68, 56, 0.15);
    }

    textarea.form-control {
      min-height: 120px;
      resize: vertical;
    }

    select.form-control {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236C737F' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: left 1rem center;
      padding-left: 2.5rem;
    }

    .form-check {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-check-input {
      width: 1.25rem;
      height: 1.25rem;
      accent-color: var(--dga-primary);
      cursor: pointer;
    }

    .form-check-label {
      cursor: pointer;
    }

    .form-error {
      color: var(--dga-error);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-hint {
      color: var(--dga-neutral);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    /* Alerts */
    .alert {
      padding: 1rem 1.25rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .alert-success {
      background-color: #d1fae5;
      border: 1px solid var(--dga-primary);
      color: #065f46;
    }

    .alert-danger {
      background-color: #fee2e2;
      border: 1px solid var(--dga-error);
      color: #991b1b;
    }

    .alert-warning {
      background-color: #fef3c7;
      border: 1px solid var(--dga-warning);
      color: #92400e;
    }

    .alert-info {
      background-color: #ede9fe;
      border: 1px solid var(--dga-lavender);
      color: #5b21b6;
    }

    /* Badges */
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
    }

    .badge-primary { background-color: var(--dga-primary); color: white; }
    .badge-warning { background-color: var(--dga-gold); color: #000; }
    .badge-danger { background-color: var(--dga-error); color: white; }
    .badge-info { background-color: var(--dga-lavender); color: white; }
    .badge-neutral { background-color: #e5e7eb; color: #374151; }

    /* Tables */
    .table-container {
      overflow-x: auto;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th,
    .table td {
      padding: 1rem;
      text-align: right;
      border-bottom: 1px solid #e5e7eb;
    }

    .table th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    .table tr:hover {
      background-color: #f9fafb;
    }

    /* Pagination */
    .pagination {
      display: flex;
      justify-content: center;
      gap: 0.25rem;
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
    }

    .pagination a,
    .pagination span {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.5rem;
      height: 2.5rem;
      padding: 0 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      color: var(--dga-neutral);
      transition: all 0.2s;
    }

    .pagination a:hover {
      background-color: var(--dga-primary);
      border-color: var(--dga-primary);
      color: white;
      text-decoration: none;
    }

    .pagination .active span {
      background-color: var(--dga-primary);
      border-color: var(--dga-primary);
      color: white;
    }

    .pagination .disabled span {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .modal-overlay.show {
      opacity: 1;
      visibility: visible;
    }

    .modal {
      background-color: white;
      border-radius: 1rem;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      transform: scale(0.9);
      transition: transform 0.3s;
    }

    .modal-overlay.show .modal {
      transform: scale(1);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 {
      margin: 0;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--dga-neutral);
      line-height: 1;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    /* Toast Notifications */
    .toast-container {
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .toast {
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      animation: slideIn 0.3s ease;
      max-width: 400px;
    }

    .toast.success { border-right: 4px solid var(--dga-primary); }
    .toast.error { border-right: 4px solid var(--dga-error); }
    .toast.warning { border-right: 4px solid var(--dga-warning); }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    /* Sidebar */
    .sidebar {
      background-color: white;
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .sidebar-nav {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sidebar-nav a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: var(--dga-neutral);
      border-radius: 0.5rem;
      transition: all 0.2s;
    }

    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background-color: rgba(37, 147, 95, 0.1);
      color: var(--dga-primary);
      text-decoration: none;
    }

    /* Stats Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background-color: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .stat-card .stat-label {
      color: var(--dga-neutral);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .stat-card .stat-value {
      font-size: 2rem;
      font-weight: 700;
    }

    .stat-card .stat-value.primary { color: var(--dga-primary); }
    .stat-card .stat-value.warning { color: var(--dga-warning); }
    .stat-card .stat-value.danger { color: var(--dga-error); }
    .stat-card .stat-value.info { color: var(--dga-lavender); }

    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .container-fluid {
      padding: 0 1rem;
    }

    /* Grid System */
    .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -0.75rem;
    }

    .col { flex: 1; padding: 0 0.75rem; }
    .col-12 { flex: 0 0 100%; max-width: 100%; padding: 0 0.75rem; }
    .col-6 { flex: 0 0 50%; max-width: 50%; padding: 0 0.75rem; }
    .col-4 { flex: 0 0 33.333%; max-width: 33.333%; padding: 0 0.75rem; }
    .col-3 { flex: 0 0 25%; max-width: 25%; padding: 0 0.75rem; }

    @media (min-width: 768px) {
      .col-md-6 { flex: 0 0 50%; max-width: 50%; }
      .col-md-4 { flex: 0 0 33.333%; max-width: 33.333%; }
      .col-md-3 { flex: 0 0 25%; max-width: 25%; }
      .col-md-8 { flex: 0 0 66.666%; max-width: 66.666%; }
      .col-md-9 { flex: 0 0 75%; max-width: 75%; }
    }

    /* Utilities */
    .text-center { text-align: center; }
    .text-muted { color: var(--dga-neutral); }
    .text-primary { color: var(--dga-primary); }
    .text-danger { color: var(--dga-error); }
    .text-white { color: white; }

    .mb-0 { margin-bottom: 0; }
    .mb-1 { margin-bottom: 0.5rem; }
    .mb-2 { margin-bottom: 1rem; }
    .mb-3 { margin-bottom: 1.5rem; }
    .mb-4 { margin-bottom: 2rem; }
    .mt-2 { margin-top: 1rem; }
    .mt-3 { margin-top: 1.5rem; }
    .mt-4 { margin-top: 2rem; }
    .my-4 { margin-top: 2rem; margin-bottom: 2rem; }

    .p-2 { padding: 1rem; }
    .p-3 { padding: 1.5rem; }
    .p-4 { padding: 2rem; }
    .py-4 { padding-top: 2rem; padding-bottom: 2rem; }
    .py-5 { padding-top: 3rem; padding-bottom: 3rem; }

    .d-flex { display: flex; }
    .d-grid { display: grid; }
    .flex-column { flex-direction: column; }
    .align-items-center { align-items: center; }
    .justify-content-center { justify-content: center; }
    .justify-content-between { justify-content: space-between; }
    .gap-2 { gap: 0.75rem; }
    .gap-3 { gap: 1rem; }
    .gap-4 { gap: 1.5rem; }

    .rounded { border-radius: 0.5rem; }
    .shadow { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

    .bg-white { background-color: white; }
    .bg-light { background-color: var(--dga-light-bg); }

    .list-unstyled {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    /* Focus styles for accessibility */
    *:focus-visible {
      outline: 2px solid var(--dga-primary);
      outline-offset: 2px;
    }

    /* Loading Spinner */
    .spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid #e5e7eb;
      border-top-color: var(--dga-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 4000;
    }

    /* Page Layout */
    .page-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
      padding: 2rem 0;
    }

    /* Tabs */
    .tabs {
      display: flex;
      border-bottom: 2px solid #e5e7eb;
      margin-bottom: 1.5rem;
    }

    .tab-btn {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      cursor: pointer;
      font-weight: 500;
      color: var(--dga-neutral);
      transition: all 0.2s;
    }

    .tab-btn:hover,
    .tab-btn.active {
      color: var(--dga-primary);
      border-bottom-color: var(--dga-primary);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    /* Avatar */
    .avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: rgba(37, 147, 95, 0.1);
      color: var(--dga-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.25rem;
    }

    .avatar.lg {
      width: 6rem;
      height: 6rem;
      font-size: 2rem;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--dga-neutral);
    }

    .empty-state svg {
      width: 4rem;
      height: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  `;
}

/**
 * Generate JavaScript for MVP functionality
 */
function generateMVPJavaScript(screens: ScreenMockup[]): string {
  const screenIds = screens.map(s => s.id);

  return `
    // MVP Application State Management
    const MVPApp = {
      // Application State
      state: {
        user: null,
        isAuthenticated: false,
        currentPage: 'home',
        data: [],
        notifications: [],
        settings: {
          language: 'ar',
          darkMode: false,
          notifications: true
        }
      },

      // Initialize Application
      init() {
        this.loadState();
        this.setupEventListeners();
        this.checkAuth();
        this.updateUI();
        console.log('MVP Application initialized');
      },

      // State Management
      loadState() {
        try {
          const saved = localStorage.getItem('mvp_state');
          if (saved) {
            const parsed = JSON.parse(saved);
            this.state = { ...this.state, ...parsed };
          }
        } catch (e) {
          console.error('Error loading state:', e);
        }
      },

      saveState() {
        try {
          localStorage.setItem('mvp_state', JSON.stringify(this.state));
        } catch (e) {
          console.error('Error saving state:', e);
        }
      },

      // Authentication
      checkAuth() {
        const token = localStorage.getItem('mvp_token');
        if (token && this.state.user) {
          this.state.isAuthenticated = true;
          this.updateAuthUI(true);
        }
      },

      login(email, password) {
        // Simulate login
        if (email && password.length >= 6) {
          this.state.user = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            createdAt: new Date().toISOString()
          };
          this.state.isAuthenticated = true;
          localStorage.setItem('mvp_token', 'demo_token_' + Date.now());
          this.saveState();
          this.showToast('تم تسجيل الدخول بنجاح', 'success');
          this.updateAuthUI(true);
          setTimeout(() => this.navigate('dashboard.html'), 1000);
          return true;
        }
        this.showToast('بيانات غير صحيحة', 'error');
        return false;
      },

      register(name, email, password) {
        if (name && email && password.length >= 6) {
          this.state.user = {
            id: Date.now(),
            email: email,
            name: name,
            createdAt: new Date().toISOString()
          };
          this.state.isAuthenticated = true;
          localStorage.setItem('mvp_token', 'demo_token_' + Date.now());
          this.saveState();
          this.showToast('تم إنشاء الحساب بنجاح', 'success');
          this.updateAuthUI(true);
          setTimeout(() => this.navigate('dashboard.html'), 1000);
          return true;
        }
        this.showToast('يرجى ملء جميع الحقول بشكل صحيح', 'error');
        return false;
      },

      logout() {
        this.state.user = null;
        this.state.isAuthenticated = false;
        localStorage.removeItem('mvp_token');
        this.saveState();
        this.showToast('تم تسجيل الخروج', 'success');
        this.updateAuthUI(false);
        setTimeout(() => this.navigate('index.html'), 500);
      },

      updateAuthUI(isLoggedIn) {
        const loginBtns = document.querySelectorAll('.auth-login-btn');
        const logoutBtns = document.querySelectorAll('.auth-logout-btn');
        const userMenus = document.querySelectorAll('.user-menu');
        const userName = document.querySelectorAll('.user-name');

        loginBtns.forEach(btn => btn.style.display = isLoggedIn ? 'none' : '');
        logoutBtns.forEach(btn => btn.style.display = isLoggedIn ? '' : 'none');
        userMenus.forEach(menu => menu.style.display = isLoggedIn ? '' : 'none');
        userName.forEach(el => el.textContent = this.state.user?.name || '');
      },

      // Navigation
      navigate(page) {
        window.location.href = page;
      },

      // Data Management (CRUD)
      addItem(item) {
        const newItem = {
          id: Date.now(),
          ...item,
          createdAt: new Date().toISOString(),
          status: 'active'
        };
        this.state.data.push(newItem);
        this.saveState();
        this.showToast('تمت الإضافة بنجاح', 'success');
        return newItem;
      },

      updateItem(id, updates) {
        const index = this.state.data.findIndex(item => item.id === id);
        if (index !== -1) {
          this.state.data[index] = { ...this.state.data[index], ...updates };
          this.saveState();
          this.showToast('تم التحديث بنجاح', 'success');
          return this.state.data[index];
        }
        return null;
      },

      deleteItem(id) {
        const index = this.state.data.findIndex(item => item.id === id);
        if (index !== -1) {
          this.state.data.splice(index, 1);
          this.saveState();
          this.showToast('تم الحذف بنجاح', 'success');
          return true;
        }
        return false;
      },

      getItems(filter = {}) {
        let items = [...this.state.data];
        if (filter.status) {
          items = items.filter(item => item.status === filter.status);
        }
        if (filter.search) {
          const search = filter.search.toLowerCase();
          items = items.filter(item =>
            item.title?.toLowerCase().includes(search) ||
            item.name?.toLowerCase().includes(search)
          );
        }
        return items;
      },

      // Toast Notifications
      showToast(message, type = 'success') {
        const container = document.querySelector('.toast-container') || this.createToastContainer();
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = \`
          <span class="toast-icon">\${type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠'}</span>
          <span class="toast-message">\${message}</span>
        \`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
      },

      createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
      },

      // Modal Management
      openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      },

      closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove('show');
          document.body.style.overflow = '';
        }
      },

      // Form Validation
      validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('[required]');

        inputs.forEach(input => {
          const errorEl = input.parentElement.querySelector('.form-error');
          if (!input.value.trim()) {
            input.classList.add('error');
            if (errorEl) errorEl.style.display = 'block';
            isValid = false;
          } else {
            input.classList.remove('error');
            if (errorEl) errorEl.style.display = 'none';
          }

          // Email validation
          if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(input.value)) {
              input.classList.add('error');
              isValid = false;
            }
          }

          // Password validation
          if (input.type === 'password' && input.value && input.value.length < 6) {
            input.classList.add('error');
            isValid = false;
          }
        });

        return isValid;
      },

      // Settings Management
      updateSettings(key, value) {
        this.state.settings[key] = value;
        this.saveState();
        this.showToast('تم حفظ الإعدادات', 'success');
      },

      // Search Functionality
      search(query, items) {
        if (!query) return items;
        const q = query.toLowerCase();
        return items.filter(item =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(q)
          )
        );
      },

      // Setup Event Listeners
      setupEventListeners() {
        // Form submissions
        document.querySelectorAll('form[data-action]').forEach(form => {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!this.validateForm(form)) return;

            const action = form.dataset.action;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            switch(action) {
              case 'login':
                this.login(data.email, data.password);
                break;
              case 'register':
                this.register(data.name, data.email, data.password);
                break;
              case 'add-item':
                this.addItem(data);
                form.reset();
                this.renderItems();
                break;
              case 'update-settings':
                Object.keys(data).forEach(key => this.updateSettings(key, data[key]));
                break;
              case 'contact':
                this.showToast('تم إرسال رسالتك بنجاح', 'success');
                form.reset();
                break;
            }
          });
        });

        // Modal triggers
        document.querySelectorAll('[data-modal]').forEach(trigger => {
          trigger.addEventListener('click', () => {
            this.openModal(trigger.dataset.modal);
          });
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
          el.addEventListener('click', (e) => {
            if (e.target === el) {
              const modal = el.closest('.modal-overlay');
              if (modal) modal.classList.remove('show');
              document.body.style.overflow = '';
            }
          });
        });

        // Logout buttons
        document.querySelectorAll('.auth-logout-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
          });
        });

        // Delete buttons
        document.querySelectorAll('[data-delete]').forEach(btn => {
          btn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من الحذف؟')) {
              this.deleteItem(parseInt(btn.dataset.delete));
              this.renderItems();
            }
          });
        });

        // Search inputs
        document.querySelectorAll('[data-search]').forEach(input => {
          input.addEventListener('input', (e) => {
            this.renderItems({ search: e.target.value });
          });
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const tabGroup = btn.closest('.tabs-container');
            tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if (target) target.classList.add('active');
          });
        });

        // Mobile menu toggle
        document.querySelectorAll('.mobile-menu-toggle').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelector('.nav-menu')?.classList.toggle('show');
            document.querySelector('.header-actions')?.classList.toggle('show');
          });
        });
      },

      // Render items list
      renderItems(filter = {}) {
        const container = document.querySelector('[data-items-list]');
        if (!container) return;

        const items = this.getItems(filter);

        if (items.length === 0) {
          container.innerHTML = \`
            <div class="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <p>لا توجد عناصر</p>
              <button class="dga-btn dga-primary" data-modal="addItemModal">إضافة جديد</button>
            </div>
          \`;
          return;
        }

        container.innerHTML = items.map(item => \`
          <div class="card mb-2">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 class="card-title mb-1">\${item.title || item.name || 'عنصر'}</h5>
                <p class="card-text text-muted mb-0">\${item.description || ''}</p>
              </div>
              <div class="d-flex gap-2">
                <span class="badge badge-\${item.status === 'active' ? 'primary' : 'neutral'}">\${item.status === 'active' ? 'نشط' : 'معلق'}</span>
                <button class="dga-btn dga-ghost btn-sm" onclick="MVPApp.openEditModal(\${item.id})">تعديل</button>
                <button class="dga-btn dga-ghost btn-sm text-danger" data-delete="\${item.id}">حذف</button>
              </div>
            </div>
          </div>
        \`).join('');

        // Re-attach delete listeners
        container.querySelectorAll('[data-delete]').forEach(btn => {
          btn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من الحذف؟')) {
              this.deleteItem(parseInt(btn.dataset.delete));
              this.renderItems(filter);
            }
          });
        });
      },

      // Update dashboard stats
      updateDashboardStats() {
        const total = this.state.data.length;
        const active = this.state.data.filter(i => i.status === 'active').length;
        const pending = total - active;

        document.querySelectorAll('[data-stat="total"]').forEach(el => el.textContent = total);
        document.querySelectorAll('[data-stat="active"]').forEach(el => el.textContent = active);
        document.querySelectorAll('[data-stat="pending"]').forEach(el => el.textContent = pending);
      },

      // Update UI
      updateUI() {
        this.updateAuthUI(this.state.isAuthenticated);
        this.renderItems();
        this.updateDashboardStats();
      }
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => MVPApp.init());

    // Expose globally for onclick handlers
    window.MVPApp = MVPApp;
  `;
}

/**
 * Generate HTML boilerplate with DGA Design System
 */
function generateHTMLBoilerplate(
  title: string,
  content: string,
  navigation?: string[],
  footerNav?: string[],
  screens?: ScreenMockup[],
  includeAuth: boolean = true,
  projectTitle?: string,
  projectContext?: ProjectContext
): string {
  // Generate smart navigation based on screens and MVP features
  const mvpFeatures = projectContext?.mvpFeatures?.core || [];

  const navItems = navigation?.map(item => {
    // Map navigation items to actual pages
    let href = '#';
    if (item === 'الرئيسية' || item.includes('Home')) href = 'index.html';
    else if (item === 'لوحة التحكم' || item.includes('Dashboard')) href = 'dashboard.html';
    else if (item.includes('قائمة') || item.includes('List')) href = 'list.html';
    else if (item.includes('إعدادات') || item.includes('Settings')) href = 'settings.html';
    else if (item.includes('ملف') || item.includes('Profile')) href = 'profile.html';
    else {
      // Try to match with screens
      const matchingScreen = screens?.find(s =>
        s.name?.includes(item) || s.nameEn?.toLowerCase().includes(item.toLowerCase())
      );
      if (matchingScreen) {
        href = `${matchingScreen.id}.html`;
      }
    }
    return `<li><a href="${href}" class="nav-link">${item}</a></li>`;
  }).join('') || '';

  const footerItems = footerNav?.map(item =>
    `<li class="mb-1"><a href="#">${item}</a></li>`
  ).join('') || '';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>

  <!-- Google Fonts - IBM Plex Sans Arabic -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- DGA Custom Styles -->
  <style>
    ${generateDGAStyles()}
  </style>
</head>
<body>
  <div class="page-wrapper">
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="visually-hidden">تخطي إلى المحتوى الرئيسي</a>

    <!-- DGA Header -->
    <header class="dga-header">
      <div class="container">
        <a href="index.html" class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>${projectTitle || 'المنصة'}</span>
        </a>

        <button class="mobile-menu-toggle" aria-label="القائمة">☰</button>

        <ul class="nav-menu">
          ${navItems}
        </ul>

        <div class="header-actions">
          ${includeAuth ? `
          <a href="login.html" class="dga-btn dga-secondary-outline auth-login-btn">تسجيل الدخول</a>
          <a href="register.html" class="dga-btn dga-primary auth-login-btn">إنشاء حساب</a>
          <div class="user-menu" style="display: none;">
            <span class="user-name"></span>
            <a href="#" class="dga-btn dga-ghost auth-logout-btn">خروج</a>
          </div>
          ` : ''}
        </div>
      </div>
    </header>

    <!-- Toast Container -->
    <div class="toast-container"></div>

    <!-- Main Content -->
    <main id="main-content">
      ${content}
    </main>

    <!-- DGA Footer -->
    <footer class="dga-footer">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 mb-3">
            <h5>عن المنصة</h5>
            <p class="text-muted">منصة متكاملة تقدم خدمات رقمية متميزة وفق أعلى معايير الجودة والأمان.</p>
          </div>
          <div class="col-12 col-md-4 mb-3">
            <h5>روابط سريعة</h5>
            <ul class="list-unstyled">
              ${footerItems}
            </ul>
          </div>
          <div class="col-12 col-md-4 mb-3">
            <h5>تواصل معنا</h5>
            <p class="text-muted mb-1">البريد: support@platform.sa</p>
            <p class="text-muted">الهاتف: 920000000</p>
          </div>
        </div>
        <hr style="border-color: #374151; margin: 1.5rem 0;">
        <p class="text-center text-muted mb-0">
          <small>جميع الحقوق محفوظة © ${new Date().getFullYear()} - تم التصميم وفق نظام DGA</small>
        </p>
      </div>
    </footer>
  </div>

  <!-- MVP JavaScript -->
  <script>
    ${generateMVPJavaScript(screens || [])}
  </script>
</body>
</html>`;
}

/**
 * Project context type for dynamic content generation
 */
interface ProjectContext {
  title?: string;
  description?: string;
  personas?: any[];
  selectedSolution?: any;
  businessModel?: any;
  mvpFeatures?: any;
  problemStatement?: string;
}

/**
 * Generate Home Page Content with dynamic business model data
 */
function generateHomeContent(screen: ScreenMockup, projectTitle: string, projectContext?: ProjectContext): string {
  // Extract business model data for dynamic content
  const businessModel = projectContext?.businessModel || {};
  const mvpFeatures = projectContext?.mvpFeatures || {};
  const selectedSolution = projectContext?.selectedSolution || {};
  const personas = projectContext?.personas || [];

  // Get value propositions or fallback
  const valuePropositions = businessModel.valuePropositions || [
    'حل متكامل لمشاكلك',
    'سهولة الاستخدام',
    'دعم متواصل'
  ];

  // Get core features for display
  const coreFeatures = mvpFeatures.core || [];
  const featuresList = coreFeatures.length > 0
    ? coreFeatures.slice(0, 3).map((f: any) => ({ title: f.title, description: f.description }))
    : [
        { title: 'الميزة الأولى', description: 'وصف الميزة الأولى' },
        { title: 'الميزة الثانية', description: 'وصف الميزة الثانية' },
        { title: 'الميزة الثالثة', description: 'وصف الميزة الثالثة' }
      ];

  // Get customer segments
  const customerSegments = businessModel.customerSegments || ['المستخدمين'];
  const targetAudience = customerSegments[0] || 'المستخدمين';

  // Get solution description
  const solutionTitle = selectedSolution.title || projectTitle;
  const solutionDescription = selectedSolution.description || projectContext?.description || screen.description || 'منصة متكاملة تقدم لك أفضل الخدمات الرقمية';

  return `
    <!-- Hero Section -->
    <section class="dga-hero">
      <div class="container">
        <h1>${projectTitle}</h1>
        <p>${solutionDescription}</p>
        <p class="mb-4" style="font-size: 1.1rem; opacity: 0.9;">${valuePropositions[0] || ''}</p>
        <div class="d-flex gap-3 justify-content-center" style="flex-wrap: wrap;">
          <a href="register.html" class="dga-btn dga-primary btn-lg" style="background: white; color: var(--dga-primary);">ابدأ الآن مجاناً</a>
          <a href="#features" class="dga-btn dga-ghost btn-lg text-white">اعرف المزيد</a>
        </div>
      </div>
    </section>

    <!-- Value Propositions Section -->
    <section class="py-5 bg-white">
      <div class="container">
        <h2 class="text-center mb-4">لماذا ${projectTitle}؟</h2>
        <div class="row gap-4 justify-content-center">
          ${valuePropositions.slice(0, 3).map((vp: string, i: number) => `
          <div class="col-12 col-md-4">
            <div class="card text-center">
              <div class="card-body p-4">
                <div class="avatar mx-auto mb-3" style="background: rgba(37, 147, 95, 0.1); width: 60px; height: 60px;">
                  ${['✨', '🎯', '💡'][i] || '⭐'}
                </div>
                <p class="card-text">${vp}</p>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-5">
      <div class="container">
        <h2 class="text-center mb-2">الميزات الرئيسية</h2>
        <p class="text-center text-muted mb-4">كل ما تحتاجه في مكان واحد</p>
        <div class="row gap-4">
          ${featuresList.map((feature: any, i: number) => `
          <div class="col-12 col-md-4">
            <div class="card h-100">
              <div class="card-body p-4">
                <div class="avatar mb-3" style="background: rgba(37, 147, 95, 0.1);">
                  ${['🚀', '🔒', '💬', '📊', '⚡', '🎨'][i] || '✨'}
                </div>
                <h4 class="card-title">${feature.title}</h4>
                <p class="card-text text-muted">${feature.description}</p>
                <a href="dashboard.html" class="text-primary">استكشف المزيد ←</a>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Target Audience Section -->
    ${personas.length > 0 ? `
    <section class="py-5 bg-white">
      <div class="container">
        <h2 class="text-center mb-2">من نخدم؟</h2>
        <p class="text-center text-muted mb-4">حلولنا مصممة خصيصاً لـ</p>
        <div class="row gap-4 justify-content-center">
          ${personas.slice(0, 3).map((persona: any) => `
          <div class="col-12 col-md-4">
            <div class="card">
              <div class="card-body p-4 text-center">
                <div class="avatar lg mx-auto mb-3">
                  ${persona.name?.charAt(0) || '👤'}
                </div>
                <h5>${persona.name}</h5>
                <p class="text-muted small">${persona.occupation}</p>
                <p class="card-text small">${persona.bio?.substring(0, 100) || ''}...</p>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Stats Section -->
    <section class="py-5">
      <div class="container">
        <div class="stats-grid text-center">
          <div class="stat-card">
            <div class="stat-value primary">1000+</div>
            <div class="stat-label">مستخدم نشط</div>
          </div>
          <div class="stat-card">
            <div class="stat-value primary">500+</div>
            <div class="stat-label">عملية مكتملة</div>
          </div>
          <div class="stat-card">
            <div class="stat-value primary">99%</div>
            <div class="stat-label">رضا العملاء</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-white">
      <div class="container text-center">
        <h3 class="mb-2">هل أنت مستعد للبدء؟</h3>
        <p class="text-muted mb-3">انضم إلى ${targetAudience} واستفد من جميع المميزات</p>
        <div class="d-flex gap-3 justify-content-center">
          <a href="register.html" class="dga-btn dga-primary btn-lg">إنشاء حساب مجاني</a>
          <a href="login.html" class="dga-btn dga-secondary-outline btn-lg">تسجيل الدخول</a>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate Login Page Content
 */
function generateLoginContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';

  return `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12" style="max-width: 420px;">
          <div class="card">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <a href="index.html" class="logo d-inline-block mb-3" style="font-size: 1.5rem; font-weight: 700; color: var(--dga-primary);">
                  ${projectTitle}
                </a>
                <h2 class="mb-1">تسجيل الدخول</h2>
                <p class="text-muted">أدخل بياناتك للوصول إلى حسابك</p>
              </div>

              <div class="alert alert-info mb-3" style="text-align: right;">
                <strong>بيانات تجريبية للتجربة:</strong><br>
                البريد: <code style="background:#e0e7ff;padding:2px 6px;border-radius:4px;">test@test.com</code><br>
                كلمة المرور: <code style="background:#e0e7ff;padding:2px 6px;border-radius:4px;">123456</code>
              </div>

              <form data-action="login">
                <div class="form-group">
                  <label class="form-label">البريد الإلكتروني <span class="required">*</span></label>
                  <input type="email" name="email" class="form-control" placeholder="أدخل بريدك الإلكتروني" required>
                  <p class="form-error" style="display: none;">البريد الإلكتروني مطلوب</p>
                </div>

                <div class="form-group">
                  <label class="form-label">كلمة المرور <span class="required">*</span></label>
                  <input type="password" name="password" class="form-control" placeholder="أدخل كلمة المرور" required>
                  <p class="form-error" style="display: none;">كلمة المرور مطلوبة (6 أحرف على الأقل)</p>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="remember">
                    <span class="form-check-label">تذكرني</span>
                  </label>
                  <a href="#" class="text-primary">نسيت كلمة المرور؟</a>
                </div>

                <button type="submit" class="dga-btn dga-primary w-full mb-3">تسجيل الدخول</button>
              </form>

              <div class="text-center">
                <p class="text-muted mb-2">
                  ليس لديك حساب؟ <a href="register.html">إنشاء حساب جديد</a>
                </p>
                <a href="index.html" class="text-muted small">← العودة للرئيسية</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Register Page Content
 */
function generateRegisterContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';
  const businessModel = projectContext?.businessModel || {};
  const valuePropositions = businessModel.valuePropositions || ['استفد من جميع المميزات'];

  return `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12" style="max-width: 420px;">
          <div class="card">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <a href="index.html" class="logo d-inline-block mb-3" style="font-size: 1.5rem; font-weight: 700; color: var(--dga-primary);">
                  ${projectTitle}
                </a>
                <h2 class="mb-1">إنشاء حساب جديد</h2>
                <p class="text-muted">${valuePropositions[0] || 'انضم إلينا واستفد من جميع المميزات'}</p>
              </div>

              <form data-action="register">
                <div class="form-group">
                  <label class="form-label">الاسم الكامل <span class="required">*</span></label>
                  <input type="text" name="name" class="form-control" placeholder="أدخل اسمك الكامل" required>
                </div>

                <div class="form-group">
                  <label class="form-label">البريد الإلكتروني <span class="required">*</span></label>
                  <input type="email" name="email" class="form-control" placeholder="أدخل بريدك الإلكتروني" required>
                </div>

                <div class="form-group">
                  <label class="form-label">كلمة المرور <span class="required">*</span></label>
                  <input type="password" name="password" class="form-control" placeholder="أدخل كلمة المرور (6 أحرف على الأقل)" required>
                  <p class="form-hint">يجب أن تكون 6 أحرف على الأقل</p>
                </div>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" required>
                    <span class="form-check-label">أوافق على <a href="#">الشروط والأحكام</a></span>
                  </label>
                </div>

                <button type="submit" class="dga-btn dga-primary w-full mb-3">إنشاء الحساب</button>
              </form>

              <div class="text-center">
                <p class="text-muted mb-2">
                  لديك حساب؟ <a href="login.html">تسجيل الدخول</a>
                </p>
                <a href="index.html" class="text-muted small">← العودة للرئيسية</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Dashboard Page Content with dynamic features
 */
function generateDashboardContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const mvpFeatures = projectContext?.mvpFeatures || {};
  const coreFeatures = mvpFeatures.core || [];
  const businessModel = projectContext?.businessModel || {};
  const projectTitle = projectContext?.title || 'المنصة';

  // Generate sidebar links based on MVP features
  const sidebarLinks = coreFeatures.slice(0, 4).map((feature: any, i: number) => {
    const icons = ['📊', '📋', '📈', '⚡', '🎯'];
    const id = feature.title?.toLowerCase().replace(/\s+/g, '-') || `feature-${i}`;
    return `<li><a href="${id}.html">${icons[i] || '📌'} ${feature.title}</a></li>`;
  }).join('');

  // Get key activities from business model
  const keyActivities = businessModel.keyActivities || ['إدارة المحتوى', 'متابعة الطلبات', 'التقارير'];

  return `
    <div class="container-fluid py-4">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-12 col-md-3 mb-3">
          <div class="sidebar">
            <div class="p-3 mb-3" style="background: rgba(37, 147, 95, 0.1); border-radius: 0.5rem;">
              <h5 class="text-primary mb-1">${projectTitle}</h5>
              <p class="text-muted small mb-0">لوحة التحكم</p>
            </div>
            <ul class="sidebar-nav">
              <li><a href="dashboard.html" class="active">🏠 الرئيسية</a></li>
              ${sidebarLinks || `
              <li><a href="list.html">📋 العناصر</a></li>
              `}
              <li><a href="profile.html">👤 الملف الشخصي</a></li>
              <li><a href="settings.html">⚙️ الإعدادات</a></li>
            </ul>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-12 col-md-9">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 class="mb-1">لوحة التحكم</h2>
              <p class="text-muted mb-0">مرحباً بك <span class="user-name"></span>، هذه نظرة عامة على نشاطك</p>
            </div>
            <a href="list.html" class="dga-btn dga-primary">+ إضافة جديد</a>
          </div>

          <!-- Stats based on business model -->
          <div class="stats-grid mb-4">
            <div class="stat-card">
              <div class="stat-label">إجمالي العناصر</div>
              <div class="stat-value primary" data-stat="total">0</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">نشط</div>
              <div class="stat-value primary" data-stat="active">0</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">معلق</div>
              <div class="stat-value warning" data-stat="pending">0</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">مكتمل</div>
              <div class="stat-value info" data-stat="completed">0</div>
            </div>
          </div>

          <!-- Quick Actions based on key activities -->
          <div class="row mb-4">
            ${keyActivities.slice(0, 3).map((activity: string, i: number) => `
            <div class="col-12 col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-body text-center p-4">
                  <div class="avatar mx-auto mb-3" style="background: rgba(37, 147, 95, 0.1);">
                    ${['📊', '📋', '📈'][i] || '⚡'}
                  </div>
                  <h5>${activity}</h5>
                  <a href="list.html" class="dga-btn dga-secondary-outline btn-sm mt-2">ابدأ</a>
                </div>
              </div>
            </div>`).join('')}
          </div>

          <!-- Recent Items -->
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h4 class="mb-0">العناصر الأخيرة</h4>
              <a href="list.html" class="text-primary">عرض الكل ←</a>
            </div>
            <div class="card-body" data-items-list>
              <!-- Items will be rendered here by JavaScript -->
              <div class="empty-state">
                <p class="text-muted">لا توجد عناصر بعد</p>
                <button class="dga-btn dga-primary" data-modal="addItemModal">+ إضافة عنصر جديد</button>
              </div>
            </div>
          </div>

          <!-- Features Grid -->
          ${coreFeatures.length > 0 ? `
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">الميزات المتاحة</h4>
            </div>
            <div class="card-body">
              <div class="row">
                ${coreFeatures.slice(0, 6).map((feature: any, i: number) => `
                <div class="col-12 col-md-6 mb-3">
                  <div class="d-flex align-items-start gap-3 p-3 rounded" style="background: var(--dga-light-bg);">
                    <div class="avatar" style="background: rgba(37, 147, 95, 0.1); flex-shrink: 0;">
                      ${['🚀', '📊', '🔒', '💬', '📈', '⚡'][i] || '✨'}
                    </div>
                    <div>
                      <h6 class="mb-1">${feature.title}</h6>
                      <p class="text-muted small mb-0">${feature.description?.substring(0, 80) || ''}...</p>
                    </div>
                  </div>
                </div>`).join('')}
              </div>
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div class="modal-overlay" id="addItemModal">
      <div class="modal">
        <div class="modal-header">
          <h3>إضافة عنصر جديد</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form data-action="add-item">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">العنوان <span class="required">*</span></label>
              <input type="text" name="title" class="form-control" placeholder="أدخل عنوان العنصر" required>
            </div>
            <div class="form-group">
              <label class="form-label">الوصف</label>
              <textarea name="description" class="form-control" rows="3" placeholder="أدخل وصف تفصيلي..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">الحالة</label>
              <select name="status" class="form-control">
                <option value="active">نشط</option>
                <option value="pending">معلق</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="dga-btn dga-secondary-outline modal-close">إلغاء</button>
            <button type="submit" class="dga-btn dga-primary">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Generate List Page Content
 */
function generateListContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';
  const mvpFeatures = projectContext?.mvpFeatures || {};
  const coreFeatures = mvpFeatures.core || [];

  return `
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="d-flex gap-2 list-unstyled text-muted">
          <li><a href="index.html">الرئيسية</a></li>
          <li>/</li>
          <li><a href="dashboard.html">لوحة التحكم</a></li>
          <li>/</li>
          <li class="text-primary">${screen.name || 'قائمة العناصر'}</li>
        </ol>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4" style="flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 class="mb-1">${screen.name || 'قائمة العناصر'}</h2>
          <p class="text-muted mb-0">${screen.description || 'إدارة وتنظيم العناصر'}</p>
        </div>
        <div class="d-flex gap-2">
          <a href="dashboard.html" class="dga-btn dga-secondary-outline">← رجوع</a>
          <button class="dga-btn dga-primary" data-modal="addItemModal">+ إضافة جديد</button>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row gap-3">
            <div class="col-12 col-md-5">
              <input type="search" class="form-control" placeholder="بحث..." data-search>
            </div>
            <div class="col-12 col-md-3">
              <select class="form-control">
                <option value="">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="pending">معلق</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
            <div class="col-12 col-md-3">
              <select class="form-control">
                <option value="">ترتيب حسب</option>
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="name">الاسم</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="card mb-4">
        <div class="card-body" data-items-list>
          <!-- Items will be rendered by JavaScript -->
          <div class="empty-state py-5">
            <div class="text-center">
              <div class="avatar lg mx-auto mb-3" style="background: rgba(37, 147, 95, 0.1);">
                📋
              </div>
              <h4>لا توجد عناصر</h4>
              <p class="text-muted">ابدأ بإضافة عنصر جديد</p>
              <button class="dga-btn dga-primary" data-modal="addItemModal">+ إضافة عنصر</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <ul class="pagination">
        <li class="disabled"><span>السابق</span></li>
        <li class="active"><span>1</span></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">التالي</a></li>
      </ul>
    </div>

    <!-- Add Item Modal -->
    <div class="modal-overlay" id="addItemModal">
      <div class="modal">
        <div class="modal-header">
          <h3>إضافة عنصر جديد</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form data-action="add-item">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">العنوان <span class="required">*</span></label>
              <input type="text" name="title" class="form-control" placeholder="أدخل عنوان العنصر" required>
            </div>
            <div class="form-group">
              <label class="form-label">الوصف</label>
              <textarea name="description" class="form-control" rows="3" placeholder="أدخل وصف تفصيلي..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">الحالة</label>
              <select name="status" class="form-control">
                <option value="active">نشط</option>
                <option value="pending">معلق</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="dga-btn dga-secondary-outline modal-close">إلغاء</button>
            <button type="submit" class="dga-btn dga-primary">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Generate Profile Page Content
 */
function generateProfileContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';

  return `
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="d-flex gap-2 list-unstyled text-muted">
          <li><a href="index.html">الرئيسية</a></li>
          <li>/</li>
          <li><a href="dashboard.html">لوحة التحكم</a></li>
          <li>/</li>
          <li class="text-primary">الملف الشخصي</li>
        </ol>
      </nav>

      <div class="row justify-content-center">
        <div class="col-12" style="max-width: 600px;">
          <div class="card">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="avatar lg mx-auto mb-3">
                  <span class="user-name" style="font-size: 2rem;"></span>
                </div>
                <h3 class="user-name mb-1"></h3>
                <p class="text-muted">عضو في ${projectTitle}</p>
              </div>

              <h4 class="mb-3">معلومات الحساب</h4>

              <form data-action="update-profile">
                <div class="form-group">
                  <label class="form-label">الاسم الكامل</label>
                  <input type="text" name="name" class="form-control" value="">
                </div>

                <div class="form-group">
                  <label class="form-label">البريد الإلكتروني</label>
                  <input type="email" name="email" class="form-control" value="" readonly style="background: #f5f5f5;">
                </div>

                <div class="form-group">
                  <label class="form-label">رقم الهاتف</label>
                  <input type="tel" name="phone" class="form-control" placeholder="05xxxxxxxx">
                </div>

                <div class="d-flex gap-2 mt-4">
                  <button type="submit" class="dga-btn dga-primary">حفظ التغييرات</button>
                  <a href="settings.html" class="dga-btn dga-secondary-outline">الإعدادات</a>
                </div>
              </form>

              <hr class="my-4">

              <div class="d-flex justify-content-between">
                <a href="dashboard.html" class="text-primary">← العودة للوحة التحكم</a>
                <a href="#" class="auth-logout-btn text-danger">تسجيل الخروج</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Settings Page Content
 */
function generateSettingsContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';

  return `
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="d-flex gap-2 list-unstyled text-muted">
          <li><a href="index.html">الرئيسية</a></li>
          <li>/</li>
          <li><a href="dashboard.html">لوحة التحكم</a></li>
          <li>/</li>
          <li class="text-primary">الإعدادات</li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-12 col-md-3 mb-3">
          <div class="sidebar">
            <ul class="sidebar-nav">
              <li><a href="settings.html" class="active">⚙️ عام</a></li>
              <li><a href="settings.html#notifications">🔔 الإشعارات</a></li>
              <li><a href="settings.html#privacy">🔒 الخصوصية</a></li>
              <li><a href="settings.html#security">🛡️ الأمان</a></li>
              <li><a href="profile.html">👤 الملف الشخصي</a></li>
              <li><a href="dashboard.html">← العودة</a></li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-md-9">
          <div class="card">
            <div class="card-body p-4">
              <h3 class="mb-4">إعدادات ${projectTitle}</h3>

              <form data-action="update-settings">
                <h5 class="mb-3">الإعدادات العامة</h5>

                <div class="form-group">
                  <label class="form-label">اللغة</label>
                  <select name="language" class="form-control">
                    <option value="ar" selected>العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">المنطقة الزمنية</label>
                  <select name="timezone" class="form-control">
                    <option selected>توقيت الرياض (GMT+3)</option>
                    <option>توقيت مكة المكرمة</option>
                  </select>
                </div>

                <hr class="my-4">

                <h5 class="mb-3" id="notifications">الإشعارات</h5>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="notifications" checked>
                    <span class="form-check-label">تفعيل الإشعارات</span>
                  </label>
                </div>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="emailUpdates" checked>
                    <span class="form-check-label">استلام التحديثات بالبريد</span>
                  </label>
                </div>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="smsNotifications">
                    <span class="form-check-label">إشعارات الرسائل النصية</span>
                  </label>
                </div>

                <hr class="my-4">

                <h5 class="mb-3" id="privacy">الخصوصية</h5>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="profilePublic">
                    <span class="form-check-label">الملف الشخصي عام</span>
                  </label>
                </div>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="activityVisible">
                    <span class="form-check-label">إظهار النشاط للآخرين</span>
                  </label>
                </div>

                <hr class="my-4">

                <h5 class="mb-3">التفضيلات</h5>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" name="darkMode">
                    <span class="form-check-label">تفعيل الوضع الداكن</span>
                  </label>
                </div>

                <div class="d-flex gap-2 mt-4">
                  <button type="submit" class="dga-btn dga-primary">حفظ الإعدادات</button>
                  <a href="dashboard.html" class="dga-btn dga-secondary-outline">إلغاء</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Form Page Content
 */
function generateFormContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';

  return `
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="d-flex gap-2 list-unstyled text-muted">
          <li><a href="index.html">الرئيسية</a></li>
          <li>/</li>
          <li><a href="dashboard.html">لوحة التحكم</a></li>
          <li>/</li>
          <li><a href="list.html">القائمة</a></li>
          <li>/</li>
          <li class="text-primary">${screen.name}</li>
        </ol>
      </nav>

      <div class="row justify-content-center">
        <div class="col-12" style="max-width: 600px;">
          <div class="card">
            <div class="card-body p-4">
              <h3 class="mb-3">${screen.name}</h3>
              <p class="text-muted mb-4">${screen.description || 'يرجى ملء النموذج التالي'}</p>

              <form data-action="add-item">
                <div class="row">
                  <div class="col-12 col-md-6 form-group">
                    <label class="form-label">الاسم <span class="required">*</span></label>
                    <input type="text" name="name" class="form-control" placeholder="أدخل الاسم" required>
                  </div>
                  <div class="col-12 col-md-6 form-group">
                    <label class="form-label">البريد الإلكتروني <span class="required">*</span></label>
                    <input type="email" name="email" class="form-control" placeholder="أدخل البريد" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">العنوان</label>
                  <input type="text" name="title" class="form-control" placeholder="أدخل العنوان">
                </div>

                <div class="row">
                  <div class="col-12 col-md-6 form-group">
                    <label class="form-label">النوع</label>
                    <select name="type" class="form-control">
                      <option value="">اختر...</option>
                      <option value="1">نوع 1</option>
                      <option value="2">نوع 2</option>
                      <option value="3">نوع 3</option>
                    </select>
                  </div>
                  <div class="col-12 col-md-6 form-group">
                    <label class="form-label">التاريخ</label>
                    <input type="date" name="date" class="form-control">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">الوصف</label>
                  <textarea name="description" class="form-control" rows="4" placeholder="أدخل الوصف التفصيلي..."></textarea>
                </div>

                <div class="form-group">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" required>
                    <span class="form-check-label">أوافق على <a href="#">الشروط والأحكام</a></span>
                  </label>
                </div>

                <div class="d-flex gap-2 mt-4">
                  <button type="submit" class="dga-btn dga-primary">حفظ</button>
                  <a href="list.html" class="dga-btn dga-secondary-outline">إلغاء</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate content based on screen type with project context
 */
function generateScreenContent(screen: ScreenMockup, projectTitle: string, projectContext?: ProjectContext): string {
  const screenName = (screen.nameEn || screen.name || '').toLowerCase();

  if (screenName.includes('home') || screenName.includes('الرئيسية') || screen.name?.includes('الرئيسية')) {
    return generateHomeContent(screen, projectTitle, projectContext);
  }
  if (screenName.includes('login') || screen.name?.includes('تسجيل الدخول')) {
    return generateLoginContent(screen, projectContext);
  }
  if (screenName.includes('register') || screenName.includes('signup') || screen.name?.includes('إنشاء حساب') || screen.name?.includes('تسجيل')) {
    return generateRegisterContent(screen, projectContext);
  }
  if (screenName.includes('dashboard') || screen.name?.includes('لوحة')) {
    return generateDashboardContent(screen, projectContext);
  }
  if (screenName.includes('list') || screen.name?.includes('قائمة') || screen.name?.includes('عرض')) {
    return generateListContent(screen, projectContext);
  }
  if (screenName.includes('profile') || screen.name?.includes('الملف') || screen.name?.includes('حساب')) {
    return generateProfileContent(screen, projectContext);
  }
  if (screenName.includes('settings') || screen.name?.includes('إعدادات')) {
    return generateSettingsContent(screen, projectContext);
  }
  if (screenName.includes('form') || screen.name?.includes('نموذج') || screen.name?.includes('إضافة')) {
    return generateFormContent(screen, projectContext);
  }

  // Default: generate dynamic feature screen
  return generateFeatureScreenContent(screen, projectContext);
}

/**
 * Generate dynamic feature screen content
 */
function generateFeatureScreenContent(screen: ScreenMockup, projectContext?: ProjectContext): string {
  const projectTitle = projectContext?.title || 'المنصة';

  return `
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="d-flex gap-2 list-unstyled text-muted">
          <li><a href="index.html">الرئيسية</a></li>
          <li>/</li>
          <li><a href="dashboard.html">لوحة التحكم</a></li>
          <li>/</li>
          <li class="text-primary">${screen.name}</li>
        </ol>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-1">${screen.name}</h2>
          <p class="text-muted mb-0">${screen.description || ''}</p>
        </div>
        <div class="d-flex gap-2">
          <a href="dashboard.html" class="dga-btn dga-secondary-outline">← رجوع</a>
          <button class="dga-btn dga-primary" data-modal="addItemModal">+ إضافة جديد</button>
        </div>
      </div>

      <!-- Screen Elements -->
      ${screen.elements && screen.elements.length > 0 ? `
      <div class="card mb-4">
        <div class="card-header">
          <h4 class="mb-0">العناصر</h4>
        </div>
        <div class="card-body">
          <ul class="list-unstyled">
            ${screen.elements.map((el: string) => `
            <li class="d-flex align-items-center gap-2 py-2 border-bottom">
              <span class="text-primary">✓</span>
              <span>${el}</span>
            </li>`).join('')}
          </ul>
        </div>
      </div>
      ` : ''}

      <!-- Interactive Elements -->
      ${screen.interactions && screen.interactions.length > 0 ? `
      <div class="card mb-4">
        <div class="card-header">
          <h4 class="mb-0">التفاعلات المتاحة</h4>
        </div>
        <div class="card-body">
          <div class="row">
            ${screen.interactions.map((interaction: string, i: number) => `
            <div class="col-12 col-md-6 mb-3">
              <div class="p-3 rounded" style="background: var(--dga-light-bg);">
                <div class="d-flex align-items-center gap-2">
                  <span class="badge badge-primary">${i + 1}</span>
                  <span>${interaction}</span>
                </div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Actions -->
      <div class="d-flex gap-2 justify-content-center">
        <a href="dashboard.html" class="dga-btn dga-secondary-outline btn-lg">العودة للوحة التحكم</a>
        <a href="list.html" class="dga-btn dga-primary btn-lg">استعراض القائمة</a>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div class="modal-overlay" id="addItemModal">
      <div class="modal">
        <div class="modal-header">
          <h3>إضافة في ${screen.name}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form data-action="add-item">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">العنوان <span class="required">*</span></label>
              <input type="text" name="title" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label">الوصف</label>
              <textarea name="description" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="dga-btn dga-secondary-outline modal-close">إلغاء</button>
            <button type="submit" class="dga-btn dga-primary">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Generate HTML file for a single screen with project context
 */
export function generateScreenHTML(
  screen: ScreenMockup,
  projectTitle: string,
  navigationStructure?: MockupData['navigationStructure'],
  screens?: ScreenMockup[],
  projectContext?: ProjectContext
): string {
  const title = `${projectTitle} - ${screen.name}`;
  const content = generateScreenContent(screen, projectTitle, projectContext);

  return generateHTMLBoilerplate(
    title,
    content,
    navigationStructure?.mainNav,
    navigationStructure?.footerNav,
    screens,
    true,
    projectTitle,
    projectContext
  );
}

/**
 * Generate index HTML file with links to all screens
 */
export function generateIndexHTML(
  mockupData: MockupData,
  projectTitle: string,
  projectContext?: ProjectContext
): string {
  // Find home screen or use first screen
  const homeScreen = mockupData.screens?.find(s =>
    s.nameEn?.toLowerCase().includes('home') ||
    s.name?.includes('الرئيسية')
  ) || mockupData.screens?.[0];

  if (homeScreen) {
    return generateScreenHTML(
      homeScreen,
      projectTitle,
      mockupData.navigationStructure,
      mockupData.screens,
      projectContext
    );
  }

  // Fallback: generate a screens overview page with links
  const screensLinks = mockupData.screens?.map((screen, index) => `
    <div class="col-12 col-md-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="badge badge-primary">${index + 1}</span>
            <h5 class="card-title mb-0">${screen.name}</h5>
          </div>
          <p class="card-text text-muted small mb-2">${screen.nameEn}</p>
          <p class="card-text small mb-3">${screen.description?.substring(0, 100) || ''}...</p>
          <a href="${screen.id}.html" class="dga-btn dga-primary btn-sm w-full">فتح الشاشة</a>
        </div>
      </div>
    </div>
  `).join('') || '';

  const businessModel = projectContext?.businessModel || {};
  const valuePropositions = businessModel.valuePropositions || [];

  const content = `
    <section class="dga-hero">
      <div class="container">
        <h1>${projectTitle}</h1>
        <p>${projectContext?.description || `نظام MVP كامل - ${mockupData.screens?.length || 0} شاشة`}</p>
        ${valuePropositions[0] ? `<p class="mt-2" style="opacity: 0.9;">${valuePropositions[0]}</p>` : ''}
        <div class="d-flex gap-3 justify-content-center mt-4">
          <a href="register.html" class="dga-btn dga-primary btn-lg" style="background: white; color: var(--dga-primary);">ابدأ الآن</a>
          <a href="login.html" class="dga-btn dga-ghost btn-lg text-white">تسجيل الدخول</a>
        </div>
      </div>
    </section>

    <div class="container py-5">
      <h2 class="text-center mb-2">شاشات التطبيق</h2>
      <p class="text-center text-muted mb-4">استعرض جميع شاشات النظام</p>
      <div class="row">
        ${screensLinks}
      </div>
    </div>
  `;

  return generateHTMLBoilerplate(
    projectTitle,
    content,
    mockupData.navigationStructure?.mainNav,
    mockupData.navigationStructure?.footerNav,
    mockupData.screens,
    true,
    projectTitle,
    projectContext
  );
}

/**
 * Extended MockupData with project context
 */
interface ExtendedMockupData extends MockupData {
  projectContext?: ProjectContext;
  businessContext?: {
    valueProposition?: string;
    targetAudience?: string;
    coreFeatures?: string[];
    keyActions?: string[];
  };
}

/**
 * Generate all HTML files as an object for ZIP creation
 */
export function generateAllMockupHTML(
  mockupData: ExtendedMockupData,
  projectTitle: string
): Record<string, string> {
  const files: Record<string, string> = {};

  // Extract project context from mockup data (added by API)
  const projectContext: ProjectContext = mockupData.projectContext || {
    title: projectTitle,
    description: mockupData.businessContext?.valueProposition,
    mvpFeatures: {
      core: mockupData.businessContext?.coreFeatures?.map((f, i) => ({ id: `feature-${i}`, title: f, description: '' })) || []
    }
  };

  // Generate index file (home page)
  files['index.html'] = generateIndexHTML(mockupData, projectTitle, projectContext);

  // Generate individual screen files
  mockupData.screens?.forEach(screen => {
    const filename = `${screen.id}.html`;
    files[filename] = generateScreenHTML(
      screen,
      projectTitle,
      mockupData.navigationStructure,
      mockupData.screens,
      projectContext
    );
  });

  // Generate standard pages if not already created
  const hasLogin = mockupData.screens?.some(s =>
    s.nameEn?.toLowerCase().includes('login') || s.name?.includes('تسجيل الدخول')
  );
  const hasRegister = mockupData.screens?.some(s =>
    s.nameEn?.toLowerCase().includes('register') || s.name?.includes('إنشاء حساب')
  );
  const hasDashboard = mockupData.screens?.some(s =>
    s.nameEn?.toLowerCase().includes('dashboard') || s.name?.includes('لوحة')
  );

  if (!hasLogin) {
    files['login.html'] = generateHTMLBoilerplate(
      `${projectTitle} - تسجيل الدخول`,
      generateLoginContent({ id: 'login', name: 'تسجيل الدخول', nameEn: 'Login', description: '', elements: [], interactions: [], notes: '' }, projectContext),
      mockupData.navigationStructure?.mainNav,
      mockupData.navigationStructure?.footerNav,
      mockupData.screens,
      true,
      projectTitle,
      projectContext
    );
  }

  if (!hasRegister) {
    files['register.html'] = generateHTMLBoilerplate(
      `${projectTitle} - إنشاء حساب`,
      generateRegisterContent({ id: 'register', name: 'إنشاء حساب', nameEn: 'Register', description: '', elements: [], interactions: [], notes: '' }, projectContext),
      mockupData.navigationStructure?.mainNav,
      mockupData.navigationStructure?.footerNav,
      mockupData.screens,
      true,
      projectTitle,
      projectContext
    );
  }

  if (!hasDashboard) {
    files['dashboard.html'] = generateHTMLBoilerplate(
      `${projectTitle} - لوحة التحكم`,
      generateDashboardContent({ id: 'dashboard', name: 'لوحة التحكم', nameEn: 'Dashboard', description: '', elements: [], interactions: [], notes: '' }, projectContext),
      mockupData.navigationStructure?.mainNav,
      mockupData.navigationStructure?.footerNav,
      mockupData.screens,
      true,
      projectTitle,
      projectContext
    );
  }

  // Add list page
  files['list.html'] = generateHTMLBoilerplate(
    `${projectTitle} - قائمة العناصر`,
    generateListContent({ id: 'list', name: 'قائمة العناصر', nameEn: 'Items List', description: '', elements: [], interactions: [], notes: '' }, projectContext),
    mockupData.navigationStructure?.mainNav,
    mockupData.navigationStructure?.footerNav,
    mockupData.screens,
    true,
    projectTitle,
    projectContext
  );

  // Add profile page
  files['profile.html'] = generateHTMLBoilerplate(
    `${projectTitle} - الملف الشخصي`,
    generateProfileContent({ id: 'profile', name: 'الملف الشخصي', nameEn: 'Profile', description: '', elements: [], interactions: [], notes: '' }, projectContext),
    mockupData.navigationStructure?.mainNav,
    mockupData.navigationStructure?.footerNav,
    mockupData.screens,
    true,
    projectTitle,
    projectContext
  );

  // Add settings page
  files['settings.html'] = generateHTMLBoilerplate(
    `${projectTitle} - الإعدادات`,
    generateSettingsContent({ id: 'settings', name: 'الإعدادات', nameEn: 'Settings', description: '', elements: [], interactions: [], notes: '' }, projectContext),
    mockupData.navigationStructure?.mainNav,
    mockupData.navigationStructure?.footerNav,
    mockupData.screens,
    true,
    projectTitle,
    projectContext
  );

  return files;
}

/**
 * Generate SPA JavaScript with router, auth, CRUD, and demo data
 */
function generateSPAJavaScript(screens: ScreenMockup[], projectContext?: ProjectContext): string {
  const businessModel = projectContext?.businessModel || {};
  const mvpFeatures = projectContext?.mvpFeatures || {};
  const coreFeatures = mvpFeatures.core || [];
  const projectTitle = projectContext?.title || 'المنصة';

  // Generate demo items based on project context
  const demoItemsJSON = JSON.stringify([
    { id: 1, title: coreFeatures[0]?.title || 'عنصر تجريبي 1', description: coreFeatures[0]?.description || 'وصف العنصر الأول', status: 'active', createdAt: new Date().toISOString() },
    { id: 2, title: coreFeatures[1]?.title || 'عنصر تجريبي 2', description: coreFeatures[1]?.description || 'وصف العنصر الثاني', status: 'active', createdAt: new Date().toISOString() },
    { id: 3, title: coreFeatures[2]?.title || 'عنصر تجريبي 3', description: coreFeatures[2]?.description || 'وصف العنصر الثالث', status: 'pending', createdAt: new Date().toISOString() },
    { id: 4, title: 'طلب جديد', description: 'طلب في انتظار المراجعة', status: 'pending', createdAt: new Date().toISOString() },
    { id: 5, title: 'مهمة مكتملة', description: 'تم إنجازها بنجاح', status: 'active', createdAt: new Date().toISOString() },
  ]);

  return `
    // SPA MVP Application
    const MVPApp = {
      state: {
        user: null,
        isAuthenticated: false,
        currentPage: 'home',
        data: [],
        notifications: [],
        settings: {
          language: 'ar',
          darkMode: false,
          notifications: true
        }
      },

      // Initialize
      init() {
        this.loadState();
        this.seedDemoData();
        this.setupEventListeners();
        this.checkAuth();
        this.updateUI();
        this.router.init();
        console.log('MVP SPA Application initialized');
      },

      // Seed demo data if empty
      seedDemoData() {
        if (this.state.data.length === 0) {
          this.state.data = ${demoItemsJSON};
          this.saveState();
        }
      },

      // State Management
      loadState() {
        try {
          const saved = localStorage.getItem('mvp_spa_state');
          if (saved) {
            const parsed = JSON.parse(saved);
            this.state = { ...this.state, ...parsed };
          }
        } catch (e) {
          console.error('Error loading state:', e);
        }
      },

      saveState() {
        try {
          localStorage.setItem('mvp_spa_state', JSON.stringify(this.state));
        } catch (e) {
          console.error('Error saving state:', e);
        }
      },

      // SPA Router
      router: {
        history: [],
        currentPage: 'home',

        init() {
          // Listen for postMessage from parent frame
          window.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'navigate') {
              MVPApp.router.showPage(e.data.page);
            }
          });

          // Show initial page
          const hash = window.location.hash.replace('#', '');
          this.showPage(hash || 'home', false);
        },

        showPage(pageId, pushHistory) {
          if (pushHistory === undefined) pushHistory = true;
          // Normalize
          pageId = (pageId || 'home').replace('.html', '').replace('#', '');
          if (pageId === 'index') pageId = 'home';

          // Auth guard
          var protectedPages = ['dashboard', 'list', 'profile', 'settings'];
          if (protectedPages.indexOf(pageId) !== -1 && !MVPApp.state.isAuthenticated) {
            MVPApp.showToast('يجب تسجيل الدخول أولاً', 'warning');
            pageId = 'login';
          }

          // Hide all pages
          document.querySelectorAll('.spa-page').forEach(function(p) {
            p.style.display = 'none';
          });

          // Show target
          var target = document.getElementById('page-' + pageId);
          if (target) {
            target.style.display = 'block';
          } else {
            // Try matching screen IDs
            var allPages = document.querySelectorAll('.spa-page');
            var found = false;
            allPages.forEach(function(p) {
              if (p.id.replace('page-', '') === pageId) {
                p.style.display = 'block';
                found = true;
              }
            });
            if (!found) {
              var home = document.getElementById('page-home');
              if (home) home.style.display = 'block';
              pageId = 'home';
            }
          }

          // Update nav active states
          document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
              link.classList.add('active');
            }
          });

          // Scroll to top
          window.scrollTo(0, 0);

          // History
          if (pushHistory && this.currentPage !== pageId) {
            this.history.push(this.currentPage);
          }
          this.currentPage = pageId;

          // Notify parent frame
          if (window.parent !== window) {
            window.parent.postMessage({ type: 'pageChanged', page: pageId }, '*');
          }

          // Update UI for the new page
          MVPApp.updateUI();
        },

        goBack() {
          if (this.history.length > 0) {
            var prevPage = this.history.pop();
            this.showPage(prevPage, false);
          }
        }
      },

      navigate(page) {
        this.router.showPage(page);
      },

      // Authentication
      checkAuth() {
        var token = localStorage.getItem('mvp_spa_token');
        if (token && this.state.user) {
          this.state.isAuthenticated = true;
          this.updateAuthUI(true);
        }
      },

      login(email, password) {
        if ((email === 'test@test.com' && password === '123456') || (email && password.length >= 6)) {
          this.state.user = {
            id: Date.now(),
            email: email,
            name: email === 'test@test.com' ? 'مستخدم تجريبي' : email.split('@')[0],
            createdAt: new Date().toISOString()
          };
          this.state.isAuthenticated = true;
          localStorage.setItem('mvp_spa_token', 'demo_token_' + Date.now());
          this.saveState();
          this.showToast('تم تسجيل الدخول بنجاح', 'success');
          this.updateAuthUI(true);
          var self = this;
          setTimeout(function() { self.navigate('dashboard'); }, 800);
          return true;
        }
        this.showToast('بيانات غير صحيحة', 'error');
        return false;
      },

      register(name, email, password) {
        if (name && email && password.length >= 6) {
          this.state.user = {
            id: Date.now(),
            email: email,
            name: name,
            createdAt: new Date().toISOString()
          };
          this.state.isAuthenticated = true;
          localStorage.setItem('mvp_spa_token', 'demo_token_' + Date.now());
          this.saveState();
          this.showToast('تم إنشاء الحساب بنجاح', 'success');
          this.updateAuthUI(true);
          var self = this;
          setTimeout(function() { self.navigate('dashboard'); }, 800);
          return true;
        }
        this.showToast('يرجى ملء جميع الحقول بشكل صحيح', 'error');
        return false;
      },

      logout() {
        this.state.user = null;
        this.state.isAuthenticated = false;
        localStorage.removeItem('mvp_spa_token');
        this.saveState();
        this.showToast('تم تسجيل الخروج', 'success');
        this.updateAuthUI(false);
        var self = this;
        setTimeout(function() { self.navigate('home'); }, 500);
      },

      updateAuthUI(isLoggedIn) {
        document.querySelectorAll('.auth-login-btn').forEach(function(btn) { btn.style.display = isLoggedIn ? 'none' : ''; });
        document.querySelectorAll('.auth-logout-btn').forEach(function(btn) { btn.style.display = isLoggedIn ? '' : 'none'; });
        document.querySelectorAll('.user-menu').forEach(function(menu) { menu.style.display = isLoggedIn ? '' : 'none'; });
        document.querySelectorAll('.user-name').forEach(function(el) {
          if (MVPApp.state.user) el.textContent = MVPApp.state.user.name || '';
        });
      },

      // CRUD
      addItem(item) {
        var newItem = Object.assign({ id: Date.now(), createdAt: new Date().toISOString(), status: 'active' }, item);
        this.state.data.push(newItem);
        this.saveState();
        this.showToast('تمت الإضافة بنجاح', 'success');
        return newItem;
      },

      updateItem(id, updates) {
        var index = this.state.data.findIndex(function(item) { return item.id === id; });
        if (index !== -1) {
          this.state.data[index] = Object.assign({}, this.state.data[index], updates);
          this.saveState();
          this.showToast('تم التحديث بنجاح', 'success');
          return this.state.data[index];
        }
        return null;
      },

      deleteItem(id) {
        var index = this.state.data.findIndex(function(item) { return item.id === id; });
        if (index !== -1) {
          this.state.data.splice(index, 1);
          this.saveState();
          this.showToast('تم الحذف بنجاح', 'success');
          return true;
        }
        return false;
      },

      getItems(filter) {
        filter = filter || {};
        var items = this.state.data.slice();
        if (filter.status) {
          items = items.filter(function(item) { return item.status === filter.status; });
        }
        if (filter.search) {
          var search = filter.search.toLowerCase();
          items = items.filter(function(item) {
            return (item.title && item.title.toLowerCase().indexOf(search) !== -1) ||
                   (item.name && item.name.toLowerCase().indexOf(search) !== -1) ||
                   (item.description && item.description.toLowerCase().indexOf(search) !== -1);
          });
        }
        return items;
      },

      // Toast
      showToast(message, type) {
        type = type || 'success';
        var container = document.querySelector('.toast-container') || this.createToastContainer();
        var toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = '<span class="toast-icon">' + (type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠') + '</span><span class="toast-message">' + message + '</span>';
        container.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 4000);
      },

      createToastContainer() {
        var container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
      },

      // Modal
      openModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      },

      closeModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove('show');
          document.body.style.overflow = '';
        }
      },

      // Form Validation
      validateForm(form) {
        var isValid = true;
        var inputs = form.querySelectorAll('[required]');
        inputs.forEach(function(input) {
          var errorEl = input.parentElement.querySelector('.form-error');
          if (!input.value.trim()) {
            input.classList.add('error');
            if (errorEl) errorEl.style.display = 'block';
            isValid = false;
          } else {
            input.classList.remove('error');
            if (errorEl) errorEl.style.display = 'none';
          }
          if (input.type === 'email' && input.value) {
            if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value)) {
              input.classList.add('error');
              isValid = false;
            }
          }
          if (input.type === 'password' && input.value && input.value.length < 6) {
            input.classList.add('error');
            isValid = false;
          }
        });
        return isValid;
      },

      // Settings
      updateSettings(key, value) {
        this.state.settings[key] = value;
        this.saveState();
        this.showToast('تم حفظ الإعدادات', 'success');
      },

      // Setup Event Listeners
      setupEventListeners() {
        var self = this;

        // SPA navigation via data-page attributes (delegated)
        document.addEventListener('click', function(e) {
          var target = e.target.closest('[data-page]');
          if (target) {
            e.preventDefault();
            var page = target.getAttribute('data-page');
            self.navigate(page);
          }
        });

        // Form submissions
        document.addEventListener('submit', function(e) {
          var form = e.target.closest('form[data-action]');
          if (!form) return;
          e.preventDefault();
          if (!self.validateForm(form)) return;

          var action = form.getAttribute('data-action');
          var formData = new FormData(form);
          var data = {};
          formData.forEach(function(value, key) { data[key] = value; });

          switch(action) {
            case 'login':
              self.login(data.email, data.password);
              break;
            case 'register':
              self.register(data.name, data.email, data.password);
              break;
            case 'add-item':
              self.addItem(data);
              form.reset();
              self.renderItems();
              // Close modal if open
              var modal = form.closest('.modal-overlay');
              if (modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
              break;
            case 'update-settings':
              Object.keys(data).forEach(function(key) { self.updateSettings(key, data[key]); });
              break;
            case 'update-profile':
              if (self.state.user) {
                self.state.user.name = data.name || self.state.user.name;
                self.saveState();
                self.showToast('تم تحديث الملف الشخصي', 'success');
                self.updateAuthUI(true);
              }
              break;
            case 'contact':
              self.showToast('تم إرسال رسالتك بنجاح', 'success');
              form.reset();
              break;
          }
        });

        // Modal close buttons (delegated)
        document.addEventListener('click', function(e) {
          if (e.target.closest('.modal-close')) {
            var modal = e.target.closest('.modal-overlay');
            if (modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
          }
          // Click on overlay background
          if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
            document.body.style.overflow = '';
          }
        });

        // Logout buttons (delegated)
        document.addEventListener('click', function(e) {
          if (e.target.closest('.auth-logout-btn')) {
            e.preventDefault();
            self.logout();
          }
        });

        // Delete buttons (delegated)
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('[data-delete]');
          if (btn) {
            if (confirm('هل أنت متأكد من الحذف؟')) {
              self.deleteItem(parseInt(btn.getAttribute('data-delete')));
              self.renderItems();
            }
          }
        });

        // Search inputs
        document.addEventListener('input', function(e) {
          if (e.target.hasAttribute && e.target.hasAttribute('data-search')) {
            self.renderItems({ search: e.target.value });
          }
        });

        // Tabs (delegated)
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('.tab-btn');
          if (btn) {
            var tabGroup = btn.closest('.tabs-container');
            if (tabGroup) {
              tabGroup.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
              tabGroup.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
              btn.classList.add('active');
              var tabTarget = document.getElementById(btn.getAttribute('data-tab'));
              if (tabTarget) tabTarget.classList.add('active');
            }
          }
        });

        // Modal triggers (delegated)
        document.addEventListener('click', function(e) {
          var trigger = e.target.closest('[data-modal]');
          if (trigger && !trigger.closest('.modal-overlay')) {
            self.openModal(trigger.getAttribute('data-modal'));
          }
        });

        // Mobile menu toggle
        document.addEventListener('click', function(e) {
          if (e.target.closest('.mobile-menu-toggle')) {
            var navMenu = document.querySelector('.nav-menu');
            var headerActions = document.querySelector('.header-actions');
            if (navMenu) navMenu.classList.toggle('show');
            if (headerActions) headerActions.classList.toggle('show');
          }
        });
      },

      // Render items list
      renderItems(filter) {
        filter = filter || {};
        var self = this;
        var containers = document.querySelectorAll('[data-items-list]');
        containers.forEach(function(container) {
          // Only render if visible
          var page = container.closest('.spa-page');
          if (page && page.style.display === 'none') return;

          var items = self.getItems(filter);
          if (items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p class="text-muted">لا توجد عناصر</p><button class="dga-btn dga-primary" data-modal="addItemModal">+ إضافة عنصر جديد</button></div>';
            return;
          }
          container.innerHTML = items.map(function(item) {
            return '<div class="card mb-2"><div class="card-body d-flex justify-content-between align-items-center" style="flex-wrap:wrap;gap:0.5rem;"><div style="flex:1;min-width:200px;"><h5 class="card-title mb-1">' + (item.title || item.name || 'عنصر') + '</h5><p class="card-text text-muted mb-0">' + (item.description || '') + '</p></div><div class="d-flex gap-2"><span class="badge badge-' + (item.status === 'active' ? 'primary' : 'neutral') + '">' + (item.status === 'active' ? 'نشط' : 'معلق') + '</span><button class="dga-btn dga-ghost btn-sm text-danger" data-delete="' + item.id + '">حذف</button></div></div></div>';
          }).join('');
        });
      },

      // Update dashboard stats
      updateDashboardStats() {
        var total = this.state.data.length;
        var active = this.state.data.filter(function(i) { return i.status === 'active'; }).length;
        var pending = total - active;
        document.querySelectorAll('[data-stat="total"]').forEach(function(el) { el.textContent = total; });
        document.querySelectorAll('[data-stat="active"]').forEach(function(el) { el.textContent = active; });
        document.querySelectorAll('[data-stat="pending"]').forEach(function(el) { el.textContent = pending; });
        document.querySelectorAll('[data-stat="completed"]').forEach(function(el) { el.textContent = active; });
      },

      // Update UI
      updateUI() {
        this.updateAuthUI(this.state.isAuthenticated);
        this.renderItems();
        this.updateDashboardStats();

        // Fill profile fields if logged in
        if (this.state.user) {
          document.querySelectorAll('input[name="name"]').forEach(function(el) {
            if (el.closest('[data-action="update-profile"]')) {
              el.value = MVPApp.state.user.name || '';
            }
          });
          document.querySelectorAll('input[name="email"]').forEach(function(el) {
            if (el.closest('[data-action="update-profile"]')) {
              el.value = MVPApp.state.user.email || '';
            }
          });
        }
      }
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() { MVPApp.init(); });

    // Expose globally
    window.MVPApp = MVPApp;
  `;
}

/**
 * Generate the full SPA MVP HTML document with all screens
 */
export function generateFullMVPHTML(
  mockupData: ExtendedMockupData,
  projectTitle: string
): string {
  const projectContext: ProjectContext = mockupData.projectContext || {
    title: projectTitle,
    description: mockupData.businessContext?.valueProposition,
    mvpFeatures: {
      core: mockupData.businessContext?.coreFeatures?.map((f, i) => ({ id: `feature-${i}`, title: f, description: '' })) || []
    }
  };

  const screens = mockupData.screens || [];
  const navStructure = mockupData.navigationStructure;

  // Build nav items with data-page attributes
  const navItems = (navStructure?.mainNav || []).map(item => {
    let pageId = 'home';
    if (item === 'الرئيسية' || item.includes('Home')) pageId = 'home';
    else if (item === 'لوحة التحكم' || item.includes('Dashboard')) pageId = 'dashboard';
    else if (item.includes('قائمة') || item.includes('List')) pageId = 'list';
    else if (item.includes('إعدادات') || item.includes('Settings')) pageId = 'settings';
    else if (item.includes('ملف') || item.includes('Profile')) pageId = 'profile';
    else {
      const matchingScreen = screens.find(s =>
        s.name?.includes(item) || s.nameEn?.toLowerCase().includes(item.toLowerCase())
      );
      if (matchingScreen) pageId = matchingScreen.id;
    }
    return `<li><a href="#" data-page="${pageId}" class="nav-link">${item}</a></li>`;
  }).join('');

  const footerItems = (navStructure?.footerNav || []).map(item =>
    `<li class="mb-1"><a href="#">${item}</a></li>`
  ).join('');

  // Generate page sections - collect all screen IDs to avoid duplicates
  const standardPageIds = new Set(['home', 'login', 'register', 'dashboard', 'list', 'profile', 'settings']);
  const pageSections: string[] = [];

  // Helper: determine if a screen matches a standard page
  function getStandardPageId(screen: ScreenMockup): string | null {
    const name = (screen.nameEn || screen.name || '').toLowerCase();
    if (name.includes('home') || screen.name?.includes('الرئيسية')) return 'home';
    if (name.includes('login') || screen.name?.includes('تسجيل الدخول')) return 'login';
    if (name.includes('register') || name.includes('signup') || screen.name?.includes('إنشاء حساب') || screen.name?.includes('تسجيل جديد')) return 'register';
    if (name.includes('dashboard') || screen.name?.includes('لوحة')) return 'dashboard';
    if (name.includes('list') || screen.name?.includes('قائمة') || screen.name?.includes('عرض')) return 'list';
    if (name.includes('profile') || screen.name?.includes('الملف') || screen.name?.includes('حساب')) return 'profile';
    if (name.includes('settings') || screen.name?.includes('إعدادات')) return 'settings';
    return null;
  }

  // Track which standard pages are covered by AI screens
  const coveredStandardPages = new Set<string>();

  // Generate sections for AI-generated screens
  screens.forEach(screen => {
    const stdId = getStandardPageId(screen);
    const pageId = stdId || screen.id;
    if (stdId) coveredStandardPages.add(stdId);

    const content = generateScreenContent(screen, projectTitle, projectContext);
    pageSections.push(`<section class="spa-page" id="page-${pageId}" style="display:none;">${content}</section>`);
  });

  // Add missing standard pages
  const dummyScreen = (id: string, name: string, nameEn: string): ScreenMockup => ({
    id, name, nameEn, description: '', elements: [], interactions: [], notes: ''
  });

  if (!coveredStandardPages.has('home')) {
    const content = generateHomeContent(dummyScreen('home', 'الرئيسية', 'Home'), projectTitle, projectContext);
    pageSections.unshift(`<section class="spa-page" id="page-home" style="display:none;">${content}</section>`);
  }
  if (!coveredStandardPages.has('login')) {
    const content = generateLoginContent(dummyScreen('login', 'تسجيل الدخول', 'Login'), projectContext);
    pageSections.push(`<section class="spa-page" id="page-login" style="display:none;">${content}</section>`);
  }
  if (!coveredStandardPages.has('register')) {
    const content = generateRegisterContent(dummyScreen('register', 'إنشاء حساب', 'Register'), projectContext);
    pageSections.push(`<section class="spa-page" id="page-register" style="display:none;">${content}</section>`);
  }
  if (!coveredStandardPages.has('dashboard')) {
    const content = generateDashboardContent(dummyScreen('dashboard', 'لوحة التحكم', 'Dashboard'), projectContext);
    pageSections.push(`<section class="spa-page" id="page-dashboard" style="display:none;">${content}</section>`);
  }
  if (!coveredStandardPages.has('list')) {
    const content = generateListContent(dummyScreen('list', 'قائمة العناصر', 'Items List'), projectContext);
    pageSections.push(`<section class="spa-page" id="page-list" style="display:none;">${content}</section>`);
  }
  if (!coveredStandardPages.has('profile')) {
    const content = generateProfileContent(dummyScreen('profile', 'الملف الشخصي', 'Profile'), projectContext);
    pageSections.push(`<section class="spa-page" id="page-profile" style="display:none;">${content}</section>`);
  }
  if (!coveredStandardPages.has('settings')) {
    const content = generateSettingsContent(dummyScreen('settings', 'الإعدادات', 'Settings'), projectContext);
    pageSections.push(`<section class="spa-page" id="page-settings" style="display:none;">${content}</section>`);
  }

  // Build full HTML
  let html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectTitle} - MVP Prototype</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${generateDGAStyles()}
    .spa-page { display: none; }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <a href="#main-content" class="visually-hidden">تخطي إلى المحتوى الرئيسي</a>

    <!-- Shared Header -->
    <header class="dga-header">
      <div class="container">
        <a href="#" data-page="home" class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>${projectTitle}</span>
        </a>

        <button class="mobile-menu-toggle" aria-label="القائمة">☰</button>

        <ul class="nav-menu">
          ${navItems}
        </ul>

        <div class="header-actions">
          <a href="#" data-page="login" class="dga-btn dga-secondary-outline auth-login-btn">تسجيل الدخول</a>
          <a href="#" data-page="register" class="dga-btn dga-primary auth-login-btn">إنشاء حساب</a>
          <div class="user-menu" style="display: none;">
            <span class="user-name"></span>
            <a href="#" class="dga-btn dga-ghost auth-logout-btn">خروج</a>
          </div>
        </div>
      </div>
    </header>

    <div class="toast-container"></div>

    <main id="main-content">
      ${pageSections.join('\n')}
    </main>

    <footer class="dga-footer">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 mb-3">
            <h5>عن ${projectTitle}</h5>
            <p class="text-muted">${projectContext?.description || 'منصة متكاملة تقدم خدمات رقمية متميزة وفق أعلى معايير الجودة والأمان.'}</p>
          </div>
          <div class="col-12 col-md-4 mb-3">
            <h5>روابط سريعة</h5>
            <ul class="list-unstyled">${footerItems}</ul>
          </div>
          <div class="col-12 col-md-4 mb-3">
            <h5>تواصل معنا</h5>
            <p class="text-muted mb-1">البريد: support@platform.sa</p>
            <p class="text-muted">الهاتف: 920000000</p>
          </div>
        </div>
        <hr style="border-color: #374151; margin: 1.5rem 0;">
        <p class="text-center text-muted mb-0">
          <small>جميع الحقوق محفوظة © ${new Date().getFullYear()} - ${projectTitle}</small>
        </p>
      </div>
    </footer>
  </div>

  <script>
    ${generateSPAJavaScript(screens, projectContext)}
  </script>
</body>
</html>`;

  // Post-process: rewrite all remaining .html href links to SPA navigation
  html = html.replace(
    /href="([a-zA-Z0-9\-_]+)\.html"/g,
    (_match, page) => {
      const pageId = page === 'index' ? 'home' : page;
      return `href="#" data-page="${pageId}"`;
    }
  );

  return html;
}

export default {
  generateScreenHTML,
  generateIndexHTML,
  generateAllMockupHTML,
  generateFullMVPHTML,
};
