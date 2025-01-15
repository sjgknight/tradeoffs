import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class ChallengeCard extends Piece<Tradeoffs> {
    problem: string;
    points: number;
    impacting_events: string[];
    problem_detail: string;
    is_complete: boolean;
    requirements: {
        blocks: number;
        principles: { principle?: string; count?: number }[];
    };  
}

export const challengeCards: Partial<ChallengeCard>[] = [
    {
        problem: "Teacher quality",
        points: 3,
        impacting_events: ["Privacy breach"],
        problem_detail: "A new system is introduced aiming to use data from class activities, to identify learners who may need more support...",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "long-range" },
                { principle: "respect for persons" },
                { principle: "merit and integrity" }
            ]
        }
    },
    {
        problem: "Workload",
        points: 1,
        impacting_events: ["Equity"],
        problem_detail: "",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "justice", count: 2 },
                { principle: "respect for persons" }
            ]
        }
    },
    {
        problem: "Formative feedback at scale",
        points: 3,
        impacting_events: ["Equity"],
        problem_detail: "",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "merit and integrity" },
                { principle: "respect for persons" },
                { principle: "beneficience" }
            ]
        }
    },
    {
        problem: "Differentiation",
        points: 2,
        impacting_events: [],
        problem_detail: "Scenario 1: AI for enrichment class streaming...",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "merit and integrity", count: 2 },
                { principle: "justice" }
            ]
        }
    },
    {
        problem: "Digital skills",
        points: 1,
        impacting_events: [],
        problem_detail: "",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "respect for persons" },
                { principle: "justice", count: 2 }
            ]
        }
    },
    {
        problem: "Engagement",
        points: 1,
        impacting_events: [],
        problem_detail: "Your school has adopted a new AI system that is intended to track ‘engagement in learning’...",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "merit and integrity", count: 2 },
                { principle: "respect for persons" }
            ]
        }
    },
    {
        problem: "Careers guidance",
        points: 1,
        impacting_events: [],
        problem_detail: "Common scenario: AI career guidance tool...",
        requirements: {
            blocks: 1,
            principles: []
        }
    },
    {
        problem: "Meeting accessibility obligations",
        points: 3,
        impacting_events: [],
        problem_detail: "Your school is legally required to provide accessible materials for all students...",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "respect for persons" },
                { principle: "justice", count: 2 }
            ]
        }
    },
    {
        problem: "Personalised learning",
        points: 2,
        impacting_events: [],
        problem_detail: "Adaptive Learning Platforms: This AI-driven platform personalizes instruction for each student...",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "respect for persons" },
                { principle: "merit and integrity" }
            ]
        }
    },
    {
        problem: "Wellbeing",
        points: 2,
        impacting_events: [],
        problem_detail: "AI-Driven Counseling Support: A new AI system helps school counselors identify students in need of emotional support early...",
        requirements: {
            blocks: 1,
            principles: [
                { principle: "beneficience", count: 2 },
                { principle: "merit and integrity" }
            ]
        }
    },
];

