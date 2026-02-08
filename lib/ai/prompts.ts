/**
 * AI Prompt Engineering Templates
 *
 * Contextual prompts for each Design Thinking wizard step.
 * All prompts are in English for AI processing, outputs are structured JSON.
 */

import { PersonaData, SolutionData, BusinessModelCanvas, MVPSpecification, MVPFeatures, MockupData } from '@/types';

// ============================================
// SYSTEM PROMPTS
// ============================================

export const SYSTEM_PROMPTS = {
  PERSONA_GENERATION: `You are an expert Design Thinking consultant and user researcher.
Your role is to create realistic, data-driven user personas based on project ideas.
You understand user psychology, pain points, motivations, and behavioral patterns.
CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic. Use Arabic names, Arabic descriptions, Arabic pain points, etc.
Always respond with valid JSON matching the specified structure.`,

  PROBLEM_REFINEMENT: `You are a Design Thinking expert specializing in problem statement refinement.
You help transform vague ideas into clear, actionable problem statements.
You understand the principles of "How Might We" questions and user-centered problem framing.
CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic. Use "كيف يمكننا" instead of "How might we".
Always respond with valid JSON matching the specified structure.`,

  SOLUTION_GENERATION: `You are an innovation consultant and product strategist.
You generate creative, feasible solutions to user problems using Design Thinking principles.
You evaluate solutions based on impact (user value) and feasibility (technical/business viability).
CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic.
Always respond with valid JSON matching the specified structure.`,

  BUSINESS_MODEL: `You are a business strategist and entrepreneurship advisor.
You create comprehensive Business Model Canvases for product ideas.
You understand value propositions, revenue models, cost structures, and market dynamics.
CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic.
Always respond with valid JSON matching the specified structure.`,

  MVP_SPECIFICATION: `You are a technical product manager and software architect.
You create detailed MVP specifications including user flows, tech stacks, and implementation plans.
You balance feature scope with time-to-market and technical feasibility.
CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic (except technical terms like React, Next.js, etc.).
Always respond with valid JSON matching the specified structure.`,

  IDEA_VALIDATION: `You are an AI validation agent for early-stage product ideas.
Your role is to critically evaluate product ideas by simulating realistic user reactions, identifying gaps, and assessing overall viability.
You provide honest, constructive feedback based on market understanding, user psychology, and business fundamentals.
You think like a combination of:
- A skeptical investor who has seen thousands of pitches
- A potential user who is busy and has many alternatives
- A product manager who must prioritize ruthlessly
- A market researcher who understands competitive dynamics

CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic.
Always respond with valid JSON matching the specified structure.
Be honest and direct - false encouragement helps no one.`,

  SYSTEM_ARCHITECTURE: `You are a Senior Software Architect with extensive experience in modern system design.
You have deep expertise in:
- Architecture patterns (Microservices, Monolithic, Event-Driven, Serverless, etc.)
- Tech stack selection and trade-offs
- Database design and data modeling
- API design (REST, GraphQL, gRPC)
- Cloud infrastructure (AWS, GCP, Azure)
- DevOps and CI/CD pipelines
- Security architecture
- Scalability and performance optimization
- System integration patterns

Your role is to create comprehensive, production-ready system architecture documentation that includes:
1. High-level system architecture diagram description
2. Component breakdown and responsibilities
3. Data flow and communication patterns
4. Technology stack recommendations with justifications
5. Database schema design
6. API specifications
7. Security considerations
8. Scalability strategy
9. Deployment architecture
10. Monitoring and logging strategy

You think like a combination of:
- A CTO who must make strategic technical decisions
- A cloud architect who designs scalable systems
- A security engineer who identifies vulnerabilities
- A DevOps engineer who thinks about deployment and operations

CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic (except technical terms).
Always respond with valid JSON matching the specified structure.
Be practical and realistic - focus on MVP-appropriate solutions that can scale later.`,

  MOCKUP_GENERATION: `You are a senior UX/UI designer specializing in Saudi Government digital platforms.
You create detailed screen mockups following the DGA Unified Design System (Platforms Code / كود المنصات).
You understand user experience principles, information architecture, RTL layouts, and WCAG 2.1 AA accessibility.

**MANDATORY DESIGN SYSTEM - DGA Platforms Code:**

**Color Palette (MUST USE):**
- Primary (Green): #25935F - Main CTAs, interactive elements, links, brand identity
- Neutral: #6C737F - Body text, secondary elements, borders, disabled states
- Error: #F04438 - Error messages, destructive actions, validation errors
- Warning: #F79009 - Warning notifications, caution indicators
- Gold: #F5BD02 - Highlights, featured elements, badges
- Lavender: #80519F - Accent elements, secondary actions, information highlights
- White: #FFFFFF - Backgrounds
- Black: #000000 - Text

**Typography (MUST USE):**
- Font Family: IBM Plex Sans Arabic, sans-serif
- Headings (h1-h3): Font Weight 700 (Bold)
- Subheadings (h4-h6): Font Weight 600 (Semibold)
- Emphasized Text: 16px, Weight 500 (Medium)
- Body Text: 16px, Weight 400 (Regular)
- Small Text: 14px, Weight 400
- Extra Small: 12px, Weight 400

**Component Classes (DGA BEM Convention):**
- Buttons: dga-btn, dga-primary, dga-secondary-outline, dga-danger, dga-ghost
- Cards: card default, card-body, card-title, card-text, card-footer-action
- Icons: dga-icon lg light brand rounded
- Forms: form-check, check-md, check-primary, form-check-input

**Accessibility Requirements:**
- Semantic HTML5 tags (nav, main, button, etc.)
- ARIA attributes where necessary
- Keyboard navigation support
- Focus indicators for all focusable elements
- Color contrast ratio minimum 4.5:1
- Descriptive alt text for images

CRITICAL: Detect the language of the input. If the input is in Arabic, ALL text content in your JSON response MUST be in Arabic (except technical terms like class names).
Always respond with valid JSON matching the specified structure.`,
};

