import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class StrategyCard extends Piece<Tradeoffs> {
    name: string;
    type: string;
    description: string;
    cost: number;
    value: {
        principles: { principle?: string; contribution?: number }[];
    };
}

export const strategyCards: Partial<StrategyCard>[] = [
    {
        name: 'Develop guidelines',
        type: 'regulate',
        cost: 1,
        value: {
            principles: [
                { principle: 'principle1', contribution: 1 },
                { principle: 'principle2', contribution: 1 },
                { principle: 'principle3', contribution: 1 },
                { principle: 'principle4', contribution: 1 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Ban some uses of or types of AI',
        type: 'regulate',
        cost: 1,
        value: {
            principles: [
                { principle: 'principle1', contribution: 999 },
                { principle: 'principle2', contribution: 999 },
                { principle: 'principle3', contribution: 999 },
                { principle: 'principle4', contribution: 999 },
                { principle: 'principle5', contribution: 999 }
            ]
        }
    },
    {
        name: 'Provide learning opportunities for teachers / students / school leaders',
        type: 'regulate',
        cost: 2,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 3 },
                { principle: 'principle3', contribution: 1 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Provide non-AI alternatives to the technology to do the same tasks.',
        type: 'regulate',
        cost: 2,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 3 },
                { principle: 'principle3', contribution: 0 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 0 }
            ]
        }
    },
    {
        name: 'Change how the AI / tool is used',
        type: 'regulate',
        cost: 2,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 3 },
                { principle: 'principle3', contribution: 0 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 0 }
            ]
        }
    },
    {
        name: 'Invest in a tool / person e.g., to collect / explore data, create policy, implement changes, etc.',
        type: 'regulate',
        cost: 2,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 2 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Require tool providers to provide evidence of how effective or ‘ethical’ they are',
        type: 'regulate',
        cost: 3,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 3 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 2 }
            ]
        }
    },
    {
        name: 'Go back to the status quo',
        type: 'regulate',
        cost: 2,
        value: {
            principles: [
                { principle: 'principle1', contribution: 999 },
                { principle: 'principle2', contribution: 999 },
                { principle: 'principle3', contribution: 999 },
                { principle: 'principle4', contribution: 999 },
                { principle: 'principle5', contribution: 999 }
            ]
        }
    },
    {
        name: 'Involve stakeholders in decision making around the problem or/and use of AI',
        type: 'regulate',
        cost: 3,
        value: {
            principles: [
                { principle: 'principle1', contribution: 1 },
                { principle: 'principle2', contribution: 1 },
                { principle: 'principle3', contribution: 1 },
                { principle: 'principle4', contribution: 3 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Introduce rewards / penalties for good / bad use of AI',
        type: 'regulate',
        cost: 1,
        value: {
            principles: [
                { principle: 'principle1', contribution: 1 },
                { principle: 'principle2', contribution: 1 },
                { principle: 'principle3', contribution: 0 },
                { principle: 'principle4', contribution: 1 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Establish an oversight body or system to monitor the impacts of AI',
        type: 'regulate',
        cost: 1,
        value: {
            principles: [
                { principle: 'principle1', contribution: 1 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 1 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Share examples of good / problematic practice',
        type: 'regulate',
        cost: 1,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 1 },
                { principle: 'principle4', contribution: 0 },
                { principle: 'principle5', contribution: 1 }
            ]
        }
    },
    {
        name: 'Advocate for change to a relevant stakeholder/s',
        type: 'regulate',
        cost: 1,
        value: {
            principles: [
                { principle: 'principle1', contribution: 0 },
                { principle: 'principle2', contribution: 1 },
                { principle: 'principle3', contribution: 0 },
                { principle: 'principle4', contribution: 1 },
                { principle: 'principle5', contribution: 0 }
            ]
        }
    },
    {
        name: 'Seek school sponsorship / partnership with an external partner (e.g., EdTech company).',
        type: 'regulate',
        cost: -1,
        value: {
            principles: [
                { principle: 'principle1', contribution: -1 },
                { principle: 'principle2', contribution: 1 },
                { principle: 'principle3', contribution: 1 },
                { principle: 'principle4', contribution: 1 },
                { principle: 'principle5', contribution: -1 }
            ]
        }
    },
    {
        name: 'Create a tool to support users monitor the energy and water consumption of their AI use.',
        type: 'regulate',
        cost: 2,
        value: {
            principles: [
                { principle: 'principle1', contribution: 2 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 0 },
                { principle: 'principle4', contribution: 2 },
                { principle: 'principle5', contribution: 2 }
            ]
        }
    },
    {
        name: 'Require annual reporting and ongoing monitoring of emerging impacts of tools',
        type: 'regulate',
        cost: 3,
        value: {
            principles: [
                { principle: 'principle1', contribution: 2 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 3 },
                { principle: 'principle4', contribution: 2 },
                { principle: 'principle5', contribution: 2 }
            ]
        }
    },
    {
        name: 'Somethin expensive',
        type: 'regulate',
        cost: 18,
        value: {
            principles: [
                { principle: 'principle1', contribution: 2 },
                { principle: 'principle2', contribution: 0 },
                { principle: 'principle3', contribution: 3 },
                { principle: 'principle4', contribution: 2 },
                { principle: 'principle5', contribution: 2 }
            ]
        }
    }
];
