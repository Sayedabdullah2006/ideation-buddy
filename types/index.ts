/**
 * Global TypeScript Type Definitions
 */

import { User, Project, AIGenerationLog, UserRole, UserStatus, ProjectStatus } from '@prisma/client';

// ============================================
// USER TYPES
// ============================================

export type UserWithoutPassword = Omit<User, 'password'>;

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  status: UserStatus;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

// ============================================
// PROJECT TYPES
// ============================================

export interface PersonaData {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  painPoints: string[];
  goals: string[];
  frustrations: string[];
}

export interface SolutionData {
  id: string;
  title: string;
  description: string;
  impactScore: number;  // 1-10
  feasibilityScore: number;  // 1-10
  aiReasoning: string;
}

export interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface MVPFeatures {
  core: Array<{ id: string; title: string; description: string }>;
  niceToHave: Array<{ id: string; title: string; description: string }>;
}

export interface MVPSpecification {
  projectType: string;
  overview: string;
  userFlow: string[];
  techStackRecommendation: {
    frontend: string[];
    backend: string[];
    database: string;
    deployment: string[];
  };
  wireframes: string;  // Markdown description
  timeline: string;
  estimatedCost: string;
}

export interface ScreenMockup {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  elements: string[];
  interactions: string[];
  notes: string;
}

export interface UserFlowStep {
  id: string;
  step: number;
  title: string;
  description: string;
  screenId: string;
  actions: string[];
  nextSteps: string[];
}

export interface MockupData {
  screens: ScreenMockup[];
  userFlow: UserFlowStep[];
  navigationStructure: {
    mainNav: string[];
    footerNav: string[];
    userMenu: string[];
  };
  designGuidelines: {
    colorScheme: string[];
    typography: string;
    spacing: string;
    components: string[];
  };
}

export interface SystemArchitecture {
  overview: {
    systemName: string;
    description: string;
    architecturePattern: string;
    keyPrinciples: string[];
  };

  components: {
    id: string;
    name: string;
    type: 'frontend' | 'backend' | 'database' | 'cache' | 'queue' | 'external' | 'storage' | 'cdn';
    description: string;
    responsibilities: string[];
    technologies: string[];
  }[];

  dataFlow: {
    id: string;
    from: string;
    to: string;
    description: string;
    protocol: string;
    dataFormat: string;
  }[];

  techStack: {
    category: string;
    technology: string;
    version?: string;
    justification: string;
    alternatives: string[];
  }[];

  database: {
    type: string;
    name: string;
    justification: string;
    entities: {
      name: string;
      description: string;
      fields: {
        name: string;
        type: string;
        constraints: string[];
      }[];
      relationships: string[];
    }[];
  };

  apis: {
    name: string;
    type: 'REST' | 'GraphQL' | 'gRPC' | 'WebSocket';
    baseUrl: string;
    endpoints: {
      method: string;
      path: string;
      description: string;
      requestBody?: string;
      responseBody?: string;
      authentication: boolean;
    }[];
  }[];

  security: {
    authentication: {
      method: string;
      description: string;
      implementation: string;
    };
    authorization: {
      method: string;
      description: string;
      roles: string[];
    };
    dataProtection: string[];
    threats: {
      threat: string;
      mitigation: string;
    }[];
  };

  scalability: {
    strategy: string;
    horizontalScaling: string[];
    verticalScaling: string[];
    caching: {
      layer: string;
      technology: string;
      strategy: string;
    }[];
    loadBalancing: string;
  };

  deployment: {
    environment: string;
    platform: string;
    containerization: string;
    orchestration: string;
    cicd: {
      tool: string;
      stages: string[];
    };
    infrastructure: string[];
  };

  monitoring: {
    logging: {
      tool: string;
      strategy: string;
    };
    metrics: {
      tool: string;
      keyMetrics: string[];
    };
    alerting: {
      tool: string;
      alerts: string[];
    };
    tracing: string;
  };

  estimatedCosts: {
    category: string;
    item: string;
    monthlyCost: string;
    notes: string;
  }[];

  implementationPlan: {
    phase: number;
    name: string;
    duration: string;
    deliverables: string[];
    dependencies: string[];
  }[];

  risks: {
    risk: string;
    impact: 'high' | 'medium' | 'low';
    mitigation: string;
  }[];
}

export interface IdeaValidationResult {
  overallScore: number;
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
    score: number;
    analysis: string;
    gaps: string[];
    strengths: string[];
  };

  marketViability: {
    score: number;
    analysis: string;
    competitors: string[];
    differentiators: string[];
    risks: string[];
  };

  technicalFeasibility: {
    score: number;
    analysis: string;
    challenges: string[];
    recommendations: string[];
  };

  businessModelAssessment: {
    score: number;
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
    confidence: number;
    reasoning: string;
    conditions: string[];
  };
}

export type ProjectWithRelations = Project & {
  user: UserWithoutPassword;
  aiLogs: AIGenerationLog[];
};

// ============================================
// AI TYPES
// ============================================

export interface AIRequest {
  step: string;
  projectId: string;
  contextData: Record<string, any>;
  customPrompt?: string;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
  tokensUsed?: number;
  latencyMs?: number;
}

export interface KIMIAPIRequest {
  model: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  max_tokens?: number;
}

export interface KIMIAPIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

// ============================================
// ADMIN TYPES
// ============================================

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  completedProjects: number;
  totalAIRequests: number;
  totalAICost: number;
  averageProjectCompletionTime: number;  // in days
}

export interface AILogSummary extends AIGenerationLog {
  projectTitle: string;
  userName: string;
}
