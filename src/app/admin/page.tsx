import { 
  FolderOpen, 
  Mail, 
  Users, 
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MessageCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    change: '+2',
    changeType: 'positive',
    icon: FolderOpen,
    color: 'text-primary'
  },
  {
    name: 'Unread Messages',
    value: '5',
    change: '-3',
    changeType: 'negative',
    icon: Mail,
    color: 'text-accent'
  },
  {
    name: 'Categories',
    value: '8',
    change: '+1',
    changeType: 'positive',
    icon: Users,
    color: 'text-greenType'
  },
  {
    name: 'Site Visitors',
    value: '1.2K',
    change: '+12%',
    changeType: 'positive',
    icon: Eye,
    color: 'text-secondary'
  },
];

const recentActivities = [
  {
    id: 1,
    action: 'New project added',
    description: 'E-commerce Platform',
    time: '2 hours ago',
    icon: FolderOpen,
    color: 'bg-primary'
  },
  {
    id: 2,
    action: 'Message received',
    description: 'From John Doe',
    time: '5 hours ago',
    icon: Mail,
    color: 'bg-accent'
  },
  {
    id: 3,
    action: 'Category updated',
    description: 'Web Development',
    time: '1 day ago',
    icon: Users,
    color: 'bg-greenType'
  },
  {
    id: 4,
    action: 'Project published',
    description: 'Portfolio Website',
    time: '2 days ago',
    icon: Eye,
    color: 'bg-secondary'
  },
];

const quickActions = [
  {
    name: 'Add Project',
    description: 'Create new project',
    icon: Plus,
    href: '/admin/projects/new',
    color: 'text-primary'
  },
  {
    name: 'View Messages',
    description: 'Check client inquiries',
    icon: MessageCircle,
    href: '/admin/messages',
    color: 'text-accent'
  },
  {
    name: 'Analytics',
    description: 'View site statistics',
    icon: BarChart3,
    href: '/admin/analytics',
    color: 'text-greenType'
  },
  {
    name: 'Schedule',
    description: 'Manage calendar',
    icon: Calendar,
    href: '/admin/schedule',
    color: 'text-secondary'
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-headingLight heading-style">Dashboard</h1>
        <p className="mt-2 text-textLight text-style">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-bgLight overflow-hidden shadow-sm rounded-lg border border-border p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-textLight truncate text-style">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-headingLight heading-style">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold text-style ${
                        stat.changeType === 'positive'
                          ? 'text-greenType'
                          : 'text-redType'
                      }`}
                    >
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                      </span>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-headingLight mb-6 heading-style">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                    <activity.icon className="h-5 w-5 text-bgLight" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-headingLight text-style">
                    {activity.action}
                  </p>
                  <p className="text-sm text-textLight text-style">
                    {activity.description}
                  </p>
                  <p className="text-xs text-textDark mt-1 text-style">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-headingLight mb-6 heading-style">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-input transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <action.icon className={`h-8 w-8 ${action.color} mb-2 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-headingLight text-style text-center">{action.name}</span>
                <span className="text-xs text-textLight text-style text-center mt-1">{action.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects Preview */}
      <div className="bg-bgLight shadow-sm rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-headingLight heading-style">Recent Projects</h2>
          <a 
            href="/admin/projects"
            className="text-sm text-primary hover:text-hoverLinkLight font-medium text-style"
          >
            View all
          </a>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-headingLight text-style">E-commerce Platform</h3>
              <p className="text-sm text-textLight text-style">Last updated 2 hours ago</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-greenType/10 text-greenType text-style">
                Published
              </span>
              <TrendingUp className="h-4 w-4 text-textLight" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-headingLight text-style">Portfolio Website</h3>
              <p className="text-sm text-textLight text-style">Last updated 1 day ago</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary text-style">
                Draft
              </span>
              <Eye className="h-4 w-4 text-textLight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}