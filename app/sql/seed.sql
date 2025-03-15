-- Seed topics
INSERT INTO topics (name, slug, created_at) VALUES
('Web Development', 'web-development', NOW()),
('Mobile Development', 'mobile-development', NOW()),
('UI/UX Design', 'ui-ux-design', NOW()),
('DevOps', 'devops', NOW()),
('Machine Learning', 'machine-learning', NOW());

-- Seed posts
INSERT INTO posts (title, content, topic_id, profile_id, created_at, updated_at) VALUES
('Getting Started with React', 'React is a powerful frontend library...', 6, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW(), NOW()),
('iOS Development Tips', 'Here are some essential tips for iOS development...', 7, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW(), NOW()),
('Design Principles', 'Understanding core design principles...', 8, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW(), NOW()),
('Docker Best Practices', 'Learn how to optimize your Docker containers...', 9, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW(), NOW()),
('AI Fundamentals', 'Introduction to artificial intelligence...', 10, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW(), NOW());

-- Seed post_replies
INSERT INTO post_replies (post_id, profile_id, reply, parent_id, created_at, updated_at) VALUES
(11, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Great post about React!', NULL, NOW(), NOW()),
(12, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Thanks for the iOS tips!', NULL, NOW(), NOW()),
(13, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Design principles are crucial', NULL, NOW(), NOW()),
(14, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Docker is essential nowadays', NULL, NOW(), NOW()),
(15, '25e1b869-94d2-47b0-a21d-389b6da92712', 'AI is the future', NULL, NOW(), NOW());

-- Seed post_upvotes (composite primary key)
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(11, '25e1b869-94d2-47b0-a21d-389b6da92712');

-- Seed gpt_ideas
INSERT INTO gpt_ideas (idea, views, claimed_by, created_at) VALUES
('AI-powered code review assistant', 10, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW()),
('Smart home automation platform', 15, NULL, NOW()),
('Virtual fitness trainer app', 20, NULL, NOW()),
('Blockchain voting system', 25, NULL, NOW()),
('Sustainable energy tracker', 30, NULL, NOW());

-- Seed gpt_ideas_likes (composite primary key)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, '25e1b869-94d2-47b0-a21d-389b6da92712');

-- Seed categories
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('SaaS', 'Software as a Service products', NOW(), NOW()),
('Mobile Apps', 'Mobile applications', NOW(), NOW()),
('E-commerce', 'Online shopping platforms', NOW(), NOW()),
('Education', 'Learning platforms and tools', NOW(), NOW()),
('Healthcare', 'Health and medical solutions', NOW(), NOW());

-- Seed products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, profile_id, category_id, created_at, updated_at) VALUES
('CodeBuddy', 'Your AI coding companion', 'AI-powered code assistant', 'Uses machine learning to analyze code', '/icons/codebuddy.png', 'https://codebuddy.app', '25e1b869-94d2-47b0-a21d-389b6da92712', 1, NOW(), NOW()),
('FitTrack', 'Smart fitness tracking', 'Comprehensive fitness app', 'Tracks workouts and progress', '/icons/fittrack.png', 'https://fittrack.app', '25e1b869-94d2-47b0-a21d-389b6da92712', 2, NOW(), NOW()),
('ShopSmart', 'Intelligent shopping', 'E-commerce platform', 'AI-powered shopping recommendations', '/icons/shopsmart.png', 'https://shopsmart.app', '25e1b869-94d2-47b0-a21d-389b6da92712', 3, NOW(), NOW()),
('LearnPro', 'Learn anything, anywhere', 'Online learning platform', 'Interactive learning experiences', '/icons/learnpro.png', 'https://learnpro.app', '25e1b869-94d2-47b0-a21d-389b6da92712', 4, NOW(), NOW()),
('HealthHub', 'Your health companion', 'Healthcare management app', 'Tracks health metrics and appointments', '/icons/healthhub.png', 'https://healthhub.app', '25e1b869-94d2-47b0-a21d-389b6da92712', 5, NOW(), NOW());

-- Seed product_upvotes (composite primary key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '25e1b869-94d2-47b0-a21d-389b6da92712');

-- Seed reviews
INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at) VALUES
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', 5, 'Amazing product!', NOW(), NOW()),
(2, '25e1b869-94d2-47b0-a21d-389b6da92712', 4, 'Great fitness app', NOW(), NOW()),
(3, '25e1b869-94d2-47b0-a21d-389b6da92712', 5, 'Best shopping experience', NOW(), NOW()),
(4, '25e1b869-94d2-47b0-a21d-389b6da92712', 4, 'Excellent learning platform', NOW(), NOW()),
(5, '25e1b869-94d2-47b0-a21d-389b6da92712', 5, 'Very helpful health app', NOW(), NOW());

-- Seed teams
INSERT INTO teams (product_name, team_size, equity_split, product_stage, roles, product_description, created_at, updated_at) VALUES
('CodeBuddy', 5, 20, 'mvp', 'Developer, Designer, PM', 'AI-powered code assistant platform', NOW(), NOW()),
('FitTrack', 3, 30, 'prototype', 'Developer, Designer', 'Fitness tracking application', NOW(), NOW()),
('ShopSmart', 4, 25, 'growth', 'Developer, Designer, Marketing', 'E-commerce platform with AI', NOW(), NOW()),
('LearnPro', 6, 15, 'mature', 'Developer, Designer, PM, Marketing', 'Online learning platform', NOW(), NOW()),
('HealthHub', 4, 25, 'mvp', 'Developer, Designer, PM', 'Healthcare management solution', NOW(), NOW());

-- Seed message_room
INSERT INTO message_room (created_at) VALUES
(NOW()),
(NOW()),
(NOW()),
(NOW()),
(NOW());

-- Seed message_room_members (composite primary key)
INSERT INTO message_room_members (message_room_id, profile_id, created_at) VALUES
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', NOW());

-- Seed messages
INSERT INTO messages (message_room_id, sender_id, content, seen, created_at) VALUES
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Hello there!', false, NOW()),
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', 'How are you?', false, NOW()),
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Let''s collaborate!', false, NOW()),
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Great idea!', false, NOW()),
(1, '25e1b869-94d2-47b0-a21d-389b6da92712', 'Looking forward to it!', false, NOW());

-- Seed notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type, created_at) VALUES
('25e1b869-94d2-47b0-a21d-389b6da92712', 1, NULL, '25e1b869-94d2-47b0-a21d-389b6da92712', 'review', NOW()),
('25e1b869-94d2-47b0-a21d-389b6da92712', NULL, 1, '25e1b869-94d2-47b0-a21d-389b6da92712', 'reply', NOW()),
('25e1b869-94d2-47b0-a21d-389b6da92712', NULL, NULL, '25e1b869-94d2-47b0-a21d-389b6da92712', 'follow', NOW()),
('25e1b869-94d2-47b0-a21d-389b6da92712', 2, NULL, '25e1b869-94d2-47b0-a21d-389b6da92712', 'mention', NOW()),
('25e1b869-94d2-47b0-a21d-389b6da92712', 3, NULL, '25e1b869-94d2-47b0-a21d-389b6da92712', 'review', NOW());

