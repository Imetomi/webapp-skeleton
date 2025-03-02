import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { getArticles } from '../../utils/strapi';
import { ArticleListResponse } from '../../types/blog';
import { formatDate } from '../../utils/strapi';
import { useTheme } from '../../contexts/ThemeContext';

interface BlogPageProps {
  articles: ArticleListResponse;
}

export default function BlogPage({ articles }: BlogPageProps) {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';


  if (!articles?.data || articles.data.length === 0) {
    return (
      <>
        <Head>
          <title>Blog - Insights and Updates</title>
          <meta name="description" content="Insights, updates, and stories from our team" />
        </Head>

        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />

        <main className="min-h-screen bg-white dark:bg-gray-900">
          <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No articles found. Check back soon!
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Blog - Insights and Updates</title>
        <meta name="description" content="Insights, updates, and stories from our team" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Blog Header Section */}
        <div className="pt-32 pb-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights, updates, and stories from our team
          </p>
        </div>

        {/* Articles List */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-16">
            {articles.data.map((article) => {
              return (
                <article key={article.id} className="group">
                  <Link href={`/blog/${article.attributes.slug}`} prefetch scroll={false}>
                    <div className="space-y-4">
                      {/* Article Meta */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="uppercase tracking-wider">
                          {formatDate(article.attributes.publishDate)}
                        </span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{article.attributes.readingTime} min read</span>
                        </div>
                      </div>

                      {/* Article Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {article.attributes.title}
                      </h2>

                      {/* Article Summary */}
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {article.attributes.summary}
                      </p>

                      {/* Read More Link */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300">
                          Read more
                          <svg
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const articles = await getArticles(1, 10);
    return {
      props: {
        articles,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } },
      },
    };
  }
}; 