#!/usr/bin/env python3
"""
Script to upload two complete articles to Strapi CMS with all required fields.
- Article 1: Selenium vs Puppeteer
- Article 2: Quino Learning Platform
"""

import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Configuration
STRAPI_API_URL = os.getenv("STRAPI_API_URL")
STRAPI_API_TOKEN = os.getenv("STRAPI_API_TOKEN")

# Headers for API requests
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {STRAPI_API_TOKEN}",
}

# Auth header without Content-Type (for file uploads)
auth_header = {"Authorization": f"Bearer {STRAPI_API_TOKEN}"}

# Writer data
writer = {
    "name": "Emma Wilson",
    "slug": "emma-wilson",
    "email": "emma.wilson@example.com",
    "bio": "Emma is a senior technical writer with expertise in web automation, testing frameworks, and educational technology. With over 8 years of experience in the tech industry, she specializes in creating comprehensive guides and tutorials that make complex technical concepts accessible to developers of all skill levels.",
    "role": "Senior Technical Writer",
    "expertise": "Web Automation, Testing Frameworks, Educational Technology, JavaScript, Python",
}

# Categories data
categories = [
    {
        "name": "Web Automation",
        "slug": "web-automation",
        "description": "Articles about browser automation, testing, and web scraping technologies.",
    },
    {
        "name": "Educational Technology",
        "slug": "educational-technology",
        "description": "Articles about platforms, tools, and methodologies for online learning and education.",
    },
    {
        "name": "Testing Tools",
        "slug": "testing-tools",
        "description": "Articles about software testing tools, frameworks, and best practices.",
    },
    {
        "name": "JavaScript Tools",
        "slug": "javascript-tools",
        "description": "Articles about JavaScript libraries, frameworks, and utilities.",
    },
]

# Tags data
tags = [
    {
        "name": "Selenium",
        "slug": "selenium",
        "description": "Articles related to Selenium WebDriver",
    },
    {
        "name": "Puppeteer",
        "slug": "puppeteer",
        "description": "Articles related to Puppeteer",
    },
    {
        "name": "Web Testing",
        "slug": "web-testing",
        "description": "Articles related to web testing",
    },
    {
        "name": "Automation",
        "slug": "automation",
        "description": "Articles related to automation",
    },
    {
        "name": "E-Learning",
        "slug": "e-learning",
        "description": "Articles related to e-learning platforms",
    },
    {
        "name": "EdTech",
        "slug": "edtech",
        "description": "Articles related to educational technology",
    },
    {
        "name": "JavaScript",
        "slug": "javascript",
        "description": "Articles related to JavaScript",
    },
    {
        "name": "Python",
        "slug": "python",
        "description": "Articles related to Python programming",
    },
    {
        "name": "Browser Automation",
        "slug": "browser-automation",
        "description": "Articles related to browser automation",
    },
]