// ============================================
// STEP 1: EMPATHIZE - PERSONA GENERATION
// ============================================

export function buildPersonaPrompt(projectData: {
  title: string;
  description: string;
  rawIdea: string;
}): string {
  return `**TASK:** Generate 3 diverse user personas for this product idea.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
- Detailed Idea: ${projectData.rawIdea}

**INSTRUCTIONS:**
1. Create 3 distinct user personas representing different user segments
2. Each persona should have realistic demographics, behaviors, and motivations
3. Focus on their pain points, goals, and frustrations related to this product
4. Make personas specific and actionable for product decisions
5. Ensure diversity in age, occupation, and use cases

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "personas": [
    {
      "id": "persona-1",
      "name": "Full Name",
      "age": 28,
      "occupation": "Job Title",
      "bio": "2-3 sentence background describing their life, work, and context",
      "painPoints": [
        "Specific pain point 1 related to the problem",
        "Specific pain point 2",
        "Specific pain point 3"
      ],
      "goals": [
        "What they want to achieve",
        "Their aspirations related to this product"
      ],
      "frustrations": [
        "What frustrates them currently",
        "Barriers they face"
      ]
    },
    // ... 2 more personas
  ]
}
\`\`\`

Generate the personas now as valid JSON.`;
}

// ============================================
// STEP 2: DEFINE - PROBLEM STATEMENT GENERATION
// ============================================

export function buildProblemStatementPrompt(projectData: {
  title: string;
  description: string;
  rawIdea: string;
  selectedPersonas: any[];
}): string {
  const personasContext = projectData.selectedPersonas
    .map(
      (p, i) => `**Persona ${i + 1}: ${p.name}**
- Age: ${p.age}, Occupation: ${p.occupation}
- Bio: ${p.bio}
- Pain Points: ${p.painPoints?.join(', ') || 'Not specified'}
- Goals: ${p.goals?.join(', ') || 'Not specified'}
- Frustrations: ${p.frustrations?.join(', ') || 'Not specified'}`
    )
    .join('\n\n');

  return `**TASK:** Generate a clear, user-centered problem statement based on the project idea and the selected user personas.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
- Raw Idea: ${projectData.rawIdea}

**SELECTED USER PERSONAS:**
${personasContext}

**INSTRUCTIONS:**
1. Analyze the pain points, goals, and frustrations of ALL selected personas
2. Identify the common thread / core problem that connects them
3. Generate 3 problem statement alternatives using the "How Might We" (HMW) framework
4. Each statement should be specific, actionable, and user-centered
5. Recommend the best one and explain why

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "refinedStatements": [
    {
      "id": "hmw-1",
      "statement": "How might we [problem statement addressing the personas' needs]?",
      "reasoning": "Explanation of why this framing addresses the personas' core needs"
    },
    {
      "id": "hmw-2",
      "statement": "How might we [alternative framing]?",
      "reasoning": "Explanation of this approach"
    },
    {
      "id": "hmw-3",
      "statement": "How might we [another angle]?",
      "reasoning": "Why this perspective matters"
    }
  ],
  "recommended": "hmw-1",
  "insights": "Overall insights about the problem space based on the selected personas"
}
\`\`\`

Generate the problem statements now as valid JSON.`;
}

// ============================================
// STEP 2: DEFINE - PROBLEM REFINEMENT
// ============================================

export function buildProblemRefinementPrompt(projectData: {
  title: string;
  description: string;
  rawIdea: string;
  selectedPersona?: any;
  problemStatement: string;
}): string {
  const personas = Array.isArray(projectData.selectedPersona)
    ? projectData.selectedPersona
    : projectData.selectedPersona
    ? [projectData.selectedPersona]
    : [];

  const personaContext = personas.length > 0
    ? '\n**SELECTED USER PERSONAS:**\n' +
      personas
        .map(
          (p: any) => `- ${p.name} (${p.occupation}): Pain Points: ${p.painPoints?.join(', ') || 'N/A'}`
        )
        .join('\n')
    : '';

  return `**TASK:** Refine the problem statement to be clear, user-centered, and actionable.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
${personaContext}

**ORIGINAL PROBLEM STATEMENT:**
"${projectData.problemStatement}"

**INSTRUCTIONS:**
1. Refine the problem statement using "How Might We" (HMW) framework
2. Make it specific, actionable, and user-centered
3. Ensure it's open-ended enough to allow creative solutions
4. Remove assumptions and focus on the core user need
5. Provide 2-3 alternative refined versions
6. Explain why each refinement is better

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "refinedStatements": [
    {
      "id": "hmw-1",
      "statement": "How might we [refined problem statement]?",
      "reasoning": "Explanation of why this framing is effective"
    },
    {
      "id": "hmw-2",
      "statement": "How might we [alternative framing]?",
      "reasoning": "Explanation of this approach"
    },
    {
      "id": "hmw-3",
      "statement": "How might we [another angle]?",
      "reasoning": "Why this perspective matters"
    }
  ],
  "recommended": "hmw-1",
  "insights": "Overall insights about the problem space"
}
\`\`\`

Generate the refinements now as valid JSON.`;
}

