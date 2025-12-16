import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class EventCard extends Piece<Tradeoffs> {
    // Events represent scenarios, questions, or realizations that impact principle scores
    // They can be triggered by game decisions and affect the overall ethical landscape
    name: string;
    type: string;
    description: string;
    impact: {
        principle?: string | number; 
        value?: number;
    }[];
}

export const eventCards: Partial<EventCard>[] = [
    {
        name: "Privacy breach",
        type: "event",
        description: "Unauthorized access to student data",
        impact: [
            {"principle":1,"value":0},
            {"principle":2,"value":-3},
            {"principle":3,"value":0},
            {"principle":4,"value":0},
            {"principle":5,"value":0}
        ],
    },
    {
        name: "Does everyone in the school know how the AI system works?",
        type: "event",
        description: "System transparency question",
        impact: [
            {"principle":1,"value":-3},
            {"principle":2,"value":0},
            {"principle":3,"value":0},
            {"principle":4,"value":0},
            {"principle":5,"value":0}
        ],
    },
    {
        name: "Can the AI system do what the EdTech company says it can?",
        type: "event",
        description: "System capability verification",
        impact: [
            {"principle":1,"value":0},
            {"principle":2,"value":-3},
            {"principle":3,"value":0},
            {"principle":4,"value":0},
            {"principle":5,"value":0}
        ],
    },
    {
        name: "Pandemic",
        type: "event",
        description: "Global health crisis affecting education",
        impact: [
            {"principle":1,"value":0},
            {"principle":2,"value":0},
            {"principle":3,"value":-3},
            {"principle":4,"value":-3},
            {"principle":5,"value":0}
        ],
    },
    {
        name: "Who is accountable for performance",
        type: "event",
        description: "Are humans involved in assessing performance",
        impact: [
            {"principle":1,"value":-1},
            {"principle":2,"value":-3},
            {"principle":3,"value":0},
            {"principle":4,"value":-2},
            {"principle":5,"value":0}
        ],
    }
];
