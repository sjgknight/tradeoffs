import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class StrategyCard extends Piece<Tradeoffs> {
    name: string;
    type: string;
    description: string;
    cost: number;
    contribution: {
        principles: { principle?: string | number; value?: number }[];
    };
}

export const strategyCards: Partial<StrategyCard>[] = [
    {
        name: 'Develop guidelines',
        type: 'regulate',
        cost: 1,
        contribution: {
            principles: [
                { principle: 1, value: 1 },
                { principle: 2, value: 1 },
                { principle: 3, value: 1 },
                { principle: 4, value: 1 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Ban some uses of or types of AI',
        type: 'regulate',
        cost: 1,
        contribution: {
            principles: [
                { principle: 1, value: 1 },
                { principle: 2, value: 1 },
                { principle: 3, value: 1 },
                { principle: 4, value: 1 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Provide learning opportunities for teachers / students / school leaders',
        type: 'regulate',
        cost: 2,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 3 },
                { principle: 3, value: 1 },
                { principle: 4, value: 0 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Provide non-AI alternatives to the technology to do the same tasks.',
        type: 'regulate',
        cost: 2,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 3 },
                { principle: 3, value: 0 },
                { principle: 4, value: 0 },
                { principle: 5, value: 0 }
            ]
        }
    },
    {
        name: 'Change how the AI / tool is used',
        type: 'regulate',
        cost: 2,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 3 },
                { principle: 3, value: 0 },
                { principle: 4, value: 0 },
                { principle: 5, value: 0 }
            ]
        }
    },
    {
        name: 'Invest in a tool / person e.g., to collect / explore data, create policy, implement changes, etc.',
        type: 'regulate',
        cost: 2,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 0 },
                { principle: 3, value: 2 },
                { principle: 4, value: 0 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Require tool providers to provide evidence of how effective or ‘ethical’ they are',
        type: 'regulate',
        cost: 3,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 0 },
                { principle: 3, value: 3 },
                { principle: 4, value: 0 },
                { principle: 5, value: 2 }
            ]
        }
    },
    {
        name: 'Go back to the status quo',
        type: 'regulate',
        cost: 2,
        contribution: {
            principles: [
                { principle: 1, value: 999 },
                { principle: 2, value: 999 },
                { principle: 3, value: 999 },
                { principle: 4, value: 999 },
                { principle: 5, value: 999 }
            ]
        }
    },
    {
        name: 'Involve stakeholders in decision making around the problem or/and use of AI',
        type: 'regulate',
        cost: 3,
        contribution: {
            principles: [
                { principle: 1, value: 1 },
                { principle: 2, value: 1 },
                { principle: 3, value: 1 },
                { principle: 4, value: 3 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Introduce rewards / penalties for good / bad use of AI',
        type: 'regulate',
        cost: 1,
        contribution: {
            principles: [
                { principle: 1, value: 1 },
                { principle: 2, value: 1 },
                { principle: 3, value: 0 },
                { principle: 4, value: 1 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Establish an oversight body or system to monitor the impacts of AI',
        type: 'regulate',
        cost: 1,
        contribution: {
            principles: [
                { principle: 1, value: 1 },
                { principle: 2, value: 0 },
                { principle: 3, value: 1 },
                { principle: 4, value: 0 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Share examples of good / problematic practice',
        type: 'regulate',
        cost: 1,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 0 },
                { principle: 3, value: 1 },
                { principle: 4, value: 0 },
                { principle: 5, value: 1 }
            ]
        }
    },
    {
        name: 'Advocate for change to a relevant stakeholder/s',
        type: 'regulate',
        cost: 1,
        contribution: {
            principles: [
                { principle: 1, value: 0 },
                { principle: 2, value: 1 },
                { principle: 3, value: 0 },
                { principle: 4, value: 1 },
                { principle: 5, value: 0 }
            ]
        }
    },
    {
        name: 'Seek school sponsorship / partnership with an external partner (e.g., EdTech company).',
        type: 'regulate',
        cost: -1,
        contribution: {
            principles: [
                { principle: 1, value: -1 },
                { principle: 2, value: 1 },
                { principle: 3, value: 1 },
                { principle: 4, value: 1 },
                { principle: 5, value: -1 }
            ]
        }
    },
    {
        name: 'Create a tool to support users monitor the energy and water consumption of their AI use.',
        type: 'regulate',
        cost: 2,
        contribution: {
            principles: [
                { principle: 1, value: 2 },
                { principle: 2, value: 0 },
                { principle: 3, value: 0 },
                { principle: 4, value: 2 },
                { principle: 5, value: 2 }
            ]
        }
    },
    {
        name: 'Require annual reporting and ongoing monitoring of emerging impacts of tools',
        type: 'regulate',
        cost: 3,
        contribution: {
            principles: [
                { principle: 1, value: 2 },
                { principle: 2, value: 0 },
                { principle: 3, value: 3 },
                { principle: 4, value: 2 },
                { principle: 5, value: 2 }
            ]
        }
    },
    {
        name: 'Somethin expensive',
        type: 'regulate',
        cost: 18,
        contribution: {
            principles: [
                { principle: 1, value: 2 },
                { principle: 2, value: 0 },
                { principle: 3, value: 3 },
                { principle: 4, value: 2 },
                { principle: 5, value: 2 }
            ]
        }
    }
];