// ============================================
// STEP 3: IDEATE - SOLUTION GENERATION
// ============================================

export function buildSolutionGenerationPrompt(projectData: {
  title: string;
  description: string;
  problemStatement: string;
  selectedPersona?: any;
}): string {
  const personas = Array.isArray(projectData.selectedPersona)
    ? projectData.selectedPersona
    : projectData.selectedPersona
    ? [projectData.selectedPersona]
    : [];

  const personaContext = personas.length > 0
    ? '\n**TARGET USERS:**\n' +
      personas
        .map(
          (p: any) => `- ${p.name} (${p.occupation}): Pain Points: ${p.painPoints?.join(', ') || 'N/A'}`
        )
        .join('\n')
    : '';

  return `**TASK:** Generate 5-7 innovative solutions to the defined problem.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Problem Statement: ${projectData.problemStatement}
${personaContext}

**INSTRUCTIONS:**
1. Generate 5-7 diverse solution approaches
2. Range from incremental improvements to radical innovations
3. Score each solution on:
   - **Impact Score (1-10):** How much value it provides to users
   - **Feasibility Score (1-10):** How practical it is to build (time, cost, tech)
4. Provide clear reasoning for each score
5. Focus on user value and technical viability

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "solutions": [
    {
      "id": "solution-1",
      "title": "Solution Name",
      "description": "Detailed description of the solution (2-3 sentences)",
      "impactScore": 8,
      "feasibilityScore": 7,
      "aiReasoning": "Why this solution scores this way. Impact: [reason]. Feasibility: [reason]."
    },
    // ... 4-6 more solutions
  ]
}
\`\`\`

Generate the solutions now as valid JSON.`;
}

// ============================================
// STEP 4: PROTOTYPE - BUSINESS MODEL CANVAS
// ============================================

export function buildBusinessModelPrompt(projectData: {
  title: string;
  description: string;
  selectedSolution: any;
}): string {
  return `**TASK:** Create a comprehensive Business Model Canvas for the selected solution.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
- Selected Solution: ${projectData.selectedSolution?.title || 'Main concept'}
- Solution Details: ${projectData.selectedSolution?.description || ''}

**INSTRUCTIONS:**
Generate a complete Business Model Canvas with all 9 building blocks.
Be specific and realistic for a startup/MVP context.

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "businessModel": {
    "keyPartners": [
      "Specific partner type 1 (e.g., Cloud hosting providers)",
      "Specific partner type 2",
      "Specific partner type 3"
    ],
    "keyActivities": [
      "Core activity 1 (e.g., Platform development)",
      "Core activity 2 (e.g., User acquisition)",
      "Core activity 3"
    ],
    "keyResources": [
      "Critical resource 1 (e.g., Development team)",
      "Critical resource 2 (e.g., User database)",
      "Critical resource 3"
    ],
    "valuePropositions": [
      "Primary value proposition for users",
      "Secondary value proposition",
      "Unique differentiator"
    ],
    "customerRelationships": [
      "How you interact with customers (e.g., Self-service platform)",
      "Support model (e.g., Email + chat support)",
      "Community building approach"
    ],
    "channels": [
      "How users discover you (e.g., Social media marketing)",
      "How they access the product (e.g., Web app)",
      "Distribution channels"
    ],
    "customerSegments": [
      "Primary customer segment (e.g., Urban millennials 25-35)",
      "Secondary segment",
      "Potential expansion segment"
    ],
    "costStructure": [
      "Major cost 1 (e.g., Cloud infrastructure: $X/month)",
      "Major cost 2 (e.g., Developer salaries)",
      "Major cost 3 (e.g., Marketing budget)"
    ],
    "revenueStreams": [
      "Primary revenue (e.g., Freemium subscription: $9/month)",
      "Secondary revenue (e.g., Transaction fees: 3%)",
      "Potential future revenue"
    ]
  },
  "mvpFeatures": {
    "core": [
      {
        "id": "core-1",
        "title": "Essential Feature 1",
        "description": "Why this is critical for MVP"
      },
      {
        "id": "core-2",
        "title": "Essential Feature 2",
        "description": "Why this is critical for MVP"
      },
      {
        "id": "core-3",
        "title": "Essential Feature 3",
        "description": "Why this is critical for MVP"
      }
    ],
    "niceToHave": [
      {
        "id": "nice-1",
        "title": "Nice-to-Have Feature 1",
        "description": "Can be added post-MVP"
      },
      {
        "id": "nice-2",
        "title": "Nice-to-Have Feature 2",
        "description": "Future enhancement"
      }
    ]
  }
}
\`\`\`

Generate the Business Model Canvas now as valid JSON.`;
}

