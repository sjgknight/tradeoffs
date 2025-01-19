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
        principles: { principle?: string | number; value?: number; name: string }[];
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
                { principle: 1, value: 1, name: "long-range" },
                { principle: 2, value: 1, name: "respect for persons" },
                { principle: 5, value: 1, name: "merit and integrity" }
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
                { principle: 4, name: "justice", value: 2 },
                { principle: 2, value: 1, name: "respect for persons" }
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
                { principle: 5, value: 1, name: "merit and integrity" },
                { principle: 2, value: 1, name: "respect for persons" },
                { principle: 3, value: 1, name: "beneficience" }
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
                { principle: 5, name: "merit and integrity", value: 2 },
                { principle: 4, value: 1, name: "justice" }
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
                { principle: 2, value: 1, name: "respect for persons" },
                { principle: 4, name: "justice", value: 2 }
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
                { principle: 5, name: "merit and integrity", value: 2 },
                { principle: 2, value: 1, name: "respect for persons" }
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
                { principle: 2, value: 1, name: "respect for persons" },
                { principle: 4, name: "justice", value: 2 }
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
                { principle: 2, value: 1, name: "respect for persons" },
                { principle: 5, value: 1, name: "merit and integrity" }
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
                { principle: 3, name: "beneficience", value: 2 },
                { principle: 5, value: 1, name: "merit and integrity" }
            ]
        }
    },
];

