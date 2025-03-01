#!/usr/bin/env python3
"""
Script to upload sample content to Strapi CMS including authors, categories, tags, and articles.
"""

import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv
import random
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

# Sample authors data
authors = [
    {
        "name": "Alex Johnson",
        "slug": "alex-johnson",
        "email": "alex.johnson@example.com",
        "bio": "Alex is a senior developer with over 10 years of experience in web development.",
        "jobTitle": "Senior Developer",
        "expertise": "React, Next.js, Node.js",
    },
    {
        "name": "Samantha Lee",
        "slug": "samantha-lee",
        "email": "samantha.lee@example.com",
        "bio": "Samantha is a UX/UI designer who specializes in creating beautiful and functional interfaces.",
        "jobTitle": "UX/UI Designer",
        "expertise": "UI Design, User Research, Figma",
    },
    {
        "name": "Michael Chen",
        "slug": "michael-chen",
        "email": "michael.chen@example.com",
        "bio": "Michael is a backend developer with expertise in Python and database optimization.",
        "jobTitle": "Backend Developer",
        "expertise": "Python, FastAPI, PostgreSQL",
    },
    {
        "name": "Emily Rodriguez",
        "slug": "emily-rodriguez",
        "email": "emily.rodriguez@example.com",
        "bio": "Emily is a DevOps engineer who loves automating deployment processes.",
        "jobTitle": "DevOps Engineer",
        "expertise": "Docker, Kubernetes, CI/CD",
    },
    {
        "name": "David Kim",
        "slug": "david-kim",
        "email": "david.kim@example.com",
        "bio": "David is a full-stack developer who enjoys building scalable web applications.",
        "jobTitle": "Full-Stack Developer",
        "expertise": "JavaScript, TypeScript, React, Node.js",
    },
]

# Sample categories data
categories = [
    {
        "name": "Web Development",
        "slug": "web-development",
        "description": "Articles about web development technologies and best practices.",
    },
    {
        "name": "UI/UX Design",
        "slug": "ui-ux-design",
        "description": "Articles about user interface and user experience design.",
    },
    {
        "name": "DevOps",
        "slug": "devops",
        "description": "Articles about DevOps practices, tools, and methodologies.",
    },
    {
        "name": "Backend Development",
        "slug": "backend-development",
        "description": "Articles about backend development, APIs, and databases.",
    },
    {
        "name": "Frontend Development",
        "slug": "frontend-development",
        "description": "Articles about frontend development, frameworks, and libraries.",
    },
]

# Sample tags data
tags = [
    {"name": "React", "slug": "react", "description": "Articles related to React.js"},
    {
        "name": "Python",
        "slug": "python",
        "description": "Articles related to Python programming",
    },
    {
        "name": "Docker",
        "slug": "docker",
        "description": "Articles related to Docker containerization",
    },
    {
        "name": "TypeScript",
        "slug": "typescript",
        "description": "Articles related to TypeScript",
    },
    {
        "name": "Tailwind CSS",
        "slug": "tailwind-css",
        "description": "Articles related to Tailwind CSS",
    },
    {
        "name": "Next.js",
        "slug": "nextjs",
        "description": "Articles related to Next.js framework",
    },
    {
        "name": "FastAPI",
        "slug": "fastapi",
        "description": "Articles related to FastAPI framework",
    },
]

