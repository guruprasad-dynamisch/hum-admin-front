import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningIcon from '@mui/icons-material/Warning'
import BoltIcon from '@mui/icons-material/Bolt'

export interface Discovery {
    id: number
    title: string
    category: string
}

export interface DiscoveryCard {
    id: number
    icon: React.ReactNode
    title: string
    description: string
}

export interface InsightSection {
    id: string
    icon: React.ReactNode
    title: string
    count: number
    description: string
    expanded: boolean
}

export interface SourceDocument {
    id: number
    name: string
    dateUploaded: string
    active: boolean
}

export const discoveries: Discovery[] = [
    { id: 1, title: '[Revenue] Q4 Revenue Projections', category: 'Revenue' },
    { id: 2, title: '[Projects] Bottlenecked Dependencies', category: 'Projects' },
    { id: 3, title: '[People] Unclear Role Promises', category: 'People' },
    { id: 4, title: '[Projects] Hidden Rework', category: 'Projects' },
    { id: 5, title: '[Risks] Stalled Hand-offs', category: 'Risks' },
    { id: 6, title: '[General] Assumed Alignment', category: 'General' },
]

export const discoveryCards: DiscoveryCard[] = [
    {
        id: 1,
        icon: <GpsFixedIcon sx={{ fontSize: 48, color: 'var(--primary-orange)' }} />,
        title: 'Root Causes',
        description: "Find what's truly driving the problem.",
    },
    {
        id: 2,
        icon: <GpsFixedIcon sx={{ fontSize: 48, color: 'var(--primary-orange)' }} />,
        title: 'Hidden Patterns',
        description: 'Uncover trends that are not immediately visible.',
    },
    {
        id: 3,
        icon: <GpsFixedIcon sx={{ fontSize: 48, color: 'var(--primary-orange)' }} />,
        title: 'Risk Factors',
        description: 'Identify potential risks before they become issues.',
    },
    {
        id: 4,
        icon: <GpsFixedIcon sx={{ fontSize: 48, color: 'var(--primary-orange)' }} />,
        title: 'Opportunities',
        description: 'Discover new opportunities for growth.',
    },
]

export const initialInsightSections: InsightSection[] = [
    {
        id: 'root-causes',
        icon: <GpsFixedIcon sx={{ color: 'var(--primary-orange)' }} />,
        title: 'Root Causes',
        count: 2,
        description: "Understand what's really driving the challenge you're facing.",
        expanded: false,
    },
    {
        id: 'opportunities',
        icon: <VisibilityIcon sx={{ color: 'var(--primary-orange)' }} />,
        title: 'Overlooked Opportunities',
        count: 4,
        description: 'Spot hidden strengths and missed chances.',
        expanded: false,
    },
    {
        id: 'hidden-risks',
        icon: <WarningIcon sx={{ color: 'var(--primary-orange)' }} />,
        title: 'Hidden Risks',
        count: 3,
        description: 'Reveal blind spots before they cause trouble.',
        expanded: false,
    },
    {
        id: 'possible-actions',
        icon: <BoltIcon sx={{ color: 'var(--primary-orange)' }} />,
        title: 'Possible Actions',
        count: 6,
        description: 'Data-driven insights that reveal next steps worth exploring.',
        expanded: false,
    },
]

export const initialSources: SourceDocument[] = [
    { id: 1, name: 'Document Name.pdf', dateUploaded: '00/00/0000', active: true },
    { id: 2, name: 'Document Name.docx', dateUploaded: '00/00/0000', active: true },
    { id: 3, name: 'Document Name.xlsx', dateUploaded: '00/00/0000', active: true },
    { id: 4, name: 'Document Name.pdf', dateUploaded: '00/00/0000', active: true },
]
