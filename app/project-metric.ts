import { MetricDetail } from './metric-detail';
import { MemberSummary } from './member-summary';

export class ProjectMetric {
    id: string;
    name: string;
    month: number;
    project: string;
    details: MetricDetail[];
    membersSummary: MemberSummary[];
}