# Sample article data
articles = [
    {
        "title": "Getting Started with Next.js",
        "slug": "getting-started-with-nextjs",
        "summary": "Learn how to build modern web applications with Next.js, the React framework for production.",
        "content": """
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more.

## Why Next.js?

- **Server-side Rendering**: Improves performance and SEO
- **Static Site Generation**: Pre-renders pages at build time
- **API Routes**: Build API endpoints as part of your Next.js app
- **CSS and Sass Support**: Built-in support for CSS and Sass
- **Fast Refresh**: Instant feedback during development

## Getting Started

To create a new Next.js app, run:

```bash
npx create-next-app@latest
```

This will set up a new Next.js project with all the defaults.
        """,
    },
    {
        "title": "Building APIs with FastAPI",
        "slug": "building-apis-with-fastapi",
        "summary": "Discover how to create high-performance APIs with FastAPI, the modern Python web framework.",
        "content": """
# Building APIs with FastAPI

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.6+ based on standard Python type hints.

## Key Features

- **Fast**: Very high performance, on par with NodeJS and Go
- **Easy**: Designed to be easy to use and learn
- **Short**: Minimize code duplication
- **Robust**: Get production-ready code with automatic interactive documentation
- **Standards-based**: Based on (and fully compatible with) the open standards for APIs

## Creating a Simple API

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

This creates a simple API with two endpoints.
        """,
    },
    {
        "title": "Styling with Tailwind CSS",
        "slug": "styling-with-tailwind-css",
        "summary": "Learn how to use Tailwind CSS to create beautiful, responsive designs without writing custom CSS.",
        "content": """
# Styling with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without writing CSS.

## Why Tailwind?

- **Utility-First**: Build complex components from utility classes
- **Responsive**: Easily create responsive designs with responsive utility variants
- **Customizable**: Tailor the framework to your design system
- **Performance**: Remove unused CSS in production for optimal performance

## Getting Started

Install Tailwind CSS via npm:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Configure your template paths in `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the Tailwind directives to your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now you can start using Tailwind's utility classes in your HTML.
        """,
    },
    {
        "title": "Managing State with React Context",
        "slug": "managing-state-with-react-context",
        "summary": "Explore how to use React Context API for state management in your React applications.",
        "content": """
# Managing State with React Context

React Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## When to Use Context

- **Theme Data**: Providing theme information to components
- **User Data**: Making user information available throughout the app
- **Locale Data**: Providing locale preferences to components
- **Authentication**: Managing authentication state

## Creating a Context

```jsx
// Create a Context
const ThemeContext = React.createContext('light');

// Context Provider
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Main />
    </ThemeContext.Provider>
  );
}

// Using the Context
function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

This allows components to access the theme data without prop drilling.
        """,
    },
    {
        "title": "Containerization with Docker",
        "slug": "containerization-with-docker",
        "summary": "Learn how to use Docker to containerize your applications for consistent development and deployment.",
        "content": """
# Containerization with Docker

Docker is a platform for developing, shipping, and running applications in containers.

## Benefits of Docker

- **Consistency**: Same environment across development, testing, and production
- **Isolation**: Applications run in isolated containers
- **Portability**: Run anywhere Docker is installed
- **Efficiency**: Lightweight and fast compared to virtual machines
- **Scalability**: Easy to scale containers horizontally

## Basic Docker Commands

```bash
# Build an image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# List running containers
docker ps

# Stop a container
docker stop container_id

# Remove a container
docker rm container_id
```

## Docker Compose

Docker Compose allows you to define and run multi-container Docker applications:

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

This defines a simple application with a web service and a database.
        """,
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

    # Prepare the author data
    payload = {
        "data": {
            "name": author_data["name"],
            "slug": unique_slug,
            "email": author_data["email"],
            "bio": author_data["bio"],
            "jobTitle": author_data["jobTitle"],
            "expertise": author_data["expertise"],
            "profilePicture": profile_image_id,  # Add profile picture (now required)
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


def create_category(category_data, icon_image_id):
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
            "icon": icon_image_id,  # Add icon (now required)
        }
    }

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


def create_article(article_data, author_ids, category_ids, tag_ids, image_id):
    """Create an article in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{article_data['slug']}-{timestamp}"

    # Select random author, categories, and tags
    author_id = random.choice(author_ids)
    selected_categories = random.sample(category_ids, min(2, len(category_ids)))
    selected_tags = random.sample(tag_ids, min(3, len(tag_ids)))

    # Prepare the article data
    payload = {
        "data": {
            "title": f"{article_data['title']} ({timestamp})",
            "slug": unique_slug,
            "summary": article_data["summary"],
            "content": article_data["content"],
            "author": author_id,
            "categories": selected_categories,
            "tags": selected_tags,
            "readingTime": len(article_data["content"].split()) // 200
            + 1,  # Rough estimate: 200 words per minute
            "publishDate": datetime.now().isoformat(),
            "featuredImage": image_id,  # Always include featuredImage (now required)
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
            f"✅ Created article: {payload['data']['title']} (ID: {article['data']['id']})"
        )
        return article
    else:
        print(f"❌ Failed to create article: {payload['data']['title']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def main():
    """Main function to upload content to Strapi"""
    print("🚀 Starting content upload to Strapi...\n")

    # Upload test image for articles
    print("📝 Uploading article featured images...")
    image_path = os.path.join(os.path.dirname(__file__), "test.png")
    article_image_id = upload_image(image_path, "article_featured_image")
    print(f"✅ Article image uploaded with ID: {article_image_id}\n")

    # Upload author profile images
    print("📝 Uploading author profile images...")
    author_image_ids = []
    for i, author_data in enumerate(authors):
        author_image_id = upload_image(image_path, f"author_{i+1}_profile")
        if author_image_id:
            author_image_ids.append(author_image_id)
    print(f"✅ Uploaded {len(author_image_ids)} author profile images\n")

    # Upload category icons
    print("📝 Uploading category icons...")
    category_icon_ids = []
    for i, category_data in enumerate(categories):
        category_icon_id = upload_image(image_path, f"category_{i+1}_icon")
        if category_icon_id:
            category_icon_ids.append(category_icon_id)
    print(f"✅ Uploaded {len(category_icon_ids)} category icons\n")

    # Create authors
    print("📝 Creating authors...")
    author_ids = []
    for i, author_data in enumerate(authors):
        author_id = create_author(author_data, author_image_ids[i])
        if author_id:
            author_ids.append(author_id)
    print(f"✅ Created {len(author_ids)} authors\n")

    # Create categories
    print("📝 Creating categories...")
    category_ids = []
    for i, category_data in enumerate(categories):
        category_id = create_category(category_data, category_icon_ids[i])
        if category_id:
            category_ids.append(category_id)
    print(f"✅ Created {len(category_ids)} categories\n")

    # Create tags
    print("📝 Creating tags...")
    tag_ids = []
    for tag_data in tags:
        tag_id = create_tag(tag_data)
        if tag_id:
            tag_ids.append(tag_id)
    print(f"✅ Created {len(tag_ids)} tags\n")

    # Create articles
    print("📝 Creating articles...")
    for i, article_data in enumerate(articles, 1):
        print(f"\n[{i}/{len(articles)}] Creating article: {article_data['title']}")
        # Use a new image for each article
        article_specific_image_id = upload_image(image_path, f"article_{i}_featured")
        create_article(
            article_data, author_ids, category_ids, tag_ids, article_specific_image_id
        )

    print("\n✨ Content upload complete!")


if __name__ == "__main__":
    main()