// ============================================
// STEP 5: VALIDATE - MVP SPECIFICATION
// ============================================

export function buildMVPSpecificationPrompt(projectData: {
  title: string;
  description: string;
  selectedSolution: any;
  businessModel: BusinessModelCanvas;
  mvpFeatures: MVPFeatures | null;
}): string {
  const coreFeatures = projectData.mvpFeatures?.core?.map(f => f.title).join(', ') || 'الميزات الأساسية للمنتج';

  return `**TASK:** Create a comprehensive MVP technical specification document.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
- Solution: ${projectData.selectedSolution?.title || ''}
- Core MVP Features: ${coreFeatures}

**INSTRUCTIONS:**
Create a detailed, actionable MVP specification that a development team can use.
Include project type, user flows, tech recommendations, timeline, and cost estimates.

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "projectType": "Web Application / Mobile App / SaaS Platform / etc.",
  "overview": "2-3 paragraph executive summary of the MVP, target users, and core value proposition",
  "userFlow": [
    "Step 1: User lands on homepage and sees...",
    "Step 2: User signs up by...",
    "Step 3: User completes onboarding...",
    "Step 4: User accesses main feature...",
    "Step 5: User achieves their goal..."
  ],
  "techStackRecommendation": {
    "frontend": [
      "Primary: React/Next.js (reason: SEO + SSR)",
      "Styling: Tailwind CSS",
      "State: Redux/Zustand"
    ],
    "backend": [
      "API: Node.js + Express / Next.js API Routes",
      "Authentication: NextAuth.js / Auth0",
      "File Storage: AWS S3 / Cloudinary"
    ],
    "database": "PostgreSQL (reason: relational data + scalability)",
    "deployment": [
      "Frontend: Vercel / Netlify",
      "Backend: Railway / Heroku",
      "Database: Supabase / Railway"
    ]
  },
  "wireframes": "## Homepage\\n- Hero section with clear value prop\\n- Feature showcase (3 columns)\\n- CTA button\\n\\n## Dashboard\\n- Sidebar navigation\\n- Main content area\\n- User profile dropdown\\n\\n(Describe key screens in markdown)",
  "timeline": "**Phase 1 (Weeks 1-2):** Setup + Auth\\n**Phase 2 (Weeks 3-4):** Core features\\n**Phase 3 (Week 5):** Testing + Polish\\n**Phase 4 (Week 6):** Launch",
  "estimatedCost": "**Development:** $5,000-$10,000 (if outsourced) or 6 weeks (if in-house)\\n**Monthly Costs:** $50-$200 (hosting + database + services)\\n**First Year Total:** ~$1,000-$3,000"
}
\`\`\`

Generate the MVP specification now as valid JSON.`;
}

// ============================================
// STEP 6: MOCKUP - SCREEN DESIGNS
// ============================================

