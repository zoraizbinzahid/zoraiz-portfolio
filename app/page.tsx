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
  "imageUrl": image.asset->url,
  "projectUrl": coalesce(projectUrl, url, link, liveUrl) 
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
      <Hero/>
      <About bio={data.about?.bio} profileImage={data.about?.profileImageUrl} />
      <Skills skills={data.skills || []} />
      <Projects projects={data.projects || []} />
      <Contact />
    </main>
  );
}