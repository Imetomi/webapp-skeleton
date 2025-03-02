import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { getArticles, getArticleBySlug, formatDate, getStrapiImageUrl } from '../../utils/strapi';
import { SingleArticleResponse } from '../../types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticlePageProps {
  article: SingleArticleResponse;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  if (!article?.data) {
    return null;
  }

  const { attributes } = article.data;
  const { seo, featuredImage } = attributes;

  // Debug logging for image data
  console.log('Featured Image Data:', featuredImage?.data?.attributes);
  
  // If we have a featured image, log the generated URL
  if (featuredImage?.data?.attributes?.url) {
    console.log('Generated Image URL:', getStrapiImageUrl(featuredImage.data.attributes.url));
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{seo.metaTitle}</title>
        <meta name="title" content={seo.metaTitle} />
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seo.canonicalURL} />
        <meta property="og:title" content={seo.metaTitle} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:image" content={featuredImage?.data?.attributes?.url ? getStrapiImageUrl(featuredImage.data.attributes.url) : ''} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seo.canonicalURL} />
        <meta property="twitter:title" content={seo.metaTitle} />
        <meta property="twitter:description" content={seo.metaDescription} />
        <meta property="twitter:image" content={featuredImage?.data?.attributes?.url ? getStrapiImageUrl(featuredImage.data.attributes.url) : ''} />

        {/* Canonical URL */}
        <link rel="canonical" href={seo.canonicalURL} />

        {/* Robots */}
        <meta name="robots" content={seo.metaRobots} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
        />
      </Head>

      <Navbar isDarkMode={false} toggleDarkMode={() => {}} />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Back to Blog Link */}
        <div className="max-w-3xl mx-auto px-4 pt-24">
          <Link 
            href="/blog"
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Blog
          </Link>
        </div>

        <article className="max-w-3xl mx-auto px-4 pt-8 pb-20">
          {/* Article Header */}
          <header className="mb-12">
            {/* Article Meta */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="uppercase tracking-wider">
                {formatDate(attributes.publishDate)}
              </span>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{attributes.readingTime} min read</span>
              </div>
              <span>•</span>
              <span>By {seo.structuredData.author.name}</span>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {attributes.title}
            </h1>

            {/* Article Summary */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {attributes.summary}
            </p>

            {/* Featured Image */}
            {featuredImage?.data?.attributes && (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
                <Image
                  src={getStrapiImageUrl(featuredImage.data.attributes.url)}
                  alt={featuredImage.data.attributes.alternativeText || attributes.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert prose-primary max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <div className="my-4">
                    <table className="w-full border-collapse text-left" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="border-b border-gray-200 dark:border-gray-800" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr 
                    className="border-b border-gray-100 dark:border-gray-800/50 last:border-none transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50" 
                    {...props} 
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="py-4 pr-8 text-base align-middle" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="py-4 pr-8 text-base font-medium text-gray-600 dark:text-gray-400" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a 
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 no-underline" 
                    {...props}
                  />
                ),
              }}
            >
              {attributes.content}
            </ReactMarkdown>
          </div>

          {/* Author Bio */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              {seo.structuredData.author.image && (
                <Image
                  src={seo.structuredData.author.image}
                  alt={seo.structuredData.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {seo.structuredData.author.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {seo.structuredData.author.description || 'Author'}
                </p>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles(1, 100);
  
  const paths = articles.data.map((article) => ({
    params: { slug: article.attributes.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const article = await getArticleBySlug(slug);

    return {
      props: {
        article,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}; 