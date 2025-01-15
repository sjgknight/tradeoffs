import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';
export class EventCard extends Piece<Tradeoffs> {
    name: string;
    type: string;
    description: string;
    value: {
        principle?: string | number; value?: number;
    }[];
}

export const eventCards: Partial<EventCard>[] = [
    {
        name: 'Does everyone in the school know how the AI system works?',
        type: 'event',
        value: [
            { principle: 1, value: -3 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'If a student/teacher disagrees with the outcome that an AI provides, what can they do in your school?',
        type: 'event',
        value: [
            { principle: 1, value: -3 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Can the AI system do what the EdTech company says it can?',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: -3 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'What impacts might using this AI system have on other stakeholders? (E.g., parents, teachers, school leaders, wider community)',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: -3 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Imagine the system has been in place for longer than 5 years: Will the system have improved? Who will benefit from those improvements? Who "owns" the knowledge that led to those improvements? Will how the system is used have changed? Will human expertise and agency be retained? What impact will using the AI system have on longer term issues?',
        type: 'event',
        value: [
            { principle: 1, value: -3 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Does the system tackle an issue or problem everyone thinks is important? If not, how has this happened?',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: -2 },
            { principle: 5, value: -2 }
        ]
    },
    {
        name: 'According to the latest Australian Digital Inclusion Index (ADII), almost a quarter of Australians are digitally excluded – meaning they don’t have access to essential technology.',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: -3 }
        ]
    },
    {
        name: 'Did you know: a ChatGPT request uses roughly 10 times a Google search query; and cooling data centres for AI uses water, with increased demand.',
        type: 'event',
        value: [
            { principle: 1, value: -3 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: -2 }
        ]
    },
    {
        name: 'Intergenerational fairness describes issues relating to how burdens and benefits impact different generations, including long-range harms for present-day decisions.',
        type: 'event',
        value: [
            { principle: 1, value: -3 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Imagine that AI is being used to solve a long-standing fairness issue in your school. How might this change how you think about the use of AI in your scenario?',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Imagine that something goes wrong (systems fail, students receive the wrong decision, there is a data breach, etc.). How would this impact fairness?',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: -3 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Pandemic',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: -3 },
            { principle: 4, value: -3 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Lose social license',
        type: 'event',
        value: [
            { principle: 1, value: -2 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: -2 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Poor use of AI',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: -2 },
            { principle: 3, value: -2 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    },
    {
        name: 'Pedagogic calcification',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: 0 },
            { principle: 3, value: 0 },
            { principle: 4, value: -2 },
            { principle: 5, value: -2 }
        ]
    },
    {
        name: 'Privacy breach',
        type: 'event',
        value: [
            { principle: 1, value: 0 },
            { principle: 2, value: -3 },
            { principle: 3, value: 0 },
            { principle: 4, value: 0 },
            { principle: 5, value: 0 }
        ]
    }
];
