const skill = {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Skill Name', 
      type: 'string',
      description: 'Example: Next.js, Tailwind, or Python'
    },
    { 
      name: 'icon', 
      title: 'Skill Icon', 
      type: 'image',
      description: 'Upload a PNG or SVG logo for this skill',
      options: {
        hotspot: true, // Allows you to crop the icon inside Sanity
      },
    },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { 
        list: [
          {title: 'Frontend', value: 'frontend'},
          {title: 'Backend', value: 'backend'},
          {title: 'Tools', value: 'tools'}
        ] 
      } 
    },
  ],
};

export default skill;