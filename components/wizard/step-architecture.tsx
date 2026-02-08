'use client';

/**
 * Step 7: Architecture
 * Generate comprehensive system architecture
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Server, Sparkles, Loader2, ArrowRight, Database, Shield, Cloud, Code,
  GitBranch, Activity, DollarSign, AlertTriangle, Layers, Network,
  ChevronDown, ChevronUp, Download, FileText, Box, Workflow
} from 'lucide-react';
import { useGenerateArchitecture } from '@/hooks/use-ai-generation';
import { SystemArchitecture } from '@/types';
import { cn } from '@/lib/utils/cn';

interface StepArchitectureProps {
  projectId?: string;
  projectTitle?: string;
  architectureData?: SystemArchitecture;
  onSubmit: (data?: any) => void;
  onBack?: () => void;
}

export default function StepArchitecture({
  projectId,
  projectTitle = 'مشروع',
  architectureData,
  onSubmit,
  onBack,
}: StepArchitectureProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    components: true,
    techStack: true,
    database: false,
    apis: false,
    security: false,
    scalability: false,
    deployment: false,
    monitoring: false,
    costs: false,
    plan: false,
    risks: false,
  });

  const generateArchitectureMutation = useGenerateArchitecture();

  const handleGenerateArchitecture = () => {
    if (projectId) {
      generateArchitectureMutation.mutate(projectId);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getComponentTypeIcon = (type: string) => {
    switch (type) {
      case 'frontend': return <Box className="w-4 h-4 text-blue-500" />;
      case 'backend': return <Server className="w-4 h-4 text-green-500" />;
      case 'database': return <Database className="w-4 h-4 text-purple-500" />;
      case 'cache': return <Layers className="w-4 h-4 text-yellow-500" />;
      case 'queue': return <Workflow className="w-4 h-4 text-orange-500" />;
      case 'external': return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'storage': return <Database className="w-4 h-4 text-indigo-500" />;
      case 'cdn': return <Network className="w-4 h-4 text-cyan-500" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExportMarkdown = () => {
    if (!architectureData) return;

    const markdown = `# ${projectTitle} - System Architecture

## Overview
- **System Name:** ${architectureData.overview.systemName}
- **Architecture Pattern:** ${architectureData.overview.architecturePattern}
- **Description:** ${architectureData.overview.description}

### Key Principles
${architectureData.overview.keyPrinciples.map(p => `- ${p}`).join('\n')}

## Components
${architectureData.components.map(c => `
### ${c.name} (${c.type})
${c.description}

**Responsibilities:**
${c.responsibilities.map(r => `- ${r}`).join('\n')}

**Technologies:** ${c.technologies.join(', ')}
`).join('\n')}

## Tech Stack
| Category | Technology | Justification |
|----------|------------|---------------|
${architectureData.techStack.map(t => `| ${t.category} | ${t.technology} ${t.version ? `v${t.version}` : ''} | ${t.justification} |`).join('\n')}

## Database Design
**Type:** ${architectureData.database.type}

### Entities
${architectureData.database.entities.map(e => `
#### ${e.name}
${e.description}

| Field | Type | Constraints |
|-------|------|-------------|
${e.fields.map(f => `| ${f.name} | ${f.type} | ${f.constraints.join(', ')} |`).join('\n')}

**Relationships:** ${e.relationships.join(', ')}
`).join('\n')}

## Security
### Authentication
- **Method:** ${architectureData.security.authentication.method}
- **Implementation:** ${architectureData.security.authentication.implementation}

### Authorization
- **Method:** ${architectureData.security.authorization.method}
- **Roles:** ${architectureData.security.authorization.roles.join(', ')}

### Threats & Mitigations
${architectureData.security.threats.map(t => `- **${t.threat}:** ${t.mitigation}`).join('\n')}

## Deployment
- **Platform:** ${architectureData.deployment.platform}
- **Containerization:** ${architectureData.deployment.containerization}
- **Orchestration:** ${architectureData.deployment.orchestration}

### CI/CD Pipeline (${architectureData.deployment.cicd.tool})
${architectureData.deployment.cicd.stages.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Estimated Costs
| Category | Item | Monthly Cost | Notes |
|----------|------|--------------|-------|
${architectureData.estimatedCosts.map(c => `| ${c.category} | ${c.item} | ${c.monthlyCost} | ${c.notes} |`).join('\n')}

## Implementation Plan
${architectureData.implementationPlan.map(p => `
### Phase ${p.phase}: ${p.name} (${p.duration})
**Deliverables:**
${p.deliverables.map(d => `- ${d}`).join('\n')}
${p.dependencies.length > 0 ? `\n**Dependencies:** ${p.dependencies.join(', ')}` : ''}
`).join('\n')}

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
${architectureData.risks.map(r => `| ${r.risk} | ${r.impact} | ${r.mitigation} |`).join('\n')}

---
*Generated by IdeaFlow AI*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle}-Architecture.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!architectureData) return;

    const json = JSON.stringify(architectureData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle}-Architecture.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Server className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 7: المعمارية</h2>
        <p className="text-muted-foreground text-lg">
          تصميم معمارية النظام والبنية التقنية
        </p>
      </div>

      <div className="space-y-6">
        {/* Architecture Generation */}
        <Card className={architectureData ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              معمارية النظام
            </CardTitle>
            <CardDescription>
              توليد التصميم المعماري الشامل للنظام باستخدام الذكاء الاصطناعي
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!architectureData ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">توليد المعمارية التقنية</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
                    سيتم توليد تصميم معماري شامل يتضمن:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-right">
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-500" />
                      هيكل المكونات
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      تقسيم النظام وتحديد المسؤوليات
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4 text-green-500" />
                      التقنيات المستخدمة
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      اختيار وتبرير التقنيات
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-500" />
                      تصميم قاعدة البيانات
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      الجداول والعلاقات
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      الأمان
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      المصادقة والتفويض والحماية
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-cyan-500" />
                      النشر والتوسع
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      CI/CD والبنية التحتية
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-yellow-500" />
                      التكاليف والخطة
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      تقدير التكاليف وخطة التنفيذ
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleGenerateArchitecture}
                  disabled={!projectId || generateArchitectureMutation.isPending}
                >
                  {generateArchitectureMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <Sparkles className="ml-2 h-5 w-5" />
                      توليد المعمارية
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Overview Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('overview')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        نظرة عامة على النظام
                      </span>
                      {expandedSections.overview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.overview && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">اسم النظام</h4>
                          <p className="text-sm text-muted-foreground">{architectureData.overview.systemName}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">نمط المعمارية</h4>
                          <p className="text-sm text-muted-foreground">{architectureData.overview.architecturePattern}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">الوصف</h4>
                        <p className="text-sm text-muted-foreground">{architectureData.overview.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">المبادئ الأساسية</h4>
                        <div className="flex flex-wrap gap-2">
                          {architectureData.overview.keyPrinciples.map((principle, i) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                              {principle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Components Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('components')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Box className="w-5 h-5 text-blue-500" />
                        مكونات النظام ({architectureData.components.length})
                      </span>
                      {expandedSections.components ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.components && (
                    <CardContent className="space-y-3">
                      {architectureData.components.map((component) => (
                        <Card key={component.id} className="bg-muted/50">
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-3">
                              {getComponentTypeIcon(component.type)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm">{component.name}</h4>
                                  <span className="text-xs px-2 py-0.5 bg-background rounded">{component.type}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{component.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {component.technologies.map((tech, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  )}
                </Card>

                {/* Tech Stack Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('techStack')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-500" />
                        التقنيات المستخدمة
                      </span>
                      {expandedSections.techStack ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.techStack && (
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right py-2 font-semibold">الفئة</th>
                              <th className="text-right py-2 font-semibold">التقنية</th>
                              <th className="text-right py-2 font-semibold">السبب</th>
                            </tr>
                          </thead>
                          <tbody>
                            {architectureData.techStack.map((tech, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="py-2 text-muted-foreground">{tech.category}</td>
                                <td className="py-2 font-medium">
                                  {tech.technology} {tech.version && <span className="text-xs text-muted-foreground">v{tech.version}</span>}
                                </td>
                                <td className="py-2 text-xs text-muted-foreground">{tech.justification}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Database Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('database')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-500" />
                        قاعدة البيانات ({architectureData.database.type})
                      </span>
                      {expandedSections.database ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.database && (
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{architectureData.database.justification}</p>
                      <div className="grid gap-3">
                        {architectureData.database.entities.map((entity, i) => (
                          <Card key={i} className="bg-muted/50">
                            <CardContent className="pt-4">
                              <h4 className="font-semibold text-sm mb-1">{entity.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{entity.description}</p>
                              <div className="text-xs space-y-1">
                                {entity.fields.slice(0, 4).map((field, j) => (
                                  <div key={j} className="flex items-center gap-2">
                                    <span className="font-mono bg-background px-1 rounded">{field.name}</span>
                                    <span className="text-muted-foreground">{field.type}</span>
                                  </div>
                                ))}
                                {entity.fields.length > 4 && (
                                  <span className="text-muted-foreground">+{entity.fields.length - 4} more fields</span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Security Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('security')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        الأمان
                      </span>
                      {expandedSections.security ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.security && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">المصادقة</h4>
                          <p className="text-xs"><span className="font-medium">الطريقة:</span> {architectureData.security.authentication.method}</p>
                          <p className="text-xs text-muted-foreground mt-1">{architectureData.security.authentication.implementation}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">التفويض</h4>
                          <p className="text-xs"><span className="font-medium">الطريقة:</span> {architectureData.security.authorization.method}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {architectureData.security.authorization.roles.map((role, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 bg-background rounded">{role}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">التهديدات والحماية</h4>
                        <div className="space-y-2">
                          {architectureData.security.threats.map((threat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                              <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">{threat.threat}:</span>
                                <span className="text-muted-foreground ml-1">{threat.mitigation}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Deployment Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('deployment')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-cyan-500" />
                        النشر والتوزيع
                      </span>
                      {expandedSections.deployment ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.deployment && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-muted/50 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">المنصة</p>
                          <p className="text-sm font-medium">{architectureData.deployment.platform}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">الحاويات</p>
                          <p className="text-sm font-medium">{architectureData.deployment.containerization}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">التنسيق</p>
                          <p className="text-sm font-medium">{architectureData.deployment.orchestration}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">CI/CD</p>
                          <p className="text-sm font-medium">{architectureData.deployment.cicd.tool}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">مراحل CI/CD</h4>
                        <div className="flex flex-wrap gap-2">
                          {architectureData.deployment.cicd.stages.map((stage, i) => (
                            <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded">
                              <GitBranch className="w-3 h-3" />
                              {stage}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Costs Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('costs')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-yellow-500" />
                        التكاليف المقدرة
                      </span>
                      {expandedSections.costs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.costs && (
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right py-2 font-semibold">الفئة</th>
                              <th className="text-right py-2 font-semibold">البند</th>
                              <th className="text-right py-2 font-semibold">التكلفة الشهرية</th>
                              <th className="text-right py-2 font-semibold">ملاحظات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {architectureData.estimatedCosts.map((cost, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="py-2 text-muted-foreground">{cost.category}</td>
                                <td className="py-2">{cost.item}</td>
                                <td className="py-2 font-medium">{cost.monthlyCost}</td>
                                <td className="py-2 text-xs text-muted-foreground">{cost.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Implementation Plan Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('plan')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        خطة التنفيذ
                      </span>
                      {expandedSections.plan ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.plan && (
                    <CardContent className="space-y-3">
                      {architectureData.implementationPlan.map((phase) => (
                        <Card key={phase.phase} className="bg-muted/50">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">
                                المرحلة {phase.phase}: {phase.name}
                              </h4>
                              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                                {phase.duration}
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {phase.deliverables.map((d, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="text-indigo-500">•</span>
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  )}
                </Card>

                {/* Risks Section */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('risks')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        المخاطر
                      </span>
                      {expandedSections.risks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.risks && (
                    <CardContent className="space-y-2">
                      {architectureData.risks.map((risk, i) => (
                        <div key={i} className={cn("p-3 rounded-lg border", getRiskColor(risk.impact))}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{risk.risk}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-background">
                              {risk.impact === 'high' ? 'عالي' : risk.impact === 'medium' ? 'متوسط' : 'منخفض'}
                            </span>
                          </div>
                          <p className="text-xs opacity-80">{risk.mitigation}</p>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>

                {/* Export Options */}
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      تصدير المعمارية
                    </CardTitle>
                    <CardDescription className="text-green-800 dark:text-green-200">
                      قم بتصدير التصميم المعماري كملف Markdown أو JSON
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleExportMarkdown}
                      className="flex-1"
                    >
                      <FileText className="ml-2 h-4 w-4" />
                      تصدير Markdown
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleExportJSON}
                      className="flex-1"
                    >
                      <Code className="ml-2 h-4 w-4" />
                      تصدير JSON
                    </Button>
                  </CardContent>
                </Card>

                {/* Regenerate Option */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateArchitecture}
                    disabled={generateArchitectureMutation.isPending}
                  >
                    <Sparkles className="ml-2 h-4 w-4" />
                    إعادة التوليد
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => onBack?.()}
            >
              <ArrowRight className="ml-2 h-5 w-5" />
              السابق
            </Button>
          )}
          <div className={!onBack ? 'mr-auto' : ''}>
            <Button
              type="button"
              size="lg"
              onClick={() => onSubmit()}
              disabled={!architectureData}
            >
              المتابعة للشاشات
              <Server className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
