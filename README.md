# Static Site Generator

A modern static site generator built with HTML, CSS, JavaScript, and Node.js libraries. This project provides a simple yet powerful way to create and manage static websites with blog capabilities.

## Features

- 🎨 **Modern Landing Page**: Clean, responsive design with modern aesthetics
- 📝 **Blog Post Template**: Reusable template for consistent blog post styling
- 🔄 **Markdown to HTML Converter**: Convert your Markdown content to beautiful HTML
- 📧 **ConvertKit Integration**: Simple integration with ConvertKit for email marketing
- 📬 **Contact Form**: Interactive contact form with form validation

## Project Structure

```
static-site/
├── src/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── templates/
│   │   ├── landing.html
│   │   └── blog-post.html
│   └── markdown/
│       └── converter.js
├── public/
│   ├── index.html
│   ├── blog/
│   │   └── posts/
│   └── assets/
│       ├── images/
│       └── fonts/
└── package.json
```

## Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd static-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Creating a New Blog Post
1. Create a new Markdown file in the `src/markdown/posts` directory
2. Use the provided template structure
3. Run the converter to generate HTML
4. The post will be available in the `public/blog/posts` directory

### Customizing the Landing Page
Edit the `src/templates/landing.html` file to customize your landing page content and structure.

### Contact Form Setup
1. Configure your ConvertKit API key in the environment variables
2. Customize the form fields in `src/templates/contact.html`
3. The form will automatically integrate with ConvertKit

## Dependencies

- marked (for Markdown conversion)
- express (for local development server)
- nodemailer (for contact form functionality)
- convertkit-api (for email marketing integration)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 