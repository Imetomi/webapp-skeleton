import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>WebApp - Secure Authentication for Modern Web Applications</title>
        <meta name="description" content="Seamlessly integrate authentication into your application with our powerful, easy-to-use platform. Get started in minutes, not days." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <Hero />
        <Features />
        <Testimonials />
      </Layout>
    </>
  );
};

export default Home;
