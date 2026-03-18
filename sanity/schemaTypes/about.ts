const about = {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio / Introduction', type: 'text' },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform (e.g. GitHub)', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }
  ],
};

export default about;