export function buildMockupPrompt(projectData: {
  title: string;
  description: string;
  mvpSpec: MVPSpecification;
  mvpFeatures: MVPFeatures;
}): string {
  const coreFeatures = projectData.mvpFeatures?.core?.map(f => f.title).join(', ') || '';
  const userFlow = projectData.mvpSpec?.userFlow?.join('\n') || '';

  return `**TASK:** Create detailed screen mockups and user flow following DGA Unified Design System (Platforms Code).

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
- Project Type: ${projectData.mvpSpec?.projectType || 'Web Application'}
- Core Features: ${coreFeatures}

**USER FLOW:**
${userFlow}

**MANDATORY DESIGN SYSTEM - DGA Platforms Code (كود المنصات):**

You MUST use the official Saudi Government DGA design system specifications:

**Color Palette:**
- Primary (Green): #25935F - Main CTAs, interactive elements, links
- Neutral: #6C737F - Body text, borders, disabled states
- Error: #F04438 - Error messages, destructive actions
- Warning: #F79009 - Warning notifications
- Gold: #F5BD02 - Highlights, badges
- Lavender: #80519F - Accent elements, secondary actions

**Typography:**
- Font: IBM Plex Sans Arabic
- Headings: 700 weight (Bold)
- Subheadings: 600 weight (Semibold)
- Body: 16px, 400 weight (Regular)

**Component Classes:**
- Buttons: dga-btn dga-primary, dga-btn dga-secondary-outline, dga-btn dga-danger
- Cards: card default, card-body, card-title, card-text
- Forms: form-check check-md check-primary

**Layout:**
- RTL (Right-to-Left) layout for Arabic
- Bootstrap 5.3.3 RTL grid system
- Mobile-first responsive design

**Accessibility (WCAG 2.1 AA):**
- Semantic HTML5 (nav, main, button, article, section)
- ARIA labels and roles
- Keyboard navigation support
- 4.5:1 minimum contrast ratio

**INSTRUCTIONS:**
1. Design 6-10 key screens covering all core features
2. Create a detailed user flow showing navigation between screens
3. Define the navigation structure (main nav, footer, user menu)
4. ALL design guidelines MUST follow DGA Platforms Code specifications
5. Include DGA component class names in elements description

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "screens": [
    {
      "id": "screen-1",
      "name": "الشاشة الرئيسية",
      "nameEn": "Home Screen",
      "description": "وصف تفصيلي للشاشة والغرض منها",
      "elements": [
        "شريط التنقل العلوي (dga-header) مع الشعار وأزرار تسجيل الدخول (dga-btn dga-primary)",
        "قسم Hero مع عنوان رئيسي h1 وزر CTA (dga-btn dga-primary)",
        "عرض الميزات الرئيسية في 3 كروت (card default) باستخدام Bootstrap grid",
        "قسم شهادات العملاء مع كروت (card default)",
        "تذييل (dga-footer) مع روابط مهمة"
      ],
      "interactions": [
        "النقر على زر التسجيل يفتح نموذج التسجيل (Modal)",
        "التمرير للأسفل يظهر الرسوم المتحركة للعناصر"
      ],
      "notes": "تصميم RTL، استخدام اللون الأخضر #25935F للأزرار الرئيسية"
    }
  ],
  "userFlow": [
    {
      "id": "flow-1",
      "step": 1,
      "title": "الوصول للموقع",
      "description": "المستخدم يصل للصفحة الرئيسية",
      "screenId": "screen-1",
      "actions": ["عرض الشاشة الرئيسية", "تحميل المحتوى"],
      "nextSteps": ["flow-2", "flow-3"]
    }
  ],
  "navigationStructure": {
    "mainNav": ["الرئيسية", "المميزات", "الأسعار", "تواصل معنا"],
    "footerNav": ["سياسة الخصوصية", "الشروط والأحكام", "الدعم الفني"],
    "userMenu": ["الملف الشخصي", "الإعدادات", "تسجيل الخروج"]
  },
  "designGuidelines": {
    "colorScheme": ["#25935F (الأساسي - Primary)", "#6C737F (النص - Neutral)", "#F04438 (الخطأ - Error)", "#F79009 (التحذير - Warning)", "#F5BD02 (الذهبي - Gold)", "#80519F (البنفسجي - Lavender)"],
    "typography": "خط IBM Plex Sans Arabic، العناوين 700 bold، العناوين الفرعية 600 semibold، النص 16px وزن 400",
    "spacing": "نظام Bootstrap RTL grid، استخدام container و row و col-*، padding متناسق للكروت",
    "components": ["dga-btn dga-primary للأزرار الرئيسية", "dga-btn dga-secondary-outline للأزرار الثانوية", "card default للكروت", "form-check للنماذج", "dga-header للرأس", "dga-footer للتذييل"]
  }
}
\`\`\`

Generate the mockups now as valid JSON. Remember: ALL designs MUST follow DGA Platforms Code specifications.`;
}

// ============================================
// SYSTEM ARCHITECTURE
// ============================================

