import { client } from '@/sanity/lib/client' 
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default async function Home() {
  const data = await client.fetch(`{
    "projects": *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      description,
      techStack,
      tags,
      "imageUrl": image.asset->url
    },
    "about": *[_type == "about"][0] {
      name,
      bio,
      "profileImageUrl": profileImage.asset->url,
      socials
    },
    "skills": *[_type == "skill"] | order(_createdAt asc) {
      _id,
      title,
      // Updated to fetch the full icon asset for your urlFor function
      icon {
        asset->{
          _id,
          _type,
          url
        }
      }
    }
  }`);

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-transparent text-white p-6 md:p-24 selection:bg-cyan-400 selection:text-black">
      
      {/* 1. Hero Section: Big Name Reveal */}
      <Hero/>
      
      {/* 2. About Section */}
      <About bio={data.about?.bio} profileImage={data.about?.profileImageUrl} />
      
      {/* 3. Tech Stack: Restored Icon Grid */}
      <Skills skills={data.skills || []} />
      
      {/* 4. Selected Works: Interactive Project Grid */}
      <Projects projects={data.projects || []} />

      {/* 5. Contact Section */}
      <Contact />
      
    </main>
  );
}