-- Seed jobs
INSERT INTO jobs (
    position,
    overview,
    requirements,
    responsibilities,
    benefits,
    skills,
    company_name,
    company_logo,
    company_location,
    apply_url,
    job_type,
    location,
    salary_range,
    created_at,
    updated_at
) VALUES
(
    'Senior Frontend Developer',
    'Join our team to build modern web applications using React and TypeScript',
    'At least 5 years of experience with modern JavaScript frameworks, Strong TypeScript skills, Experience with state management',
    'Lead frontend architecture, Mentor junior developers, Implement new features, Code review',
    'Remote work, Health insurance, 401k matching, Unlimited PTO',
    'React, TypeScript, Next.js, GraphQL, Tailwind CSS',
    'TechCorp',
    '/logos/techcorp.png',
    'San Francisco, CA',
    'https://techcorp.com/careers/senior-frontend',
    'full-time',
    'remote',
    '$150,000 - $250,000',
    NOW(),
    NOW()
),
(
    'UI/UX Designer',
    'Create beautiful and intuitive user interfaces for our products',
    'At least 3 years of UI/UX design experience, Proficiency in Figma, Understanding of user-centered design principles',
    'Design user interfaces, Create prototypes, Conduct user research, Collaborate with developers',
    'Flexible hours, Health and dental, Stock options, Learning budget',
    'Figma, Adobe Creative Suite, Prototyping, User Research',
    'DesignHub',
    '/logos/designhub.png',
    'New York, NY',
    'https://designhub.com/careers/designer',
    'full-time',
    'hybrid',
    '$100,000 - $120,000',
    NOW(),
    NOW()
),
(
    'Backend Developer',
    'Build scalable backend services for our growing platform',
    'Strong Node.js experience, Database design skills, API development experience',
    'Design and implement APIs, Optimize database performance, Write technical documentation',
    'Competitive salary, Health benefits, Remote work options',
    'Node.js, PostgreSQL, Redis, AWS',
    'ServerPro',
    '/logos/serverpro.png',
    'Austin, TX',
    'https://serverpro.com/careers/backend',
    'contract',
    'remote',
    '$120,000 - $150,000',
    NOW(),
    NOW()
),
(
    'Mobile Developer Intern',
    'Learn mobile development while working on real projects',
    'Computer Science student or recent graduate, Basic knowledge of iOS or Android development',
    'Assist in mobile app development, Write unit tests, Fix bugs',
    'Paid internship, Mentorship, Flexible schedule',
    'Swift or Kotlin, Git, Mobile development basics',
    'AppWorks',
    '/logos/appworks.png',
    'Seattle, WA',
    'https://appworks.com/careers/intern',
    'internship',
    'in-person',
    '$0 - $50,000',
    NOW(),
    NOW()
),
(
    'DevOps Engineer',
    'Help us build and maintain our cloud infrastructure',
    'Experience with AWS, Knowledge of CI/CD, Infrastructure as Code experience',
    'Manage cloud infrastructure, Implement CI/CD pipelines, Monitor system performance',
    'Remote work, Competitive salary, Learning opportunities',
    'AWS, Terraform, Docker, Kubernetes',
    'CloudTech',
    '/logos/cloudtech.png',
    'Boston, MA',
    'https://cloudtech.com/careers/devops',
    'part-time',
    'hybrid',
    '$70,000 - $100,000',
    NOW(),
    NOW()
);