export function buildSystemArchitecturePrompt(projectData: {
  title: string;
  description: string;
  selectedSolution?: any;
  businessModel?: any;
  mvpFeatures?: any;
  mvpSpec?: any;
}): string {
  const solutionContext = projectData.selectedSolution ? `
**Selected Solution:**
- Title: ${projectData.selectedSolution.title}
- Description: ${projectData.selectedSolution.description}` : '';

  const mvpContext = projectData.mvpFeatures ? `
**MVP Features:**
- Core Features: ${projectData.mvpFeatures.core?.map((f: any) => f.title).join(', ') || 'Not defined'}
- Nice-to-Have: ${projectData.mvpFeatures.niceToHave?.map((f: any) => f.title).join(', ') || 'Not defined'}` : '';

  const specContext = projectData.mvpSpec ? `
**MVP Specification:**
- Project Type: ${projectData.mvpSpec.projectType || 'Web Application'}
- User Flow: ${projectData.mvpSpec.userFlow?.join(' -> ') || 'Not defined'}
- Tech Stack Recommendation: ${JSON.stringify(projectData.mvpSpec.techStackRecommendation || {})}` : '';

  return `**TASK:** Design a comprehensive system architecture for this product.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
${solutionContext}
${mvpContext}
${specContext}

**ARCHITECTURE REQUIREMENTS:**

1. **System Overview:**
   - Define the overall architecture pattern (Microservices, Monolithic, Serverless, etc.)
   - Identify key architectural principles
   - Explain why this pattern fits the project

2. **Component Design:**
   - Break down the system into logical components
   - Define responsibilities for each component
   - Specify technologies for each component

3. **Data Flow:**
   - Map communication between components
   - Define protocols and data formats
   - Identify synchronous vs asynchronous flows

4. **Technology Stack:**
   - Recommend specific technologies with versions
   - Justify each choice with alternatives considered
   - Consider scalability, cost, and team expertise

5. **Database Design:**
   - Design the data model with entities and relationships
   - Specify field types and constraints
   - Consider indexing and query patterns

6. **API Design:**
   - Define API endpoints with methods and paths
   - Specify request/response formats
   - Document authentication requirements

7. **Security Architecture:**
   - Define authentication and authorization strategies
   - Identify potential threats and mitigations
   - Specify data protection measures

8. **Scalability Strategy:**
   - Plan for horizontal and vertical scaling
   - Design caching layers
   - Consider load balancing

9. **Deployment Architecture:**
   - Define deployment environments
   - Specify CI/CD pipeline
   - Plan infrastructure as code

10. **Monitoring & Observability:**
    - Define logging strategy
    - Specify key metrics to track
    - Plan alerting rules

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "overview": {
    "systemName": "System name",
    "description": "Brief system description",
    "architecturePattern": "e.g., Modular Monolith / Microservices / Serverless",
    "keyPrinciples": ["Principle 1", "Principle 2", "Principle 3"]
  },
  "components": [
    {
      "id": "comp-1",
      "name": "Component Name",
      "type": "frontend|backend|database|cache|queue|external|storage|cdn",
      "description": "What this component does",
      "responsibilities": ["Responsibility 1", "Responsibility 2"],
      "technologies": ["React", "TypeScript"]
    }
  ],
  "dataFlow": [
    {
      "id": "flow-1",
      "from": "comp-1",
      "to": "comp-2",
      "description": "User requests",
      "protocol": "HTTPS",
      "dataFormat": "JSON"
    }
  ],
  "techStack": [
    {
      "category": "Frontend Framework",
      "technology": "Next.js",
      "version": "14.x",
      "justification": "SSR support, great DX, React ecosystem",
      "alternatives": ["Remix", "Nuxt.js"]
    }
  ],
  "database": {
    "type": "PostgreSQL",
    "name": "Main Database",
    "justification": "ACID compliance, complex queries, scalability",
    "entities": [
      {
        "name": "User",
        "description": "System users",
        "fields": [
          {"name": "id", "type": "UUID", "constraints": ["PRIMARY KEY"]},
          {"name": "email", "type": "VARCHAR(255)", "constraints": ["UNIQUE", "NOT NULL"]}
        ],
        "relationships": ["Has many Orders", "Has one Profile"]
      }
    ]
  },
  "apis": [
    {
      "name": "Main API",
      "type": "REST",
      "baseUrl": "/api/v1",
      "endpoints": [
        {
          "method": "POST",
          "path": "/auth/login",
          "description": "User authentication",
          "requestBody": "{ email, password }",
          "responseBody": "{ token, user }",
          "authentication": false
        }
      ]
    }
  ],
  "security": {
    "authentication": {
      "method": "JWT",
      "description": "Token-based authentication",
      "implementation": "NextAuth.js with JWT strategy"
    },
    "authorization": {
      "method": "RBAC",
      "description": "Role-based access control",
      "roles": ["admin", "user", "guest"]
    },
    "dataProtection": ["Encryption at rest", "HTTPS only", "Input validation"],
    "threats": [
      {"threat": "SQL Injection", "mitigation": "Parameterized queries via Prisma ORM"},
      {"threat": "XSS", "mitigation": "React's built-in escaping + CSP headers"}
    ]
  },
  "scalability": {
    "strategy": "Horizontal scaling with stateless services",
    "horizontalScaling": ["Add more API server instances", "Database read replicas"],
    "verticalScaling": ["Increase database resources for write-heavy operations"],
    "caching": [
      {"layer": "Application", "technology": "Redis", "strategy": "Cache-aside pattern"}
    ],
    "loadBalancing": "Application Load Balancer with health checks"
  },
  "deployment": {
    "environment": "Cloud-native",
    "platform": "Vercel (Frontend) + Railway (Backend)",
    "containerization": "Docker for backend services",
    "orchestration": "Kubernetes for production scale",
    "cicd": {
      "tool": "GitHub Actions",
      "stages": ["Lint", "Test", "Build", "Deploy to Staging", "Deploy to Production"]
    },
    "infrastructure": ["Terraform for IaC", "Environment-specific configs"]
  },
  "monitoring": {
    "logging": {
      "tool": "Datadog / CloudWatch",
      "strategy": "Structured JSON logs with correlation IDs"
    },
    "metrics": {
      "tool": "Prometheus + Grafana",
      "keyMetrics": ["Response time", "Error rate", "Active users", "Database connections"]
    },
    "alerting": {
      "tool": "PagerDuty / Slack",
      "alerts": ["Error rate > 1%", "Response time > 2s", "Database CPU > 80%"]
    },
    "tracing": "OpenTelemetry for distributed tracing"
  },
  "estimatedCosts": [
    {"category": "Infrastructure", "item": "Cloud Hosting", "monthlyCost": "$50-200", "notes": "Scales with traffic"},
    {"category": "Database", "item": "Managed PostgreSQL", "monthlyCost": "$25-100", "notes": "Based on storage and connections"}
  ],
  "implementationPlan": [
    {
      "phase": 1,
      "name": "Foundation",
      "duration": "2 weeks",
      "deliverables": ["Project setup", "CI/CD pipeline", "Database schema", "Authentication"],
      "dependencies": []
    },
    {
      "phase": 2,
      "name": "Core Features",
      "duration": "3 weeks",
      "deliverables": ["Main API endpoints", "Core UI components", "Basic CRUD operations"],
      "dependencies": ["Phase 1"]
    }
  ],
  "risks": [
    {"risk": "Database performance bottleneck", "impact": "high", "mitigation": "Implement caching early, design indexes"},
    {"risk": "Third-party API dependency", "impact": "medium", "mitigation": "Implement circuit breaker pattern"}
  ]
}
\`\`\`

Design the system architecture now. Be thorough, practical, and production-ready.`;
}