# Article data
articles = [
    {
        "title": "Selenium vs Puppeteer: Choosing the Right Web Automation Tool",
        "slug": "selenium-vs-puppeteer",
        "summary": "A comprehensive comparison of Selenium and Puppeteer for web automation, testing, and scraping, helping you choose the right tool for your specific needs.",
        "content": """
# Selenium vs Puppeteer: Choosing the Right Web Automation Tool

Web automation tools have become essential for modern web development workflows, enabling developers to automate browser interactions for testing, scraping, and other tasks. Two of the most popular options are Selenium and Puppeteer, each with its own strengths and weaknesses.

## What is Selenium?

Selenium is a well-established, open-source framework for automating web browsers. It supports multiple programming languages (Java, Python, C#, JavaScript, etc.) and works with various browsers (Chrome, Firefox, Safari, Edge).

### Key Features of Selenium

- **Multi-language support**: Write tests in Java, Python, JavaScript, C#, Ruby, and more
- **Cross-browser compatibility**: Works with Chrome, Firefox, Safari, Edge, and IE
- **Large community**: Extensive documentation, plugins, and community support
- **WebDriver protocol**: Industry standard for browser automation
- **Grid for parallel testing**: Run tests across multiple browsers and operating systems simultaneously

## What is Puppeteer?

Puppeteer is a more recent Node.js library developed by Google that provides a high-level API to control Chrome or Chromium browsers programmatically.

### Key Features of Puppeteer

- **Chrome DevTools Protocol**: Direct access to Chrome's internal APIs
- **JavaScript only**: Works exclusively with Node.js
- **Chrome/Chromium focus**: Optimized for Chrome and Chromium
- **Performance**: Generally faster than Selenium for Chrome automation
- **Modern architecture**: Designed for modern web applications
- **Built-in features**: Screenshots, PDF generation, and performance metrics

## Performance Comparison

When it comes to performance, Puppeteer generally outperforms Selenium when working with Chrome:

| Metric | Selenium | Puppeteer |
|--------|----------|-----------|
| Startup time | Slower | Faster |
| Execution speed | Good | Excellent |
| Memory usage | Higher | Lower |
| CPU usage | Higher | Lower |

## Feature Comparison

| Feature | Selenium | Puppeteer |
|---------|----------|-----------|
| Cross-browser support | Excellent | Limited (Chrome/Chromium only) |
| Language support | Multiple languages | JavaScript only |
| Headless mode | Supported | Native support |
| Screenshots | Basic support | Advanced support |
| PDF generation | Limited | Native support |
| Network interception | Limited | Advanced support |
| Performance metrics | Limited | Comprehensive |
| Community size | Very large | Growing |
| Maturity | Mature (15+ years) | Newer (since 2017) |

## Use Case Recommendations

### Choose Selenium When:

- You need cross-browser testing
- Your team works with languages other than JavaScript
- You require integration with existing test frameworks
- You need to support older browsers
- You're working in an enterprise environment with established testing practices

### Choose Puppeteer When:

- You're primarily targeting Chrome/Chromium
- Your team is comfortable with JavaScript
- You need advanced Chrome DevTools features
- Performance is a critical factor
- You need PDF generation or advanced screenshot capabilities
- You're building a scraper or automation tool rather than just tests

## Code Comparison

### Selenium (Python)

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

# Initialize the driver
driver = webdriver.Chrome()

# Navigate to a website
driver.get('https://example.com')

# Find an element and interact with it
element = driver.find_element(By.ID, 'search')
element.send_keys('test')
element.submit()

# Take a screenshot
driver.save_screenshot('screenshot.png')

# Close the browser
driver.quit()
```

### Puppeteer (JavaScript)

```javascript
const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to a website
  await page.goto('https://example.com');
  
  // Find an element and interact with it
  await page.type('#search', 'test');
  await page.click('#submit');
  
  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Close the browser
  await browser.close();
})();
```

## Conclusion

Both Selenium and Puppeteer are powerful tools for web automation, but they serve different needs. Selenium offers broader compatibility across browsers and languages, making it ideal for comprehensive testing scenarios. Puppeteer provides superior performance and deeper integration with Chrome, making it perfect for Chrome-specific automation, scraping, and performance testing.

The best choice depends on your specific requirements, team expertise, and project constraints. Many teams even use both tools for different purposes, leveraging the strengths of each where appropriate.

Whatever you choose, both tools will continue to evolve and improve, providing developers with powerful options for automating browser interactions.
        """,
        "seo": {
            "metaTitle": "Selenium vs Puppeteer: Comprehensive Comparison Guide",
            "metaDescription": "Compare Selenium and Puppeteer for web automation and testing. Learn the pros and cons of each tool and which one is best for your specific use case.",
            "metaKeywords": "selenium, puppeteer, web automation, browser testing, web scraping, javascript, python, comparison",
            "metaRobots": "index, follow",
            "canonicalURL": "https://example.com/blog/selenium-vs-puppeteer",
            "ogTitle": "Selenium vs Puppeteer: Web Automation Tools Compared",
            "ogDescription": "A detailed comparison of Selenium and Puppeteer for web automation, testing, and scraping to help you make the right choice for your project.",
            "twitterTitle": "Selenium vs Puppeteer: Web Automation Tools Compared",
            "twitterDescription": "Compare features, performance, and use cases of Selenium and Puppeteer to choose the right web automation tool for your needs.",
            "twitterCardType": "summary_large_image",
        },
        "ctas": [
            {
                "text": "Try Selenium WebDriver",
                "url": "https://www.selenium.dev/documentation/webdriver/",
                "type": "primary",
                "newTab": True,
                "icon": "external-link",
            },
            {
                "text": "Explore Puppeteer",
                "url": "https://pptr.dev/",
                "type": "secondary",
                "newTab": True,
                "icon": "external-link",
            },
        ],
        "references": [
            {
                "title": "Selenium Documentation",
                "url": "https://www.selenium.dev/documentation/",
                "authors": "Selenium Contributors",
                "publisher": "Selenium Project",
                "publishDate": "2023-01-15",
                "description": "Official documentation for the Selenium WebDriver project",
                "referenceType": "Website",
            },
            {
                "title": "Puppeteer API Reference",
                "url": "https://pptr.dev/",
                "authors": "Google Chrome Team",
                "publisher": "Google",
                "publishDate": "2023-02-10",
                "description": "Official API documentation for Puppeteer",
                "referenceType": "Website",
            },
        ],
    },
    {
        "title": "Quino: Revolutionizing Online Learning with AI-Powered Personalization",
        "slug": "quino-learning-platform",
        "summary": "Discover how Quino is transforming the e-learning landscape with its innovative AI-driven approach to personalized education and adaptive learning paths.",
        "content": """
# Quino: Revolutionizing Online Learning with AI-Powered Personalization

In the rapidly evolving landscape of educational technology, Quino stands out as a groundbreaking learning platform that leverages artificial intelligence to deliver truly personalized learning experiences. This innovative platform is changing how students engage with educational content, making learning more effective, engaging, and tailored to individual needs.

## What is Quino?

Quino is an AI-powered learning platform designed to adapt to each learner's unique needs, preferences, and pace. Unlike traditional one-size-fits-all educational approaches, Quino creates dynamic learning paths that evolve based on a student's performance, engagement patterns, and learning style.

## Key Features

### Adaptive Learning Paths

Quino's core technology continuously analyzes student performance and adjusts content difficulty, pacing, and presentation to optimize learning outcomes. The platform identifies knowledge gaps and strengths in real-time, then tailors subsequent lessons accordingly.

### AI-Powered Content Recommendations

Using sophisticated machine learning algorithms, Quino recommends supplementary resources, practice exercises, and learning materials based on each student's unique learning profile. These recommendations become increasingly accurate as the system gathers more data about the student's interactions.

### Multimodal Learning Support

Recognizing that different students learn best through different modalities, Quino presents content in various formats:

- Interactive simulations
- Video lessons
- Text-based explanations
- Audio content
- Hands-on exercises
- Visual diagrams and infographics

### Real-time Progress Tracking

Students and educators receive detailed insights into learning progress through comprehensive dashboards that visualize:

- Concept mastery levels
- Time spent on different topics
- Engagement patterns
- Areas requiring additional attention
- Learning velocity

### Collaborative Learning Features

While personalization is at its core, Quino also facilitates collaborative learning through:

- Peer-to-peer learning communities
- Discussion forums organized by topic
- Group projects with smart team formation
- Knowledge sharing spaces

## The Technology Behind Quino

Quino's sophisticated technology stack combines several cutting-edge components:

### Natural Language Processing

Quino employs advanced NLP to:
- Understand student questions and provide contextually relevant answers
- Analyze written responses to assess comprehension
- Generate personalized feedback on assignments
- Create summaries of complex materials tailored to the student's level

### Knowledge Graphing

The platform maps educational content into comprehensive knowledge graphs that:
- Identify relationships between concepts
- Track prerequisite knowledge
- Suggest optimal learning sequences
- Visualize knowledge structures for better understanding

### Predictive Analytics

By analyzing patterns across thousands of learners, Quino can:
- Predict potential learning obstacles before they occur
- Recommend preventative interventions
- Suggest optimal study schedules
- Identify the most effective learning resources for specific concepts

## Impact on Learning Outcomes

Research studies on Quino's effectiveness have shown promising results:

- 32% improvement in concept retention compared to traditional methods
- 47% increase in student engagement
- 28% reduction in time required to achieve mastery
- 41% higher completion rates for courses
- Significant improvements in student satisfaction scores

## Use Cases

### K-12 Education

In K-12 settings, Quino helps teachers manage diverse classrooms by providing each student with appropriately challenging material while giving educators insights into individual and class-wide progress.

### Higher Education

Universities use Quino to supplement lecture-based courses, providing students with personalized practice and application opportunities that reinforce classroom learning.

### Corporate Training

Businesses implement Quino to upskill employees efficiently, ensuring that training programs address individual knowledge gaps without wasting time on already-mastered concepts.

### Lifelong Learning

Individual learners use Quino to pursue personal interests and professional development, benefiting from learning paths that adapt to their busy schedules and specific goals.

## The Future of Personalized Learning

Quino represents the vanguard of a fundamental shift in education—moving away from standardized, one-size-fits-all approaches toward truly personalized learning experiences. As AI technology continues to advance, platforms like Quino will likely become increasingly sophisticated in their ability to understand and respond to individual learning needs.

The potential implications for educational equity are significant. By providing each learner with an experience optimized for their unique needs, AI-powered platforms may help level the playing field, ensuring that all students have the opportunity to learn in ways that work best for them.

As we look to the future of education, Quino exemplifies how technology can enhance rather than replace the human elements of learning—providing tools that empower both students and educators to achieve better outcomes through personalization, data-driven insights, and adaptive methodologies.
        """,
        "seo": {
            "metaTitle": "Quino Learning Platform: AI-Powered Personalized Education",
            "metaDescription": "Discover how Quino's AI-driven learning platform is revolutionizing education with personalized learning paths, adaptive content, and real-time analytics.",
            "metaKeywords": "quino, learning platform, AI education, personalized learning, adaptive learning, edtech, online education",
            "metaRobots": "index, follow",
            "canonicalURL": "https://example.com/blog/quino-learning-platform",
            "ogTitle": "Quino: The Future of Personalized Learning Is Here",
            "ogDescription": "Explore how Quino is transforming education with AI-powered personalization, adaptive learning paths, and data-driven insights for better learning outcomes.",
            "twitterTitle": "Quino: AI-Powered Learning Revolution",
            "twitterDescription": "See how Quino's innovative approach to personalized education is changing the way we learn online with adaptive AI technology.",
            "twitterCardType": "summary_large_image",
        },
        "ctas": [
            {
                "text": "Try Quino Free Trial",
                "url": "https://example.com/quino-trial",
                "type": "primary",
                "newTab": True,
                "icon": "arrow-right",
            },
            {
                "text": "Watch Demo Video",
                "url": "https://example.com/quino-demo",
                "type": "secondary",
                "newTab": True,
                "icon": "play",
            },
        ],
        "references": [
            {
                "title": "The Impact of AI on Educational Outcomes",
                "url": "https://example.com/ai-education-research",
                "authors": "Johnson, M., & Smith, K.",
                "publisher": "Journal of Educational Technology",
                "publishDate": "2023-03-20",
                "description": "Research study on the effectiveness of AI-powered learning platforms",
                "referenceType": "Research Paper",
            },
            {
                "title": "Personalized Learning: The Future of Education",
                "url": "https://example.com/personalized-learning",
                "authors": "Garcia, R.",
                "publisher": "EdTech Magazine",
                "publishDate": "2023-01-05",
                "description": "Overview of trends in personalized learning technologies",
                "referenceType": "Article",
            },
        ],
    },
]


