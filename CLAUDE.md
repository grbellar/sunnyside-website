# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static website for Sunnyside Solutions, a mobile app development studio based in Wichita, Kansas. The website consists of three main files in the root directory:

- `index.html` - Single-page website with hero section, contact form, animated elements, and favicon support
- `styles.css` - Complete CSS with custom properties, animations, responsive design, and dark/light mode theming
- `script.js` - JavaScript for interactive features, animations, and theme switching functionality

## Architecture

**Static Website Structure:**
- Single-page application without build tools or frameworks
- Pure HTML/CSS/JavaScript with no dependencies
- CSS custom properties for consistent design system with dark/light mode theming
- Responsive design with mobile-first approach
- Contact form uses Formspree service (configured with form ID: xrbapzlz)
- Theme persistence using localStorage
- Favicon support with multiple formats (SVG, PNG, Apple Touch Icon)

**Key Interactive Features:**
- Dark/light mode theme toggle with theme persistence (localStorage)
- Animated sun logo (light mode) and moon logo with stars (dark mode)
- Dynamic hero title text that changes based on theme ("Sunshine-powered" vs "Moonlight-powered")
- Theme-aware header background colors that adapt on scroll
- Floating cards with parallax effects
- Smooth scrolling navigation
- Contact form with validation
- Button ripple effects
- Intersection Observer animations for fade-in effects

**Design System:**
- CSS custom properties in `:root` for light mode and `[data-theme="dark"]` for dark mode
- Light mode: warm colors (oranges, yellows) with sun-themed gradients
- Dark mode: cool colors (blues, purples) with night-themed gradients and moon logo
- Gradient themes: sunset/ocean (light), blue/purple (dark), plus moon gradient
- Inter font family from Google Fonts
- Responsive breakpoints at 768px and 480px

## Development Commands

This is a static website with no build process. To develop:

1. Open `index.html` in a web browser
2. Use a local server for development (e.g., `python -m http.server` or VS Code Live Server)
3. Edit files directly - no compilation needed

**No package.json, build tools, or test frameworks are present.**

## Key Components

**Theme System:**
- Theme toggle button (`#theme-toggle`) switches between light/dark modes
- Theme persistence via localStorage with 'theme' key
- Data attribute `data-theme="dark"` applied to document element
- Dynamic text updates: button text and hero title change based on theme
- Header colors adapt to current theme on scroll

**Logo System:**
- **Sun Logo (Light Mode):** `.sun-logo` class with center and 8 rays, `sunSpin` animation (20s duration)
- **Moon Logo (Dark Mode):** `.moon-logo` class with craters and twinkling stars, `starTwinkle` animation
- Logo visibility controlled by `[data-theme="dark"]` CSS selectors
- Two size variants for both: normal (32px/20px) and small (24px/16px)

**Contact Form:**
- Points to `https://formspree.io/f/xrbapzlz` (configured and functional)
- Includes email and message fields with validation
- Styled to match current theme

**Interactive Elements:**
- Theme toggle updates button text ("feeling sleepy?" vs "good morning!")
- Hero title dynamically changes ("Sunshine-powered" vs "Moonlight-powered")
- Floating cards have parallax scrolling effects
- Header background adapts colors and opacity based on theme and scroll position
- Navigation includes smooth scrolling to sections

## File Organization

All code is contained in the root directory:
- HTML structure and content in `index.html` (includes favicon links and dual logo system)
- All styling, animations, and theme definitions in `styles.css` (light/dark mode CSS custom properties)
- All interactivity, theme switching, and DOM manipulation in `script.js`

**Additional Assets Expected:**
- Favicon files: `favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`

The codebase follows a simple, maintainable structure without external dependencies or complex tooling. The theme system is implemented using CSS custom properties and data attributes, making it easy to extend or modify color schemes.