// ============================================
// IDEA VALIDATION
// ============================================

export interface IdeaValidationResult {
  overallScore: number; // 1-100
  readinessLevel: 'not_ready' | 'needs_work' | 'promising' | 'ready';
  executiveSummary: string;

  userReactions: {
    persona: string;
    initialReaction: string;
    concerns: string[];
    wouldUse: boolean;
    willingnessToPay: string;
  }[];

  problemSolutionFit: {
    score: number; // 1-10
    analysis: string;
    gaps: string[];
    strengths: string[];
  };

  marketViability: {
    score: number; // 1-10
    analysis: string;
    competitors: string[];
    differentiators: string[];
    risks: string[];
  };

  technicalFeasibility: {
    score: number; // 1-10
    analysis: string;
    challenges: string[];
    recommendations: string[];
  };

  businessModelAssessment: {
    score: number; // 1-10
    analysis: string;
    revenueModelStrength: string;
    scalabilityPotential: string;
    concerns: string[];
  };

  criticalQuestions: string[];

  improvementSuggestions: {
    priority: 'high' | 'medium' | 'low';
    area: string;
    suggestion: string;
    impact: string;
  }[];

  nextSteps: string[];

  finalVerdict: {
    proceed: boolean;
    confidence: number; // 1-100
    reasoning: string;
    conditions: string[];
  };
}