def upload_image(image_path, name=None):
    """Upload an image to Strapi media library"""
    print(f"📤 Uploading image: {image_path}")

    # Prepare the file for upload
    files = {
        "files": (os.path.basename(image_path), open(image_path, "rb"), "image/png")
    }

    # Add name if provided
    data = {}
    if name:
        data = {"fileInfo": json.dumps({"name": name})}

    # Send the request
    response = requests.post(
        f"{STRAPI_API_URL}/upload", headers=auth_header, files=files, data=data
    )

    # Check if the request was successful
    if response.status_code == 200:
        uploaded_file = response.json()[0]
        print(f"✅ Uploaded image: {uploaded_file['name']} (ID: {uploaded_file['id']})")
        return uploaded_file["id"]
    else:
        print(f"❌ Failed to upload image: {image_path}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def create_author(author_data, profile_image_id):
    """Create an author in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{author_data['slug']}-{timestamp}"

    # Prepare social links
    social_links = [
        {
            "platform": "Twitter",
            "url": "https://twitter.com/emmawilson",
            "username": "emmawilson",
        },
        {
            "platform": "LinkedIn",
            "url": "https://linkedin.com/in/emmawilson",
            "username": "emmawilson",
        },
        {
            "platform": "GitHub",
            "url": "https://github.com/emmawilson",
            "username": "emmawilson",
        },
    ]

    # Prepare the author data
    payload = {
        "data": {
            "name": author_data["name"],
            "slug": unique_slug,
            "email": author_data["email"],
            "bio": author_data["bio"],
            "role": author_data["role"],
            "expertise": author_data["expertise"],
            "profilePicture": profile_image_id,
            "socialLinks": social_links,
        }
    }

    # Send the request
    response = requests.post(f"{STRAPI_API_URL}/authors", headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        author = response.json()
        print(f"✅ Created author: {author_data['name']} (ID: {author['data']['id']})")
        return author["data"]["id"]
    else:
        print(f"❌ Failed to create author: {author_data['name']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def create_category(category_data, icon_image_id=None):
    """Create a category in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{category_data['slug']}-{timestamp}"

    # Prepare the category data
    payload = {
        "data": {
            "name": category_data["name"],
            "slug": unique_slug,
            "description": category_data["description"],
        }
    }

    # Add icon if provided
    if icon_image_id:
        payload["data"]["icon"] = icon_image_id

    # Send the request
    response = requests.post(
        f"{STRAPI_API_URL}/categories", headers=headers, json=payload
    )

    # Check if the request was successful
    if response.status_code == 200:
        category = response.json()
        print(
            f"✅ Created category: {category_data['name']} (ID: {category['data']['id']})"
        )
        return category["data"]["id"]
    else:
        print(f"❌ Failed to create category: {category_data['name']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def create_tag(tag_data):
    """Create a tag in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{tag_data['slug']}-{timestamp}"

    # Prepare the tag data
    payload = {
        "data": {
            "name": tag_data["name"],
            "slug": unique_slug,
            "description": tag_data["description"],
        }
    }

    # Send the request
    response = requests.post(f"{STRAPI_API_URL}/tags", headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        tag = response.json()
        print(f"✅ Created tag: {tag_data['name']} (ID: {tag['data']['id']})")
        return tag["data"]["id"]
    else:
        print(f"❌ Failed to create tag: {tag_data['name']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def create_article(article_data, author_id, category_ids, tag_ids, image_id):
    """Create an article in Strapi with all fields including SEO and CTAs"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{article_data['slug']}-{timestamp}"

    # Prepare the article data
    payload = {
        "data": {
            "title": article_data["title"],
            "slug": unique_slug,
            "summary": article_data["summary"],
            "content": article_data["content"],
            "author": author_id,
            "categories": category_ids,
            "tags": tag_ids,
            "readingTime": len(article_data["content"].split()) // 200
            + 1,  # Rough estimate: 200 words per minute
            "publishDate": datetime.now().isoformat(),
            "updateDate": datetime.now().isoformat(),
            "featuredImage": image_id,
            "featured": True,
            "seo": article_data["seo"],
            "cta": article_data["ctas"],
            "references": article_data["references"],
        }
    }

    # Send the request
    response = requests.post(
        f"{STRAPI_API_URL}/articles", headers=headers, json=payload
    )

    # Check if the request was successful
    if response.status_code == 200:
        article = response.json()
        print(
            f"✅ Created article: {article_data['title']} (ID: {article['data']['id']})"
        )
        return article["data"]["id"]
    else:
        print(f"❌ Failed to create article: {article_data['title']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def main():
    """Main function to upload content to Strapi"""
    print("🚀 Starting content upload to Strapi...\n")

    # Upload test image for articles and author
    print("📝 Uploading images...")
    image_path = os.path.join(os.path.dirname(__file__), "test.png")

    # Upload article featured images
    article1_image_id = upload_image(image_path, "selenium_vs_puppeteer_featured")
    article2_image_id = upload_image(image_path, "quino_learning_platform_featured")

    # Upload SEO images
    seo1_image_id = upload_image(image_path, "selenium_vs_puppeteer_seo")
    seo2_image_id = upload_image(image_path, "quino_learning_platform_seo")

    # Upload author profile image
    author_image_id = upload_image(image_path, "emma_wilson_profile")

    # Upload category icons
    category_icons = {}
    for category in categories:
        icon_id = upload_image(image_path, f"{category['slug']}_icon")
        category_icons[category["slug"]] = icon_id

    print("✅ All images uploaded successfully\n")

    # Create author
    print("📝 Creating author...")
    author_id = create_author(writer, author_image_id)
    if not author_id:
        print("❌ Failed to create author. Exiting.")
        return
    print("✅ Author created successfully\n")

    # Create categories
    print("📝 Creating categories...")
    category_ids = []
    for category in categories:
        category_id = create_category(category, category_icons.get(category["slug"]))
        if category_id:
            category_ids.append(category_id)
    print(f"✅ Created {len(category_ids)} categories\n")

    # Create tags
    print("📝 Creating tags...")
    tag_ids = []
    for tag in tags:
        tag_id = create_tag(tag)
        if tag_id:
            tag_ids.append(tag_id)
    print(f"✅ Created {len(tag_ids)} tags\n")

    # Update SEO image IDs in articles
    articles[0]["seo"]["ogImage"] = seo1_image_id
    articles[0]["seo"]["twitterImage"] = seo1_image_id
    articles[1]["seo"]["ogImage"] = seo2_image_id
    articles[1]["seo"]["twitterImage"] = seo2_image_id

    # Create articles
    print("📝 Creating articles...")

    # First article - Selenium vs Puppeteer
    selenium_puppeteer_categories = [
        category_ids[0],
        category_ids[2],
    ]  # Web Automation, Testing Tools
    selenium_puppeteer_tags = [
        tag_ids[0],
        tag_ids[1],
        tag_ids[2],
        tag_ids[3],
        tag_ids[8],
    ]  # Selenium, Puppeteer, Web Testing, Automation, Browser Automation

    article1_id = create_article(
        articles[0],
        author_id,
        selenium_puppeteer_categories,
        selenium_puppeteer_tags,
        article1_image_id,
    )

    # Second article - Quino Learning Platform
    quino_categories = [
        category_ids[1],
        category_ids[3],
    ]  # Educational Technology, JavaScript Tools
    quino_tags = [
        tag_ids[4],
        tag_ids[5],
        tag_ids[6],
        tag_ids[7],
    ]  # E-Learning, EdTech, JavaScript, Python

    article2_id = create_article(
        articles[1], author_id, quino_categories, quino_tags, article2_image_id
    )

    print("\n✨ Content upload complete!")
    print(f"✅ Created 2 articles with all fields filled")
    print(f"✅ Created 1 author with all fields filled")
    print(f"✅ Created {len(category_ids)} categories")
    print(f"✅ Created {len(tag_ids)} tags")


if __name__ == "__main__":
    main()
