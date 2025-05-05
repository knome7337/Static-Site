const fs = require('fs');
const path = require('path');
const marked = require('marked');
const handlebars = require('handlebars');

// Configure marked options
marked.setOptions({
    gfm: true,
    breaks: true,
    highlight: function(code, lang) {
        return code;
    }
});

// Read the blog post template
const templatePath = path.join(__dirname, '../templates/blog-post.html');
const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));

function convertMarkdownToHtml(markdownPath, outputPath) {
    try {
        // Read the markdown file
        const markdown = fs.readFileSync(markdownPath, 'utf8');
        
        // Extract front matter (metadata) from the markdown
        const frontMatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
        let metadata = {};
        let content = markdown;
        
        if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1];
            content = markdown.slice(frontMatterMatch[0].length);
            
            // Parse front matter
            frontMatter.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    metadata[key.trim()] = valueParts.join(':').trim();
                }
            });
        }
        
        // Convert markdown to HTML
        const htmlContent = marked.parse(content);
        
        // Generate the final HTML using the template
        const finalHtml = template({
            title: metadata.title || 'Untitled Post',
            date: metadata.date || new Date().toISOString().split('T')[0],
            author: metadata.author,
            content: htmlContent
        });
        
        // Ensure the output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write the HTML file
        fs.writeFileSync(outputPath, finalHtml);
        console.log(`Successfully converted ${markdownPath} to ${outputPath}`);
        
    } catch (error) {
        console.error(`Error converting ${markdownPath}:`, error);
    }
}

// Function to process all markdown files in a directory
function processMarkdownDirectory(inputDir, outputDir) {
    if (!fs.existsSync(inputDir)) {
        console.error(`Input directory ${inputDir} does not exist`);
        return;
    }
    
    const files = fs.readdirSync(inputDir);
    files.forEach(file => {
        if (file.endsWith('.md')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(
                outputDir,
                file.replace('.md', '.html')
            );
            convertMarkdownToHtml(inputPath, outputPath);
        }
    });
}

// Export the functions
module.exports = {
    convertMarkdownToHtml,
    processMarkdownDirectory
}; 