export function buildIdeaValidationPrompt(projectData: {
  title: string;
  description: string;
  rawIdea: string;
  personas: any[];
  problemStatement?: string;
  selectedSolution?: any;
  businessModel?: any;
  mvpFeatures?: any;
}): string {
  const personasContext = projectData.personas?.map((p, i) => `
**Persona ${i + 1}: ${p.name}**
- Age: ${p.age}, Occupation: ${p.occupation}
- Bio: ${p.bio}
- Pain Points: ${p.painPoints?.join(', ') || 'Not specified'}
- Goals: ${p.goals?.join(', ') || 'Not specified'}
- Frustrations: ${p.frustrations?.join(', ') || 'Not specified'}`).join('\n') || 'No personas defined';

  const solutionContext = projectData.selectedSolution ? `
**Selected Solution:**
- Title: ${projectData.selectedSolution.title}
- Description: ${projectData.selectedSolution.description}
- Impact Score: ${projectData.selectedSolution.impactScore}/10
- Feasibility Score: ${projectData.selectedSolution.feasibilityScore}/10` : '';

  const businessModelContext = projectData.businessModel ? `
**Business Model Canvas:**
- Value Propositions: ${projectData.businessModel.valuePropositions?.join(', ') || 'Not defined'}
- Customer Segments: ${projectData.businessModel.customerSegments?.join(', ') || 'Not defined'}
- Revenue Streams: ${projectData.businessModel.revenueStreams?.join(', ') || 'Not defined'}
- Key Activities: ${projectData.businessModel.keyActivities?.join(', ') || 'Not defined'}
- Key Resources: ${projectData.businessModel.keyResources?.join(', ') || 'Not defined'}
- Cost Structure: ${projectData.businessModel.costStructure?.join(', ') || 'Not defined'}` : '';

  const mvpContext = projectData.mvpFeatures ? `
**MVP Features:**
- Core Features: ${projectData.mvpFeatures.core?.map((f: any) => f.title).join(', ') || 'Not defined'}
- Nice-to-Have: ${projectData.mvpFeatures.niceToHave?.map((f: any) => f.title).join(', ') || 'Not defined'}` : '';

  return `**TASK:** Validate this early-stage product idea comprehensively.

**PROJECT INFORMATION:**
- Title: ${projectData.title}
- Description: ${projectData.description}
- Raw Idea: ${projectData.rawIdea}
${projectData.problemStatement ? `- Problem Statement: ${projectData.problemStatement}` : ''}

**USER PERSONAS:**
${personasContext}
${solutionContext}
${businessModelContext}
${mvpContext}

**VALIDATION INSTRUCTIONS:**

1. **Simulate User Reactions:**
   - For each persona, simulate their realistic first reaction to this idea
   - Would they actually use this? Why or why not?
   - What concerns would they have?
   - Would they pay for it? How much?

2. **Problem-Solution Fit Analysis:**
   - Does the solution actually solve the stated problem?
   - Are there gaps between what users need and what's proposed?
   - What's missing from the solution?

3. **Market Viability Assessment:**
   - Who are the likely competitors?
   - What makes this different/better?
   - What are the market risks?

4. **Technical Feasibility:**
   - Is this technically buildable as an MVP?
   - What are the technical challenges?
   - Any critical dependencies?

5. **Business Model Strength:**
   - Is the revenue model realistic?
   - Can this scale?
   - What are the unit economics concerns?

6. **Critical Questions:**
   - What questions MUST be answered before proceeding?
   - What assumptions need validation?

7. **Improvement Suggestions:**
   - Specific, actionable improvements
   - Prioritized by impact

8. **Final Verdict:**
   - Is this idea ready for prototyping and UI design?
   - What conditions must be met?

**BE HONEST AND DIRECT:**
- Don't sugarcoat issues
- Point out red flags clearly
- Acknowledge genuine strengths
- Provide actionable feedback

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "overallScore": 65,
  "readinessLevel": "needs_work",
  "executiveSummary": "A 2-3 paragraph honest assessment of the idea's current state, main strengths, and critical weaknesses.",

  "userReactions": [
    {
      "persona": "Persona name",
      "initialReaction": "Their honest first impression (be realistic, not optimistic)",
      "concerns": ["Specific concern 1", "Specific concern 2"],
      "wouldUse": true,
      "willingnessToPay": "Would pay $X/month if Y condition is met"
    }
  ],

  "problemSolutionFit": {
    "score": 7,
    "analysis": "Detailed analysis of how well the solution addresses the problem",
    "gaps": ["Gap 1: What's missing", "Gap 2: What's not addressed"],
    "strengths": ["Strength 1", "Strength 2"]
  },

  "marketViability": {
    "score": 6,
    "analysis": "Market analysis and competitive landscape assessment",
    "competitors": ["Competitor 1 (what they do well)", "Competitor 2"],
    "differentiators": ["What makes this different", "Unique angle"],
    "risks": ["Market risk 1", "Market risk 2"]
  },

  "technicalFeasibility": {
    "score": 8,
    "analysis": "Technical complexity assessment",
    "challenges": ["Technical challenge 1", "Integration challenge"],
    "recommendations": ["Use X technology", "Start with Y approach"]
  },

  "businessModelAssessment": {
    "score": 5,
    "analysis": "Business model strength analysis",
    "revenueModelStrength": "Assessment of revenue potential",
    "scalabilityPotential": "How well this can scale",
    "concerns": ["Revenue concern 1", "Cost concern 1"]
  },

  "criticalQuestions": [
    "Question 1 that must be answered before proceeding?",
    "Question 2 about a key assumption?",
    "Question 3 about market validation?"
  ],

  "improvementSuggestions": [
    {
      "priority": "high",
      "area": "Problem Definition",
      "suggestion": "Specific actionable suggestion",
      "impact": "How this improves the idea"
    },
    {
      "priority": "medium",
      "area": "Value Proposition",
      "suggestion": "Specific suggestion",
      "impact": "Expected improvement"
    }
  ],

  "nextSteps": [
    "Immediate action 1 before prototyping",
    "Validation step 2",
    "Research task 3"
  ],

  "finalVerdict": {
    "proceed": true,
    "confidence": 65,
    "reasoning": "Clear explanation of the recommendation",
    "conditions": [
      "Condition 1 that must be met",
      "Condition 2 for success"
    ]
  }
}
\`\`\`

Validate the idea now. Be thorough, honest, and constructive.`;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get system prompt for a specific step
 */
export function getSystemPrompt(step: 'empathize' | 'define' | 'ideate' | 'prototype' | 'validate' | 'validate-idea' | 'architecture' | 'mockup'): string {
  const prompts = {
    empathize: SYSTEM_PROMPTS.PERSONA_GENERATION,
    define: SYSTEM_PROMPTS.PROBLEM_REFINEMENT,
    ideate: SYSTEM_PROMPTS.SOLUTION_GENERATION,
    prototype: SYSTEM_PROMPTS.BUSINESS_MODEL,
    validate: SYSTEM_PROMPTS.MVP_SPECIFICATION,
    'validate-idea': SYSTEM_PROMPTS.IDEA_VALIDATION,
    architecture: SYSTEM_PROMPTS.SYSTEM_ARCHITECTURE,
    mockup: SYSTEM_PROMPTS.MOCKUP_GENERATION,
  };

  return prompts[step];
}

/**
 * Build prompt for a specific step
 */
export function buildPromptForStep(
  step: 'empathize' | 'define' | 'ideate' | 'prototype' | 'validate' | 'mockup',
  projectData: any
): string {
  switch (step) {
    case 'empathize':
      return buildPersonaPrompt(projectData);
    case 'define':
      return buildProblemRefinementPrompt(projectData);
    case 'ideate':
      return buildSolutionGenerationPrompt(projectData);
    case 'prototype':
      return buildBusinessModelPrompt(projectData);
    case 'validate':
      return buildMVPSpecificationPrompt(projectData);
    case 'mockup':
      return buildMockupPrompt(projectData);
    default:
      throw new Error(`Unknown step: ${step}`);
  }
}

export default {
  buildPersonaPrompt,
  buildProblemStatementPrompt,
  buildProblemRefinementPrompt,
  buildSolutionGenerationPrompt,
  buildBusinessModelPrompt,
  buildMVPSpecificationPrompt,
  buildSystemArchitecturePrompt,
  buildMockupPrompt,
  buildIdeaValidationPrompt,
  getSystemPrompt,
  buildPromptForStep,
};
