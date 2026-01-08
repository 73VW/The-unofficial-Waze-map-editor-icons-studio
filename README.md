# The unofficial Waze map editor icons studio

An unofficial web application for previewing and exploring Waze icon fonts. This tool helps developers browse, search, and copy icon classes from the Waze web icons library.

## Features

- 🔍 **Search & Filter** - Find icons by name or class
- 🎨 **Color Customization** - Preview icons in different colors
- 📏 **Size Variants** - Test different icon sizes
- 🛠️ **Utility Classes** - Explore utility modifiers (borders, rotation, etc.)
- 🌍 **Multilingual** - Available in English and French
- 📋 **Copy to Clipboard** - Quick copy of icon classes
- 📱 **Responsive Design** - Works on all screen sizes

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables (state management, i18n)
│   ├── styles/          # Global styles (SCSS, Tailwind)
│   ├── types/           # TypeScript type definitions
│   └── locales/         # Translation files (en, fr)
├── scripts/             # Build scripts
└── .github/workflows/   # CI/CD configuration
```

## Deployment

This project is configured for automatic deployment to GitHub Pages. When you push a tag (e.g., `v1.0.0`), the CI/CD pipeline will:

1. Extract the version from the tag
2. Update `package.json` with the version
3. Build the application
4. Deploy to GitHub Pages

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **i18next** - Internationalization framework

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the [LICENSE](LICENSE) file for details.

## Disclaimer

**This project is NOT affiliated with, endorsed by, or sponsored by Waze, Google, or any of their subsidiaries or affiliates.**

This is an independent, unofficial tool created for educational and development purposes. All Waze trademarks, logos, and brand names are the property of their respective owners. The Waze icon font referenced in this project is used under fair use for demonstration purposes only.

The author(s) of this project make no representations or warranties regarding the accuracy, completeness, or availability of the Waze icon library. Use this tool at your own risk.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created by the community for the community.

---

Made with ❤️ for developers working with Waze icons
